import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import api from '../api';
import { Card, Button, Input, Textarea, Select } from '../components';

function AddProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        description: '',
        category: '',
        type: 'fresh_groceries',
        price: '',
        stock: '',
        is_active: '1',
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            // It creates a temporary local URL that points to that file so that it can be displayed in the browser without uploading it to the server first.
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const data = new FormData();
        // Looping over every key in the formData object and appending it to the FormData. This is necessary for sending files (like images) along with other form data in a multipart/form-data request.
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            await api.post('/products', data);
            navigate('/products');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    const typeOptions = [
        { value: 'fresh_groceries', label: 'Fresh Groceries' },
        { value: 'household_essential', label: 'Household Essentials' },
        { value: 'specialty', label: 'Specialty' },
    ];

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <Card title="Add New Product" icon={FaPlus}>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Product Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Organic Tomatoes"
                        error={errors.name ? errors.name[0] : null}
                        required
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <Input
                            label="SKU (Unique ID)"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            placeholder="e.g. VEG-001"
                            error={errors.sku ? errors.sku[0] : null}
                            required
                        />
                        <Input
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g. Vegetables"
                            error={errors.category ? errors.category[0] : null}
                            required
                        />
                    </div>

                    <Textarea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        error={errors.description ? errors.description[0] : null}
                    />

                    <Select
                        label="Product Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        options={typeOptions}
                        error={errors.type ? errors.type[0] : null}
                        required
                    />

                    <Select
                        label="Status"
                        name="is_active"
                        value={formData.is_active}
                        onChange={handleChange}
                        options={[
                            { value: '1', label: 'Active' },
                            { value: '0', label: 'Inactive' }
                        ]}
                        error={errors.is_active ? errors.is_active[0] : null}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <Input
                            label="Price (BDT)"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            error={errors.price ? errors.price[0] : null}
                            required
                        />
                        <Input
                            label="Initial Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            error={errors.stock ? errors.stock[0] : null}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Product Image</label>
                        <div style={{
                            border: '2px dashed var(--border-color)',
                            padding: '2rem',
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
                            {preview ? (
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{ maxHeight: '200px', borderRadius: '8px' }}
                                    />
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="btn-icon-only"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPreview(null);
                                            setFormData({ ...formData, image: null });
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            right: '-10px',
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FaTimes size={12} />
                                    </Button>
                                </div>
                            ) : (
                                <div style={{ color: 'var(--text-secondary)' }}>
                                    <FaCloudUploadAlt size={48} style={{ marginBottom: '1rem' }} />
                                    <p>Click or drag image here to upload</p>
                                </div>
                            )}
                        </div>
                        {errors.image && <div className="invalid-feedback" style={{ display: 'block' }}>{errors.image[0]}</div>}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="btn-block"
                            style={{ width: '100%' }}
                            loading={loading}
                            icon={FaPlus}
                        >
                            Create Product
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default AddProduct;
