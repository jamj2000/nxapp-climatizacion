import Proyecto from "@/components/proyecto";
import { auth } from "@/auth";
import { obtenerProyectosFiltrados } from "@/lib/data";
import { obtenerLocalidades } from "@/lib/data";
import Search from "@/components/search";

async function Proyectos({ query }) {
    const { user } = await auth();

    let proyectos = {}

    if (user?.role === "ADMIN")
        proyectos = await obtenerProyectosFiltrados({ include: { localidad: { include: { zona_climatica: true } } } }, query)
    else {
        proyectos = await obtenerProyectosFiltrados({ userId: user?.id, include: { localidad: { include: { zona_climatica: true } } } }, query)
    }
    const localidades = await obtenerLocalidades()

    return (
        <>
            <Search />

            <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
                {proyectos
                    ?.sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                    .map((proyecto) => (
                        <Proyecto key={proyecto.id} proyecto={proyecto} localidades={localidades} />
                    ))}
            </div>
        </>

    );

}

export default Proyectos;
