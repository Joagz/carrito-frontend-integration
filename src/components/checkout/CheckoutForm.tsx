import { useForm } from "react-hook-form";

export function CheckoutForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: {}) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-5 w-full"
    >
      <input
        className="w-full p-2 border rounded-sm"
        {...register("card_number", {
          required: true,
        })}
        type="text"
        placeholder="0000 0000 0000 0000"
      />
      {errors.card_number && errors.card_number.type == "required" && (
        <p className="text-red-700 font-light">Este campo es obligatorio</p>
      )}
      <input
        className="w-full p-2 border rounded-sm"
        {...register("fullname", {
          required: true,
        })}
        type="text"
        placeholder="Nombre y apellido"
      />
      {errors.fullname && errors.fullname.type == "required" && (
        <p className="text-red-700 font-light">Este campo es obligatorio</p>
      )}
      <div className="flex gap-3">
        <input
          className="w-full p-2 border rounded-sm"
          {...register("expiration", {
            required: true,
          })}
          type="text"
          placeholder="Vencimiento"
        />
        {errors.expiration && errors.expiration.type == "required" && (
          <p className="text-red-700 font-light">Este campo es obligatorio</p>
        )}
        <input
          className="w-full p-2 border rounded-sm"
          {...register("security_code", {
            required: true,
          })}
          type="text"
          placeholder="Código de seguridad"
        />
        {errors.security_code && errors.security_code.type == "required" && (
          <p className="text-red-700 font-light">Este campo es obligatorio</p>
        )}
      </div>
      <input
        className="w-full p-2 border rounded-sm"
        {...register("province", {
          required: true,
        })}
        type="text"
        placeholder="Provincia"
      />
      {errors.province && errors.province.type == "required" && (
        <p className="text-red-700 font-light">Este campo es obligatorio</p>
      )}
      <input
        className="w-full p-2 border rounded-sm"
        {...register("city", {
          required: true,
        })}
        type="text"
        placeholder="Localidad"
      />
      {errors.city && errors.city.type == "required" && (
        <p className="text-red-700 font-light">Este campo es obligatorio</p>
      )}
      <input
        className="w-full p-2 border rounded-sm"
        {...register("address", {
          required: true,
        })}
        type="text"
        placeholder="Domicilio/Calle"
      />
      {errors.address && errors.address.type == "required" && (
        <p className="text-red-700 font-light">Este campo es obligatorio</p>
      )}
      <button className="w-full cursor-pointer p-2 border rounded-sm">
        Confirmar pago
      </button>
    </form>
  );
}
