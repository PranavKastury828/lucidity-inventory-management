import React, { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import {
  CubeIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const StatsWidgets: React.FC = () => {
  const { products } = useAppSelector((state) => state.inventory);

  const { totalProducts, totalValue, outOfStock, categoriesCount } =
    useMemo(() => {
      // Filter out disabled products
      const filteredProducts = products.filter((p) => !p.disabled);

      const totalProducts = filteredProducts.length;
      const totalValue = filteredProducts.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
      const outOfStock = filteredProducts.filter(
        (p) => p.quantity === 0
      ).length;
      const categories = new Set(filteredProducts.map((p) => p.category));
      const categoriesCount = categories.size;

      return { totalProducts, totalValue, outOfStock, categoriesCount };
    }, [products]);

  // Widget data
  const widgetData = [
    {
      heading: "Total Products",
      value: totalProducts,
      icon: CubeIcon,
    },
    {
      heading: "Total Store Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: CurrencyDollarIcon,
    },
    {
      heading: "Out of Stock",
      value: outOfStock,
      icon: ExclamationCircleIcon,
    },
    {
      heading: "Number of Categories",
      value: categoriesCount,
      icon: TagIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {widgetData.map(({ heading, value, icon: Icon }, index) => (
        <div
          key={index}
          className="p-4 rounded-lg shadow"
          style={{ backgroundColor: "#243325" }} // Background color
        >
          <div className="flex items-center mb-2">
            <Icon className="h-5 w-5 mr-2" style={{ color: "#E0E2E0" }} />{" "}
            {/* Icon */}
            <h2 className="font-semibold text-sm" style={{ color: "#E0E2E0" }}>
              {heading}
            </h2>
          </div>
          <p className="text-2xl font-bold" style={{ color: "#E0E2E0" }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsWidgets;
