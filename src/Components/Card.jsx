import React from "react";

export default ({ children, label, loading = false }) => (
  <div className="w-full max-w-lg">
    {label && (
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
    )}
    <div
      className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white relative"
      id={label}
    >
      {children}
      {loading && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
          <div className="absolute top-0 left-0 w-full h-full text-white flex justify-center items-center font-medium text-2xl">
            Loading...
          </div>
        </>
      )}
    </div>
  </div>
);
