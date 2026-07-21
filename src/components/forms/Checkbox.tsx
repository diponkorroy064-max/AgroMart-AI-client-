import React from "react";

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<ICheckboxProps> = ({ label, ...props }) => {
  return (
    <div className="flex items-center mb-4">
      <input type="checkbox" className="mr-2" {...props} />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
