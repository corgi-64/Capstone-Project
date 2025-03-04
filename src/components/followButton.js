import React from "react";
import Button from "@mui/material/Button";
import '../App.css'

function FollowButton(){
    return(
        <div className="edit-button-container">
            <div>
                <Button className="follow-button-contained">Follow</Button>
            </div>
        </div>
    );
}
export default FollowButton;