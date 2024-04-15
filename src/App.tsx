import React from 'react';
import './App.css';
import TestComponent from "./components/TestComponent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AfterSubmit} from "./components/AfterSubmit";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={< TestComponent />} />
              <Route path="/status" element={< AfterSubmit />} />
          </Routes>
      </Router>

  );
}

export default App;
