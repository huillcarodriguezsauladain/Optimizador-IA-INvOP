import React from 'react';

const LinearProgrammingChart = ({ laptops, tablets, isFeasible, currentProfit }) => {
  const width = 800; 
  const height = 500;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  
  const maxX = 70;
  const maxY = 120;
  
  const scaleX = (x) => padding.left + (x / maxX) * (width - padding.left - padding.right);
  const scaleY = (y) => height - padding.bottom - (y / maxY) * (height - padding.top - padding.bottom);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full drop-shadow-sm" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="grid" width={(scaleX(10) - scaleX(0))} height={(scaleY(0) - scaleY(10))} patternUnits="userSpaceOnUse">
          <path d={`M ${(scaleX(10) - scaleX(0))} 0 L 0 0 0 ${(scaleY(0) - scaleY(10))}`} fill="none" stroke="#f8fafc" strokeWidth="2"/>
        </pattern>
        <linearGradient id="feasibleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
        </linearGradient>
        <clipPath id="chartArea">
          <rect x={padding.left} y={padding.top} width={width - padding.left - padding.right} height={height - padding.top - padding.bottom} />
        </clipPath>
      </defs>

      <rect x={padding.left} y={padding.top} width={width - padding.left - padding.right} height={height - padding.top - padding.bottom} fill="#ffffff" />
      <rect x={padding.left} y={padding.top} width={width - padding.left - padding.right} height={height - padding.top - padding.bottom} fill="url(#grid)" />

      <line x1={padding.left} y1={scaleY(0)} x2={width - padding.right + 15} y2={scaleY(0)} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={padding.left} y1={scaleY(0)} x2={padding.left} y2={padding.top - 15} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      
      <text x={width - padding.right + 15} y={scaleY(0) + 35} fontSize="14" fill="#64748b" fontWeight="bold" textAnchor="end">Laptops (x)</text>
      <text x={padding.left - 45} y={padding.top - 15} fontSize="14" fill="#64748b" fontWeight="bold" textAnchor="start">Tablets (y)</text>

      <polygon 
        points={`${scaleX(0)},${scaleY(0)} ${scaleX(0)},${scaleY(80)} ${scaleX(10)},${scaleY(80)} ${scaleX(50)},${scaleY(0)}`}
        fill="url(#feasibleGrad)"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <g clipPath="url(#chartArea)">
        <line x1={scaleX(17.5)} y1={scaleY(120)} x2={scaleX(62.5)} y2={scaleY(0)} stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4" opacity="0.6" />
        <line x1={scaleX(-5)} y1={scaleY(110)} x2={scaleX(60)} y2={scaleY(-20)} stroke="#a855f7" strokeWidth="3" opacity="0.9" />
        <line x1={scaleX(50)} y1={scaleY(-10)} x2={scaleX(50)} y2={scaleY(130)} stroke="#3b82f6" strokeWidth="3" opacity="0.8" />
        <line x1={scaleX(-10)} y1={scaleY(80)} x2={scaleX(80)} y2={scaleY(80)} stroke="#3b82f6" strokeWidth="3" opacity="0.8" />
        <line 
          x1={scaleX(-20)} 
          y1={scaleY((currentProfit - 200 * -20) / 100)} 
          x2={scaleX(80)} 
          y2={scaleY((currentProfit - 200 * 80) / 100)} 
          stroke="#ec4899" strokeWidth="4" strokeDasharray="10,6"
          className="transition-all duration-300"
        />
      </g>

      <text x={scaleX(51)} y={scaleY(115)} fill="#3b82f6" fontSize="13" fontWeight="bold">Demanda IA (x=50)</text>
      <text x={scaleX(52)} y={scaleY(82)} fill="#3b82f6" fontSize="13" fontWeight="bold">Demanda IA (y=80)</text>
      
      <g transform={`translate(${scaleX(20)}, ${scaleY(65)}) rotate(-48)`}>
        <text x="0" y="-8" fill="#a855f7" fontSize="13" fontWeight="bold">Límite Almacén (100m³)</text>
      </g>

      <g transform={`translate(${scaleX(45)}, ${scaleY(46)}) rotate(-68)`}>
        <text x="0" y="-8" fill="#f59e0b" fontSize="11" fontWeight="bold" opacity="0.6">Presupuesto ($50k)</text>
      </g>

      {[10, 20, 30, 40, 50, 60, 70].map(tick => (
        <g key={`x-${tick}`}>
          <line x1={scaleX(tick)} y1={scaleY(0)} x2={scaleX(tick)} y2={scaleY(0) + 6} stroke="#cbd5e1" strokeWidth="2" />
          <text x={scaleX(tick)} y={scaleY(0) + 22} fontSize="12" textAnchor="middle" fill="#64748b" fontWeight="600">{tick}</text>
        </g>
      ))}
      {[20, 40, 60, 80, 100, 120].map(tick => (
        <g key={`y-${tick}`}>
          <line x1={padding.left - 6} y1={scaleY(tick)} x2={padding.left} y2={scaleY(tick)} stroke="#cbd5e1" strokeWidth="2" />
          <text x={padding.left - 12} y={scaleY(tick) + 4} fontSize="12" textAnchor="end" fill="#64748b" fontWeight="600">{tick}</text>
        </g>
      ))}

      <g transform={`translate(${scaleX(laptops)}, ${scaleY(tablets)})`} className="transition-all duration-300">
        <circle cx="0" cy="0" r="8" fill={isFeasible ? "#10b981" : "#ef4444"} stroke="#ffffff" strokeWidth="3" className="shadow-lg drop-shadow-md" />
        <rect x="15" y="-28" width="115" height="28" rx="6" fill="#1e293b" opacity="0.95" />
        <text x="23" y="-9" fill="#ffffff" fontSize="13" fontWeight="bold" letterSpacing="0.5">Z = ${currentProfit.toLocaleString()}</text>
      </g>
    </svg>
  );
};

export default LinearProgrammingChart;
