import React from 'react';
import MovieCard from './MovieCard';
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?apikey=ccf66fb0&'
const movie1 = {
    "Title": "The Grand Budapest Hotel",
    "Year": "2014",
    "imdbID": "tt2278388",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(['']);



    // useEffect(() => {
    //     searchMovies('Batman');
    // }, []);
    useEffect(() => {
        fetchRandomMovies();
    }, []); // empty dependency array to run effect only once on initial render

    const fetchRandomMovies = async () => {
        try {
            // Generate a random search term or use predefined terms
            const randomSearchTerm = generateRandomSearchTerm();
            const response = await fetch(`${API_URL}&s=${randomSearchTerm}`);
            const data = await response.json();

            if (data.Search) {
                setMovies(data.Search);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const generateRandomSearchTerm = () => {
        // You can implement logic here to generate a random search term
        // For example, you can use a predefined list of search terms
        const searchTerms = ['Superman', 'Spiderman', 'Dune', 'Hotel', 'Fullmetal'];
        const randomIndex = Math.floor(Math.random() * searchTerms.length);
        return searchTerms[randomIndex];
    };

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };

    return (
        <div className='app'>
            <h1>TtchBest</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {
                            movies.map((movie) => (
                                <MovieCard movie={movie} />

                            ))
                        }
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}

        </div>
    );
}

export default App;