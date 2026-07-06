import { Link } from 'react-router-dom';
import { FaBoxOpen, FaPlus, FaClipboardList, FaLeaf, FaHome, FaStar } from 'react-icons/fa';

function Home() {
    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to DMS</h1>
                <p>
                    Advanced Distribution Management System for fresh groceries, household essentials,
                    and specialty products. Manage your inventory with ease and efficiency.
                </p>
            </div>

            <div className="grid">
                <div className="card">
                    <div className="card-icon">
                        <FaBoxOpen size={30} color="var(--primary-color)" />
                    </div>
                    <h2 className="card-title">Product Management</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Add, view, and manage your product catalog with detailed information
                        including pricing, stock levels, and categories.
                    </p>
                    <Link to="/products" className="btn btn-primary">
                        View Products
                    </Link>
                </div>

                <div className="card">
                    <div className="card-icon">
                        <FaPlus size={30} color="var(--secondary-color)" />
                    </div>
                    <h2 className="card-title">Add New Product</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Quickly add new products to your catalog with images, descriptions,
                        and pricing information.
                    </p>
                    <Link to="/add-product" className="btn btn-secondary">
                        Add Product
                    </Link>
                </div>

                <div className="card">
                    <div className="card-icon">
                        <FaClipboardList size={30} color="var(--warning-color)" />
                    </div>
                    <h2 className="card-title">Inventory Management</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Track purchases, sales, and stock adjustments. Monitor your inventory
                        levels in real-time.
                    </p>
                    <Link to="/inventory" className="btn btn-primary">
                        Manage Inventory
                    </Link>
                </div>
            </div>

            <div className="card" style={{ marginTop: '3rem' }}>
                <h2 className="card-title">Key Features</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                            <FaLeaf style={{ marginRight: '0.5rem', color: 'var(--secondary-color)' }} />
                            Fresh Groceries
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Manage perishable items with expiry tracking
                        </p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                            <FaHome style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }} />
                            Household Essentials
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Track everyday items and supplies
                        </p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                            <FaStar style={{ marginRight: '0.5rem', color: 'var(--warning-color)' }} />
                            Specialty Products
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Manage exclusive and premium items
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
