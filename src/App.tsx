import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchInventory } from "./features/inventory/inventorySlice";
import Navbar from "./components/Navbar";
import StatsWidgets from "./components/StatsWidgets";
import ProductTable from "./components/ProductTable";
import Heading from "./components/Heading";

function App() {
  const dispatch = useAppDispatch();
  const { loading, error, products } = useAppSelector(
    (state) => state.inventory
  );

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto py-6">
        <Heading title="Inventory Stats" />
        {/* Error & Loading states */}
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {loading && <p>Loading inventory...</p>}

        {/* Only render stats and table if we have products */}
        {!loading && !error && products.length > 0 && (
          <>
            <StatsWidgets />
            <ProductTable />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
