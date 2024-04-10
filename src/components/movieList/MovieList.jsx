import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.moviesList}>
      {Array.isArray(movies) &&
        movies.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link state={location} to={`/movies/${id}`}>
                {title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
