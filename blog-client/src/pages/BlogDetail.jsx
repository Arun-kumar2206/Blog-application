import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, deleteBlog } from '../services/api';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        loadBlog();
    }, [id]);

    const loadBlog = async () => {
        try {
            const data = await getBlogById(id);
            setBlog(data);
        } catch (err) {
            setError(err.message || 'Failed to load blog');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await deleteBlog(id);
                navigate('/');
            } catch (err) {
                setError(err.message || 'Failed to delete blog');
            }
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container alert alert-error">{error}</div>;
    if (!blog) return <div className="container">Blog not found</div>;

    const isAuthor = user && blog.author.toString() === user.id.toString();

    return (
        <div className="container">
            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{blog.title}</h1>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ color: '#666' }}>
                        <p>By {blog.authorName}</p>
                        <p>
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    
                    {isAuthor && (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={handleEdit}
                                className="btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-primary"
                                style={{ backgroundColor: '#dc3545' }}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                <div style={{ 
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    lineHeight: '1.8'
                }}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {blog.content}
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <button
                        onClick={() => navigate('/')}
                        className="btn"
                    >
                        Back to Blogs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;