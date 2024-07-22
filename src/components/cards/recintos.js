import TarjetaRecinto from "@/components/cards/recinto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function Recintos({ proyectoId }) {
    const sesion = await auth();
    const { user } = sesion;

    let proyectos;
    let recintos;

    if (proyectoId) {
        const proyecto = await prisma.proyecto.findUnique({
            where: { userId: user?.id, id: proyectoId },
            include: {
                recintos: true
            }
        });
        recintos = proyecto.recintos
    }
    else {
        proyectos = await prisma.proyecto.findMany({
            where: { userId: user?.id },
            include: {
                recintos: true
            }
        });
        recintos = proyectos.map(proyecto => proyecto.recintos).flat()
    }

      // await create Promise((resolve) => setTimeout(resolve, 4000))

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

export default Recintos;
