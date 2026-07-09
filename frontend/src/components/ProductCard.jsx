import { Link } from 'react-router-dom';
import { FaTrash, FaBoxOpen } from 'react-icons/fa';
import { getImageUrl } from '../utils/imageUrl';
import Badge from './common/Badge';
import Button from './common/Button';

function ProductCard({ product, onDelete }) {
    const stockVariant = product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger';
    const stockText = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';

    return (
        <div className="product-card">
            {product.image ? (
                <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="product-image"
                />
            ) : (
                <div className="product-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaBoxOpen size={48} color="#ccc" />
                </div>
            )}
            <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-category">{product.category}</span>
                <p className="product-description">
                    {product.description?.substring(0, 100)}
                    {product.description?.length > 100 ? '...' : ''}
                </p>
                <div className="product-footer">
                    <div>
                        <div className="product-price">BDT {product.price}</div>
                        <div className="product-stock">
                            Stock: {product.stock}
                            <Badge variant={stockVariant} style={{ marginLeft: '0.5rem' }}>
                                {stockText}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="btn-group" style={{ marginTop: '1rem', justifyContent: 'space-between' }}>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                        <Button size="sm" icon={FaBoxOpen}>View Details</Button>
                    </Link>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                        icon={FaTrash}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
