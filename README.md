# Notes App

This is a React-based notes application built with Vite. The app allows users to create, read, update, and delete notes.

## Project Structure

```
/src
  /components
    NoteList.jsx - Component to display all notes with search and tag filtering
    NoteItem.jsx - Component for a single note display with tags
    NoteForm.jsx - Form component using useRef for adding/editing notes
    Layout.jsx - Main layout wrapper with header and footer
    ThemeToggle.jsx - Component to toggle between light and dark themes
    ErrorBoundary.jsx - Error boundary component for graceful error handling
  /hooks
    useNotes.js - Custom hook for notes operations (add, edit, delete)
    useFilteredNotes.js - Custom hook for filtering notes by tag and search
    usePersistedState.js - Custom hook for localStorage persistence
    useTheme.js - Custom hook for theme preferences
  /context
    NotesContext.jsx - Context provider for global notes state
    ThemeContext.jsx - Context provider for theme management
  /pages
    HomePage.jsx - Main page displaying all notes or filtered by tag
    NoteFormPage.jsx - Page for adding or editing notes with refs
  /utils - Utility functions and helpers
  App.jsx - Main application with routing and context provider
  App.css - Application styling with tag support
```

## Progress Log

### Step 1: Project Structure Setup - Completed ✅
- Created basic folder structure for organized code architecture
- Set up directories for components, hooks, context, pages, and utilities

### Step 2: Component Creation - Completed ✅
- Created NoteList.jsx for displaying all notes with search functionality
- Created NoteItem.jsx for individual note display with expand/collapse feature
- Created NoteForm.jsx for adding and editing notes with validation
- Updated App.jsx with routing and layout structure
- Created Layout component for consistent UI across pages
- Added HomePage and NoteFormPage for main application views
- Implemented basic styling with CSS

### Step 3: Routing Setup - Completed ✅
- Implemented route for homepage with all notes (/)
- Added route for tag filtering (/tag/:tagName)
- Created route for editing notes (/edit/:noteId)

### Step 4: Note State Management - Completed ✅
- Created useNotes.js hook to handle note operations
- Implemented add, edit, delete, and filter functionalities
- Added localStorage persistence with useEffect

### Step 5: Context API Implementation - Completed ✅
- Created NotesContext.jsx with provider
- Wrapped App with context provider
- Provided notes array and handler functions to components
- Added custom useNotesContext hook for easy access

### Step 6: Form Handling Enhancement - Completed ✅
- Updated NoteForm.jsx to use useRef for inputs
- Added tag support for notes
- Implemented conditional rendering for add/edit based on route
- Connected form submission to context functions

### Step 7: Note Listing Improvements - Completed ✅
- Enhanced NoteList.jsx to map notes with NoteItem
- Added tag display and filtering functionality
- Used Fragment for cleaner component structure
- Implemented tag click navigation

### Step 8: Tag Filtering - Completed ✅
- Added functionality to extract unique tags from notes
- Implemented tag click to navigate to filtered view
- Created filtered notes display based on URL tag parameter
- Added tag UI elements and styling

### Step 9: Conditional Rendering - Completed ✅
- Added empty state UI when no notes exist
- Implemented conditional message for search results
- Added conditional UI for tag filtering
- Created user-friendly empty states

### Step 10: Error Handling - Completed ✅
- Created ErrorBoundary.jsx component
- Wrapped major components to catch rendering issues
- Added fallback UI for error states
- Included test error trigger in NoteItem (commented)

### Step 11: Custom Hooks - Completed ✅
- Created useFilteredNotes to handle filtering logic
- Implemented usePersistedState for localStorage persistence
- Applied custom hooks throughout the application
- Improved code organization and reusability

### Step 12: Theme Toggle Implementation - Completed ✅
- Added dark/light theme toggle functionality
- Created ThemeContext for managing theme state
- Implemented system preference detection
- Updated CSS with theme-specific variables
- Added ThemeToggle component for user control

### Step 13: Keyboard Shortcuts - Completed ✅
- Added Ctrl+K / Cmd+K shortcut to focus search input
- Implemented visual keyboard shortcut indicator
- Enhanced search input with visual styling
- Added accessibility features for keyboard users

## Features

- Create, read, update, and delete notes
- Tag-based organization and filtering
- Full-text search across notes with keyboard shortcut (Ctrl+K / Cmd+K)
- Dark and light theme toggle with system preference detection
- Keyboard navigation and accessibility features
- Persistent storage using localStorage
- Responsive design for all screen sizes
- Error boundaries for improved stability
- Clean URL-based navigation

## Getting Started

To run this project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Future Enhancements

- Markdown support for note content
- Multiple note selection
- Drag and drop organization
- Theme customization options
- Export/import functionality
- Server synchronization