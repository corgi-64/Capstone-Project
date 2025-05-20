import React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import '../App.css'
import avatar from "../assets/images/user-avatar.png"
import { userActivity } from "./userActivityData";
import axios from "axios";

export default function PageButton(){
    const [userBooks, setUserBooks] = useState([]);
    const [userMovies, setUserMovies] = useState([]);
    const [userGames, setUserGames] = useState([]);
    const [userProfilePic, setProfilePic] = useState([]);
    const [username, setUsername] = useState([]);
    const pagesUserId = useParams().id

    useEffect(() => {
        async function grabUserName() {
        const res = await axios.get(`http://localhost:3003/user/username/${pagesUserId}`)
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
        
        const pictureRes = await fetch(`http://localhost:3003/user/profile-picture/${pagesUserId}`); // updates profile picture
        //console.log(pictureRes)
        if (pictureRes.ok) {
          const pictureData = await pictureRes.json();
          const base64Image = `data:${pictureData.contentType};base64,${pictureData.data}`;
          setProfilePic(base64Image);


          if (pictureData && pictureData.data && pictureData.contentType) {
            const base64Image = `data:${pictureData.contentType};base64,${pictureData.data}`;
            setProfilePic(base64Image);
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
  
        if (username && pagesUserId) {
            fetchProfilePicture();
        } else {
            setProfilePic(avatar); // fallback to default
        }
    }, [username, pagesUserId]);

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch(`http://localhost:3003/${username}/books`);
          const data = await response.json();
          setUserBooks(data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      if (username) fetchBooks();
    }, [username]);

  useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await fetch(`http://localhost:3003/${username}/movies`);
          const data = await response.json();
          setUserMovies(data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      if (username) fetchMovies();
    }, [username]);

    useEffect(() => {
        const fetchGames = async () => {
          try {
            const response = await fetch(`http://localhost:3003/${username}/games`);
            const data = await response.json();
            setUserGames(data);
          } catch (error) {
            console.error("Error fetching games:", error);
          }
        };
    
        if (username) fetchGames();
      }, [username]);

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
                        <img src={userProfilePic|| avatar} height={50} width={50} style={{borderRadius: "50%",}}/>
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
        <div>
            {userBooks.length > 0 ? (
                userBooks.map((book, index) => (
                    <div className="timeline-design">
                        <div className="user-activity">
                            <div className="user-activity-icon">
                                <img src={userProfilePic|| avatar} height={50} width={50} style={{borderRadius: "50%",}}/>
                            </div>
                            <div className="user-activity-name">
                                <p>{username}</p>
                            </div>
                            <div className="user-activity-log">
                                <p>started reading <i><Link key={book.id || index} to={`/book/${book.id}`} style={{color:"darkorchid"}}>{book.title}</Link></i></p>
                            </div>
                        </div>
                    </div>
                ))
            ) : <div>
                <p></p>
                </div>
                }
            {userMovies.length > 0 ? (
                userMovies.map((movie, index) => (
                    <div className="timeline-design">
                        <div className="user-activity">
                            <div className="user-activity-icon">
                                <img src={userProfilePic|| avatar} height={50} width={50} style={{borderRadius: "50%",}}/>
                            </div>
                            <div className="user-activity-name">
                                <p>{username}</p>
                            </div>
                            <div className="user-activity-log">
                                <p>started watching <i><Link key={movie.id || index} to={`/movie/${movie.id}`} style={{color:"darkorchid"}}>{movie.title}</Link></i></p>
                            </div>
                        </div>
                    </div>
                ))
            ) : <div>
                <p></p>
                </div>
                }
            {userGames.length > 0 ? (
                userGames.map((game, index) => (
                    <div className="timeline-design">
                        <div className="user-activity">
                            <div className="user-activity-icon">
                                <img src={userProfilePic|| avatar} height={50} width={50} style={{borderRadius: "50%",}}/>
                            </div>
                            <div className="user-activity-name">
                                <p>{username}</p>
                            </div>
                            <div className="user-activity-log">
                                <p>started playing <i><Link key={game.id || index} to={`/game/${game.id}`} style={{color:"darkorchid"}}>{game.title}</Link></i></p>
                            </div>
                        </div>
                    </div>
                ))
            ) : <div>
                <p>No further activity</p>
                </div>
                }
        </div>
    </div>
    );
}