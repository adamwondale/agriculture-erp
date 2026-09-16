import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition duration-150 disabled:opacity-50";
  const styles = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-slate-800 text-white hover:bg-slate-900",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
