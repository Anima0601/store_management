import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

function App() {
  const hideNavAndFooterRoutes = ["/login", "/signup"];

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
  
        {!hideNavAndFooterRoutes.includes(window.location.pathname) && <Navbar />}

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<h1>Admin Dashboard</h1>} />
            <Route path="/store-owner" element={<h1>Store Owner Dashboard</h1>} />
            <Route path="/user" element={<h1>Normal User Dashboard</h1>} />
       
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {!hideNavAndFooterRoutes.includes(window.location.pathname) && <Footer />}
      </div>
    </Router>
  );
}

export default App;
