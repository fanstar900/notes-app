import React, { useEffect } from "react";

const Toast = ({ message, isShown, type, onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isShown, onClose]);

  if (!isShown) return null;

  const getBackgroundClass = () => {
    switch (type) {
      case "success":
        return "bg-success text-white";
      case "error":
        return "bg-danger text-white";
      case "info":
        return "bg-info text-dark";
      case "warning":
        return "bg-warning text-dark";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div
      className={`toast show position-fixed top-0 end-0 m-3 ${getBackgroundClass()}`}
      style={{ zIndex: 9999, minWidth: "250px", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
    >
      <div className="toast-body d-flex justify-content-between align-items-center">
        <span>{message}</span>
        <button
          type="button"
          className="btn-close btn-close-white ms-2 mb-1"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Toast;
