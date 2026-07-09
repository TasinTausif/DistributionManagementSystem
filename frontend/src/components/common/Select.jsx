const Select = ({
    label,
    name,
    options = [],
    error,
    className = '',
    children,
    value,
    ref,
    ...props
}) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <select
                ref={ref}
                id={name}
                name={name}
                className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
                value={value}
                {...props}
            >
                {children || options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default Select;