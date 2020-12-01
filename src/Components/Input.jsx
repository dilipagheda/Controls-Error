import React from "react";

export default ({ label, children, disabled = false, value, onChange, Component = "input" }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <Component
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      placeholder={label}
      disabled={disabled}
      value={value}
      onChange={onChange}
    >
      {children}
    </Component>
  </div>
);
