const variantMap = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info', // Assume this exists or default to blue
    primary: 'badge-primary',
    secondary: 'badge-secondary',
};

const Badge = ({ children, variant = 'primary', className = '' }) => {
    const badgeClass = variantMap[variant] || 'badge-primary';
    return (
        <span className={`badge ${badgeClass} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
