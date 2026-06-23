import React from 'react';
import './Card.css';

export const Card = ({
  children,
  hoverEffect = true,
  glow = false,
  className = '',
  onClick,
  ...props
}) => {
  return (
    <div
      className={`card-panel glass-panel ${hoverEffect ? 'card-hover' : ''} ${glow ? 'card-glow' : ''} ${onClick ? 'card-clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
