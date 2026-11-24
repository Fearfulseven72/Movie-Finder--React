import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { searchMovies } from './services/movieApi';

jest.mock('./services/movieApi', () => {
  const originalKey = process.env.REACT_APP_OMDB_API_KEY;
  delete process.env.REACT_APP_OMDB_API_KEY;
  const movieApi = jest.requireActual('./services/movieApi');
  if (originalKey !== undefined) process.env.REACT_APP_OMDB_API_KEY = originalKey;
  return { ...movieApi, searchMovies: jest.fn(movieApi.searchMovies) };
});
beforeEach(() => {
  searchMovies.mockImplementation(jest.requireActual('./services/movieApi').searchMovies);
  window.history.replaceState(null, '', '/');
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => jest.restoreAllMocks());

test('sorts the results and preserves the selected sort when returning from a movie', async () => {
  render(<App />);
  const movieTitle = 'The Fast and the Furious';
  const results = screen.getByRole('region', { name: 'Movie results' });
  expect(await within(results).findByRole('heading', { name: movieTitle })).toBeVisible();

  fireEvent.change(screen.getByRole('combobox', { name: /sort/i }), { target: { value: 'oldest' } });
  expect(within(results).getAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Fast Times at Ridgemont High');

  fireEvent.click(within(results).getByRole('heading', { name: movieTitle }).closest('a'));
  expect(await screen.findByRole('heading', { name: movieTitle })).toBeVisible();
  expect(screen.getByText('Vin Diesel, Paul Walker, Michelle Rodriguez')).toBeVisible();

  fireEvent.click(screen.getByRole('link', { name: /back/i }));
  expect(await screen.findByRole('heading', { name: 'Showing: fast' })).toBeVisible();
  expect(screen.getByRole('combobox', { name: /sort/i })).toHaveValue('oldest');

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'tokyo' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit search' }));
  expect(await screen.findByRole('heading', { name: /tokyo drift/i })).toBeVisible();
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
});

test('resubmits the same search after a network error', async () => {
  searchMovies.mockRejectedValueOnce(new TypeError('Failed to fetch'));
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not reach OMDb');

  fireEvent.click(screen.getByRole('button', { name: 'Submit search' }));
  expect(await screen.findByRole('heading', { name: 'The Fast and the Furious' })).toBeVisible();
});
