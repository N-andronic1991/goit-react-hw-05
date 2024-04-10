import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { getMovieCredits } from '../../services/api';
import css from './MovieCast.module.css';

const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieCast = () => {
  const [movieCasts, setMovieCasts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    async function fetchMoviesCredits() {
      try {
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setMovieCasts(data.cast);
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
      {movieCasts && (
        <ul className={css.castList}>
          {movieCasts.map(({ cast_id, profile_path, name, character }) => {
            return (
              <li className={css.castItem} key={cast_id}>
                <div className={css.castImgThumb}>
                  <img
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                        : defaultImg
                    }
                    alt={`Photo of ${name}`}
                    size={250}
                  />
                </div>
                <div className={css.castContent}>
                  <p className={css.actorName}>{name}</p>
                  {character && <p>Character: {character}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
