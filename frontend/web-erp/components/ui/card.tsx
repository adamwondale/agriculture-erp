import React from 'react';

export const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${className}`}>
    <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
    {children}
  </div>
);
