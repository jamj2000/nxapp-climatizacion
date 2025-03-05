import { auth } from "@/auth";
import Contenedor from "@/components/contenedor";
import { redirect } from "next/navigation";

async function page() {
  const sesion = await auth();

  if (!sesion) redirect('/auth/login')

  return (
    <Contenedor>
      <div className="flex flex-col gap-4 self-left h-full text-xl">
        <div className="flex items-center gap-4">
          {sesion?.user.image
            ? <img src={sesion.user.image} alt={sesion.user.name} className="size-20 rounded-full bg-white p-2" />
            : <img src="/images/user.svg" alt="Imagen por defecto" className="size-20 rounded-full bg-white p-2" />
          }

          <h1 className="text-4xl font-bold">🔐 Dashboard</h1>
        </div>
        <p>Nombre: {sesion?.user.name}</p>
        <p>Email: {sesion?.user.email}</p>
        <p>Rol: {sesion?.user.role}</p>

      </div>
    </Contenedor>
  );
}

export default page;
