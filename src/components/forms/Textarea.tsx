import React from "react";

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<ITextareaProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <textarea
        className={`w-full px-3 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      ></textarea>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
