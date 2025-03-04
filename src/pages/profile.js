import React from "react";
import "../App.css";
import EditButton from "../components/editProfile.js";
import PageButton from "../components/pageButton.js";
import FollowButton from "../components/followButton.js";

function Profile() {
  return (
    <div className="profile-page">
      <div className="avatar-container">
        <img src="https://avatars.githubusercontent.com/u/19550456" height={150} width={150} style={{borderRadius: "50%", border: "15px solid #303030",}}/>
        <div className="profile-stats">
          <div className="media-type">
            <h1>Books</h1>
            <h1>Movies</h1>
           <h1>Shows</h1>
            <h1>Games</h1>
        </div>
        <div className="amount-read">
          <h1>23</h1>
          <h1>46</h1>
          <h1>11</h1>
          <h1>58</h1>
        </div>
      </div>
    </div>
    <div className="profile-details">
      <div className="profile-name">
        <h1>Bharat</h1>
        <p>9 Followers * 23 Following</p>
      </div>
        <EditButton></EditButton>
        <FollowButton></FollowButton>
    </div>
    <div className="profile-content">
      <h1>Bharat's Lists</h1>
      <div className="profile-lists">
      </div>
      <h1>Timeline</h1>
      <div className="profile-activity">
        <div className="user-activity">
          <div className="user-activity-date">
            <p>3/4/2025</p>
          </div>
          <div className="user-activity-icon">
            <img src="https://avatars.githubusercontent.com/u/19550456" height={50} width={50} style={{borderRadius: "50%",}}/>
          </div>
          <div className="user-activity-name">
            <p>Bharat</p>
          </div>
          <div className="user-activity-log">
            <p>started playing Fallout 2.</p>
          </div>
        </div>
        <div className="user-activity">
          <div className="user-activity-date">
            <p>3/4/2025</p>
          </div>
          <div className="user-activity-icon">
            <img src="https://avatars.githubusercontent.com/u/19550456" height={50} width={50} style={{borderRadius: "50%",}}/>
          </div>
          <div className="user-activity-name">
            <p>Bharat</p>
          </div>
          <div className="user-activity-log">
            <p>started reading <i>What the Thunder Said.</i></p>
          </div>
        </div>
        <div className="user-activity">
          <div className="user-activity-date">
            <p>2/28/2025</p>
          </div>
          <div className="user-activity-icon">
            <img src="https://avatars.githubusercontent.com/u/19550456" height={50} width={50} style={{borderRadius: "50%",}}/>
          </div>
          <div className="user-activity-name">
            <p>Bharat</p>
          </div>
          <div className="user-activity-log">
            <p>started watching <i>No Country for Old Men.</i></p>
          </div>
        </div>
        <div className="user-activity">
          <div className="user-activity-date">
            <p>2/20/2025</p>
          </div>
          <div className="user-activity-icon">
            <img src="https://avatars.githubusercontent.com/u/19550456" height={50} width={50} style={{borderRadius: "50%",}}/>
          </div>
          <div className="user-activity-name">
            <p>Bharat</p>
          </div>
          <div className="user-activity-log">
            <p>started reading <i>The Sympathizer.</i></p>
          </div>
        </div>
        <div className="page-counter">
          <PageButton></PageButton>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Profile;