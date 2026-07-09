const variantMap = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
};

const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
    const badgeClass = variantMap[variant] || 'badge-primary';
    return (
        <span className={`badge ${badgeClass} ${className}`} {...props}>
            {children}
        </span>
    );
};

export default Badge;
