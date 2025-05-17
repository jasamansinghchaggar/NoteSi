import { useState, useEffect, useRef } from 'react';
import { getTagColor } from '../utils/colorUtils';

const NoteForm = ({ onSave, initialNote = null }) => {
  const [note, setNote] = useState({
    id: null,
    title: '',
    content: '',
    tags: [],
    timestamp: null
  });
  
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // If editing an existing note, populate the form
  useEffect(() => {
    if (initialNote) {
      setNote(initialNote);
    }
  }, [initialNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const currentTitle = titleRef.current.value;
    const currentContent = contentRef.current.value;
    
    if (!currentTitle.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!currentContent.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add tag to the note
  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !note.tags.includes(tagInput.trim())) {
      setNote(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // Remove tag from the note
  const handleRemoveTag = (tagToRemove) => {
    setNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle tag input keypress (add tag on Enter)
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Use refs to get the latest values
    const currentTitle = titleRef.current.value;
    const currentContent = contentRef.current.value;
    
    // Update note with latest values from refs
    const updatedNote = {
      ...note,
      title: currentTitle,
      content: currentContent
    };
    
    setNote(updatedNote);
    
    if (validate()) {
      const noteToSave = {
        ...updatedNote,
        id: note.id || Date.now().toString(),
        timestamp: note.timestamp || new Date().toISOString()
      };
      
      onSave(noteToSave);
      
      // Reset form if not editing
      if (!initialNote) {
        setNote({
          id: null,
          title: '',
          content: '',
          tags: [],
          timestamp: null
        });
        setTagInput('');
      }
    }
  };

  const isEditing = Boolean(initialNote);

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>{isEditing ? 'Edit Note' : 'Add New Note'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Note title"
          className={errors.title ? 'error' : ''}
          ref={titleRef}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Note content"
          rows={10}
          className={errors.content ? 'error' : ''}
          ref={contentRef}
        />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <div className="tag-input-container">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="Add tags and press Enter"
          />
          <button 
            type="button" 
            onClick={handleAddTag}
            className="add-tag-btn"
          >
            Add Tag
          </button>
        </div>
        <div className="tags-container">
          {note.tags && note.tags.map((tag, index) => (
            <span 
              key={index} 
              className="tag" 
              style={{ backgroundColor: getTagColor(tag) }}
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="remove-tag-btn"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="save-button">
          {isEditing ? 'Update Note' : 'Save Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
