import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, ButtonGroup, Typography, Rating, Box, Container, Card, CardMedia } from "@mui/material";

function GameDetailsPage() {
  const { id } = useParams(); // Get the game ID from the URL
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ratingValue, setRatingValue] = useState(null); // Add state for rating

  const userId = localStorage.getItem('userId');  // Retrieve userId from localStorage

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/game-details/${id}`);
        setGameDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (isLoading) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  if (!gameDetails) {
    return <p style={{ color: "white" }}>Game details not found.</p>;
  }

  // Handle adding the game to "Want To Play" list (similar to the book "Want to Read")
  const handleWantToPlay = async () => {
    const gameData = {
      name: gameDetails.name,
      description: gameDetails.short_description,
      developer: gameDetails.developers?.join(", "),
      publisher: gameDetails.publishers?.join(", "),
      userId,
      thumbnail: gameDetails.header_image,
      id: gameDetails.id
    };

    try {
      const response = await fetch("http://localhost:3003/want-to-play", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (response.ok) {
        alert('Game added to your Want to Play list!');
      } else {
        console.error('Failed to add game.');
      }
    } catch (error) {
      console.log("Error adding game to Want To Play list:", error);
    }
  };

  // Handle rating change
  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
    // Optionally send the rating to an API for saving
    console.log("Rated:", newValue);
  };

  return (
    <Container sx={{ color: "white", padding: "20px" }}>
      {/* Display the header image */}
      {gameDetails.header_image && (
        <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
          <CardMedia
            component="img"
            alt={`${gameDetails.name} Header`}
            height="200"
            image={gameDetails.header_image}
            sx={{ objectFit: "cover", borderRadius: "8px" }}
          />
        </Card>
      )}

      <Typography variant="h4" sx={{ color: "#89CFF0", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
        {gameDetails.name}
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        <strong>Description:</strong> {gameDetails.short_description || "No description available."}
      </Typography>
      <Typography variant="body1">
        <strong>Developer:</strong> {gameDetails.developers?.join(", ") || "Unknown"}
      </Typography>
      <Typography variant="body1">
        <strong>Publisher:</strong> {gameDetails.publishers?.join(", ") || "Unknown"}
      </Typography>
      <Typography variant="body1">
        <strong>Price:</strong> {gameDetails.price_overview?.final_formatted || "Free or Unavailable"}
      </Typography>
      <Typography variant="body1">
        <strong>Genres:</strong> {gameDetails.genres?.map((g) => g.name).join(", ") || "Unknown"}
      </Typography>
      <Typography variant="body1">
        <strong>Supported Languages:</strong> {gameDetails.supported_languages?.join(", ") || "Unknown"}
      </Typography>
      <Typography variant="body1">
        <strong>Platforms:</strong>{" "}
        {gameDetails.platforms?.windows && "Windows "}
        {gameDetails.platforms?.mac && "Mac "}
        {gameDetails.platforms?.linux && "Linux "}
      </Typography>

      {/* Want to Play Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <Button variant="contained" color="primary" onClick={handleWantToPlay}>
          Want to Play
        </Button>
      </Box>

      {/* Rating System and Legend */}
      <Box sx={{ mt: 1, textAlign: "center" }}>
        {/* Display the Rating component first */}
        <Rating
          value={ratingValue}
          onChange={handleRatingChange}
          sx={{ mt: 1 }}
        />
        {/* Display the "Rate This Game" legend below */}
        <Typography sx={{ color: "white", mt: 0 }}>Rate This Game</Typography>
      </Box>
    </Container>
  );
}

export default GameDetailsPage;