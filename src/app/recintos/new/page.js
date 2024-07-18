import { Suspense } from "react";
import { CRUD } from "@/lib/constantes"
import Tarjeta from "@/components/tarjetas/contenedor";
import DataRecinto from "@/components/data/recinto"


async function page({ params }) {

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        NUEVO RECINTO
      </h1>
      <Suspense>
        <DataRecinto  id={Number(params.id)}  operacion={CRUD.CREATE}  />
      </Suspense>
    </Tarjeta>
  );
} 

export default page;

