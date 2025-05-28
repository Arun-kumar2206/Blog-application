import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadBlogs();
    }, [currentPage]);

    const loadBlogs = async () => {
        try {
            setLoading(true);
            const data = await getBlogs(currentPage);
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container text-red">{error}</div>;

    return (
        <div className="container">
            <h1 style={{ margin: '2rem 0' }}>Latest Blogs</h1>
            
            <div className="blog-grid">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-card">
                        <div className="blog-card-content">
                            <h2 className="blog-card-title">{blog.title}</h2>
                            <p className="blog-card-excerpt">
                                {blog.content.substring(0, 150)}...
                            </p>
                            <div className="blog-card-footer">
                                <span>By {blog.authorName}</span>
                                <Link to={`/blogs/${blog._id}`} className="text-link">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '1rem', 
                    margin: '2rem 0' 
                }}>
                    <button
                        className="btn"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        className="btn"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogList;