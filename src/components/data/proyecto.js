import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { newProyecto, editProyecto, deleteProyecto } from "@/lib/actions/proyecto"
import { CRUD } from "@/lib/constantes"
import FormProyecto from '@/components/forms/proyecto'

async function volver() {
    'use server'
    redirect('/proyectos')
}


export default async function DataProyecto({ id, operacion }) {
    const sesion = await auth();
    const { user } = sesion;
    const userId = user?.id;

    // console.log(id, operacion);

    let texto;
    let action;
    let proyecto;
    let disabled = false


    const localidades = await prisma.localidad.findMany({ include: { zona_climatica: true } });

    if (id) {
        proyecto = await prisma.proyecto.findUnique({ where: { id } });
    }

    switch (operacion) {
        case CRUD.CREATE: texto = "Crear Recinto"; action = newProyecto; break;
        case CRUD.READ: texto = "Volver"; action = volver; disabled = true; break;
        case CRUD.UPDATE: texto = "Actualizar Proyecto"; action = editProyecto; break;
        case CRUD.DELETE: texto = "Eliminar Proyecto"; action = deleteProyecto; disabled = true; break;
        default:
    }

    return (
        <FormProyecto
            texto={texto}
            action={action}
            userId={user.id}
            proyecto={proyecto}
            localidades={localidades}
            disabled={disabled}
        >
        </FormProyecto>
    )
}


