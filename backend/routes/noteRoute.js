import express from "express";
import { createNote, deleteNote, getNote, updateNote,getNoteById } from "../controller/noteController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/notes",verifyToken, getNote);
router.get("/note/:id",verifyToken,getNoteById,)
router.post("/add-note",verifyToken, createNote);
router.put("/edit-note/:id",verifyToken, updateNote);
router.delete("/delete-note/:id",verifyToken, deleteNote);

export default router;
