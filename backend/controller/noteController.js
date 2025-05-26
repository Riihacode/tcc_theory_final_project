import Note from "../models/notes.js";

// GET (Ngambil Data)
async function getNote(req, res) {
  try {
    const user_id = req.id;
    const result = await Note.findAll({
      where: { user_id: user_id }
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Gagal mengambil data note"});
  }
}

// POST
async function createNote(req,res) {
  try {
    const user_id = req.id;
    const inputResult = req.body;

    console.log("Body:", inputResult);
    console.log("User ID:", user_id); 

    const newNote = await Note.create({...inputResult, user_id: user_id});
    res.status(201).json(newNote); 
  }catch(error){
    console.log(error.message);
    res.status(500).json({ message: "Gagal membuat note" });
  }
}

// PUT/PATCH
async function updateNote(req, res) {
  try {
    const {id} = req.params;
    const user_id = req.id;
    const updateInput = req.body;
    const note = await Note.findOne({where: {id, user_id: user_id}});

    if(!note){
      return res.status(404).json({message:"Note tidak ditemukan"})
    }

    await Note.update(updateInput, {where: {id, user_id: user_id} });
    res.status(200).json({message:"Note berhasil diperbarui"})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Gagal mengupdate note"});
  }
  
}

// DELETE
async function deleteNote(req, res) {
  try {
    const {id} = req.params;
    const user_id = req.id;
    const note = await Note.findOne({where: {id,user_id: user_id}});

    if(!note){
      return res.status(404).json({message:"Note tidak ditemukan"})
    }

    await Note.destroy({where: {id, user_id : user_id}});
    res.status(200).json({message:"Note berhasil dihapus"})
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Gagal menghapus note"});
  }
  
}

//GET BY ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.id;

    const note = await Note.findOne({ where: {id,user_id} });

    if (!note){
      return res.status(404).json({ message:"Note tidak ditemukan"})
    }

    res.status(200).json({note})
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message: "Gagal mengambil note"});
  }
}

export { getNote, createNote, updateNote, deleteNote, getNoteById };
