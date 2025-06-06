import CartProduct from "./CartProduct";
import type { Product } from "../../interface/Product";
import ProductList from "../product/ProductList";
import { ShowPrices } from "../product/ShowPrices";
import { useProducts } from "../../hooks/useProduct";

export default function CartProductSelector() {
  const [products, setProducts] = useProducts();

  function updateLocalStorage(updatedProducts: Product[]) {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function del(id: number) {
    updateLocalStorage(products.filter((p) => p.id != id));
  }

  function addOne(id: number) {
    const index = products.findIndex((p) => p.id == id);
    if (index >= 0) {
      const productsCopy = [...products];
      ++productsCopy[index].stock;
      updateLocalStorage(productsCopy);
    }
  }

  function removeOne(id: number) {
    const index = products.findIndex((p) => p.id == id);
    if (index > 0) {
      const productsCopy = [...products];
      --productsCopy[index].stock;
      updateLocalStorage(productsCopy);
    } else {
      // Si stock llega a 0, se elimina
      del(id);
    }
  }

  if (products.length == 0)
    return (
      <article className="flex flex-col flex-1 justify-center items-center h-screen">
        No hay productos en el carrito
      </article>
    );

  return (
    <article className="flex w-3/4 gap-10">
      <section className="flex flex-col flex-1/3 gap-3">
        {products.map((product) => (
          <CartProduct
            product={product}
            del={() => del(product.id)}
            removeOne={() => removeOne(product.id)}
            addOne={() => addOne(product.id)}
          />
        ))}
      </section>
      <section className="flex flex-col flex-1 gap-5 border rounded-sm p-2">
        <ShowPrices />
        <ul>
          <ProductList />
        </ul>
        <a
          className="w-full p-2 border hover:bg-stone-50 rounded-sm text-center"
          href="/checkout"
        >
          Proceder al pago
        </a>
      </section>
    </article>
  );
}
