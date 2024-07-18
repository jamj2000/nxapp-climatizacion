import Tarjeta from "@/components/tarjetas/contenedor";
import { getProyectosPorId } from "@/lib/actions-proyecto";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import FormEquipo from "@/components/forms/equipo";

export const dynamic = "force-dynamic";

async function Page({ params }) {
    const sesion = await auth();
    const { user } = sesion;
    const proyectos = await getProyectosPorId(user?.id)
    const equipo = await prisma.equipo.findUnique({
        where: {
            id: Number(params.id),
        },
        include: { proyecto: true }
    });

    if (!equipo) {
        redirect("/equipos");
    }

    async function volver() {
        'use server'
        redirect('/equipos')
    }

    return (
        <Tarjeta>
            <FormEquipo
                texto={"Volver"}
                equipo={equipo}
                proyectos={proyectos}
                action={volver}
                disabled={true}

            />
        </Tarjeta>
    );
}

export default Page;
