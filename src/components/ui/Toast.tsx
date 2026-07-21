import React, { useEffect, useState } from "react";

interface IToastProps {
  message: string;
  duration?: number;
}

const Toast: React.FC<IToastProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md">
      {message}
    </div>
  );
};

export default Toast;
