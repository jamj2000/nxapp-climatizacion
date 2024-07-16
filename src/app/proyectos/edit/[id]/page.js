import FormProyecto from "@/components/forms/proyecto";
import { editProyecto } from "@/lib/actions-proyecto";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";


// export const dynamic = "force-dynamic";  // IS NEXTJS static OR dynamiv PER DEFAULT ??


async function page({ params }) {
  const { user } = await auth();


  const localidades = await prisma.localidad.findMany({ include: { zona_climatica: true } });

  const proyecto = await prisma.proyecto.findUnique({
    where: {
      id: Number(params.id),
    },
  });



  return (
    <div className="flex flex-col items-center justify-center -mt-10 text-blue-500">
      <div className="container items-center border-4 border-sky-400 dark:border-sky-700 p-8 rounded-md bg-gray-200/90 dark:bg-gray-900/90">
        <h1 className="text-2xl font-bold text-center p-10">
          ACTUALIZAR PROYECTO
        </h1>

        <FormProyecto
          texto={"Actualizar Proyecto"}
          userId={user.id}
          action={editProyecto}
          proyecto={proyecto}
          localidades={localidades}
        />
      </div>
    </div>
  );
}

export default page;
