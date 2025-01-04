import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";

interface InventoryState {
  products: Product[];
  loading: boolean;
  error: string | null;
  isAdmin: boolean; // toggle between admin/user
}

const initialState: InventoryState = {
  products: [],
  loading: false,
  error: null,
  isAdmin: true, // default to admin, can switch from UI
};

// Utility to parse a $-prefixed string into a number
function parsePrice(str: string) {
  if (!str) return 0;
  return parseFloat(str.replace("$", "")) || 0;
}

// Async thunk to fetch inventory from API
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const response = await fetch(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch inventory data");
    }
    const data = await response.json();
    
    // Transform each item from the API into our local Product shape
    return data.map((item: any) => ({
      id: crypto.randomUUID(),       // generate a random ID
      title: item.name ?? "",        // map "name" → "title"
      category: item.category ?? "",
      price: parsePrice(item.price), // parse "$30" → 30
      value: parsePrice(item.value), // parse "$150" → 150
      quantity: Number(item.quantity) || 0,
      disabled: false,
    })) as Product[];
  }
);

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    // Switch between admin/user mode
    toggleAdminMode(state) {
      state.isAdmin = !state.isAdmin;
    },
    // Delete product
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    // Disable product
    disableProduct(state, action: PayloadAction<string>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.disabled = !product.disabled;
      }
    },
    // Edit product
    editProduct(state, action: PayloadAction<Product>) {
  const updatedProduct = action.payload;
  const index = state.products.findIndex((p) => p.id === updatedProduct.id);
  if (index >= 0) {
    state.products[index] = {
      ...state.products[index],
      ...updatedProduct,
      value: updatedProduct.price * updatedProduct.quantity, // Recalculate value
    };
  }
},


  },
  extraReducers: (builder) => {
    builder.addCase(fetchInventory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload; // already includes `disabled: false`
    });
    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const {
  toggleAdminMode,
  deleteProduct,
  disableProduct,
  editProduct,
} = inventorySlice.actions;

export default inventorySlice.reducer;
