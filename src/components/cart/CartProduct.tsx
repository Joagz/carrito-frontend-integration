import type { Product } from "../../interface/Product";

interface Props {
    del: () => void;
    addOne: () => void;
    removeOne: () => void;
    product: Product
}


export default function CartProduct({ del, addOne, removeOne, product}: Props) {
    return (<div
        key={product.id}
        className="w-full flex gap-4 border rounded-sm p-2 justify-center items-center"
    >
        <img
            src={product.image}
            alt={"icon"}
            className="w-14 h-14 bg-stone-50 aspect-square object-contain"
        />
        <div className="flex flex-col flex-1">
            <p className="line-clamp-1 font-light">
                {product.name}
            </p>
            <div className="flex gap-10">
                <button onClick={() => del()} className="cursor-pointer text-blue-900">Eliminar</button>
                <button onClick={() => addOne()} className="cursor-pointer text-blue-900">Agregar 1u.</button>
                <button onClick={() => removeOne()} className="cursor-pointer text-blue-900">Quitar 1u.</button>
            </div>
        </div>
    </div>)
}