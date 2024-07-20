import FormProyecto from "@/components/forms/proyecto";
import TarjetaContenedor from "@/components/cards/contenedor";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TarjetaProyecto from "@/components/cards/proyecto";


export const dynamic = "force-dynamic";

async function page({ params }) {
  const { user } = await auth();

  const localidades = await prisma.localidad.findMany({ include: { zona_climatica: true } });

  const proyecto = await prisma.proyecto.findUnique({
    where: {
      id: Number(params.id),
    },
  });


  async function volver() {
    'use server'
    redirect('/proyectos')
  }

  return (
    // <div className="flex flex-col items-center justify-center -mt-10 text-blue-500">
    //   <div className="container items-center border-4 border-sky-400 dark:border-sky-700 p-8 rounded-md bg-gray-200/90 dark:bg-gray-900/90">
    <TarjetaContenedor>
      <FormProyecto
        texto={"Lista de proyectos"}
        userId={user.id}
        action={volver}
        localidades={localidades}
        proyecto={proyecto}
        disabled={true}
      />
    </TarjetaContenedor>

    //   </div>
    // </div>
  );
}

export default page;
