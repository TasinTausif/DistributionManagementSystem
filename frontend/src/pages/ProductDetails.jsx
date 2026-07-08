import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaArrowLeft, FaCheck, FaTimes, FaBox, FaTag, FaClock, FaHistory, FaCloudUploadAlt } from 'react-icons/fa';
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
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const typeOptions = [
        { value: 'fresh_groceries', label: 'Fresh Groceries' },
        { value: 'household_essential', label: 'Household Essential' },
        { value: 'specialty', label: 'Specialty' },
    ];

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data.data);
                setFormData(response.data.data);
                setImageFile(null);
                setImagePreview(null);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            sku: formData.sku,
            description: formData.description || '',
            category: formData.category,
            type: formData.type,
            price: formData.price,
            stock: formData.stock,
            is_active: formData.is_active,
        };

        try {
            if (imageFile) {
                const data = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    data.append(key, value);
                });
                data.append('image', imageFile);
                await api.post(`/products/${id}`, data);
            } else {
                await api.put(`/products/${id}`, payload);
            }

            setEditing(false);

            const response = await api.get(`/products/${id}`);
            setProduct(response.data.data);
            setFormData(response.data.data);
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const getStockVariant = (stock) => {
        if (stock > 10) return 'success';
        if (stock > 0) return 'warning';
        return 'danger';
    };

    const getStockText = (stock) => {
        if (stock > 10) return 'In Stock';
        if (stock > 0) return 'Low Stock';
        return 'Out of Stock';
    };

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
                            value={formData.name || ''}
                            onChange={handleChange}
                        />

                        <Input
                            label="SKU"
                            name="sku"
                            value={formData.sku || ''}
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
                                value={formData.category || ''}
                                onChange={handleChange}
                            />

                            <Select
                                label="Type"
                                name="type"
                                value={formData.type || 'fresh_groceries'}
                                onChange={handleChange}
                                options={typeOptions}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input
                                label="Price ($)"
                                name="price"
                                type="number"
                                value={formData.price || ''}
                                onChange={handleChange}
                                step="0.01"
                            />

                            <Input
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock ?? ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Product Image</label>
                            <div style={{
                                border: '2px dashed var(--border-color)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                position: 'relative'
                            }}>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: 'pointer'
                                    }}
                                />
                                {imagePreview || product.image ? (
                                    <img
                                        src={imagePreview || getImageUrl(product.image)}
                                        alt="Product preview"
                                        style={{ maxHeight: '220px', maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ color: 'var(--text-secondary)' }}>
                                        <FaCloudUploadAlt size={42} style={{ marginBottom: '1rem' }} />
                                        <p>Click or drag image here to upload</p>
                                    </div>
                                )}
                            </div>
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
                                    setImageFile(null);
                                    setImagePreview(null);
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
