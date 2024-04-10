import { requestMovieDetailsById } from '../../services/api';
import { formatDate } from '../../helpers/formatDate';
import { calculatePercentage } from '../../helpers/calculatePercentage';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useParams, Link, Route, Routes, useLocation } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/movieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/movieReviews/MovieReviews')
);

const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  useEffect(() => {
    if (!movieId) return;
    async function fetchMoviesDetails() {
      try {
        setLoading(true);
        const data = await requestMovieDetailsById(movieId);
        setMovieDetails(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesDetails();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      {movieDetails && (
        <div>
          <Link to={backLinkRef.current}>Go back</Link>
          <div className={css.detailsContainer}>
            <div className={css.posterThumb}>
              <img
                src={
                  movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                    : defaultImg
                }
                alt={movieDetails.title}
                size={150}
              />
            </div>
            <div>
              <h1 className={css.title}>
                {movieDetails.title} ({formatDate(movieDetails.release_date)})
              </h1>
              <p>
                User score: {calculatePercentage(movieDetails.vote_average)}
              </p>
              <h2 className={css.overview}>Overview</h2>
              <p className={css.text}> {movieDetails.overview}</p>
              <h3 className={css.genresHeading}>Genres</h3>
              <ul className={css.genresList}>
                {movieDetails.genres.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={css.additionalInf}>
            <p className={css.infoText}>Additional information</p>
            <ul className={css.infoList}>
              <li className={css.infoItem}>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="reviews" element={<MovieReviews />} />
              <Route path="cast" element={<MovieCast />} />
            </Routes>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
