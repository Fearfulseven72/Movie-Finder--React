import { useEffect, useState } from 'react';
import { sampleDetails, sampleMovies } from '../data/sampleMovies';

const apiKey = process.env.REACT_APP_OMDB_API_KEY?.trim();
export const usesSampleCatalog = !apiKey;

async function requestMovieData(params, signal) {
  const url = new URL('https://www.omdbapi.com/');
  url.search = new URLSearchParams({ apikey: apiKey, ...params });
  const response = await fetch(url, { signal });
  if (response.status === 401) throw new Error('OMDb rejected the API key. Check your local configuration.');
  if (!response.ok) throw new Error('OMDb is temporarily unavailable. Please try again.');
  return response.json();
}

export async function searchMovies(query, signal) {
  if (!query) return [];
  if (usesSampleCatalog) {
    return sampleMovies.filter((movie) => movie.Title.toLowerCase().includes(query.toLowerCase()));
  }

  const result = await requestMovieData({ s: query, type: 'movie' }, signal);
  if (result.Error === 'Movie not found!') return [];
  if (result.Response === 'False') throw new Error(result.Error || 'Movie search failed.');
  return result.Search || [];
}

export async function getMovie(movieId, signal) {
  if (usesSampleCatalog) {
    const movie = sampleMovies.find((entry) => entry.imdbID === movieId);
    if (!movie) throw new Error('Movie not found in the sample catalog.');
    return { ...movie, ...sampleDetails[movieId] };
  }

  const result = await requestMovieData({ i: movieId, plot: 'full' }, signal);
  if (result.Response === 'False') throw new Error(result.Error || 'Movie details could not be loaded.');
  return result;
}

export function useMovieRequest(request, value) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    request(value, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setResult({ value, data });
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setResult({ value, error: error instanceof TypeError ? 'Could not reach OMDb. Check your connection and try again.' : error.message });
        }
      });

    return () => controller.abort();
  }, [request, value]);

  return result?.value === value ? result : { loading: true };
}
