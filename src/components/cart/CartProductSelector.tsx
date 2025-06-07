import CartProduct from "./CartProduct";
import ProductList from "../product/ProductList";
import { ShowPrices } from "../product/ShowPrices";
import { useProducts } from "../../hooks/useProduct";

export default function CartProductSelector() {
  const [products, _, addOne, removeOne, del] = useProducts();

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
            key={product.id}
            product={product}
            del={() => del(product.id)}
            removeOne={() => removeOne(product.id)}
            addOne={() => addOne(product.id)}

          />
        ))}
      </section>
      <section className="flex flex-col flex-1 gap-5 border rounded-sm p-2">
        <ShowPrices products={products} />
        <ul>
          <ProductList products={products} />
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
