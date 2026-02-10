const Note = require("../models/Note.js");


const getAllNotes = async (req, res) => {
    try{
       const notes = await Note.find().sort({createdAt: -1}); // -1 will sort in desc. order (newest first)
       res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const createNote =  async (req, res) => {
   
    try{
         const {title, content} = req.body;
         const newNote = new Note({title, content})

         await newNote.save();

         res.status(201).json({data: newNote, message: "Note created successfully!"});
    } catch(error){
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});

}
}

const updateNote = async (req, res) => {
    try{
          const {title, content} = req.body;
          const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content},
            {new: true} // to return the updated document
          );
          if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
          }
          res.status(200).json({data: updatedNote, message: "Note updated successfully!"})
        }
    catch(error){
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const deleteNotes =  async (req, res) => {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully!"});  
    } catch(error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const getNoteById = async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({data: note, message: "Note fetched successfully!"});
    } catch(error){
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}



module.exports = { getAllNotes, createNote, updateNote, deleteNotes, getNoteById };