import React from "react";
import Button from "../components/button"
import ImageListComponent from '../components/imageGrid'
function Books() {
    return (
      <div className="page-content">
        <h1>Books Page</h1>
          <ImageListComponent /* react components start with upper case letter */ /> 
         
        <p>This is the books page!</p>
      </div>
    );
  }
  
  export default Books;