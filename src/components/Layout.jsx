import Nav from './Nav';
import { usesSampleCatalog } from '../services/movieApi';

export default function Layout({ children, query, onSearch }) {
  return (
    <div className="site">
      <div className="film-background" aria-hidden="true">
        <span />
        <span />
      </div>
      <Nav query={query} onSearch={onSearch} />
      <main className="page">{children}</main>
      <footer className="footer">
        {usesSampleCatalog ? 'Simplified Flix · Sample catalog' : 'Simplified Flix · Movie data from OMDb'}
      </footer>
    </div>
  );
}
