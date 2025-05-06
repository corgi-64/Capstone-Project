import React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../App.css'
import avatar from "../assets/images/user-avatar.png"
import { userActivity } from "./userActivityData";
import axios from "axios";

export default function PageButton(){
    /*const [index, setIndex] = useState(0);

    function handleNextClick(){
        if(index < (userActivity.length - 1)){
            setIndex(index + 1);
        }
        else{
            return(
                <div>
                <p>nothing to see here</p>
                </div>
            );
        }
    }
    function handleBackClick(){
        if(index > 0){
            setIndex(index - 1);
        }
    }
    const testActivity = userActivity;
    let activity = userActivity[index];*/
    const [userProfilePic, setProfilePic] = useState(localStorage.getItem('avatar'));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const alpaca = useParams().id

    useEffect(() => {
        async function grabUserName() {
          const res = await axios.get(`http://localhost:3003/user/username/${alpaca}`)
          console.log(res.data.data)
          if (res.status === 200) {
            setUsername(res.data.data)
          }
        }
    
        grabUserName()
      },[])

    useEffect(() => {
    async function fetchProfilePicture() {
      try {
        
        const pictureRes = await fetch(`http://localhost:3003/user/profile-picture/${alpaca}`); // updates bannere
        //console.log(bannerRes)
        if (pictureRes.ok) {
          const pictureData = await pictureRes.json();
  
          const base64Image = `data:${pictureData.contentType};base64,${pictureData.data}`;
          setProfilePic(base64Image);
          localStorage.setItem("avatar", base64Image);


          if (pictureData && pictureData.data && pictureData.contentType) {
            const base64Image = `data:${pictureData.contentType};base64,${pictureData.data}`;
            setProfilePic(base64Image);
            localStorage.setItem("avatar", base64Image);
         //   console.log(localStorage,"this is the storage!!1")
          } else {
            throw new Error("Invalid avatar data");
          }
        } else {
          throw new Error("Avatar not found");
        }
      } catch (error) {
        
        console.error("Failed to fetch avatar image:", error);
        setProfilePic(avatar); // fallback to default
      }
    }
  
    if (username && alpaca) {
      fetchProfilePicture();
    } else {
      setProfilePic(avatar); // fallback to default
    }
  }, [username, alpaca]);
  

    function formatTitle(entry){
        if(entry.mediaType == 'game'){
            return <p>started playing {entry.title}</p>
        }else if(entry.mediaType == 'book'){
            return <p>started reading <i>{entry.title}</i></p>
        }else{
            return <p>started watching <i>{entry.title}</i></p>
        }
    }

    function checkNewDate(entry, listNO){
        if(listNO == 0){
            return <div className="user-activity-date"> {userActivity[listNO].date} </div>
        }
        else if((listNO > 0) && (entry[listNO].date != entry[listNO - 1].date)){
            return <div className="user-activity-date"> {userActivity[listNO].date} </div>
        }else{
            return  <div className="user-activity-date"></div>
        }
    }
    function DisplayActivity(listNO){
        if(listNO < (userActivity.length)){
            return(
                <div className="user-activity">
                    {checkNewDate(userActivity, listNO)}
                    <div className="user-activity-icon">
                        <img src={userProfilePic|| "https://avatars.githubusercontent.com/u/19550456"} height={50} width={50} style={{borderRadius: "50%",}}/>
                    </div>
                    <div className="user-activity-name">
                        <p>{username}</p>
                    </div>
                    <div className="user-activity-log">
                        {formatTitle(userActivity[listNO])}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="user-activity">
                    <p>end of the line</p>
                </div>
            )
        }
    }

    return (
        <div>
        {/*<div className="user-activity">
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
                    <Button className="page-button-outline" onClick={handleBackClick} disabled={index == 0}>Prev</Button>
                    <Button className="page-button-outline" onClick={handleNextClick} disabled={index == userActivity.length - 1}>Next</Button>
                </div>
            </div>
        </div>*/}
        <div>
            {userActivity.map(timestamp => (
                <li className="timeline-design" key={userActivity.entryNo}>
                        {DisplayActivity(timestamp.entryNo)}
                </li>
            ))}
        </div>
    </div>
    );
}