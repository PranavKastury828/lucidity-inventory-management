export interface Product {
  id: string;
  title: string;      // Mapped from "name"
  category: string;
  price: number;      // Parsed from e.g. "$30"
  value: number;      // Parsed from e.g. "$150"
  quantity: number;
  disabled?: boolean; // indicates whether product is disabled
}
