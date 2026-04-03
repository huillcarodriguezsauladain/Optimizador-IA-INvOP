import React from 'react';

const StatusBadge = ({ label, ok }) => (
  <div className="flex items-center justify-between text-xs font-medium">
    <span className="text-slate-600">{label}</span>
    <span className={`px-2 py-0.5 rounded-full ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {ok ? 'CUMPLE' : 'CRÍTICO'}
    </span>
  </div>
);

export default StatusBadge;
