import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deleteProduct,
  disableProduct,
} from "../features/inventory/inventorySlice";
import EditModal from "./EditModal";
import ConfirmDialog from "./ConfirmDialog";
import { Product } from "../features/inventory/types";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

function ProductTable() {
  const dispatch = useAppDispatch();
  const { products, isAdmin } = useAppSelector((state) => state.inventory);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetProductId, setTargetProductId] = useState<string | null>(null);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (productId: string) => {
    setTargetProductId(productId);
    setConfirmOpen(true);
  };

  const handleDisableClick = (productId: string) => {
    dispatch(disableProduct(productId));
  };

  const confirmDelete = () => {
    if (targetProductId) {
      dispatch(deleteProduct(targetProductId));
    }
    setConfirmOpen(false);
    setTargetProductId(null);
  };

  return (
    <div className="bg-[#212124] rounded-lg shadow p-4 pb-0">
      {/* Table */}
      <table className="table-auto w-full border-collapse">
        {/* Table Head */}
        <thead>
          <tr>
            {["Title", "Category", "Price", "Value", "Quantity", "Actions"].map(
              (header, index) => (
                <th
                  key={header}
                  className={`py-2 px-2 ${
                    index === 0
                      ? "text-left"
                      : index === 5
                      ? "text-right"
                      : "text-center"
                  }`}
                >
                  <span
                    className="inline-block px-2 py-1 rounded"
                    style={{
                      backgroundColor: "#161718",
                      color: "#C0DB4D",
                      fontWeight: "bold",
                    }}
                  >
                    {header}
                  </span>
                </th>
              )
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={`border-t last:border-0 ${
                product.disabled ? "line-through opacity-50" : ""
              }`}
              style={{
                borderColor: "#444", // Dull gray border
                borderWidth: "1px 0",
              }}
            >
              {/* Left-aligned Title */}
              <td
                className="py-4 px-2 text-left"
                style={{ color: product.disabled ? "#8C8E8A" : "#E0E2E0" }}
              >
                {product.title}
              </td>
              {/* Center-aligned Columns */}
              <td
                className="py-4 px-2 text-center"
                style={{ color: product.disabled ? "#8C8E8A" : "#E0E2E0" }}
              >
                {product.category}
              </td>
              <td
                className="py-4 px-2 text-center"
                style={{ color: product.disabled ? "#8C8E8A" : "#E0E2E0" }}
              >
                ${product.price}
              </td>
              <td
                className="py-4 px-2 text-center"
                style={{ color: product.disabled ? "#8C8E8A" : "#E0E2E0" }}
              >
                ${product.value}
              </td>
              <td
                className="py-4 px-2 text-center"
                style={{ color: product.disabled ? "#8C8E8A" : "#E0E2E0" }}
              >
                {product.quantity}
              </td>
              {/* Right-aligned Actions */}
              <td
                className="py-4 px-2 text-right flex justify-end items-center space-x-2"
                style={{ color: product.disabled ? "#8C8E8A" : "#E0E2E0" }}
              >
                {/* Edit Icon */}
                <button
                  onClick={() => handleEditClick(product)}
                  disabled={!isAdmin || product.disabled}
                  className={`p-1 rounded hover:bg-gray-600 ${
                    (!isAdmin || product.disabled) && "cursor-not-allowed"
                  }`}
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                {/* Delete Icon */}
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  disabled={!isAdmin || product.disabled}
                  className={`p-1 rounded hover:bg-gray-600 ${
                    (!isAdmin || product.disabled) && "cursor-not-allowed"
                  }`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                {/* Disable Icon */}
                <button
                  onClick={() => handleDisableClick(product.id)}
                  disabled={!isAdmin}
                  className={`p-1 rounded hover:bg-gray-600 ${
                    !isAdmin && "cursor-not-allowed"
                  }`}
                >
                  <EyeSlashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedProduct && (
        <EditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={selectedProduct}
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}

export default ProductTable;
