import { useEffect, useState } from "react";
import type { Product } from "../interface/Product";

export function useProducts(): [
  Product[],
  React.Dispatch<React.SetStateAction<Product[]>>,
  (id: number) => void,
  (id: number) => void,
  (id: number) => void,
] {
  const [products, setProducts] = useState<Product[]>([]);

  function updateLocalStorage(updatedProducts: Product[]) {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function del(id: number) {
    updateLocalStorage(products.filter((p) => p.id != id));
  }

  function addOne(id: number) {
    const index = products.findIndex((p) => p.id === id);
    if (index >= 0) {
      const productsCopy = [...products];
      productsCopy[index] = {
        ...productsCopy[index],
        stock: productsCopy[index].stock + 1,
      };
      updateLocalStorage(productsCopy);
    }
  }

  function removeOne(id: number) {
    const index = products.findIndex((p) => p.id === id);
    if (index >= 0) {
      const productsCopy = [...products];
      const currentProduct = productsCopy[index];
      if (currentProduct.stock > 1) {
        productsCopy[index] = {
          ...currentProduct,
          stock: currentProduct.stock - 1,
        };
        updateLocalStorage(productsCopy);
      } else {
        // stock will become 0 or less, so remove item
        del(id);
      }
    }
  }


  useEffect(() => {
    const saved = localStorage.getItem("products");
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

  return [products, setProducts, addOne, removeOne, del];
}
