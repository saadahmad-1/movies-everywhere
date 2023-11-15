import React from 'react';
import {useState, useEffect} from 'react'
import MovieCard from './MovieCard'

import './App.css';
import searchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=d520ae72';

const App = () => {
    
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) =>{
        const response = await(fetch(`${API_URL}&s=${title}`));
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() =>{
        searchMovies();
    }, []);
    return (
        <div className="app">
            <div className="app">
                <h1>MoviesEverywhere</h1>
            </div>
            <div className='search'>
                <input
                    placeHolder = "Search for movies here "
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src = {searchIcon}
                    alt = "search"
                    onClick = {() => searchMovies(searchTerm)}
                />    
            </div>
            {movies.length
                ? (
                    <div className="container">
                        {movies.map((movie) =>(
                            <MovieCard movie={movie}/>
                        ) )}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;
