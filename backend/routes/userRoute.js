import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    login,
    deleteUser
} from "../controller/userController.js"
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.get("/users",verifyToken,getUsers);
router.get("/users/:id",verifyToken,getUserById);
router.post("/users",createUser);
router.put("/users/:id",verifyToken,updateUser);
router.delete("/users/:id",verifyToken,deleteUser);

//Buat Login
router.post("/login",login);

export default router;