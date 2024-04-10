import { useState, useEffect } from 'react';
import { requestMovies, requestMoviesByQuery } from '../services/api';

import { useSearchParams } from 'react-router-dom';

export const useMoviesSearch = ({ isSearchPage = false }) => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  useEffect(() => {
    if (isSearchPage) return;
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await requestMovies();
        setMovies(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [isSearchPage]);

  useEffect(() => {
    if (!query) return;
    async function fetchMoviesByQuery() {
      try {
        setLoading(true);
        const data = await requestMoviesByQuery(query);
        setMovies(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesByQuery();
  }, [query]);

  const handleSearch = searchTerm => {
    setSearchParams({ query: searchTerm });
    setMovies([]);
  };

  return { movies, loading, isError, handleSearch };
};
