import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    function handleLogout() {
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return (
        <nav className="nav">
            <Link 
                to="/homepage" 
                className={location.pathname === '/homepage' ? 'active' : ''}
            >
                Homepage
            </Link>
            <Link 
                to="/profile" 
                className={location.pathname === '/profile' ? 'active' : ''}
            >
                Edit Profile
            </Link>
            <button onClick={handleLogout}>Log out</button>
        </nav>
    );
}

export default Navbar;