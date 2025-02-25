import React from "react";
import Carousel from "../components/carousel";
import Trending from "./Trending";
import Card from '../components/Card'
function Home() {
    return (
      <div className="home-box">
        <div className="page-content">
         
          <h1>Home</h1>          
        </div>
        
        <div className="foryou-box">
          {/* Carousel code from carousel.js */}
          <Carousel/>
          <div className="library-cards">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            
          </div>
          
          
        </div>
      
      </div>

    );
  }
  
  export default Home;