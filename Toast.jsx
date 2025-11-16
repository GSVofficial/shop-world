import React, { useEffect, useState } from "react";
import "./Toast.css";

function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // allow fade-out animation
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  // Render nothing when message is empty AND fade-out done
  if (!message && !visible) return null;

  return (
    <div className={`toast ${visible ? "show" : "hide"}`}>
      {message}
    </div>
  );
}

export default Toast;
