import { Suspense } from "react";
import { CRUD } from "@/lib/constantes"
import Tarjeta from "@/components/cards/contenedor";
import DataEquipo from "@/components/data/equipo"


async function page({ params }) {

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        ACTUALIZAR EQUIPO
      </h1>
      <Suspense fallback={<span className="loading loading-ring loading-lg"></span>}>
        <DataEquipo  id={Number(params.id)}  operacion={CRUD.UPDATE}  />
      </Suspense>
    </Tarjeta>
  );
}

export default page;
