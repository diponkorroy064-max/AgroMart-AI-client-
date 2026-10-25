import React, { useEffect, useState } from "react";

interface IToastProps {
  message: string;
  duration?: number;
}

export default function Toast({ message, duration = 3000 }: IToastProps) {
  const [visible, setVisible] = useState(Boolean(message));
  const [prevMessage, setPrevMessage] = useState(message);

  if (prevMessage !== message) {
    setPrevMessage(message);
    setVisible(Boolean(message));
  }

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md">
      {message}
    </div>
  );
}

