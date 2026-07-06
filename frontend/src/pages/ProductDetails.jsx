import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaArrowLeft, FaCheck, FaTimes, FaBox, FaTag, FaClock, FaHistory } from 'react-icons/fa';
import api from '../api';
import { getImageUrl } from '../utils/imageUrl';
import { Card, Button, Input, Select, Textarea, Badge } from '../components';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});

    const fetchProduct = useCallback(async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data.data);
            setFormData(response.data.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleUpdate = useCallback(async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/${id}`, formData);
            setEditing(false);
            fetchProduct();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }, [id, formData, fetchProduct]);

    const typeOptions = useMemo(() => [
        { value: 'fresh_groceries', label: 'Fresh Groceries' },
        { value: 'household_essential', label: 'Household Essential' },
        { value: 'specialty', label: 'Specialty' },
    ], []);

    const getStockVariant = useCallback((stock) => {
        if (stock > 10) return 'success';
        if (stock > 0) return 'warning';
        return 'danger';
    }, []);

    const getStockText = useCallback((stock) => {
        if (stock > 10) return 'In Stock';
        if (stock > 0) return 'Low Stock';
        return 'Out of Stock';
    }, []);

    if (loading) {
        return <div className="loading">Loading product details...</div>;
    }

    if (!product) {
        return <div className="loading">Product not found</div>;
    }

    return (
        <div className="container">
            <Card
                title="Product Details"
                action={
                    <div className="btn-group">
                        {!editing && (
                            <Button onClick={() => setEditing(true)} icon={FaEdit}>
                                Edit
                            </Button>
                        )}
                        <Button variant="secondary" onClick={() => navigate('/products')} icon={FaArrowLeft}>
                            Back to Products
                        </Button>
                    </div>
                }
            >
                {editing ? (
                    <form onSubmit={handleUpdate}>
                        <Input
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <Textarea
                            label="Description"
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            rows={4}
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            />

                            <Select
                                label="Type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                options={typeOptions}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input
                                label="Price ($)"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                            />

                            <Input
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="btn-group">
                            <Button type="submit" icon={FaCheck}>
                                Save Changes
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setEditing(false);
                                    setFormData(product);
                                }}
                                icon={FaTimes}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            {product.image ? (
                                <img
                                    src={getImageUrl(product.image)}
                                    alt={product.name}
                                    style={{ width: '100%', borderRadius: '12px', boxShadow: 'var(--shadow)' }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '300px',
                                    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FaBox size={80} color="white" />
                                </div>
                            )}

                            <div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h2>
                                <div style={{ marginBottom: '1rem' }}>
                                    <span className="product-category">{product.category}</span>
                                    <Badge variant={product.is_active ? 'success' : 'danger'} style={{ marginLeft: '0.5rem' }}>
                                        {product.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                    {product.description || 'No description available'}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Price</div>
                                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                                            ${product.price}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Stock</div>
                                        <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                                            {product.stock}
                                            <Badge variant={getStockVariant(product.stock)} style={{ marginLeft: '0.5rem', fontSize: '0.875rem', verticalAlign: 'middle' }}>
                                                {getStockText(product.stock)}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Product Information</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
                                        <FaTag style={{ marginRight: '0.25rem' }} /> SKU
                                    </div>
                                    <div style={{ fontWeight: '600' }}>{product.sku}</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
                                        <FaBox style={{ marginRight: '0.25rem' }} /> Type
                                    </div>
                                    <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                                        {product.type.replace('_', ' ')}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
                                        <FaClock style={{ marginRight: '0.25rem' }} /> Created
                                    </div>
                                    <div style={{ fontWeight: '600' }}>
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
                                        <FaHistory style={{ marginRight: '0.25rem' }} /> Last Updated
                                    </div>
                                    <div style={{ fontWeight: '600' }}>
                                        {new Date(product.updated_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {product.inventory_transactions && product.inventory_transactions.length > 0 && (
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Recent Inventory Transactions</h3>
                                <div className="table-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Type</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.inventory_transactions.slice(0, 5).map((transaction) => (
                                                <tr key={transaction.id}>
                                                    <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                                                    <td>
                                                        <Badge variant={
                                                            transaction.transaction_type === 'purchase' ? 'success' :
                                                                transaction.transaction_type === 'sale' ? 'warning' :
                                                                    'danger'
                                                        }>
                                                            {transaction.transaction_type}
                                                        </Badge>
                                                    </td>
                                                    <td>{transaction.quantity}</td>
                                                    <td>${transaction.purchase_price}</td>
                                                    <td>{transaction.notes || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}

export default ProductDetails;
