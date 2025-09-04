import React from "react";

const Button = ({
  children,
  type = "button",
  className = "",
  bgColor = "bg-orange-500",
  textColor = "text-gray-100",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} ${className} flex items-center justify-center gap-2 bg-orange-500 hover:-translate-0.5 hover:bg-orange-500/90 transition-all font-bold duration-300 px-4 py-2 rounded-lg shadow cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
