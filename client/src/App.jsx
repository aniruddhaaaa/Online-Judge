import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path ="/login" element={<LoginPage />} />
          <Route path = "/register" element = {<RegisterPage/>} />
          <Route path ="/dashboard" element={<Dashboard />} />
          <Route path ="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
