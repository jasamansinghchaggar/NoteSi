import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { useNotesContext } from '../context/NotesContext';

const HomePage = () => {
  const { tagName } = useParams();
  const { notes, deleteNote } = useNotesContext();
  const navigate = useNavigate();
  
  // Create a welcome note if there are no notes
  useEffect(() => {
    if (notes.length === 0) {
      // The context will handle persisting this
      const welcomeNote = {
        id: '1',
        title: 'Welcome to Notes App',
        content: 'This is a sample note to get you started. You can edit or delete this note, or create new ones!',
        tags: ['welcome', 'getting-started'],
        timestamp: new Date().toISOString()
      };
      // No need to add here - the NotesContext will initialize with this if there are no saved notes
    }
  }, []);

  const handleDeleteNote = (id) => {
    deleteNote(id);
  };

  const handleEditNote = (note) => {
    navigate(`/edit/${note.id}`);
  };

  return (
    <div className="home-page">      
      {notes.length > 0 ? (
        <NoteList 
          notes={notes} 
          tag={tagName}
          onDeleteNote={handleDeleteNote}
          onEditNote={handleEditNote}
        />
      ) : (
        <div className="empty-state">
          <p>You don't have any notes yet. Create your first note to get started!</p>
          <button 
            className="create-first-note-btn"
            onClick={() => navigate('/new')}
          >
            Create First Note
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
