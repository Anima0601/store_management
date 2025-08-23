import React from "react";

export default function HomePage() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px", style:"bold", marginBottom: "20px" }}>
        🏪 Store Sphere Web Application
      </h1>

      <p style={{ fontSize: "18px", margin: "0 20px", color: "#444" }}>
        Welcome to our <b>Store Management Platform</b>!  <br></br>
        This web application helps users browse registered stores and submit ratings for them.  
        Ratings range from <b>1 to 5 stars</b>, allowing customers to share their feedback and help 
        others make better decisions.  
      </p>

      <div style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>✨ Features</h2>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "16px", color: "#333" }}>
          <li>✔ Browse a list of registered stores</li>
          <li>✔ Submit ratings (1–5 stars) for each store</li>
          <li>✔ View average ratings and customer feedback</li>
          <li>✔ Simple and user-friendly interface</li>
        </ul>
      </div>

      <div style={{ marginTop: "40px", fontSize: "18px", color: "#006400" }}>
        <b>Get started today and rate your favorite stores! ⭐</b>
      </div>
    </div>
  );
}
