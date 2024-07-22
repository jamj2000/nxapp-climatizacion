import { Suspense } from "react";
import Link from "next/link";
import TarjetaContenedor from "@/components/cards/contenedor";
import Recintos from "@/components/cards/recintos"
import SkeletonRecintos from "@/components/skeletons/recintos";
import Equipos from "@/components/cards/equipos"
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
                    href="/proyectos/new"
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
                    href="/recintos/new"
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
                    href="/equipos/new"
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




// import Tarjeta from "@/components/cards/contenedor";
// import Link from "next/link";
// import TarjetaRecinto from "@/components/cards/recinto";
// import TarjetaEquipo from "@/components/cards/equipo";
// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";


// async function Page({ params }) {
//   const proyecto = await prisma.proyecto.findUnique({
//     where: { id: Number(params.id) },
//     include: {
//       recintos: true,
//       equipos: true,
//     },
//   })
  
//   if (!proyecto) {
//     redirect("/proyectos");
//   }

//   const { recintos } = proyecto; 
//   const { equipos } = proyecto;


//   return (
//     <Tarjeta>
//       <h1 className="text-4xl text-center mb-6">Proyecto {proyecto.nombre}</h1>
//       <div className="flex justify-between mb-6">

//         <h3 className="font-bold text-3xl mb-2">Recintos</h3>

//         <Link
//           href="/recintos/new"
//           className="inline-flex items-center px-5 py-3  font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Crear recinto
//         </Link>
//       </div>
//       <div className="flex flex-wrap gap-5 mb-10 justify-center">
//         {recintos.map((recinto) => (
//           <TarjetaRecinto key={recinto.id} recinto={recinto} />
//         ))}
//       </div>
//       <div className="flex justify-between mb-6">

//         <h3 className="font-bold text-3xl mb-2">Equipos</h3>

//           <Link
//             href="/equipos/new"
//             className="inline-flex items-center px-5 py-3  font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Crear Equipo
//           </Link>

//       </div>

//       <div className="flex flex-wrap gap-5 mb-10 justify-center">
//         {equipos.map((otrosEquipos) => (
//           <TarjetaEquipo key={otrosEquipos.id} equipo={otrosEquipos} />
//         ))}
//       </div>

//     </Tarjeta>
//   );
// }

// export default Page;