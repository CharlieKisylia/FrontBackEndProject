// src/Layout.js
import React from 'react';
import NavBar from './NavBar';
import './css/Welcome.css';  // Use this or another CSS file if needed

const Layout = ({ children }) => {
    return (
        <div className="main-container">
            <NavBar />
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
