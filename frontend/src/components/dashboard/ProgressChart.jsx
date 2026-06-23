import React, { useState } from 'react';
import Card from '../common/Card';
import './ProgressChart.css';

export const ProgressChart = ({
  history
}) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Reverse history so oldest is left, newest is right
  const data = [...history]
    .slice(0, 7) // Take up to last 7 attempts
    .reverse();

  const width = 600;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Coordinate math
  const getCoordinates = () => {
    if (data.length === 0) return [];
    if (data.length === 1) {
      return [{
        x: paddingLeft + chartWidth / 2,
        y: height - paddingBottom - (data[0].score / 100) * chartHeight,
        score: data[0].score,
        date: data[0].date,
        role: data[0].role
      }];
    }

    return data.map((item, index) => {
      const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
      const y = height - paddingBottom - (item.score / 100) * chartHeight;
      return {
        x,
        y,
        score: item.score,
        date: item.date,
        role: item.role
      };
    });
  };

  const coords = getCoordinates();

  // Create path strings
  let linePath = '';
  let areaPath = '';

  if (coords.length > 1) {
    // Generate curved line (catmull-rom or simple cubic bezier can work, but straight connections are sleek and standard)
    linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
    // Area path closes at bottom of chart
    areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - paddingBottom} L ${coords[0].x} ${height - paddingBottom} Z`;
  }

  // Grid Y-lines (Scores 25, 50, 75, 100)
  const gridLines = [25, 50, 75, 100];

  return (
    <Card className="chart-wrapper-card" hoverEffect={false}>
      <div className="chart-header">
        <h4 className="chart-card-title">Score Performance Trend</h4>
        <p className="chart-card-subtitle">Tracking your average grades over the last 7 attempts</p>
      </div>

      <div className="svg-container">
        {data.length === 0 ? (
          <div className="chart-no-data">
            <p>No historical attempts to chart yet.</p>
          </div>
        ) : (
          <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" width="100%">
            <defs>
              {/* Fade Area Gradient */}
              <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
              </linearGradient>
              {/* Glow filter for path */}
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Y-axis Labels & Gridlines */}
            {gridLines.map((val) => {
              const y = height - paddingBottom - (val / 100) * chartHeight;
              return (
                <g key={val} className="chart-grid-group">
                  <text 
                    x={paddingLeft - 10} 
                    y={y + 4} 
                    className="grid-label" 
                    textAnchor="end"
                  >
                    {val}%
                  </text>
                  <line 
                    x1={paddingLeft} 
                    y1={y} 
                    x2={width - paddingRight} 
                    y2={y} 
                    className="grid-line" 
                  />
                </g>
              );
            })}

            {/* Gradient Area under line */}
            {coords.length > 1 && (
              <path d={areaPath} fill="url(#chart-area-grad)" />
            )}

            {/* Line Path */}
            {coords.length > 1 && (
              <path 
                d={linePath} 
                fill="none" 
                stroke="var(--primary-color)" 
                strokeWidth="3.5" 
                filter="url(#glow-filter)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data points */}
            {coords.map((pt, idx) => (
              <g key={idx}>
                {/* Bigger transparent hover node capture */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="12"
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredNode(pt)}
                  onMouseLeave={() => setHoveredNode(null)}
                />
                {/* Visual coordinate point */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredNode && hoveredNode.x === pt.x ? "6.5" : "5"}
                  className={`chart-point ${hoveredNode && hoveredNode.x === pt.x ? 'point-active' : ''}`}
                  pointerEvents="none"
                />
              </g>
            ))}

            {/* Bottom Dates text indicators */}
            {coords.map((pt, idx) => (
              <text
                key={idx}
                x={pt.x}
                y={height - paddingBottom + 18}
                className="date-axis-label"
                textAnchor="middle"
              >
                {pt.date.slice(5)}
              </text>
            ))}
          </svg>
        )}

        {/* Floating HTML Tooltip */}
        {hoveredNode && (
          <div 
            className="chart-tooltip glass-panel animate-fade-in"
            style={{
              left: `${(hoveredNode.x / width) * 100}%`,
              top: `${(hoveredNode.y / height) * 100 - 30}%`
            }}
          >
            <p className="tooltip-role">{hoveredNode.role.split(' ')[0]}</p>
            <p className="tooltip-score">Score: <span>{hoveredNode.score}%</span></p>
            <p className="tooltip-date">{hoveredNode.date}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProgressChart;
