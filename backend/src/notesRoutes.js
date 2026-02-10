const express = require("express");
const { createNote, deleteNotes, getAllNotes, updateNote, getNoteById } = require( "./controllers/notesController");

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNotes);


module.exports = router;