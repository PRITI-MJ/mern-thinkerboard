import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {

    const handleDelete = async (e, id) => {
        e.preventDefault(); // Prevents the default link navigation behavior
        
        if(!window.confirm("Are you sure you want to delete this note?")) {
            return; // If the user cancels the confirmation, exit the function
        }else{
            try{
                await api.delete(`/notes/${id}`); // Send a DELETE request to the server to delete the note
                setNotes((prev) => prev.filter((note) => note._id !== id)); //get rid of the deleted note from the UI by filtering it out from the notes state
                toast.success("Note deleted successfully!"); // Show a success toast message
            }catch(err){
                console.log("Error in handleDelete",err);
                toast.error("Failed to delete the note."); // Show an error toast message if the deletion fails
            }
        }
    }

  return (
    <Link to={`/note/${note._id}`}
    className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>
                    {formatDate(new Date(note.createdAt))} {/* new Date() converts string to date object, as note.createdAt is a string and formatDate function required a date as an argument*/}
                </span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'/>
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e) => {handleDelete(e, note._id)}}>
                        <Trash2Icon className='size-4'/>
                    </button>
                </div>
            </div>

        </div>
    </Link>
  )
}

export default NoteCard
