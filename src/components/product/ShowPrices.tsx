import { useProducts } from "../../hooks/useProduct";

export function ShowPrices() {
  const [products, _] = useProducts();

  return (
    <div className="flex w-full justify-between">
      <span className="font-bold text-xl">Subtotal:</span>
      <span>
        ${products.reduce((acc, cur) => acc + cur.price * cur.stock, 0)}
      </span>
    </div>
  );
}
