import { useEffect, useState } from "react";
import { AddToCartButton } from "./AddToCartButton";
import type { Product } from "../../interface/Product";

interface Props {
    product: Product;
}

export function AddToCartWrapper({ product }: Props) {
    const [productExists, setProductExists] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("products");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setProductExists(parsed.some((p: Product) => p.id === product.id));
                }
            }
        } catch (e) {
            console.error("Error accessing localStorage:", e);
        }
    }, [product.id]);

    return productExists ? (
        <a
            href="/carrito"
            className="border cursor-pointer text-center w-full bg-slate-50 hover:bg-stone-50 rounded-lg p-2"
        >
            Ir al carrito
        </a>
    ) : (
        <AddToCartButton product={product} />
    );
}
