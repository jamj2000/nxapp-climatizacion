import { getProyectosPorId } from "@/lib/actions-proyecto";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
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
        <div className="flex flex-col items-center justify-center -mt-10 text-blue-500">
            <div className="container items-center border-4 border-sky-400 dark:border-sky-700 p-8 rounded-md bg-gray-200/90 dark:bg-gray-900/90">
                <FormEquipo
                    texto={"Volver"}
                    equipo={equipo}
                    proyectos={proyectos}
                    action={volver}
                    disabled={true}

                />
            </div>
        </div>
    );
}

export default Page;
