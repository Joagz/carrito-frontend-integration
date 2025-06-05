import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import type { Product } from "../../interface/Product";



export default function CartProductSelector() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const saved = localStorage.getItem("products");
        console.log(saved)
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

    function updateLocalStorage(updatedProducts: Product[]) {
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    }

    function del(id: number) {
        updateLocalStorage(products.filter(p => p.id != id));
    }

    function addOne(id: number) {
        const index = products.findIndex(p => p.id == id);
        if (index >= 0) {
            const productsCopy = [...products];
            ++productsCopy[index].stock;
            updateLocalStorage(productsCopy);
        }
    }

    function removeOne(id: number) {
        const index = products.findIndex(p => p.id == id);
        if (index > 0) {
            const productsCopy = [...products];
            --productsCopy[index].stock;
            updateLocalStorage(productsCopy);
        } else {
            // Si stock llega a 0, se elimina
            del(id);
        }
    }

    if (products.length == 0) return (
        <article className="flex flex-col flex-1 justify-center items-center h-screen">
            No hay productos en el carrito
        </article>)

    return (<article className="flex w-3/4 gap-10">
        <section className="flex flex-col flex-1/3 gap-3">
            {products.map(product => <CartProduct
                product={product}
                del={() => del(product.id)}
                removeOne={() => removeOne(product.id)}
                addOne={() => addOne(product.id)} />)}
        </section>
        <section className="flex flex-col flex-1 gap-5 border rounded-sm p-2">
            <div className="flex w-full justify-between">
                <span className="font-bold text-xl">Subtotal:</span><span> ${products.reduce((acc, cur) => acc + cur.price * cur.stock, 0)}</span>
            </div>
            <ul>
                {
                    products.map(product => <li className="flex justify-between gap-5">
                        <div className="flex justify-between items-center">
                            <p className="line-clamp-1 overflow-ellipsis font-light">
                                {product.name}
                            </p><span className="text-sm">(x{product.stock})</span>
                        </div>
                        <p>${(product.price * product.stock).toLocaleString("es-ES")}</p>
                    </li>)
                }
            </ul>
            <a className="w-full p-2 border hover:bg-stone-50 rounded-sm text-center" href="/checkout">Proceder al pago</a>
        </section>
    </article>
    )




}