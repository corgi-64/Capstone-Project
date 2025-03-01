import React from "react";
import Button from "../components/button"
import ImageGrid from '../components/imageGrid'
function Books() {
    return (
      <div className="page-content">
        <h1>Books Page</h1>
        <ImageGrid maxResults={20}></ImageGrid>
        
      </div>
    );
  }
  
  export default Books;