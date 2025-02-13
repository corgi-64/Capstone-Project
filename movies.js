/*
https://www.themoviedb.org/
tmdb api tutorial: https://www.youtube.com/watch?v=FlFyrOEz2S4

https://developer.themoviedb.org/reference/genre-movie-list -- list of all movie genres in tmdb
https://developer.themoviedb.org/reference/discover-movie -- movie search by genre (int tag)
https://developer.themoviedb.org/reference/movie-details -- top level details of a movie
https://developer.themoviedb.org/reference/movie-credits -- shows list of actors/their characters
https://developer.themoviedb.org/reference/movie-keywords -- list of keywords associated with a movie
*/

const axios = require('axios');

const API_KEY = 'a33e6a08d85228db0d7f1c0ae4bbccc6';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// GET LIST OF GENRES. works
async function getGenreList() {
    try{
        const options = {
        method: 'GET', // data RETRIEVAL request
        url: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
        params:{
            api_key: API_KEY
        },
        headers: {
            accept: 'applications/json'
        }
        };

        const response = await axios.request(options);
        return response.data;
    }
    catch(error){
        console.error('Error getting genre list.',error);
    }
}
// END GET LIST OF GENRES

// GET MOVIES BY GENRE. works
async function getMovieByGenre(genreId){
    try{
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                sort_by: 'popularity.desc',
                with_genres: genreId,
                page: 1
            }
        });

        return response.data.results.map(movie => ({
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            overview: movie.overview
        }));
    }
    catch(error){
        console.error('Error getting movies by genre.',error);
    }
}
// END GET MOVIES BY GENRE

async function getMovieDetails(movieId){
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    try{
        const response = await axios.get(url);
        return response.data;
    }

    catch(error){
        console.error('Error getting movie details.'.error);
    }
}

// GET POPULAR MOVIES. works
async function getMovies() {
  try {
    const response = await axios.get(`${API_URL}/movie/popular`, {
            params: { api_key: API_KEY, language: 'en-US', page: 1 }
        });
        return response.data.results.map(movie =>({
            title: movie.title,
            poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
            description: movie.overview
        }));
  } 
  catch (error) {
    console.error('Error fetching movies:', error);
  }
}
// END GET POPULAR MOVIES

// EXPORT to import into main file
module.exports = { getMovies, getGenreList, getMovieByGenre, getMovieDetails };
// put modules into one {}, if more than one, only last one will be used
