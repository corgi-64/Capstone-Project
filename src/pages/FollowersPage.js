import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const FollowersPage = () => {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    async function fetchFollowers() {
      try {
        const res = await axios.get(`http://localhost:3003/user/${id}/followers`);
        setFollowers(res.data);
      } catch (err) {
        console.error("Failed to fetch followers:", err);
      }
    }

    fetchFollowers();
  }, [id]);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Followers</h2>
      {followers.length === 0 ? <p>No followers yet.</p> : (
        followers.map((user) => (
          <div key={user._id} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f4f4f4",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px"
          }}>
            <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none', color: '#333' }}>
              {user.username}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FollowersPage;