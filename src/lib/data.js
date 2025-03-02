import prisma from '@/lib/prisma'

// -------------------- AUTH -------------------

export async function getUserById(id) {

    const user = await prisma.user.findUnique({
        where: { id }
    });
    return user

}

export async function getUserByEmail(email) {

    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user

}


// -------------------- PROYECTOS -------------------


export async function obtenerProyecto({ id, userId, include }) {
    const proyecto = await prisma.proyecto.findUnique({
        where: { id, userId },
        include
    })

    return proyecto
}



export async function obtenerProyectos({ userId, include }) {
    const proyectos = await prisma.proyecto.findMany({
        where: { userId },
        include
    })

    return proyectos
}

export async function obtenerProyectosFiltrados({ userId, include, select }, query) {
    const proyectos = await prisma.proyecto.findMany({
        where: {
            userId,
            nombre: {
                contains: query,
                mode: 'insensitive',
            },
        },
        include
    })

    return proyectos
}



// -------------------- RECINTOS -------------------


export async function obtenerRecinto({ id, include }) {
    const recinto = await prisma.recinto.findUnique({
        where: { id },
        include
    })

    return recinto
}



// -------------------- EQUIPOS -------------------


export async function obtenerEquipos({ where, include }) {
    const equipo = await prisma.equipo.findMany({
        where,
        include
    })

    return equipo
}

export async function obtenerEquipo({ id, include }) {
    const equipo = await prisma.equipo.findUnique({
        where: { id },
        include
    })

    return equipo
}




// -------------------- LOCALIDADES -------------------

export async function obtenerLocalidades() {
    const localidades = await prisma.localidad.findMany({
        include: {
            zona_climatica: true
        }
    })

    return localidades
}



export async function obtenerLocalidad({ id, include }) {
    const localidad = await prisma.localidad.findUnique({
        where: { id },
        include
    })

    return localidad
}
