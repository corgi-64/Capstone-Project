const { default: axios } = require('axios');
const { getMovies } = require('./movies');
const { getGenreList } = require('./movies');
const { getMovieByGenre } = require('./movies');
const { getMovieDetails } = require('./movies');

async function main() {
    
    console.log("Getting Movies...");
    const movies = await getMovies();
    console.log(movies)
    
    // Extract movie titles from the movie objects
    const movieTitles = movies.map(movie => movie.title);
    const movieDescriptions = movies.map(movie => movie.description);
    const moviePosters = movies.map(movie => movie.poster);

    console.log(movieTitles);
    console.log(movieDescriptions);
    console.log(moviePosters);

    console.log("Getting genre list...");
    const genreList = await getGenreList();
    console.log('Genre List:',genreList);

    console.log("Getting movies by genre...");
    const moviesByGenre = await getMovieByGenre(27); // requires ID input
    console.log(moviesByGenre);

    console.log("Getting movie details...");
    const movieDetails = await getMovieDetails(550); // requires ID input
    console.log(movieDetails);

}

main();
