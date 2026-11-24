import { useState } from 'react';

export default function Nav({ query, onSearch }) {
  return (
    <header className="site-header">
      <nav aria-label="Movie search">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">✦</span>
          <span><strong>Simplified</strong> Flix</span>
        </div>
        <SearchForm key={query} query={query} onSearch={onSearch} />
      </nav>
    </header>
  );
}

function SearchForm({ query, onSearch }) {
  const [draft, setDraft] = useState(query);

  function handleSubmit(event) {
    event.preventDefault();
    const title = draft.trim();
    if (title) onSearch(title);
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <input type="search" aria-label="Search movies" placeholder="Search movies" value={draft}
        onChange={(event) => setDraft(event.target.value)} required />
      <button type="submit" aria-label="Submit search"><span className="search-icon" aria-hidden="true" /></button>
    </form>
  );
}
