import { editRecinto } from "@/lib/actions-recinto";
import Tarjeta from "@/components/tarjetas/contenedor";
import FormRecinto from "@/components/forms/recinto";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getIdUsuario, getProyectosPorId } from "@/lib/actions-proyecto";


export const dynamic = "force-dynamic";


async function page({ params }) {
  const recinto = await prisma.recinto.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      proyecto: true,
    },
  });

  // const { proyecto } = recinto;

  const sesion = await auth();
  const { user } = sesion;
  const userId = await getIdUsuario(user?.email);
  const proyectos = await getProyectosPorId(userId);

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        ACTUALIZAR RECINTO
      </h1>
      <FormRecinto
        texto={"Actualizar recinto"}
        action={editRecinto}
        recinto={recinto}
        proyectos={proyectos}
      />

    </Tarjeta>
  );
}

export default page;
