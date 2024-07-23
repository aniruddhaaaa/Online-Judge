import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Problems from './components/Problems';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/problems" element={<PrivateRoute component={Problems} />} />
          </Routes>
      </Router>
  );
}

export default App;
