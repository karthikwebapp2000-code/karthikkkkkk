import { useEffect, useState } from 'react';
import Header from './components/Header';
import './App.css';

type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name: string; date: string } | null;
  };
};

const repository = 'karthikwebapp2000-code/karthikwebapp';

function ProfileSection() {
  return (
    <section className="profile-section" id="profile">
      <div className="profile-container">
        <div className="profile-image-wrapper">
          <div className="oil-tank-container">
            {/* SVG Refinery Tank Visualization */}
            <svg viewBox="0 0 200 400" className="refinery-tank">
              {/* Tank body */}
              <defs>
                <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#c0c0c0', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#e8e8e8', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#a0a0a0', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffa500', stopOpacity: 0.9 }} />
                  <stop offset="100%" style={{ stopColor: '#ff6b00', stopOpacity: 0.8 }} />
                </linearGradient>
              </defs>
              
              {/* Main cylinder */}
              <rect x="40" y="60" width="120" height="280" fill="url(#metalGradient)" stroke="#666" strokeWidth="2" rx="4" />
              
              {/* Liquid levels */}
              <rect x="50" y="280" width="100" height="50" fill="url(#liquidGradient)" opacity="0.8" />
              <rect x="50" y="200" width="100" height="70" fill="#d97700" opacity="0.6" />
              <rect x="50" y="120" width="100" height="70" fill="#b85c00" opacity="0.4" />
              
              {/* Measurement lines */}
              {[80, 120, 160, 200, 240, 280, 320].map((y, i) => (
                <g key={i}>
                  <line x1="35" y1={y} x2="40" y2={y} stroke="#999" strokeWidth="2" />
                  <line x1="160" y1={y} x2="165" y2={y} stroke="#999" strokeWidth="2" />
                  <text x="25" y={y + 4} fontSize="10" fill="#aaa">{9 - i}</text>
                </g>
              ))}
              
              {/* Pipes */}
              <circle cx="30" cy="180" r="6" fill="#888" />
              <rect x="24" y="175" width="20" height="10" fill="#888" />
              <circle cx="30" cy="240" r="6" fill="#888" />
              <rect x="24" y="235" width="20" height="10" fill="#888" />
              
              {/* Top cap */}
              <ellipse cx="100" cy="60" rx="60" ry="12" fill="#a8a8a8" stroke="#666" strokeWidth="2" />
              <path d="M 100 50 Q 105 40 100 35 Q 95 40 100 50" fill="#b8b8b8" stroke="#666" strokeWidth="1" />
            </svg>
          </div>
        </div>
        <div className="profile-content">
          <h2>Karthik<span>.</span></h2>
          <p className="profile-role">Full Stack Developer</p>
          <p className="profile-bio">Building robust digital solutions with TypeScript, React, and modern web technologies. Passionate about clean code and performance optimization.</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">5+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-value">100%</span>
              <span className="stat-label">Dedicated</span>
            </div>
            <div className="stat">
              <span className="stat-value">∞</span>
              <span className="stat-label">Learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GitHubLog() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCommits = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repository}/commits?per_page=10`);
        if (!response.ok) throw new Error('GitHub activity could not be loaded.');
        setCommits(await response.json());
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load GitHub activity.');
      } finally {
        setLoading(false);
      }
    };

    loadCommits();
  }, []);

  return (
    <section className="github-log" id="github-log" aria-labelledby="github-log-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Open source activity</p>
          <h2 id="github-log-title">GitHub Commits</h2>
        </div>
        <a className="github-link" href={`https://github.com/${repository}`} target="_blank" rel="noreferrer">
          View repository <span aria-hidden="true">↗</span>
        </a>
      </div>

      {loading && <p className="log-message loading">Loading the latest commits…</p>}
      {error && <p className="log-message error">{error}</p>}
      {!loading && !error && commits.length === 0 && <p className="log-message">No commits found yet.</p>}
      {!loading && !error && commits.length > 0 && (
        <div className="commit-list">
          {commits.map((item) => (
            <a className="commit-item" href={item.html_url} key={item.sha} target="_blank" rel="noreferrer">
              <span className="commit-dot" aria-hidden="true" />
              <span className="commit-details">
                <strong>{item.commit.message.split('\n')[0]}</strong>
                <span>{item.commit.author?.name ?? 'Unknown author'} · {item.commit.author?.date ? new Date(item.commit.author.date).toLocaleDateString() : 'recently'}</span>
              </span>
              <span className="commit-sha">{item.sha.slice(0, 7)} ↗</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home">
          <p className="eyebrow">Hello, I'm</p>
          <h1>Karthik<span>.</span></h1>
          <p className="hero-copy">Full Stack Developer crafting performant web applications with modern technologies.</p>
          <a className="primary-button" href="#github-log">Explore my work <span aria-hidden="true">↓</span></a>
        </section>
        <ProfileSection />
        <GitHubLog />
      </main>
      <footer>© {new Date().getFullYear()} Karthik · Built with React and TypeScript</footer>
    </>
  );
}
