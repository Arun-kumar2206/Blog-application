import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate('/');
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2 className="form-title">Create Account</h2>
                
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                </button>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-link"
                    >
                        Already have an account? Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;