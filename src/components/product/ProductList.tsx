import type { Product } from "../../interface/Product";
interface Props {
  products: Product[]
}

export default function ({ products }: Props) {
  return (
    <>
      {products.map((product) => (
        <li key={product.id} className="flex justify-between gap-5">
          <div className="flex justify-between items-center">
            <p className="line-clamp-1 overflow-ellipsis font-light">
              {product.name}
            </p>
            <span className="text-sm">(x{product.stock})</span>
          </div>
          <p>${(product.price * product.stock).toLocaleString("es-ES")}</p>
        </li>
      ))}
    </>
  );
}
