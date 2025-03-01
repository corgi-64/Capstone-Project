{/*this can be deleted it exists for reference purposes */}
import React , {useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// Import images
import img1 from "../assets/test_book_images/alena.jpg";
import img2 from "../assets/test_book_images/dead_astronauts.jpg";
import img3 from "../assets/test_book_images/Fallingman.jpg";
import img4 from "../assets/test_book_images/leviathan.jpg";
import img5 from "../assets/test_book_images/love_sad.jpg";

// Styled component for transparent background
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  outline: 'none',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=new+releases&maxResults=10'; // Sample query for new releases




// Array of book objects with images and genres
/*const books = [
  { image: img1, genres: ["Romance", "Drama"] },
  { image: img2, genres: ["Action", "Adventure"] },
  { image: img3, genres: ["Fantasy", "Mystery", "Thriller"] },
  { image: img4, genres: ["Sci-Fi", "Dystopian"] },
  { image: img5, genres: ["Horror", "Supernatural"] },
  { image: img1, genres: ["Comedy", "Action"] },
  { image: img2, genres: ["Historical", "Biography"] },
  { image: img3, genres: ["Romance", "Fantasy"] },
  { image: img4, genres: ["Sci-Fi", "Action"] },
  { image: img5, genres: ["Mystery", "Adventure"] },

];
*/

export default function BasicGrid() {
  const [books,setBooks] = useState([]);

  useEffect(()=>{
 const fetchBooks= async()=>{
  try {
    const response=await fetch(API_URL);
    const data= await response.json();
    setBooks(data.items);
  } catch(error){
    console.log("error fetching books:",error)
  }
 };
 fetchBooks();
  },[]);



  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {books.map((book, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Item>
              <Card sx={{ width: 300, backgroundColor: 'transparent',boxShadow: 'none',outline: 'none',}}>
                <CardMedia component="img" height="300" image={book.image} alt={`Book ${index + 1}`} sx={{objectFit:'contain',width:'100%'}} />
                <CardContent>
                  <Box sx={{display:'flex',gap:'15px', marginLeft:'33px'}} >
                  {/* Display genres */}
                  {book.genres.map((genre, i) => (
                    <Typography key={i} variant="body2" color="text.secondary" 
                        sx={{display:'flex',flexDirection:'column',
                              color:'#f5f5f5',backgroundColor:'#3e3e3e',
                              borderRadius:'5px',
                             
                              }}>
                      {genre}
                    </Typography>
                  ))}
                  </Box>
                </CardContent>
              </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
