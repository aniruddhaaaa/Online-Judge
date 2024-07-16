import React, { useState } from 'react';
import { useNavigate } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email : '',
        password : '',
    });
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try{
            const { data } = await axios.post('/login', { email, password });
            setData({});
            console.log("Succesfully logged in to the account", data);
            navigate('/dashboard');
        }
        catch(error){
            setError(error.message);
            console.log(error);
        }
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
                            value={data.email}
                            onChange={(e) => setEmail({data, email : e.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setPassword({data, password : e.target.value})}
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
            </div>
        </div>
    );
};

export default LoginPage;
