import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import type { Product } from "../../interface/Product";



export default function CartProductSelector() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const saved = localStorage.getItem("products");
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

    function del(id: number) {
        setProducts(products.filter(p => p.id != id));
    }

    function addOne(id: number) {
        const index = products.findIndex(p => p.id == id);
        if (index >= 0) {
            const productsCopy = [...products];
            ++productsCopy[index].stock;
            setProducts(productsCopy);
        }
    }

    function removeOne(id: number) {
        const index = products.findIndex(p => p.id == id);
        if (index >= 0) {
            const productsCopy = [...products];
            --productsCopy[index].stock;
            setProducts(productsCopy);
        }
    }

    if (products.length == 0) return (
        <article className="flex flex-col flex-1 justify-center items-center h-screen">
            No hay productos en el carrito
        </article>)

    return (<article className="flex w-3/4 gap-10">
        <section className="flex flex-col flex-1/3">
            {products.map(product => <CartProduct
                del={() => del(product.id)}
                removeOne={() => removeOne(product.id)}
                addOne={() => addOne(product.id)} />)}
        </section>
        <section className="flex flex-col-reverse flex-1 gap-5 border rounded-sm p-2">
            <div className="flex w-full justify-between">
                <span className="font-bold text-xl">Subtotal:</span><span> ${products.reduce((acc, cur) => acc + cur.price, 0)}</span>
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
        </section>
    </article>
    )




}