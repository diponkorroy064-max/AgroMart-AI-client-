import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | "default"
  | "outline"
  | "secondary"
  | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const variants = {
    default:
      "bg-green-600 text-white hover:bg-green-700",

    outline:
      "border border-green-600 text-green-600 hover:bg-green-50",

    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200",

    destructive:
      "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",

    default: "h-11 px-6 text-base",

    lg: "h-12 px-8 text-lg",

    icon: "h-11 w-11",
  };

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        font-semibold
        transition-all
        duration-300
        shadow-md
        hover:shadow-lg
        disabled:opacity-50
        disabled:cursor-not-allowed
        cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    />
  );
};
