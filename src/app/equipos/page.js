import Link from "next/link";
import TarjetaContenedor from "@/components/tarjetas/contenedor";
import TarjetaEquipo from "@/components/tarjetas/equipo";
import SkeletonEquipo from "@/components/skeletons/equipo";
import { auth } from "@/auth";
import { Suspense } from "react";
import { getProyectosConInfo } from "@/lib/actions-proyecto";


export const dynamic = "force-dynamic";

async function Page() {
    const sesion = await auth();
    const { user } = sesion;
    const proyectos = await getProyectosConInfo({ userId: user?.id, recintos: true, equipos: true });

    const equipos = proyectos.map(proyecto => proyecto.equipos).flat()


    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Equipos</h1>
                <Link
                    href="/equipos/new"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Crear Equipo
                </Link>

            </div>
            <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
                {equipos
                    .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                    .map((equipo) => (
                        <Suspense key={equipo.id} fallback={<SkeletonEquipo />}>
                            <TarjetaEquipo equipo={equipo} />
                        </Suspense>
                    ))}
            </div>

        </TarjetaContenedor>
    );
}

export default Page;
