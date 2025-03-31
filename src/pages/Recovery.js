import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../App.css";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'


function Recovery() {
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="top-bar">
                <nav>
                    <Link to="/home" class="bingr">bingr</Link>
                </nav>
            </div>

            <div className="sign-in-page">  {/* This applies the background */}
                <div className="signin-form">
                    <div className="signin-title">
                        <h1>Recover</h1>
                    </div>

                    <div className="signin-content">
                        <label> Username <br/>
                            <input
                                type="text"
                                name="username"
                                className="signin-input"
                                value={signInData.username}
                                onChange={handleChange}  // Make it controlled
                            />
                        </label>
              </div>
              <br/>

            <div className="signin-content">
                        <label> Password <br/>
                            <input
                                type="password"  // Changed type to password for security
                                name="password"
                                className="signin-input"
                                value={signInData.password}  // Make it controlled
                                onChange={handleChange}  // Make it controlled
                            />
                        </label>
            </div>
            <br/>

            <div className="signin-content">
                        <Button className="custom-signin-contained">Recover</Button>
            </div>
                    
            {/* Registration prompt on the sign in page */}
            <div className="signin-content">
                        <p style={{ textAlign: "center", fontSize: "14px", marginTop: "20px", marginBottom: "10px" }}>
                          Have an account? <a href="/signin" style={{ textDecoration: "underline" }}>Sign In</a>
                        </p>
                    </div>

              </div>
            </div>

        </div>

    );
}

export default Recovery;