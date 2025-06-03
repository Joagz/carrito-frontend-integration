import { useState } from "react";

export default function CantidadSelector() {
    const [cantidad, setCantidad] = useState(1);

    function sumarCantidad() {
        setCantidad(cantidad + 1);
    }

    function restarCantidad() {
        if (cantidad <= 1) return;
        setCantidad(cantidad - 1);
    }

    return (
        <div className="flex gap-2">
            <p>Cantidad: {cantidad}</p>
            <button className="h-6 w-6 cursor-pointer hover:bg-stone-50 border rounded-sm flex justify-center items-center" onClick={() => sumarCantidad()}> <p>+</p></button>
            <button className="h-6 w-6 cursor-pointer hover:bg-stone-50 border rounded-sm flex justify-center items-center" onClick={() => restarCantidad()}><p>-</p></button>
        </div>
    );
}
