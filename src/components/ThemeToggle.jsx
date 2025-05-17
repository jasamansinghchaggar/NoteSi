import { useTheme } from '../context/ThemeContext';
import { HiMoon, HiSun } from 'react-icons/hi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button 
        onClick={toggleTheme}
        className="theme-toggle-button"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <HiMoon /> : <HiSun />}
      </button>
    </div>
  );
};

export default ThemeToggle;
