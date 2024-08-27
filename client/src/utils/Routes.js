// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home';
import Welcome from '../Welcome'; // Create this component

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome/:username" element={<Welcome />} />
        </Routes>
    </Router>
);

export default AppRoutes;