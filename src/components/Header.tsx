import { useEffect, useRef, useState } from 'react';
import './Header.css';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 80 || currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="header-content">
        <a className="name-title" href="#home">Karthik<span>.</span></a>
        <nav className="nav-menu" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#github-log">GitHub log</a>
        </nav>
      </div>
    </header>
  );
}
