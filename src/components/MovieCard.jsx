import { useState } from 'react';

export function MoviePoster({ movie, eager = false }) {
  const [failedPoster, setFailedPoster] = useState(null);

  if (!movie.Poster || movie.Poster === 'N/A' || failedPoster === movie.Poster) {
    return (
      <div className="poster poster-placeholder">
        Poster unavailable
      </div>
    );
  }

  return (
    <img
      className="poster"
      src={movie.Poster}
      alt={movie.Title + ' poster'}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailedPoster(movie.Poster)}
    />
  );
}

export default function MovieCard({ movie, link }) {
  return (
    <article className="movie-card">
      <a {...link}>
        <MoviePoster movie={movie} />
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </a>
    </article>
  );
}
