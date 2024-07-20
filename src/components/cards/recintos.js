import TarjetaRecinto from "@/components/cards/recinto";
import { auth } from "@/auth";


async function Page() {
    const sesion = await auth();
    const { user } = sesion;
    // const proyectos = await getProyectosConInfo({ userId: user?.id, recintos: true, equipos: true });
    const proyectos = await prisma.proyecto.findMany({
        where: { userId: user?.id },
        include: {
          recintos: true
        }
      });

    const recintos = proyectos.map(proyecto => proyecto.recintos).flat()

    // await new Promise((resolve) => setTimeout(resolve, 4000))

    return (
        <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center mb-10">
            {recintos
                .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                .map((recinto) => (
                    <TarjetaRecinto key={recinto.id} recinto={recinto} />
                ))}
        </div>
    )
}

export default Page;
