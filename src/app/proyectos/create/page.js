import { Suspense } from "react";
import { CRUD } from "@/lib/constantes"
import Tarjeta from "@/components/cards/contenedor";
import DataProyecto from "@/components/data/proyecto"


async function page({ params }) {

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        CREAR PROYECTO
      </h1>
      <Suspense>
        <DataProyecto  id={Number(params.id)}  operacion={CRUD.CREATE}  />
      </Suspense>
    </Tarjeta>
  );
}

export default page;
