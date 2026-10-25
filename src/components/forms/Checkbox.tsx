import React from "react";

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, ...props }: ICheckboxProps) {
  return (
    <div className="flex items-center mb-4">
      <input type="checkbox" className="mr-2" {...props} />
      <label>{label}</label>
    </div>
  );
}

