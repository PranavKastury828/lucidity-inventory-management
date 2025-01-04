import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleAdminMode } from "../features/inventory/inventorySlice";

function Navbar() {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state) => state.inventory.isAdmin);

  const handleToggle = () => {
    dispatch(toggleAdminMode());
  };

  return (
    <nav className="bg-background shadow px-4 py-3 flex justify-between items-center">
      <div>
        {/* <h1 className="text-2xl font-bold text-text">Inventory Management</h1> */}
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-text">
          {isAdmin ? "Admin View" : "User View"}
        </span>
        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:bg-background after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
          ></div>
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
