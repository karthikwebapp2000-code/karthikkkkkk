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

function Profile() {
  return (
    <section className="profile" id="profile" aria-labelledby="profile-title">
      <div className="profile-photo-frame">
        <img
          className="profile-photo"
          src="/portrait-sendhur-pandian-m.jpg"
          alt="Portrait of Sendhur Pandian M"
        />
      </div>
      <div className="profile-copy">
        <p className="eyebrow">About me</p>
        <h2 id="profile-title">Sendhur Pandian M<span>.</span></h2>
        <p>Full-stack developer building modern, reliable web experiences with TypeScript and React.</p>
      </div>
    </section>
  );
}

function GitHubLog() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repository}/commits?per_page=5`)
      .then((response) => {
        if (!response.ok) throw new Error('GitHub activity could not be loaded.');
        return response.json();
      })
      .then(setCommits)
      .catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : 'Unable to load GitHub activity.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="github-log" id="github-log" aria-labelledby="github-log-title">
      <div className="section-heading">
        <div><p className="eyebrow">Open source activity</p><h2 id="github-log-title">GitHub log</h2></div>
        <a className="github-link" href={`https://github.com/${repository}`} target="_blank" rel="noreferrer">View repository ↗</a>
      </div>
      {loading && <p className="log-message">Loading the latest commits…</p>}
      {error && <p className="log-message error">{error}</p>}
      {!loading && !error && commits.length === 0 && <p className="log-message">No commits found yet.</p>}
      {!loading && !error && commits.length > 0 && (
        <div className="commit-list">
          {commits.map((item) => (
            <a className="commit-item" href={item.html_url} key={item.sha} target="_blank" rel="noreferrer">
              <span className="commit-dot" aria-hidden="true" />
              <span className="commit-details"><strong>{item.commit.message.split('\n')[0]}</strong><span>{item.commit.author?.name ?? 'Unknown author'} · {item.commit.author?.date ? new Date(item.commit.author.date).toLocaleDateString() : 'recently'}</span></span>
              <span className="commit-sha">{item.sha.slice(0, 7)} ↗</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default function App() {
  return <><Header /><main><section className="hero" id="home"><p className="eyebrow">Hello, I’m</p><h1>Karthik<span>.</span></h1><p className="hero-copy">Full-stack developer crafting performant web applications.</p><a className="primary-button" href="#profile">View my profile ↓</a></section><Profile /><GitHubLog /></main><footer>© {new Date().getFullYear()} Sendhur Pandian M · Built with React and TypeScript</footer></>;
}
