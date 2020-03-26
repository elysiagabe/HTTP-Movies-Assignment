import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddMovieForm = ({ setMovies }) => {
    const { push } = useHistory();
    const [newMovie, setNewMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const handleChanges = e => {
        let value = e.target.value;
        if (e.target.name === "stars") {
            value = value.split(",")
        }
        setNewMovie({
            ...newMovie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then(res => {
                console.log('Success adding new movie!', res)
                setMovies(res.data);
                push('/')
            })
            .catch(err => console.log('Error adding new movie: ', err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Movie</label>
            <input 
                type="text"
                name="title"
                id="title"
                value={newMovie.title}
                onChange={handleChanges}
            />

            <label htmlFor="director">Director</label>
            <input 
                type="text"
                name="director"
                id="director"
                value={newMovie.director}
                onChange={handleChanges}
            />

            <label htmlFor="metascore">Metascore</label>
            <input 
                type="text"
                name="metascore"
                id="metascore"
                value={newMovie.metascore}
                onChange={handleChanges}
            />

            <label htmlFor="stars">Stars</label>
            <input 
                type="text"
                name="stars"
                id="stars"
                placeholder="Separate actors' names with commas"
                value={newMovie.stars}
                onChange={handleChanges}
            />

            <button type="submit">Submit</button>
            <button onClick={() => push('/')}>Cancel</button>
        </form>
    )
}

export default AddMovieForm;