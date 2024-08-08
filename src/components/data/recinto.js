// import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { createRecinto, updateRecinto, deleteRecinto, readRecintoWithProyecto } from "@/lib/actions/recinto"
import { CRUD } from "@/lib/constantes"
import FormRecinto from '@/components/forms/recinto'
import { readProyectos } from "@/lib/actions/proyecto";


async function noAction() {
    'use server'
    return
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
        })
        // recinto = await readRecintoWithProyecto(id)
    }

    // Proyectos que pertenecen al usuario con userId
    proyectos = await prisma.proyecto.findMany({
        select: {
            id: true,
            nombre: true,
        },
        where: { userId: userId }
    })
    // proyectos = await readProyectos ({ userId: userId })

    switch (operacion) {
        case CRUD.CREATE: texto = "Crear Recinto"; action = createRecinto; break;
        case CRUD.READ: texto = "Volver"; action = noAction; disabled = true; break;
        case CRUD.UPDATE: texto = "Actualizar Recinto"; action = updateRecinto; break;
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
