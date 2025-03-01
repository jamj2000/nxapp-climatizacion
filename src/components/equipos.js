import TarjetaEquipo from "@/components/equipo";
import { auth } from "@/auth";
import { getProyecto, getProyectos } from "@/lib/actions/proyecto";


async function Equipos({ proyectoId }) {
    const sesion = await auth();
    const { user } = sesion;

    const proyectos = await getProyectos({ id: proyectoId, userId: user?.id, include: { equipos: true } })
    let equipos;

    if (proyectoId) {
        const proyecto = await getProyecto({ id: proyectoId, include: { equipos: true } })
        equipos = proyecto?.equipos
    }
    else {
        equipos = proyectos?.map(proyecto => proyecto.equipos).flat()
    }

    // await new Promise((resolve) => setTimeout(resolve, 4000))

    return (

        <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
            {
                equipos
                    ?.sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                    .map((equipo) => (
                        <TarjetaEquipo key={equipo.id} equipo={equipo} proyectos={proyectos} />
                    ))}
        </div>

    )
}

export default Equipos

