import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movies, setMovies }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } = useParams();
  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const routeToEditForm = e => {
    e.preventDefault();
    push(`/movies/${movie.id}/edit`);
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {

    console.log(movies)
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res)
        const updatedMoviesArr = movies.filter(el => el.id !== res.data);
        setMovies(updatedMoviesArr);
        push('/');
      })
      .catch(err => console.log('Error deleting movie', err))
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button className='edit-button' onClick={routeToEditForm}>
        Edit
      </button>
      <button className='delete-button' onClick={deleteMovie} >Delete</button>
    </div>
  );
}

export default Movie;
