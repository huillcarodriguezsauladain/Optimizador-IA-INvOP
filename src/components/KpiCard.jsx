import React from 'react';

const KpiCard = ({ title, value, icon, color = "text-slate-800", subtext }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{title}</span>
      {icon}
    </div>
    <div className={`text-2xl font-black ${color}`}>{value}</div>
    {subtext && <div className="text-xs text-slate-400 mt-1">{subtext}</div>}
  </div>
);

export default KpiCard;
