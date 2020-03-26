import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';

const EditMovieForm = props => {
    console.log('movie form props:', props)
    const { id } = useParams();
    const { push } = useHistory();

    const [updatedMovie, setUpdatedMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const handleChanges = e => {
        e.persist();

        let value = e.target.value;

        if (e.target.name === "stars") {
            value = value.split(",")
            console.log(value);
        }

        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: value
        })
    }

    useEffect(() => {
        const movieToUpdate = props.movies.find(movie => `${movie.id}` === id);

        if (movieToUpdate) {
            setUpdatedMovie(movieToUpdate)
        }
    }, [props.movies, id])

    const handleSubmit = e => {
        e.preventDefault();
        Axios
            .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then(res => {
                const updatedMoviesArr = props.movies.map(movie => {
                    if (`${movie.id}` === id) {
                        return updatedMovie
                    } else {
                        return movie
                    }
                })
                props.setMovies(updatedMoviesArr);
                push(`/movies/${id}`);
            })
            .catch(err => console.log('Error updating movie', err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Movie</label>
                <input 
                    type="text"
                    name="title"
                    id="title"
                    value={updatedMovie.title}
                    onChange={handleChanges}
                />

                <label htmlFor="director">Director</label>
                <input 
                    type="text"
                    name="director"
                    id="director"
                    value={updatedMovie.director}
                    onChange={handleChanges}
                />

                <label htmlFor="metascore">Metascore</label>
                <input 
                    type="text"
                    name="metascore"
                    id="metascore"
                    value={updatedMovie.metascore}
                    onChange={handleChanges}
                />

                <label htmlFor="stars">Stars</label>
                <input 
                    type="text"
                    name="stars"
                    id="stars"
                    value={updatedMovie.stars}
                    onChange={handleChanges}
                />

                <button type="submit">Submit</button>
                <button onClick={() => push(`/movies/${id}`)} >Cancel</button>
            </form>
        </div>
    )
}

export default EditMovieForm;