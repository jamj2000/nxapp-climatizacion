import FormLogout from "@/components/auth-forms/logout"
import Tarjeta from "@/components/contenedor";

async function page() {

  return (
    <div className="flex flex-col items-center justify-center">
      <Tarjeta>
        <h1 className="text-4xl text-center font-bold mb-4">¿Desea cerrar sesion?</h1>
        <FormLogout />
      </Tarjeta>
    </div>
  )

}

export default page;
