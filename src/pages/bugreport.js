import React, { useState } from "react";

export default function BasicForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message:""

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a FormData object for file submission
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("file", formData.file);

    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
    
    // Reset form
    setFormData({ name: "", email: "", file: null });
  };

  return (
    <>
      <div className="report-form">
        <div className="bugtitle">
          <div>Bug Report</div>
        </div>
      </div>

      <div className="form-container">
        <h2 className="form-questions">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="outer-input">
            <p id="title-label" className="form-questions">Title:</p>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="bug-report-input"
              list="title-suggestions" // Link to the datalist
              placeholder="Title of the issue"
            />
            <datalist id="title-suggestions">
              <option value="Bug in Login" />
              <option value="Page Not Found" />
              <option value="Feature Request" />
              <option value="Performance Issue" />
            </datalist>
          </div>


          <div className="outer-input">
            <p id="description-label" className="form-questions">Email</p>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="bug-report-input"
              placeholder="Enter Your Email"
            
            />
          </div>


          <div className="outer-input">
            <p id="description-label" className="form-questions">Brief Description of the issue:</p>
            <textarea 
              
              name="issue" 
              value={formData.issue} 
              onChange={handleChange} 
              required 
              className="bug-report-input"
              placeholder="Describe the issue"
              style={{height:'100px'}}
            />
          </div>

          <div className="outer-input">
            <p id="steps-label" className="form-questions">Steps to reproduce:</p>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              className="bug-report-input"
              placeholder="Describe how to reproduce the issue"
              style={{height:'100px'}}
            />
          </div>

          <div className="outer-input">
            <p id="screenshot-label" className="form-questions">Screenshot:</p>   
            <input 
              id="file-upload-button"
              type="file" 
              name="file" 
              onChange={handleFileChange} 
              required 
              className="bug-report-input"
            />
          </div>

          <button className="submit-button" type="submit">Submit Bug Report</button>
        </form>

        <div className="suggestions">
          <div>
            <h1 className="form-questions">Suggested Submission</h1>
              <ul>
                <p style={{ color: 'white' }}>• Title: A brief title for the issue </p>
                <p style={{ color: 'white' }}>• Description: A brief description of the issue</p>
                <p style={{ color: 'white' }}>• Steps to Reproduce: How to trigger the bug</p>
                <p style={{ color: 'white' }}>• Screenshot (optional): Upload a screenshot if available</p>
              </ul>
          </div>
             


        </div>
      </div>
    </>
  );
}
