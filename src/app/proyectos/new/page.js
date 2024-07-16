import FormProyecto from "@/components/forms/proyecto";
import { newProyecto } from "@/lib/actions-proyecto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";



async function page() {
  const { user } = await auth();

  const localidades = await prisma.localidad.findMany({ include: { zona_climatica: true } });

  return (
    <div className="flex flex-col items-center justify-center text-blue-500">
      <div className="container items-center border-4 border-sky-400 dark:border-sky-700 p-8 rounded-md bg-gray-200/90 dark:bg-gray-900/90">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-green-600 text-2xl font-bold text-center p-10">
            CREAR PROYECTO
          </h1>
        </div>
        <FormProyecto
          texto={"Crear Proyecto"}
          userId={user.id}
          action={newProyecto}
          localidades={localidades}
        />
      </div>
    </div>
  );
}

export default page;
