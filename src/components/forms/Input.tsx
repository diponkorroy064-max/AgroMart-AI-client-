import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`
            w-full
            rounded-xl
            border
            px-4
            py-3
            text-gray-800
            bg-white
            shadow-sm
            outline-none
            transition-all
            duration-200
            placeholder:text-gray-400
            focus:border-green-600
            focus:ring-4
            focus:ring-green-100
            ${error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300"
            }
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
