import React from 'react';
import Card from '../common/Card';
import './StatsCard.css';

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
  color = 'primary'
}) => {
  const isPositive = trend > 0;

  return (
    <Card className={`stats-widget-card sc-${color}`} hoverEffect={true}>
      <div className="stats-card-body">
        <div className="stats-card-main">
          <p className="stats-card-title">{title}</p>
          <h3 className="stats-card-value">{value}</h3>
          
          {trend !== undefined && (
            <div className="stats-card-trend-row">
              <span className={`trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
                {isPositive ? '+' : ''}{trend}%
              </span>
              <span className="trend-desc">{description || 'since last week'}</span>
            </div>
          )}
        </div>

        <div className="stats-card-icon-container">
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
