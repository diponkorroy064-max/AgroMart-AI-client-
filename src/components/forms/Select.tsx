import React from "react";

interface ISelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={`
            w-full
            rounded-xl
            border
            px-4
            py-3
            bg-white
            text-gray-800
            shadow-sm
            outline-none
            transition-all
            duration-200
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
        >
          <option value="">Select a role</option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
