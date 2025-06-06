import { useEffect, useState } from "react";
import type { Product } from "../interface/Product";

export function useProducts(): [
  Product[],
  React.Dispatch<React.SetStateAction<Product[]>>
] {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    console.log(saved);
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setProducts(parsed as Product[]);
        }
      } catch (e) {
        console.error("Failed to parse products from localStorage", e);
      }
    }
  }, []);

  return [products, setProducts];
}
