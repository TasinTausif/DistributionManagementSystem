import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaFilter, FaBoxOpen } from 'react-icons/fa';
import api from '../api';
import { Card, Button, ProductCard } from '../components';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchProducts = useCallback(async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    }, [fetchProducts]);

    const filteredProducts = useMemo(() => {
        return filter === 'all'
            ? products
            : products.filter(p => p.type === filter);
    }, [products, filter]);

    if (loading) {
        return <div className="loading"><FaBoxOpen className="spin" /> Loading products...</div>;
    }

    return (
        <div className="container">
            <Card
                title="All Products"
                action={
                    <Link to="/add-product" style={{ textDecoration: 'none' }}>
                        <Button icon={FaPlus}>
                            Add New Product
                        </Button>
                    </Link>
                }
            >
                <div style={{ marginBottom: '2rem' }}>
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center' }}>
                        <FaFilter style={{ marginRight: '0.5rem' }} /> Filter by Type:
                    </label>
                    <div className="btn-group">
                        {['all', 'fresh_groceries', 'household_essential', 'specialty'].map(type => (
                            <Button
                                key={type}
                                size="sm"
                                variant={filter === type ? 'primary' : 'secondary'}
                                onClick={() => setFilter(type)}
                                style={{ textTransform: 'capitalize' }}
                            >
                                {type.replace('_', ' ')}
                            </Button>
                        ))}
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                        No products found. Add your first product to get started!
                    </p>
                ) : (
                    <div className="grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

export default Products;
