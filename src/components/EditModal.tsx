import React, { useState, useEffect } from "react";
import { Product } from "../features/inventory/types";
import { useAppDispatch } from "../app/hooks";
import { editProduct } from "../features/inventory/inventorySlice";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const EditModal: React.FC<EditModalProps> = ({ open, onClose, product }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Product>(product);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(product); // Reset form data when modal opens
    }
  }, [open, product]);

  useEffect(() => {
    // Validate all fields
    setIsValid(
      formData.title.trim() !== "" &&
        formData.category.trim() !== "" &&
        formData.price > 0 &&
        formData.quantity >= 0
    );
  }, [formData]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    // Dispatch updated product to Redux with dynamically calculated value
    dispatch(
      editProduct({ ...formData, value: formData.price * formData.quantity })
    );
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        className="relative w-[90%] max-w-3xl aspect-video rounded-lg shadow-lg"
        style={{ backgroundColor: "#292B27" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-500">
          <div>
            <h2 className="text-xl font-bold" style={{ color: "#E0E2E0" }}>
              Edit Product
            </h2>
            <p className="text-sm" style={{ color: "#E0E2E0" }}>
              {product.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-accent text-2xl"
            style={{ color: "#C0DB4D" }}
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: "#E0E2E0" }}
            >
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#3F413D] text-[#5F605D] placeholder-[#5F605D]"
              placeholder={product.title || "Enter product title"}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: "#E0E2E0" }}
            >
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#3F413D] text-[#5F605D] placeholder-[#5F605D]"
              placeholder={product.category || "Enter product category"}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: "#E0E2E0" }}
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#3F413D] text-[#5F605D] placeholder-[#5F605D]"
              placeholder={product.price.toString() || "Enter price"}
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: "#E0E2E0" }}
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#3F413D] text-[#5F605D] placeholder-[#5F605D]"
              placeholder={product.quantity.toString() || "Enter quantity"}
              required
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-500 space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-semibold rounded"
            style={{ color: "#C0DB4D" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`px-4 py-2 rounded font-semibold ${
              isValid
                ? "bg-accent text-background cursor-pointer"
                : "bg-gray-500 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
