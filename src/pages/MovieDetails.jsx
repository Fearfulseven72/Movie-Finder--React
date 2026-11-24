import { MoviePoster } from '../components/MovieCard';
import { getMovie, useMovieRequest } from '../services/movieApi';

const detailFields = ['Genre', 'Writer', 'Actors', 'Plot', 'Language', 'Awards'];

function displayValue(value) {
  return value && value !== 'N/A' ? value : 'Unavailable';
}

export default function MovieDetails({ movieId, backLink }) {
  const { data: movie, error, loading } = useMovieRequest(getMovie, movieId);
  const rating = displayValue(movie?.imdbRating);

  return (
    <section className="detail-panel" aria-label="Movie details">
      <a className="back-link" {...backLink}>← Back</a>
      {loading ? <p role="status">Loading movie details…</p> : error ? (
        <p role="alert">{error}</p>
      ) : movie && (
        <div className="detail-grid">
          <div className="detail-summary">
            <MoviePoster movie={movie} eager />
            <h1>{movie.Title}</h1>
            <p>Year: {displayValue(movie.Year)}</p>
            <p>Rating: {rating === 'Unavailable' ? rating : rating + '/10'}</p>
            <p>Released: {displayValue(movie.Released)}</p>
          </div>
          <dl className="detail-fields">
            {detailFields.map((field) => (
              <div key={field}><dt>{field}</dt><dd>{displayValue(movie[field])}</dd></div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
