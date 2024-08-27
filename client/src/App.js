// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Import the Home component
import Welcome from './Welcome'; // Import the Welcome component
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome/:username" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
