import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFollowing = async () => {
    try {
      const res = await axios.get(`http://localhost:3003/user/${currentUserId}/following`);
      const ids = res.data.map(user => user._id); // ← Extract just IDs
      setFollowingIds(ids);
      console.log("Following IDs:", ids); // optional debug
    } catch (err) {
    console.error("Error fetching following list:", err);
    }
  };

    if (currentUserId) fetchFollowing();
  }, [currentUserId]);


  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3003/search-users?username=${searchTerm}`);
      setFoundUsers(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const toggleFollow = async (targetId) => {
  try {
    const isFollowing = followingIds.includes(targetId);
    if (isFollowing) {
      await axios.post(`http://localhost:3003/unfollow/${targetId}`, { currentUserId });
      setFollowingIds(prev => prev.filter(id => id !== targetId));
    } else {
      await axios.post(`http://localhost:3003/follow/${targetId}`, { currentUserId });
      setFollowingIds(prev => [...prev, targetId]);
    }

    // Trigger profile page to refresh its count
    localStorage.setItem("followChanged", "true");
  } catch (err) {
    console.error("Follow/unfollow error:", err);
  }
  };

  return (
    <div className="page-content" style={{ padding: "30px" }}>
      <h1>Find Users</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3F2A52",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {foundUsers.length > 0 && (
        <div className="user-results">
          {foundUsers.map((user) => (
            <div key={user._id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              color: "#8A2BE2",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "10px"
            }}>
              
            <span style={{ fontWeight: "bold" }}>{user.username}</span>

              {user._id !== currentUserId && (
                <button
                  onClick={() => toggleFollow(user._id)}
                  style={{
                    padding: "6px 15px",
                    backgroundColor: followingIds.includes(user._id) ? "#f08080" : "#4CAF50",
                    color: "8A2BE2",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {followingIds.includes(user._id) ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;