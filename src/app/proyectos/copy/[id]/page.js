import Tarjeta from "@/components/contenedor";
import FormProyecto from "@/components/forms/proyecto";
import { auth } from "@/auth";
import { COPY } from "@/lib/constantes"


async function page({ params }) {
  const { user } = await auth()

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        COPIAR PROYECTO
      </h1>
      <FormProyecto id={Number(params.id)} userId={user.id} operacion={COPY} />    
    </Tarjeta>
  );
}

export default page;

