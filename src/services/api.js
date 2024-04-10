import axios from 'axios';

const url =
  'https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjBmM2Y5M2M5ODEyZTdjMjExNzNiZTEwZTlmODczOSIsInN1YiI6IjY2MTE0NmJkMWYzMzE5MDE2M2MxYTg5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ASMQDnFMYv3c9UcNFOTsWZZA9pUZe7DkWT0-3uSYinU',
    accept: 'application / json',
  },
};

export const requestMovies = async () => {
  const { data } = await axios.get(url, options);
  return data;
};

export const requestMoviesByQuery = async (searchQuery = '') => {
  const urlByQuery = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
  const { data } = await axios.get(urlByQuery, options);
  return data;
};

export const requestMovieDetailsById = async (movieId = '') => {
  const urlById = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const { data } = await axios.get(urlById, options);
  return data;
};

export const getMovieCredits = async (movieId = '') => {
  const urlForCredits = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const { data } = await axios.get(urlForCredits, options);
  return data;
};

export const getMovieReviews = async (movieId = '') => {
  const urlForReviews = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  const { data } = await axios.get(urlForReviews, options);
  return data;
};
