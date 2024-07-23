// src/components/Problems.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [problem, setProblem] = useState({
        problemId: '',
        name: '',
        description: '',
        examples: []
    });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await axios.get('/api/problems');
            setProblems(response.data);
        } catch (error) {
            console.error('Error fetching problems:', error);
        }
    };

    const handleChange = (e) => {
        setProblem({ ...problem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`/api/problems/${problem._id}`, problem);
            } else {
                await axios.post('/api/problems', problem);
            }
            fetchProblems();
            setProblem({ problemId: '', name: '', description: '', examples: [] });
            setEditing(false);
        } catch (error) {
            console.error('Error saving problem:', error);
        }
    };

    const handleEdit = (problem) => {
        setProblem(problem);
        setEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/problems/${id}`);
            fetchProblems();
        } catch (error) {
            console.error('Error deleting problem:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl mb-4">Manage Problems</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Problem ID</label>
                    <input
                        type="text"
                        name="problemId"
                        value={problem.problemId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={problem.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={problem.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Examples</label>
                    <textarea
                        name="examples"
                        value={problem.examples}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {editing ? 'Update Problem' : 'Add Problem'}
                </button>
            </form>
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl mb-4">Problem List</h2>
                <ul>
                    {problems.map((prob) => (
                        <li key={prob._id} className="mb-2 flex justify-between items-center">
                            <span>{prob.name}</span>
                            <div>
                                <button onClick={() => handleEdit(prob)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(prob._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Problems;
