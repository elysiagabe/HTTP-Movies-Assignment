import React from 'react';

const EditMovieForm = () => {
    return (
        <div>
            <form>
                <label htmlFor="title">Movie</label>
                <input />

                <label htmlFor="director">Director</label>
                <input />

                <label htmlFor="metascore">Metascore</label>
                <input />

                <button type="submit">Edit</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}

export default EditMovieForm;