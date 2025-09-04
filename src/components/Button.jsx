import React from "react";

const Button = ({
  children,
  type = "button",
  className = "",
  bgColor = "bg-orange-500",
  textColor = "text-gray-100",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${bgColor} ${textColor} ${className} 
        flex items-center justify-center gap-2 
        hover:${disabled ? '' : 'bg-opacity-90'} 
        hover:${disabled ? '' : 'transform'} 
        hover:${disabled ? '' : '-translate-y-0.5'} 
        transition-all font-medium md:font-bold duration-300 
        px-3 py-1.5 md:px-4 md:py-2 
        rounded-lg shadow cursor-pointer
        ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
