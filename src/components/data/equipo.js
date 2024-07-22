import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createEquipo, updateEquipo, deleteEquipo } from "@/lib/actions/equipo"
import { CRUD } from "@/lib/constantes"
import FormEquipo from '@/components/forms/equipo'


async function volver() {
    'use server'
    redirect('/equipos')
}


export default async function DataEquipo({ id, operacion }) {
    const sesion = await auth();
    const { user } = sesion;
    const userId = user?.id;

    // console.log(id, operacion);

    let texto;
    let action;
    let equipo;
    let proyectos;
    let disabled = false

    if (id) {
        equipo = await prisma.equipo.findUnique({
            where: { id },
            include: { proyecto: true }
        });
    }

    // Proyectos que pertenecen al usuario con userId
    proyectos = await prisma.proyecto.findMany({   where: { userId: userId }   })

    switch (operacion) {
        case CRUD.CREATE: texto = "Crear Equipo"; action = createEquipo; break;
        case CRUD.READ: texto = "Volver"; action = volver; disabled = true; break;
        case CRUD.UPDATE: texto = "Actualizar Equipo"; action = updateEquipo; break;
        case CRUD.DELETE: texto = "Eliminar Equipo"; action = deleteEquipo; disabled = true; break;
        default:
    }

    return (
        <FormEquipo
            texto={texto}
            action={action}
            equipo={equipo}
            proyectos={proyectos}
            disabled={disabled}
        >
        </FormEquipo>
    )
}

