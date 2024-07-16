import Tarjeta from "@/components/tarjetas/contenedor";
import Form from "@/components/forms/equipo";
import { deleteEquipo } from "@/lib/actions-equipo";
import { prisma } from "@/lib/prisma";
import { getProyectosPorId } from "@/lib/actions-proyecto";
import { auth } from "@/auth";


async function page({ params }) {
  const sesion = await auth();
  const { user } = sesion;
  const proyectos = await getProyectosPorId(user?.id)
  const equipo = await prisma.equipo.findUnique({
    where: {
      id: Number(params.id),
    },
    include: { proyecto: true }
  });

  return (
    <Tarjeta>
      <h1 className="text-red-500 text-2xl font-bold text-center p-10">
        ELIMINAR EQUIPO
      </h1>
      <Form
        // id={Number(params?.id)}
        action={deleteEquipo}
        texto={"Eliminar equipo"}
        disabled={true}
        equipo={equipo}
        proyectos={proyectos}
      />
    </Tarjeta>
  );
}

export default page;
