import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
