import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        className="relative w-[90%] max-w-md rounded-lg shadow-lg"
        style={{ backgroundColor: "#292B27" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-500">
          <h2 className="text-xl font-bold" style={{ color: "#E0E2E0" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-accent text-2xl"
            style={{ color: "#C0DB4D" }}
          >
            &times;
          </button>
        </div>

        {/* Message */}
        <div className="p-6">
          <p className="text-sm" style={{ color: "#E0E2E0" }}>
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-500 space-x-4">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-semibold rounded"
            style={{ color: "#C0DB4D" }}
          >
            Cancel
          </button>
          {/* Confirm Button */}
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded font-semibold bg-accent text-background"
            style={{ backgroundColor: "#C0DB4D", color: "#161718" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
