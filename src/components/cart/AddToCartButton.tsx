import type { Product } from "../../interface/Product";

interface Props {
    product: Product;
}

export function AddToCartButton({ product }: Props) {


    function addToCart(product: Product) {
        const stored = localStorage.getItem("products");
        let products: Product[] = [];

        if (stored) {
            try {
                products = JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing products from localStorage", e);
            }
        }

        const index = products.findIndex(p => p.id === product.id);

        if (index >= 0) {
            /*
                we ignore this section, the button state changes in the main page
            */
            return;
        } else {
            products.push({ ...product, stock: 1 });
        }

        localStorage.setItem("products", JSON.stringify(products));
        window.location.href = "/carrito"
    }

    return (
        <button
            onClick={() => addToCart(product)}
            className="border cursor-pointer hover:bg-stone-50 rounded-lg p-2"
        >
            Agregar al carrito
        </button>
    );
}
