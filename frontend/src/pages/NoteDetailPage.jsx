import React from 'react'
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import setIsRateLimited from '../Components/RateLimitedUI';
import { ArrowLeftIcon, LoaderIcon } from 'lucide-react';
import { Link } from 'react-router';
import { TrashIcon } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
      if(!window.confirm("Are you sure you want to delete this note?")) return;
        try{
          await api.delete(`notes/${id}`);
          toast.success("Note deleted successfully!");
          navigate("/"); // Navigate back to home page after deletion

        } catch(error){
          console.log("Error deleting note:", error);
          if(error.response?.status === 429) {
            toast.error("Slow down! You're deleting notes too fast.", {
              duration: 4000,
              icon: '⚠️',
            });
          }else{
            toast.error("Failed to delete note.");
          }
        }
     }

    const handleSave = async () => {
      if(!note.title.trim() || !note.content.trim()) {
        toast.error("All fields are required");
        return;
      }

      setSaving(true);

      try{
        await api.put(`/notes/${id}`, note);
        toast.success("Note updated successfully");
        navigate("/");
      } catch(error){
        console.log("Error saving the note", error);
        toast.error("Failed to update note");
      }finally{
        setSaving(false);
      }
  }



  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try{
        const res = await api.get(`/notes/${id}`);
        console.log(res.data);
        setNote(res.data.data);
      }catch(error){
        console.log("Error fetching note details:", error);
          if(error.response?.status === 429) {
            setIsRateLimited(true);
          }else{
            toast.error("Failed to load notes");
          } 
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]) // Whenever the id changes, we want to fetch the new note details
  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    )
  }

  return (
    
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className='size-5'/>
              Back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
                <TrashIcon className="h-5 w-5"/>
                Delete Note
            </button>
            </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
                 <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                    <div className='form-control mb-4'>
                      <label className="label">
                        <span className='label-text'>Title</span>
                      </label>
                      <input type='text' 
                      placeholder='Note Title'
                      className='input input-bordered'
                      value={note.title}
                      onChange={(e) => setNote({...note, title: e.target.value})}
                       />
                       </div>

                       <div className='form-control mb-4'>
                      <label className="label">
                       <span className='label-text'>Content</span>
                      </label>
                      <textarea 
                      placeholder='Write your note here...'
                      className='textarea textarea-bordered h-32'
                      value={note.content}
                      onChange={(e) => setNote({...note, content: e.target.value})}
                       />
                      </div>
            
                    <div className='card-actions justify-end'>
                        <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                             {saving? "Saving..." : "Save Changes"}
                        </button>
                    </div>


            </div>
          </div>
        </div>
      </div>
        
    </div>
  )

}

export default NoteDetailPage
