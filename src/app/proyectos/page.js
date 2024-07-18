import { Suspense } from "react";
import Proyectos from "@/components/tarjetas/proyectos"
import SkeletonProyectos from "@/components/skeletons/proyectos";

async function Page() {

    return (
        <Suspense fallback={<SkeletonProyectos />}>
            <Proyectos />
        </Suspense>
    );
}

export default Page;



// import TarjetaProyecto from "@/components/tarjetas/proyecto";
// import SkeletonProyecto from "@/components/skeletons/proyecto"
// import TarjetaContenedor from "@/components/tarjetas/contenedor";
// import Link from "next/link";
// import { Suspense } from "react";
// import { auth } from "@/auth";
// import {
//   getProyectosPorId,
//   getProyectos,
// } from "@/lib/actions-proyecto";


// export const dynamic = "force-dynamic";

// async function page() {
//   const { user } = await auth();
//   // console.log("USUARIO: ",  user);

//   let busqueda = ""
//   let proyectos = {}

//   if (user?.role === "ADMIN")
//     proyectos = await getProyectos();
//   else {
//     proyectos = await getProyectosPorId(user?.id);
//   }


//   return (
//     <TarjetaContenedor>
//       <div className="flex justify-between mb-6">
//         <h1 className="text-4xl">Proyectos</h1>
//         <Link
//           href="/proyectos/new"
//           className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//         >
//           Crear Proyecto
//         </Link>
//         {
//           user?.role === "ADMIN" &&
//           <input
//             className="ml-5 text-center"
//             defaultValue={busqueda}
//             placeholder="Busqueda de proyectos"
//           />
//         }
//       </div>
//       <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
//         {proyectos.map((proyecto) => (
//           <Suspense key={proyecto.id} fallback={<SkeletonProyecto />}>
//             <TarjetaProyecto proyecto={proyecto} />
//           </Suspense>
//         ))}
//       </div>
//     </TarjetaContenedor>
//   );

// }

// export default page;
