import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, updateBlog } from '../services/api';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadBlog();
    }, [id]);

    const loadBlog = async () => {
        try {
            const data = await getBlogById(id);
            setFormData({
                title: data.title,
                content: data.content
            });
        } catch (err) {
            setError(err.message || 'Failed to load blog');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await updateBlog(id, formData);
            navigate(`/blogs/${id}`);
        } catch (err) {
            setError(err.message || 'Failed to update blog post');
            setSaving(false);
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container alert alert-error">{error}</div>;

    return (
        <div className="container">
            <form className="form-container" style={{ maxWidth: '800px' }} onSubmit={handleSubmit}>
                <h2 className="form-title">Edit Blog Post</h2>
                
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
                        onClick={() => navigate(`/blogs/${id}`)}
                        className="btn"
                        disabled={saving}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;