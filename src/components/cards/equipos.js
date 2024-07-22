import TarjetaEquipo from "@/components/cards/equipo";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function Equipos({ proyectoId }) {
    const sesion = await auth();
    const { user } = sesion;

    let proyectos;
    let equipos;

    if (proyectoId) {
        const proyecto = await prisma.proyecto.findUnique({
            where: { userId: user?.id, id: proyectoId },
            include: {
                equipos: true
            }
        });
        equipos = proyecto.equipos
    }
    else {
        proyectos = await prisma.proyecto.findMany({
            where: { userId: user?.id },
            include: {
                equipos: true
            }
        });
        equipos = proyectos.map(proyecto => proyecto.equipos).flat()
    }

    // await create Promise((resolve) => setTimeout(resolve, 4000))

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