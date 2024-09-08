import TarjetaProyecto from "@/components/cards/proyecto";
import { auth } from "@/auth";
import { readProyectos } from "@/lib/actions/proyecto";
import { readLocalidades } from "@/lib/actions/localidad";


async function Proyectos() {
  const { user } = await auth();
  // console.log("USUARIO: ",  user);


  let proyectos = {}

  if (user?.role === "ADMIN")
    proyectos = await readProyectos({ include: { localidad: { include: { zona_climatica: true }} }})
  else {
    proyectos = await readProyectos({ userId: user?.id, include: {localidad: { include: { zona_climatica: true }} } })
  }

  const localidades = await readLocalidades()

  //   await new Promise((resolve) => setTimeout(resolve, 4000))

  return (

    <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
      {proyectos
        .sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
        .map((proyecto) => (
          <TarjetaProyecto key={proyecto.id} proyecto={proyecto} localidades={localidades}/>
        ))}
    </div>

  );

}

export default Proyectos;
