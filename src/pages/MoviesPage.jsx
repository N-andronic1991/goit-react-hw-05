import Loader from '../components/loader/Loader';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import MovieList from '../components/movieList/MovieList';
import SearchBar from '../components/searchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import { useMoviesSearch } from '../hooks/useMoviesSearch';

const MoviesPage = () => {
  const { movies, loading, isError, handleSearch } = useMoviesSearch({
    isSearchPage: true,
  });
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Toaster
        position="top-center"
        toastOptions={{
          className: '',
          duration: 2000,
          style: {
            background: 'green',
            color: '#fff',
          },
        }}
      />
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      {movies && <MovieList movies={movies} />}
    </div>
  );
};
export default MoviesPage;
