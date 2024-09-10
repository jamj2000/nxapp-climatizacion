import TarjetaProyecto from "@/components/proyecto";
import { auth } from "@/auth";
import { readProyectos, readFilteredProyectos } from "@/lib/actions/proyecto";
import { readLocalidades } from "@/lib/actions/localidad";
import Search from "@/components/search";

async function Proyectos({ query }) {
  const { user } = await auth();

  let proyectos = {}

  if (user?.role === "ADMIN")
    proyectos = await readFilteredProyectos({ include: { localidad: { include: { zona_climatica: true } } } }, query)
  else {
    proyectos = await readFilteredProyectos({ userId: user?.id, include: { localidad: { include: { zona_climatica: true } } } }, query)
  }
  const localidades = await readLocalidades()

  return (
    <>
      <Search />

      <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
        {proyectos
          .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
          .map((proyecto) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} localidades={localidades} />
          ))}
      </div>
    </>

  );

}

export default Proyectos;
