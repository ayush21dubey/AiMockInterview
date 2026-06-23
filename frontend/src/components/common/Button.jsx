import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  icon: Icon
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <span className="btn-spinner"></span>
      )}
      {!loading && Icon && <Icon className="btn-icon" size={size === 'sm' ? 16 : 18} />}
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default Button;
