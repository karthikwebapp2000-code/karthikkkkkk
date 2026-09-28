import { useEffect, useRef, useState } from 'react';
import './Header.css';

export default function Header() {
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <a className="name-title" href="#home" aria-label="Karthik - Go to home">Karthik<span>.</span></a>
        <nav className={`nav-menu ${navHidden ? 'hidden' : 'visible'}`} aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#profile">About</a>
          <a href="#github-log">GitHub log</a>
        </nav>
      </div>
    </header>
  );
}
