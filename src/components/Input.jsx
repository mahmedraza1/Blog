import React, { useId, forwardRef } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="flex items-center gap-4">
        {label && (
          <label htmlFor={id} className="inline-block mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`border border-gray-300 rounded-md p-2 ${className}`}
          {...props}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
