const mongoose = require("mongoose");

// 1 -> create a schema
// 2 -> model based off of the schema


// 1 -> create a schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
{    timestamps: true } // createdAt, updatedAt
);


// 2 -> model based off of the schema
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;