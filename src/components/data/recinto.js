import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { newRecinto, editRecinto, deleteRecinto } from "@/lib/actions/recinto"
import { CRUD } from "@/lib/constantes"
import FormRecinto from '@/components/forms/recinto'


async function volver() {
    'use server'
    redirect('/recintos')
}


export default async function DataRecinto({ id, operacion }) {
    const sesion = await auth();
    const { user } = sesion;
    const userId = user?.id;

    // console.log(id, operacion);

    let texto;
    let action;
    let recinto;
    let proyectos;
    let disabled = false

    if (id) {
        recinto = await prisma.recinto.findUnique({
            where: { id },
            include: { proyecto: true }
        });
    }

    // Proyectos que pertenecen al usuario con userId
    proyectos = await prisma.proyecto.findMany({ where: { userId: userId } })

    switch (operacion) {
        case CRUD.CREATE: texto = "Crear Recinto"; action = newRecinto; break;
        case CRUD.READ: texto = "Volver"; action = volver; disabled = true; break;
        case CRUD.UPDATE: texto = "Actualizar Recinto"; action = editRecinto; break;
        case CRUD.DELETE: texto = "Eliminar Recinto"; action = deleteRecinto; disabled = true; break;
        default:
    }

    return (
        <FormRecinto
            texto={texto}
            action={action}
            recinto={recinto}
            proyectos={proyectos}
            disabled={disabled}
        >
        </FormRecinto>
    )
}
