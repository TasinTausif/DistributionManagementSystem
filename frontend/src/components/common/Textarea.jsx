import { forwardRef } from 'react';

const Textarea = forwardRef(({
    label,
    name,
    error,
    className = '',
    rows = 3,
    ...props
}, ref) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <textarea
                ref={ref}
                id={name}
                name={name}
                className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
                rows={rows}
                {...props}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
