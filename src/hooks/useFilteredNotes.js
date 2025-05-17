import { useMemo } from 'react';

const useFilteredNotes = (notes, tag, searchTerm = '') => {
  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    
    return notes.filter(note => {
      const matchesTag = !tag || 
        (note.tags && Array.isArray(note.tags) && note.tags.includes(tag)) ||
        (note.tag === tag);
      
      const matchesSearch = !searchTerm || 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTag && matchesSearch;
    });
  }, [notes, tag, searchTerm]);

  return filteredNotes;
};

export default useFilteredNotes;
