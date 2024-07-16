import Tarjeta from "@/components/tarjetas/contenedor";
import Link from "next/link";
import { getProyecto } from "@/lib/actions-proyecto";
import TarjetaRecinto from "@/components/tarjetas/recinto";
import TarjetaEquipo from "@/components/tarjetas/equipo";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

async function Page({ params }) {
  const proyecto = await getProyecto(params.id);
  // console.log("PROYECTO", proyecto);

  if (!proyecto) {
    redirect("/proyectos");
  }

  const { recintos } = proyecto; // desestructuracion es super mega util
  const { equipos } = proyecto;


  return (
    <Tarjeta>
      <h1 className="text-4xl text-center mb-6">Proyecto {proyecto.nombre}</h1>
      <div className="flex justify-between mb-6">

        <h3 className="font-bold text-3xl mb-2">Recintos</h3>

        <Link
          href="/recintos/new"
          className="inline-flex items-center px-5 py-3  font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Crear recinto
        </Link>
      </div>
      <div className="flex flex-wrap gap-5 mb-10 justify-center">
        {recintos.map((recinto) => (
          <TarjetaRecinto key={recinto.id} recinto={recinto} />
        ))}
      </div>
      <div className="flex justify-between mb-6">

        <h3 className="font-bold text-3xl mb-2">Equipos</h3>

          <Link
            href="/equipos/new"
            className="inline-flex items-center px-5 py-3  font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear Equipo
          </Link>

      </div>

      <div className="flex flex-wrap gap-5 mb-10 justify-center">
        {equipos.map((otrosEquipos) => (
          <TarjetaEquipo key={otrosEquipos.id} equipo={otrosEquipos} />
        ))}
      </div>

    </Tarjeta>
  );
}

export default Page;