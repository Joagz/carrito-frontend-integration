import { useEffect, useState } from "react";
import type { Product } from "../../interface/Product";

export function CheckoutProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("products");
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log(parsed)
        if (Array.isArray(parsed)) {
          setProducts(parsed);
        }
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }
  }, []);

  if (!products) return <div className="w-full flex justify-center items-center">Cargando...</div>;

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
            {products.map((product) => (
              <li key={product.id} className="flex justify-between gap-5">
                <div className="flex justify-between items-center">
                  <p className="line-clamp-1 overflow-ellipsis font-light">
                    {product.name}
                  </p>
                  <span className="text-sm">(x{product.stock})</span>
                </div>
                <p>
                  ${(product.price * product.stock).toLocaleString("es-ES")}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    );
}
