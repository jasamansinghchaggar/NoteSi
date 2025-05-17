import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { useNotesContext } from '../context/NotesContext';

const NoteFormPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, addNote, editNote } = useNotesContext();
  
  // If editing, fetch the note by id from context
  useEffect(() => {
    if (id) {
      const foundNote = notes.find(n => n.id === id);
      
      if (foundNote) {
        setNote(foundNote);
      } else {
        // Handle not found
        console.error('Note not found');
        // Redirect back to home if note doesn't exist
        navigate('/');
      }
    }
    setLoading(false);
  }, [id, notes, navigate]);

  const handleSaveNote = (savedNote) => {
    if (id) {
      // Update existing note
      editNote(savedNote);
    } else {
      // Add new note
      addNote(savedNote);
    }
    
    // Navigate back to home
    navigate('/');
  };

  if (loading && id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="note-form-page" style={{ width: '100%', maxWidth: '100%' }}>
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Back to Notes
      </button>
      <NoteForm onSave={handleSaveNote} initialNote={note} />
    </div>
  );
};

export default NoteFormPage;
