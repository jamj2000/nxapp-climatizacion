import TarjetaRecinto from "@/components/recinto";
import { auth } from "@/auth";
import { readProyecto, readProyectos } from "@/lib/actions/proyecto";

async function Recintos({ proyectoId }) {
    const sesion = await auth();
    const { user } = sesion;

    const proyectos = await readProyectos({userId: user?.id, include: { recintos: { include: { proyecto: true }}}});
    let recintos;

    if (proyectoId) {
        const proyecto = await readProyecto({id: proyectoId, include: {recintos:{ include: { proyecto: true }}}})
        recintos = proyecto?.recintos
    }
    else {        
        recintos = proyectos?.map(proyecto => proyecto.recintos).flat()
    }

    // await new Promise((resolve) => setTimeout(resolve, 4000))

    return (
        <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center mb-10">
            {recintos &&
                recintos
                    .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                    .map((recinto) => (
                        <TarjetaRecinto key={recinto.id} recinto={recinto} proyectos={proyectos} />
                    ))}
        </div>
    )
}

export default Recintos;
