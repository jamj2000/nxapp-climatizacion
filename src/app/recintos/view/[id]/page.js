
import { getProyectosPorId } from "@/lib/actions-proyecto";
import { redirect } from "next/navigation";
import Tarjeta from "@/components/tarjetas/contenedor";
import FormRecinto from "@/components/forms/recinto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";


async function Page({ params }) {
    const recinto = await prisma.recinto.findUnique({
        where: {
          id: Number(params.id),
        },
        include: {
          proyecto: true,
        },
      });
    


    const sesion = await auth();
    const { user } = sesion;
    // const recinto = await getRecinto(params.id)
    const proyectos = await getProyectosPorId(user?.id)

    if (!recinto) {
        redirect("/recintos");
    }


    async function volver() {
        'use server'
        redirect('/recintos')
    }

    return (
        <Tarjeta>
            <FormRecinto
                texto={"Volver"}
                recinto={recinto}
                proyectos={proyectos}
                action={volver}
                disabled={true}
            />


        </Tarjeta>
    );
}

export default Page;
