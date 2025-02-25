import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AuthenticationContext from "./userIcon";
import '../App.css'

function CustomButtons(){
    return (
        <div className="buttons-container">
            <div className="right-buttons">
                <div>
                    <Link to="/signin">
                        <Button className="custom-contained">Sign In</Button>
                    </Link>

                    <Link to="/register">
                        <Button className="custom-outlined">Register</Button>
                    </Link>

                </div>
             
                
            </div>
            <AuthenticationContext></AuthenticationContext>

        </div>
    );
}
export default CustomButtons;