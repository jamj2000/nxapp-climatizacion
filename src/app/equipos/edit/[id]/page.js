
import { getProyectosPorId } from "@/lib/actions-proyecto";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import FormEquipo from "@/components/forms/equipo";
import Tarjeta from "@/components/tarjetas/contenedor";
import { editEquipo } from "@/lib/actions-equipo";

export const dynamic = "force-dynamic";

async function Page({ params }) {
  const sesion = await auth();
  const { user } = sesion;
  const proyectos = await getProyectosPorId(user?.id)
  const equipo = await prisma.equipo.findUnique({
    where: {
      id: Number(params.id),
    },
    include: { proyecto: true }
  });

  if (!equipo) {
    redirect("/equipos");
  }


  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        ACTUALIZAR EQUIPO
      </h1>
      <FormEquipo
        texto={"Actualizar equipo"}
        equipo={equipo}
        proyectos={proyectos}
        action={editEquipo}
      />
    </Tarjeta>

  );
}

export default Page;
