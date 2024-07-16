import Formrecinto from "@/components/forms/recinto";
import { newRecinto } from "@/lib/actions-recinto";
import Tarjeta from "@/components/tarjetas/contenedor"
import { auth } from "@/auth";
import { getIdUsuario, getProyectosPorId } from "@/lib/actions-proyecto";


async function page() {
  const sesion = await auth();
  const { user } = sesion;
  const userId = await getIdUsuario(user?.email);
  const proyectos = await getProyectosPorId(userId);

  return (
    <Tarjeta>
      <h1 className="text-green-600 text-2xl font-bold text-center p-10">
        CREAR RECINTO
      </h1>
      <Formrecinto
        texto={"Crear recinto"}
        action={newRecinto}
        proyectos={proyectos} />

 
    </Tarjeta>
  );
}

export default page;
