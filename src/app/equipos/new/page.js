import Tarjeta from "@/components/tarjetas/contenedor";
import Form from "@/components/forms/equipo";
import { newEquipo } from "@/lib/actions-equipo";
import { auth } from "@/auth";
import { getProyectosPorId } from "@/lib/actions-proyecto";


async function page() {
  const sesion = await auth();
  const { user } = sesion;
  const proyectos = await getProyectosPorId(user?.id)


  return (
    <Tarjeta>
      <h1 className="text-green-600 text-2xl font-bold text-center p-10">
        CREAR EQUIPO
      </h1>
      <Form
        texto={"Crear equipo"}
        proyectos={proyectos}
        action={newEquipo}
      />
    </Tarjeta>
  );
}

export default page;
