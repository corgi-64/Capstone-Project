import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import '../App.css'

function PageButton(){
    return (
        <div className="page-button-container">
            <div>
                <Button className="page-button-outline">1</Button>
                <Button className="page-button-outline">2</Button>
            </div>
        </div>
    );
}
export default PageButton;