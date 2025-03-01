import React from "react";
import Carousel from "../components/carousel";
import Trending from "./Trending";
import { padding } from "@mui/system";
import { Link } from 'react-router-dom';
import ImageGrid from '../components/imageGrid'
import arrow from "../assets/images/Arrow right-circle.png";
import { useState } from "react";
import AutocompleteSearchBar from "../components/SearchBar";


function Home({query ,setQuery}) {
  //const [query,setQuery]= useState("");

    return (
      <div className="home-box">
        <div className="page-content">
         
          <h1>Home</h1>          
        </div>
        
        <div className="foryou-box">
          {/* Carousel code from carousel.js */}
          <Carousel/>
          <div className="library-cards-subtitle">
            <div className="subtitle">
              <h1 style={{color:'white'}}>Books</h1>
              <h2 style={{margin:'24px',cursor:'pointer',color:'gray'}}><Link to="/books"id="grey-title" >See more <img src={arrow} style={{width:'15px',margin:'0px',cursor:'pointer'}} ></img></Link> </h2> {/* in line style meant to align the Home and See More */}
            </div>
            <div className="library-cards">
              <ImageGrid maxResults={4}></ImageGrid>
             
              
            </div>
          </div>
         
          
          
        </div>
      
      </div>

    );
  }
  
  export default Home;