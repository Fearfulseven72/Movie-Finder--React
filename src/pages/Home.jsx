import MovieCard from '../components/MovieCard';
import { searchMovies, useMovieRequest } from '../services/movieApi';

const sortMovies = {
  title: (first, second) => first.Title.localeCompare(second.Title),
  newest: (first, second) => parseInt(second.Year, 10) - parseInt(first.Year, 10),
  oldest: (first, second) => parseInt(first.Year, 10) - parseInt(second.Year, 10),
};

function Home({ query, sort, onSort, movieLink }) {
  const { data: movies, error, loading } = useMovieRequest(searchMovies, query);
  const compare = sortMovies[sort];

  const visibleMovies =
    movies &&
    typeof compare === 'function' &&
    Object.hasOwn(sortMovies, sort)
      ? [...movies].sort(compare)
      : movies;

  return (
    <section aria-label="Movie results">
      <div className="results-toolbar">
        <h1>{query ? 'Showing: ' + query : 'Search for a movie'}</h1>
        <label>
          Sort:
          <select value={sort} onChange={(event) => onSort(event.target.value)}>
            <option value="default">Default</option>
            <option value="title">Title A–Z</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div role="status" aria-label="Loading movies" className="movie-grid">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} aria-hidden="true">
              <div className="poster skeleton" />
              <div className="skeleton skeleton-title" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : visibleMovies?.length ? (
        <div className="movie-grid">
          {visibleMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              link={movieLink(movie.imdbID)}
            />
          ))}
        </div>
      ) : query ? <p role="status">No movies found. Try a different title.</p> : null}
    </section>
  );
}

export default Home;
