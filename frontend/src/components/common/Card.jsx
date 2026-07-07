import { FaTrash, FaEdit } from 'react-icons/fa';

const Card = ({
    children,
    title,
    icon: Icon,
    action,
    className = '',
    style = {}
}) => {
    return (
        <div className={`card ${className}`} style={style}>
            {(title || Icon || action) && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    {(title || Icon) && (
                        <h2 className="card-title" style={{ marginBottom: 0 }}>
                            {Icon && <Icon style={{ marginRight: '0.5rem' }} />}
                            {title}
                        </h2>
                    )}
                    {action}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
