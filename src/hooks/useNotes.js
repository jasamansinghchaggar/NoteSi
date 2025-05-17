import usePersistedState from './usePersistedState';

const useNotes = () => {
  const [notes, setNotes] = usePersistedState('notes', []);

  // Add a new note
  const addNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    return newNote;
  };

  // Edit an existing note
  const editNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id
        ? { ...updatedNote, timestamp: new Date().toISOString() }
        : note
    );
    setNotes(updatedNotes);
    return updatedNote;
  };

  // Delete a note
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  // Get all unique tags from notes
  const getAllTags = () => {
    const tagsSet = new Set();
    
    notes.forEach(note => {
      if (note.tags && Array.isArray(note.tags)) {
        note.tags.forEach(tag => tagsSet.add(tag));
      } else if (note.tag) {
        // Handle single tag case
        tagsSet.add(note.tag);
      }
    });
    
    return Array.from(tagsSet);
  };

  return {
    notes,
    addNote,
    editNote,
    deleteNote,
    getAllTags
  };
};

export default useNotes;
