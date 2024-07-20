import TarjetaContenedor from "@/components/cards/contenedor"
import SkekeletonProyecto from "@/components/skeletons/proyecto"
import Link from "next/link"

export default function Skeleton() {
  return (
    <TarjetaContenedor>
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl">Proyectos</h1>
        <Link
          href="/proyectos/new"
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        > Crear Proyecto
        </Link>

      </div>
      <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
        <SkekeletonProyecto />
        <SkekeletonProyecto />
        <SkekeletonProyecto />
      </div>
    </TarjetaContenedor>
  )
}