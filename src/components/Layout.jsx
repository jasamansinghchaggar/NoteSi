import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FiFileText, FiPlus } from 'react-icons/fi';

const Layout = ({ children }) => {

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="logo">
            <FiFileText /> NoteSi
          </Link>
          <nav className="navigation">
            <Link to="/new" className="new-note-button">
              <FiPlus /> New Note
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      
      <main className="app-main">
        {children}
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 Notes App - Created by Me</p>
      </footer>
    </div>
  );
};

export default Layout;
