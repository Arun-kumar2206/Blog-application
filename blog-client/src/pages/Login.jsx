import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
            await loginUser(formData);
            navigate('/');
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2 className="form-title">Sign In</h2>
                
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

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
                    Sign In
                </button>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="text-link"
                    >
                        Don't have an account? Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;