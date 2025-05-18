import { useState, Fragment, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteItem from './NoteItem';
import useFilteredNotes from '../hooks/useFilteredNotes';
import { FiSearch, FiX, FiCommand } from 'react-icons/fi';
import { getTagColor } from '../utils/colorUtils';

const NoteList = ({ notes = [], tag = null, onDeleteNote, onEditNote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredNotes = useFilteredNotes(notes, tag, searchTerm);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // Handle tag click for filtering
  const handleTagClick = (tagName) => {
    navigate(`/tag/${tagName}`);
  };

  // Register global tag click handler for NoteItem
  window.onTagClick = handleTagClick;
  
  // Determine if user is on Mac
  const isMac = /Mac|iPhone|iPod|iPad/.test(navigator?.userAgent || '');
  
  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl+K or Cmd+K (metaKey for Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault(); // Prevent browser's default action
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Fragment>
      <div className="note-list">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input 
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            ref={searchInputRef}
          />
          <div className="search-shortcut">
            <kbd>{isMac ? <FiCommand /> : 'Ctrl'}+K</kbd>
          </div>
        </div>
        
        {tag && (
          <div className="active-tag">
            <h2>
              Notes tagged with: <span 
                className="tag-highlight" 
                style={{ backgroundColor: getTagColor(tag) }}
              >
                #{tag}
              </span>
            </h2>
            <button 
              onClick={() => navigate('/')} 
              className="clear-tag-button"
            >
              <FiX /> Clear Filter
            </button>
          </div>
        )}

        {filteredNotes.length === 0 ? (
          <div className="empty-notes">
            <p>
              No notes found. 
              {searchTerm 
                ? ' Try a different search term.' 
                : tag 
                  ? ' No notes with this tag.' 
                  : ' Create your first note!'
              }
            </p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map(note => (
              <NoteItem 
                key={note.id} 
                note={note}
                onDelete={onDeleteNote}
                onEdit={onEditNote}
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default NoteList;
