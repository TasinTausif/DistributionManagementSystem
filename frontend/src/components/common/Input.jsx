const Input = ({ label, name, error, className = '', type = 'text', ref, ...props }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <input
                ref={ref}
                id={name}
                name={name}
                type={type}
                className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
                {...props}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default Input;