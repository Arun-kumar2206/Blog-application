import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../services/api';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createBlog(formData);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to create blog post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form className="form-container" style={{ maxWidth: '800px' }} onSubmit={handleSubmit}>
                <h2 className="form-title">Create New Blog Post</h2>
                
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        className="form-input"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter your blog title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        className="form-input"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows="10"
                        placeholder="Write your blog content here..."
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="btn"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Blog Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;