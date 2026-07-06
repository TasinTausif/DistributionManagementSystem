import { FaSpinner } from 'react-icons/fa';

const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    warning: 'btn-warning',
};

const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    disabled = false,
    type = 'button',
    icon: Icon,
    ...props
}) => {
    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    return (
        <button
            type={type}
            className={`btn ${variantClass} ${sizeClass} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <FaSpinner className="spin" style={{ marginRight: '0.5rem' }} />}
            {!loading && Icon && <Icon style={{ marginRight: '0.5rem' }} />}
            {children}
        </button>
    );
};

export default Button;
