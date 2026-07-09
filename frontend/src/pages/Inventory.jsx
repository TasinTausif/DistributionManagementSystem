import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FaPlus, FaMinus, FaExchangeAlt, FaHistory, FaClipboardCheck, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import api from '../api';
import { Card, Button, Input, Select, Textarea, Badge } from '../components';

function Inventory() {
    const formRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        product_id: '',
        quantity: '',
        purchase_price: '',
        transaction_type: 'purchase',
        notes: ''
    });
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const [productsRes, transactionsRes] = await Promise.all([
                api.get('/products'),
                api.get('/inventory')
            ]);
            setProducts(productsRes.data.data);
            setTransactions(transactionsRes.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/inventory/${editingId}`, formData);
                setEditingId(null);
            } else {
                await api.post('/inventory', formData);
            }
            setFormData({
                product_id: '',
                quantity: '',
                purchase_price: '',
                transaction_type: 'purchase',
                notes: ''
            });
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    }, [formData, editingId, fetchData]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const getTransactionIcon = useCallback((type) => {
        switch (type) {
            case 'purchase': return <FaPlus style={{ color: 'var(--success-color)' }} />;
            case 'sale': return <FaMinus style={{ color: 'var(--danger-color)' }} />;
            case 'adjustment': return <FaExchangeAlt style={{ color: 'var(--warning-color)' }} />;
            default: return <FaHistory />;
        }
    }, []);

    const getTransactionVariant = useCallback((type) => {
        switch (type) {
            case 'purchase': return 'success';
            case 'sale': return 'danger';
            case 'adjustment': return 'warning';
            default: return 'secondary';
        }
    }, []);

    const handleEditClick = useCallback((transaction) => {
        setEditingId(transaction.id);
        setFormData({
            product_id: transaction.product_id,
            quantity: transaction.quantity,
            purchase_price: transaction.purchase_price,
            transaction_type: transaction.transaction_type,
            notes: transaction.notes || ''
        });
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
    }, []);

    const handleCancelEdit = useCallback(() => {
        setEditingId(null);
        setFormData({
            product_id: '',
            quantity: '',
            purchase_price: '',
            transaction_type: 'purchase',
            notes: ''
        });
    }, []);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await api.delete(`/inventory/${id}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting transaction:', error);
            }
        }
    }, [fetchData]);


    const transactionTypeOptions = useMemo(() => [
        { value: 'purchase', label: 'Purchase (Add Stock)' },
        { value: 'sale', label: 'Sale (Reduce Stock)' },
        { value: 'adjustment', label: 'Adjustment' },
    ], []);

    const productOptions = useMemo(() => [
        { value: '', label: 'Select Product...' },
        ...products.map(p => ({ value: p.id, label: `${p.name} (Stock: ${p.stock})` }))
    ], [products]);

    if (loading) {
        return <div className="loading">Loading inventory data...</div>;
    }

    return (
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>

                <div ref={formRef}>
                    <Card
                        title={editingId ? "Edit Transaction" : "Record Transaction"}
                        icon={FaClipboardCheck}
                        style={{ position: 'sticky', top: '2rem' }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Select
                                label="Product"
                                name="product_id"
                                value={formData.product_id}
                                onChange={handleChange}
                                options={productOptions}
                                required
                                disabled={editingId}
                            />

                            <Select
                                label="Transaction Type"
                                name="transaction_type"
                                value={formData.transaction_type}
                                onChange={handleChange}
                                options={transactionTypeOptions}
                                required
                                disabled={editingId}
                            />

                            <Input
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="1"
                                required
                            />

                            <Input
                                label="Unit Price (BDT)"
                                name="purchase_price"
                                type="number"
                                value={formData.purchase_price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                required
                            />

                            <Textarea
                                label="Notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                            />

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    type="submit"
                                    className="btn-block"
                                    style={{ flex: 1 }}
                                    icon={editingId ? FaEdit : FaPlus}
                                >
                                    {editingId ? 'Update Transaction' : 'Record Transaction'}
                                </Button>
                                {editingId && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleCancelEdit}
                                        icon={FaTimes}
                                        title="Cancel"
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Stock & History */}
                <div>
                    {/* Current Stock Levels */}
                    <Card title="Current Stock Levels" style={{ marginBottom: '2rem' }}>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                            {products.map(p => (
                                <div key={p.id} style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    border: p.stock <= 0 ? '1px solid var(--danger-color)' : p.stock <= 10 ? '1px solid var(--warning-color)' : '1px solid transparent'
                                }}>
                                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{p.name}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: p.stock <= 0 ? 'var(--danger-color)' : 'var(--text-color)' }}>
                                        {p.stock}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Units</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* History */}
                    <Card title="Transaction History" icon={FaHistory}>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Product</th>
                                        <th>Type</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Notes</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(t => (
                                        <tr key={t.id}>
                                            <td>{new Date(t.created_at).toLocaleDateString()}</td>
                                            <td>{t.product?.name || 'Unknown Product'}</td>
                                            <td>
                                                <Badge variant={getTransactionVariant(t.transaction_type)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    {getTransactionIcon(t.transaction_type)}
                                                    {t.transaction_type}
                                                </Badge>
                                            </td>
                                            <td style={{ fontWeight: 'bold' }}>
                                                {t.transaction_type === 'sale' ? '-' : '+'}{t.quantity}
                                            </td>
                                            <td style={{ whiteSpace: 'nowrap' }}>BDT {t.purchase_price}</td>
                                            <td>{t.notes || '-'}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => handleEditClick(t)}
                                                        icon={FaEdit}
                                                        title="Edit"
                                                    />
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(t.id)}
                                                        icon={FaTrash}
                                                        title="Delete"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {transactions.length === 0 && (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                                                No transactions recorded yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default Inventory;
