import { useState, useEffect, createContext, useContext } from 'react';

// Create a Context for the theme
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};

// Provide the theme state and logic
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Load the theme from local storage or default to 'light'
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};