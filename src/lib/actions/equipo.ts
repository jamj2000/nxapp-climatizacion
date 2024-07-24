"use server";
import { prisma } from "@/lib/prisma";
import { Equipo } from "@prisma/client";
import { z, ZodError } from "@/lib/es-zod";
import { revalidatePath } from "next/cache";


const schema = z.object({
  id: z.coerce.number(),
  nombre: z.string().trim(),
  proyectoId: z.coerce.number(),
  factor_funcionamiento: z.coerce.number().min(1).max(5),
  potencia: z.coerce.number().min(1).max(5)
});

type ZodReturn = { success: true, data: Equipo } | { success: false, error: ZodError }



function validate(formData: FormData): ZodReturn {

  const datos = Object.fromEntries(formData.entries())

  const result = schema.safeParse(datos)
  return result
}

export async function createEquipo(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  try {
    await prisma.equipo.create({ data });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
  } catch (error) {
    console.log(error);
    console.log("Error al crear el equipo: ", error);
  }
}



export async function updateEquipo(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  try {
    await prisma.equipo.update({ where: { id }, data });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
  } catch (error) {
    console.log("Error al actualizar el equipo: ", error);
  }

}



export async function deleteEquipo(formData: FormData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.equipo.delete({ where: { id } });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
  } catch (error) {
    console.log("Error al eliminar el equipo: ", error);
  }
}

// READ ACTIONS

export async function readEquipoWithProyecto(id: number) {
  const equipo = await prisma.equipo.findUnique({
    where: { id },
    include: { proyecto: true }
  })
  
  return equipo
}
