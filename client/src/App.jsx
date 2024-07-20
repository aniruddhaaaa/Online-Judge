import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path ="/login" element={<Login />} />
          <Route path = "/register" element = {<Register/>} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
