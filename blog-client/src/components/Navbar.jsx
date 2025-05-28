import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="nav-brand">
                    Blog Platform
                </Link>
                
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/create">Create Blog</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-link">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;