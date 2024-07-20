import TarjetaEquipo from "@/components/cards/equipo";
import { auth } from "@/auth";


async function Equipos() {
    const sesion = await auth();
    const { user } = sesion;
    // const proyectos = await getProyectosConInfo({ userId: user?.id, recintos: true, equipos: true });
    const proyectos = await prisma.proyecto.findMany({
        where: { userId: user?.id },
        include: {
          equipos: true
        }
      });

    const equipos = proyectos.map(proyecto => proyecto.equipos).flat()

    // await new Promise((resolve) => setTimeout(resolve, 4000))

    return (

        <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
            {equipos
                .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                .map((equipo) => (
                    <TarjetaEquipo key={equipo.id} equipo={equipo} />
                ))}
        </div>

    )
}

export default Equipos