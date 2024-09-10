import { Suspense } from "react";
import Link from "next/link";
import TarjetaContenedor from "@/components/contenedor";
import Recintos from "@/components/recintos"
import SkeletonRecintos from "@/components/skeletons/recintos";
import Equipos from "@/components/equipos"
import SkeletonEquipos from "@/components/skeletons/equipos";
import { auth } from "@/auth";

async function Page({ params }) {
    const { user } = await auth()

    let busqueda = ""

    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl font-semibold">Recintos y Equipos</h1>
                {/* <Link
                    href="/proyectos/create"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                > Crear Proyecto
                </Link>
                {
                    user?.role === "ADMIN" &&
                    <input
                        className="ml-5 text-center"
                        defaultValue={busqueda}
                        placeholder="Busqueda de proyectos"
                    />
                } */}
            </div>
                   
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Recintos</h1>
                <Link
                    href="/recintos/create"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                > Crear Recinto
                </Link>

            </div>
            <Suspense fallback={<SkeletonRecintos />}>
                <Recintos proyectoId={Number(params.id)}/>
            </Suspense>


            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Equipos</h1>
                <Link
                    href="/equipos/create"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                > Crear Equipo
                </Link>

            </div>
            <Suspense fallback={<SkeletonEquipos />}>
                <Equipos proyectoId={Number(params.id)}/>
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;


