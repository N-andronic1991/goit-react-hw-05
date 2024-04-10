import { useMoviesSearch } from '../../hooks/useMoviesSearch';
import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import MovieList from '../../components/movieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const { movies, loading, isError } = useMoviesSearch({
    isSearchPage: false,
  });
  return (
    <div>
      <h1 className={css.title}>Trending today</h1>

      {loading && <Loader />}
      {isError && <ErrorMessage />}
      {movies && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
