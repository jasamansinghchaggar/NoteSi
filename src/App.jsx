import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NoteFormPage from './pages/NoteFormPage';
import { NotesProvider } from './context/NotesContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotesProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tag/:tagName" element={<HomePage />} />
                <Route path="/new" element={<NoteFormPage />} />
                <Route path="/edit/:id" element={<NoteFormPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </NotesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App
