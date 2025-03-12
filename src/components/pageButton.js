import React, { act } from "react";
import Button from "@mui/material/Button";
import {useState} from 'react';
import '../App.css'
import { userActivity } from "./userActivityData";

export default function PageButton(){
    const [index, setIndex] = useState(0);

    function handleClick(){
        setIndex(index + 1);
    }
    let activity = userActivity[index];

    

    return (
        <div>
        <div className="user-activity">
            <div className="user-activity-date"> {activity.date} </div>
            <div className="user-activity-icon">
                <img src="https://avatars.githubusercontent.com/u/19550456" height={50} width={50} style={{borderRadius: "50%",}}/>
            </div>
            <div className="user-activity-name">
                <p>Bharat</p>
            </div>
            <div className="user-activity-log">
                <p>started watching <i>{activity.movie}</i></p>
            </div>
        </div>
        <div className="page-button-container">
        <div className="page-counter">
            <div>
                <Button className="page-button-outline">1</Button>
                <Button className="page-button-outline">2</Button>
            </div>
        </div>
    </div>
    </div>
    );
}