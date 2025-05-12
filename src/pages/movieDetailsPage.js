import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import genres from "../movieGenres";
import { Box, Container, ButtonGroup, Card, CardMedia, Typography, Button, Rating } from '@mui/material';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieResponse = await axios.get(`http://localhost:5002/movie/${id}`);
                const creditsResponse = await axios.get(`http://localhost:5002/movie/${id}/credits`);
                setMovie(movieResponse.data);
                setCredits(creditsResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error(`Error fetching details for movie ID ${id}:`, error);
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleWantToWatch = async () => {
        const userId = localStorage.getItem("userId"); // assuming it's stored in localStorage
        const movieData = {
          title: movie.title,
          genre: movie.genre_ids?.map(id => genres.find(g => g.id === id)?.name).join(", "),
          description: movie.overview,
          userId,
          thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          id: movie.id || id // fallback to URL param
        };
      
        try {
          const response = await fetch("http://localhost:3003/want-to-watch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
          });
      
          if (response.ok) {
            console.log(movieData.id,"this is frontend ID")

            console.log("Movie added to your Want To Watch list!");
          } else {
            console.error("Failed to add movie.");
          }
        } catch (error) {
          console.error("Error adding movie:", error);
        }
      };
      


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!movie) {
        return <p>Movie not found</p>;
    }

    return (
        
        <div style={{ color: "white",paddingTop:'25px',margin:'20px' }}>
            <h1>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "300px", borderRadius: "8px" }}
            />
            <ButtonGroup sx={{ mt: 2 }} >
            <Button variant="contained" color="primary" onClick={handleWantToWatch}>Want To Read </Button> 
            <a href={movie.infoLink} target="_blank" rel="noopener noreferrer">
              <Button variant="contained" color="primary">
                More Info
              </Button>
            </a>
          </ButtonGroup>

            {movie.tagline && <p style={{ fontStyle: "italic", opacity: 0.8 }}>{movie.tagline}</p>}
            <p><strong style={{color: "#905ca0"}}>Rating:</strong> {movie.vote_average} / 10</p>
            <p><strong style={{color: "#905ca0"}}>Genres:</strong> {movie.genre_ids ? movie.genre_ids.map((genreId) => genres.find((genre) => genre.id === genreId)?.name).join(", ") : "No genres available"}</p>
            <p><strong style={{color: "#905ca0"}}>Popularity:</strong> {movie.popularity}</p>
            <p><strong style={{color: "#905ca0"}}>Release:</strong> {movie.release_date}</p>
            <p><strong style={{color: "#905ca0"}}>Runtime:</strong> {movie.runtime !== "N/A" ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"}</p>
            <p>{movie.overview}</p>
            <p>
                <strong style={{ color: "#905ca0" }}>Credits:</strong>{" "}
                {credits?.cast?.map((member) => (
                    <span key={member.id}>
                        {member.name} ({member.original_name}) - {member.known_for_department} as {member.character}{", "}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default MovieDetailsPage;