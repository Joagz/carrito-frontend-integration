import ProductList from "../product/ProductList";
import { useProducts } from "../../hooks/useProduct";

export function CheckoutProducts() {
  const [products, _] = useProducts();

  if (!products)
    return (
      <div className="w-full flex justify-center items-center">Cargando...</div>
    );

  if (products)
    return (
      <article className="w-full p-5 pl-0 flex">
        <section className="flex flex-col flex-1 gap-5 border rounded-sm p-2 h-fit">
          <div className="flex w-full justify-between">
            <span className="font-bold text-xl">Subtotal:</span>
            <span>
              {" "}
              ${products.reduce((acc, cur) => acc + cur.price * cur.stock, 0)}
            </span>
          </div>
          <ul>
            <ProductList />
          </ul>
        </section>
      </article>
    );
}
