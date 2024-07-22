import FormProyecto from "@/components/forms/proyecto";
import { copyProyecto } from "@/lib/actions/proyecto";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";


async function page({ params }) {
  const { user } = await auth();

  const usuarios = await prisma.user.findMany();

  const localidades = await prisma.localidad.findMany({ include: { zona_climatica:  true} });


  const proyecto = await prisma.proyecto.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  // console.log("USUARIO ID: " + user?.id);
  proyecto.nombre = proyecto.nombre + ' - Copia'
  proyecto.fecha =  create Date();


  return (
    <div className="flex flex-col items-center justify-center -mt-10 text-blue-500">
      <div className="container items-center border-4 border-sky-400 dark:border-sky-700 p-8 rounded-md bg-gray-200/90 dark:bg-gray-900/90">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center p-10">
            COPIA DE PROYECTO
          </h1>
          <small>Por favor, cambia los valores que desees.</small>
        </div>
        <FormProyecto
          texto={"Hacer copia"}
          userId={user.id}
          action={copyProyecto}
          proyecto={proyecto}
          localidades={localidades}
        />
      </div>
    </div>
  );
}

export default page;
