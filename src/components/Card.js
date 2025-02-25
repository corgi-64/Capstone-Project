import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';


import img1 from "../assets/test_book_images/alena.jpg";
import img2 from "../assets/test_book_images/dead_astronauts.jpg";
import img3 from "../assets/test_book_images/Fallingman.jpg";
import img4 from "../assets/test_book_images/love_sad.jpg";


const images = [img1, img2, img3, img4];

export default function RecipeReviewCard() {
    const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <Card 
    sx={
        { width: 345,
        transition:'.3s', 
        '&:hover':{opacity:.8},cursor:'pointer',
        
        '&:active': {
            opacity: 0.7, // Darker effect on click
            transform: 'scale(0.98)', // Slightly shrink the card on click
          },

    }
    
    }>
     
      <CardMedia
        component="img"
        height="500"
        image={randomImage}  /*randomizes images altough this is bad fix */
        alt="Paella dish"
      />
      
    </Card>
  );
}