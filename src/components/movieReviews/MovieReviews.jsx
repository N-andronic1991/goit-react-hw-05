import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { getMovieReviews } from '../../services/api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    async function fetchMoviesCredits() {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setMovieReviews(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesCredits();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      {movieReviews && (
        <ul className={css.reviewsList}>
          {movieReviews.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <p className={css.authorName}>Author: {author}</p>
                <p className={css.text}> &#34;{content} &#34;</p>
              </li>
            );
          })}
        </ul>
      )}
      {movieReviews && movieReviews.length === 0 && (
        <p className={css.text}>We don&#39;t have any reviews yet. </p>
      )}
    </>
  );
};

export default MovieReviews;
