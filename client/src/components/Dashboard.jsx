import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api';
import axios from 'axios';

const Dashboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [problems, setProblems] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch leaderboard
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/leaderboard');
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching the leaderboard:', error);
            }
        };

        // Fetch problems
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/problems');
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        // const fetchUserProfile = async () => {
        //     try {
        //       const userData = await getUserProfile();
        //       setUser(userData);
        //     } catch (error) {
        //       console.error('Error fetching user data:', error);
        //       navigate('/login');
        //     }
        //   };
        
        

        fetchLeaderboard();
        fetchProblems();
        // fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl">Dashboard</h1>
                <div>
                    <span className="mr-4">Hello, {user.userName || 'Guest'}</span>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </button>
                </div>
            </header>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl mb-4">Leaderboard</h2>
                    <ul>
                        {leaderboard.map((user, index) => (
                            <li key={index} className="mb-2">
                                {index + 1}. {user.username} - {user.score}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl mb-4">Problems</h2>
                    <ul>
                        {problems.map((problem, index) => (
                            <li key={index} className="mb-2">
                                <a href={`/problem/${problem.id}`} className="text-blue-500 hover:text-blue-700">
                                    {problem.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
