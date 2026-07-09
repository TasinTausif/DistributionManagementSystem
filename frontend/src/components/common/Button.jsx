import { FaSpinner } from 'react-icons/fa';

const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    warning: 'btn-warning',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    disabled = false,
    type = 'button',
    icon: Icon,//Renaming the prop icon to Icon to avoid confusion with the HTML attribute
    ...props
}) => {
    const variantClass = variants[variant] || variants.primary;
    const sizeClass = `btn-${size}`;

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
