import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose} // click outside closes modal
    >
      <div
        className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full"
        style={{ fontFamily: "Nunito" }}
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
}
