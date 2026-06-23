import React from 'react';
import './Input.css';

export const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  options = [], // For select fields
  icon: Icon,
  className = '',
  ...props
}) => {
  const isSelect = type === 'select';

  return (
    <div className={`input-container ${error ? 'input-has-error' : ''} ${className}`}>
      {label && <label className="input-label" htmlFor={name}>{label} {required && <span className="req">*</span>}</label>}
      <div className="input-wrapper">
        {Icon && <div className="input-icon-slot"><Icon size={18} /></div>}
        {isSelect ? (
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={`input-field input-select ${Icon ? 'has-icon' : ''}`}
            required={required}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input-field ${Icon ? 'has-icon' : ''}`}
            required={required}
            {...props}
          />
        )}
      </div>
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};

export default Input;
