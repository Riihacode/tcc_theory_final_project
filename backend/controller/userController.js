import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET
async function getUsers(req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json({
            status:"Success",
            message:"Users Retrieved",
            data: users,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message:error.message,
        })
    }
}

// GET BY ID
async function getUserById(req, res) {
    try {
        const user = await User.findOne({where : {id: req.params.id}});
        if (!user) {
            const error = new Error("User tidak ditemukan");
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json({
            status: "Success",
            message:"User Retrieved",
            data: user,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message:error.message,
        })
    }
}

// CREATE

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        const msg = `${
            !name ? "Name" : !email ? "Email" : "Password"
        } field cannot be empty`;
        const error = new Error(msg);
        error.statusCode = 401;
        throw error; 
    }

    const encryptPassword = await bcrypt.hash(password,5);


    await User.create({
        name : name,
        email: email,
        password: encryptPassword,
    });

    res.status(201).json({
        status: "Success",
        message: "User Registered"
    });
    } catch (error) {
        res.status(error.statusCode|| 500).json({
            status: "Error",
            message: error.message,
        })
    }
}

async function updateUser(req, res) {
    try {
        const{name, email, password} = req.body;
        const ifUserExist = await User.findOne({where: {id: req.params.id} });

        if (!name || email) {
            const msg = `${
                !name ? "Name" : "Email"
            } field cannot be empty`;
            const error = new Error(msg);
            error.statusCode = 401;
            throw error;
        }

        if(!ifUserExist){
            const error = new Error("User tidak ditemukan");
            error.statusCode = 400;
            throw error;
        }

        await User.update(req.body, {
            where: {id: req.params.id}
        });

        res.status(200).json({
            status: "Success",
            message: "User Upated"
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message: error.message
        });
    }
}

async function deleteUser(req, res) {
    try {
        const ifUserExist = await User.findOne({where:{id: req.params.id}});
        if (!ifUserExist){
            const error = new Error("User tidak ditemukan");
            error.statusCode = 400;
            throw error;
        }

        await User.destroy({where: {id:req.params.id}});
        res.status(200).json({
            status: "Success",
            message: "User Deleted",
        });
    } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
    }
}

//Fungsi Login
async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            const userPlain = user.toJSON();
            const {password:_, refresh_token:__, ...safeUserData} = userPlain;
            const decryptPassword = await bcrypt.compare(password, user.password);
            if(decryptPassword){

                safeUserData.user_id = safeUserData.id;

                const accessToken = jwt.sign(
                    safeUserData,
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "3600s",
                    }
                );

                // Refresh token selama 1 hari
                const refreshToken = jwt.sign(
                    safeUserData,
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );

                // Updated tabel refresh token pada DB
                await User.update({
                    refresh_token: refreshToken
                },{
                    where : {
                        id: user.id,
                    }
                });

                // Memasukkan refresh token ke cookie
                res.cookie("refreshToken", refreshToken, {
                httpOnly:true,
                secure:true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000,
                secure:true,
                });

                // Mengirim respon berhasil (200)
                res.status(200).json({
                    status: "Succes",
                    message: "Login Berhasil",
                    safeUserData,
                    accessToken,
                });
            } else {
                // Password salah
                const error = new Error("Password atau email salah");
                error.statusCode = 400;
                throw error;
            }
        } else {
            // Email salah
            const error = new Error("Password atau email salah");
            error.statusCode = 400;
            throw error;
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message:error.message,
        });
    }
}


// Fungsi Logout
async function logout(req,res) {
    // Mengecek refresh token sama ga sama di DB
    const refreshToken = req.cookies.refreshToken;
    // Kalo ga sama / ga ada kirim status kode 204
    if(!refreshToken) return res.sendStatus(204);
    // Klo sama cari user yang punya refresh token
    const user = await User.findOne({
        where : {
            refresh_token: refreshToken,
        },
    });
    // Kalo user gaada kirim kode 204
    if(!user.refresh_token) return res.sendStatus(204);
    //kalo ketemu ambil ueser id
    const userId = user.id;

    //Hapus refersh token berdasarkan id user
    await User.update({
        refresh_token: null
    },{
        where: {
            id: userId,
        }
    });

    //Hapus cookie
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
        
}

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout
};
    
