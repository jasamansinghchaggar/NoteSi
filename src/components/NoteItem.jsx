import { useState } from 'react';
import { FiEdit, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { getTagColor } from '../utils/colorUtils';

const NoteItem = ({ note, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format the date - assuming note.timestamp is a Date or timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // For fake error testing (commented out)
  // if (note.title === 'Error Test') {
  //   throw new Error('This is a test error for ErrorBoundary');
  // }

  return (
    <div className="note-item">
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button 
            className="edit-button"
            onClick={() => onEdit(note)}
            title="Edit note"
          >
            <FiEdit />
          </button>
          <button 
            className="delete-button"
            onClick={() => onDelete(note.id)}
            title="Delete note"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      
      <div className="note-content" onClick={() => setIsExpanded(!isExpanded)}>
        <p>{isExpanded ? note.content : truncateContent(note.content)}</p>
        {note.content.length > 100 && (
          <button className="expand-button">
            {isExpanded ? (
              <>
                <FiChevronUp /> Show less
              </>
            ) : (
              <>
                <FiChevronDown /> Show more
              </>
            )}
          </button>
        )}
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag, index) => (
            <a 
              key={index} 
              href={`/tag/${tag}`}
              className="note-tag"
              style={{ backgroundColor: getTagColor(tag) }}
              onClick={(e) => {
                // If there's a tag click handler provided, use it instead of default navigation
                if (window.onTagClick) {
                  e.preventDefault();
                  window.onTagClick(tag);
                }
              }}
            >
              #{tag}
            </a>
          ))}
        </div>
      )}
      
      <div className="note-footer">
        <span className="timestamp">{formatDate(note.timestamp)}</span>
      </div>
    </div>
  );
};

export default NoteItem;
