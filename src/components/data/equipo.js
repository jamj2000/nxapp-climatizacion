// import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { createEquipo, updateEquipo, deleteEquipo, readEquipoWithProyecto } from "@/lib/actions/equipo"
import { CRUD } from "@/lib/constantes"
import FormEquipo from '@/components/forms/equipo'
import { readProyectos } from "@/lib/actions/proyecto";
import { prisma } from "@/lib/prisma"


async function noAction() {
    'use server'
    return
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
        // equipo = await readEquipoWithProyecto(id)
        equipo = await prisma.equipo.findUnique({
            where: { id },
            include: { proyecto: true }
        })
    }
    // Proyectos que pertenecen al usuario con userId
    // proyectos = await readProyectos ({ userId: userId })
    proyectos = await prisma.proyecto.findMany({
        select: {
            id: true,
            nombre: true,
        },
        where: { userId: userId }
    })


    switch (operacion) {
        case CRUD.CREATE: texto = "Crear Equipo"; action = createEquipo; break;
        case CRUD.READ: texto = "Volver"; action = noAction; disabled = true; break;
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

