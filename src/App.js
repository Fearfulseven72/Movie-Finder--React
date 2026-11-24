import { useEffect, useState } from 'react';
import Layout from './Layout';
import MovieDetails from './pages/MovieDetails';
import './App.css';
import Home from './pages/Home';

function readRoute() {
  const params = new URLSearchParams(window.location.search);
  return {
    query: params.get('q') ?? 'fast',
    sort: params.get('sort') || 'default',
    movieId: params.get('movie'),
  };
}

function App() {
  const [route, setRoute] = useState(readRoute);
  const [searchSubmission, setSearchSubmission] = useState(0);

  // The URL stores the search, sort, and selected movie so refresh and browser Back work.
  useEffect(() => {
    const restoreRoute = () => setRoute(readRoute());
    window.addEventListener('popstate', restoreRoute);
    return () => window.removeEventListener('popstate', restoreRoute);
  }, []);

  function routeLink(changes) {
    const next = { ...route, ...changes };
    const params = new URLSearchParams({ q: next.query });
    if (next.sort !== 'default') params.set('sort', next.sort);
    if (next.movieId) params.set('movie', next.movieId);

    const href = '?' + params.toString();
    return {
      href,
      onClick(event) {
        // Let the browser handle opening links in a new tab.
        if (event && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
        event?.preventDefault();
        if (window.location.search !== href) window.history.pushState(null, '', href);
        if (next.movieId !== route.movieId || next.query !== route.query) window.scrollTo(0, 0);
        setRoute(next);
      },
    };
  }

  function submitSearch(query) {
    routeLink({ query, movieId: null, sort: 'default' }).onClick();
    // Start a fresh request even when the user resubmits the same title after an error.
    setSearchSubmission((previous) => previous + 1);
  }

  return (
    <Layout query={route.query} onSearch={submitSearch}>
      {route.movieId ? (
        <MovieDetails movieId={route.movieId} backLink={routeLink({ movieId: null })} />
      ) : (
        <Home key={searchSubmission} query={route.query} sort={route.sort}
          onSort={(sort) => routeLink({ sort }).onClick()}
          movieLink={(movieId) => routeLink({ movieId })} />
      )}
    </Layout>
  );
}

export default App;
