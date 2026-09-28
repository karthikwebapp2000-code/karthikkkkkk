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

function GitHubLog() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCommits = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repository}/commits?per_page=5`);
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
          <h2 id="github-log-title">GitHub log</h2>
        </div>
        <a className="github-link" href={`https://github.com/${repository}`} target="_blank" rel="noreferrer">
          View repository <span aria-hidden="true">↗</span>
        </a>
      </div>

      {loading && <p className="log-message">Loading the latest commits…</p>}
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
          <p className="eyebrow">Hello, I’m</p>
          <h1>Karthik<span>.</span></h1>
          <p className="hero-copy">A developer building thoughtful digital experiences with TypeScript.</p>
          <a className="primary-button" href="#github-log">Explore my work <span aria-hidden="true">↓</span></a>
        </section>
        <GitHubLog />
      </main>
      <footer>© {new Date().getFullYear()} Karthik · Built with React and TypeScript</footer>
    </>
  );
}
