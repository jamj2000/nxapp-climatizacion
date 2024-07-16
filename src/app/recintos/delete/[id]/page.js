import Tarjeta from "@/components/tarjetas/contenedor";
import FormRecinto from "@/components/forms/recinto";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getProyectosPorId } from "@/lib/actions-proyecto";
import { deleteRecinto } from "@/lib/actions-recinto";

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


  const sesion = await auth();
  const { user } = sesion;
  const proyectos = await getProyectosPorId(user?.id);


  return (
    <Tarjeta>
      <h1 className="text-red-500 text-2xl font-bold text-center p-10">
        ELIMINAR RECINTO
      </h1>
      <FormRecinto
        texto={"Eliminar Recinto"}
        recinto={recinto}
        proyectos={proyectos}
        action={deleteRecinto}
        disabled={true}

      />

    </Tarjeta>
  );
}

export default page;
