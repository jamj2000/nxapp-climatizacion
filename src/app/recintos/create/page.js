import Tarjeta from "@/components/cards/contenedor";
import FormRecinto from "@/components/forms/recinto"
import { auth } from "@/auth";
import { CRUD } from "@/lib/constantes"

async function page({ params }) {
  const { user } = await auth()

  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold text-center p-10">
        CREAR RECINTO
      </h1>
      <FormRecinto id={Number(params.id)} userId={user.id} operacion={CRUD.CREATE} />    
    </Tarjeta>
  );
}

export default page;


