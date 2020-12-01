import React from "react";

export default ({ children, disabled = false, onClick, type, value, className = "", Component = "button" }) => (
  <Component
    className={`bg-purple-700 text-white tracking-wider py-2 rounded w-full uppercase cursor-pointer ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-800"
    }`}
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    type={type}
    value={value}
  >
    {children}
  </Component>
);
