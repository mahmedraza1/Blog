import React, { useId, forwardRef, use } from "react";

const Select = ({ label, className = "", options, ...props }, ref) => {
  const id = useId();
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`border border-gray-300 rounded-md p-2 ${className}`}
        {...props}
        id={id}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(Select);
