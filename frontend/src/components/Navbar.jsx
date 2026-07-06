import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaPlus, FaClipboardList } from 'react-icons/fa';

function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <FaBoxOpen style={{ marginRight: '0.5rem' }} />
                    Sokrio DMS
                </Link>
                <ul className="navbar-nav">
                    <li>
                        <Link to="/" className={`nav-link ${isActive('/')}`}>
                            <FaHome className="nav-icon" /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className={`nav-link ${isActive('/products')}`}>
                            <FaBoxOpen className="nav-icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-product" className={`nav-link ${isActive('/add-product')}`}>
                            <FaPlus className="nav-icon" /> Add Product
                        </Link>
                    </li>
                    <li>
                        <Link to="/inventory" className={`nav-link ${isActive('/inventory')}`}>
                            <FaClipboardList className="nav-icon" /> Inventory
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
