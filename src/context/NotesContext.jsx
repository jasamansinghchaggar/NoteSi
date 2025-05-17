import { createContext, useContext } from 'react';
import useNotes from '../hooks/useNotes';

// Create context
export const NotesContext = createContext();

// Create provider component
export const NotesProvider = ({ children }) => {
  const { notes, addNote, editNote, deleteNote, getAllTags } = useNotes();

  return (
    <NotesContext.Provider 
      value={{ 
        notes, 
        addNote, 
        editNote, 
        deleteNote,
        getAllTags
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

// Create custom hook to use context
export const useNotesContext = () => {
  const context = useContext(NotesContext);
  
  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  
  return context;
};

export default NotesProvider;
