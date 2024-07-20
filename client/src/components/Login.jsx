import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios'; // Import axios

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password }); // Add full URL
            localStorage.setItem('token', response.data.token);
            setData({ email: '', password: '' });
            console.log("Successfully logged in to the account", response.data);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };
    

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email" // Add name attribute
                            value={data.email}
                            onChange={handleChange} // Use handleChange
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            name="password" // Add name attribute
                            value={data.password}
                            onChange={handleChange} // Use handleChange
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <p className="mt-4">Don't have an account?</p>
                <Link to="/register" className="text-blue-500 hover:text-blue-700">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Login;
