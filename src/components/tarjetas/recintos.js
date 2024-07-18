import Link from "next/link";
import Tarjeta from "@/components/tarjetas/contenedor";
import TarjetaRecinto from "@/components/tarjetas/recinto";
import { getProyectosConInfo } from "@/lib/actions-proyecto";
import { auth } from "@/auth";

// export const dynamic = "force-dynamic";

async function Page() {
    const sesion = await auth();
    const { user } = sesion;
    const proyectos = await getProyectosConInfo({ userId: user?.id, recintos: true, equipos: true });

    const recintos = proyectos.map(proyecto => proyecto.recintos).flat()

    // await new Promise((resolve) => setTimeout(resolve, 4000))

    return (
        <Tarjeta>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Recintos</h1>
                <Link
                    href="/recintos/new"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                > Crear recinto
                </Link>
            </div>
            <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center mb-10">
                {recintos
                    .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                    .map((recinto) => (
                        <TarjetaRecinto key={recinto.id} recinto={recinto} />
                    ))}
            </div>

        </Tarjeta>
    );
}

export default Page;
