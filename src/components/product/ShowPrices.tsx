import type { Product } from "../../interface/Product";

interface Props {
  products: Product[]
}

export function ShowPrices({products}: Props) {
  return (
    <div className="flex w-full justify-between">
      <span className="font-bold text-xl">Subtotal:</span>
      <span>
        ${products.reduce((acc, cur) => acc + cur.price * cur.stock, 0)}
      </span>
    </div>
  );
}
