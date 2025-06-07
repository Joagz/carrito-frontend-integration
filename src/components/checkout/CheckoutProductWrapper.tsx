import { useProducts } from "../../hooks/useProduct"
import ProductList from "../product/ProductList";
import { ShowPrices } from "../product/ShowPrices";

export function CheckoutProductWrapper() {

    const [products] = useProducts();

    return <>
        <ProductList products={products} />
        <ShowPrices products={products}/>
    </>
}