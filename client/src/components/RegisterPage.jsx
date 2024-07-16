// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import {useNavigate} from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name : '',
        email : '',
        password : '',
        confirmPassword : '',
    })
    const [error, setError] = useState('');
    

    const handleRegister = async (e) => {
        e.preventDefault();
        const{name, email, password, confirmPassword} = data;
        if(confirmPassword != password) {
            setError("Make sure to enter same password.");
            return;
        }
        try {
            const {data} = await axios.post('/register', { name, email, password, confirmPassword });
            setData({});
            console.log("Registration Succesful", data);
            navigate('/login');
            
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-6 text-center">Register</h2>
                <form onSubmit={handleRegister}>
                    <h2 className='text-2xl font-bold mb-4'>Create an account</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="name"
                            value={data.name}
                            onChange={(e) => setData({data, name : e.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData({data, email : e.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData({data, password : e.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm your Password</label>
                        <input
                            type="confirmPassword"
                            value={data.confirmPassword}
                            onChange={(e) => setData({data, confirmPassword : e.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p>Already have an account</p>
                <Link to = "/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
