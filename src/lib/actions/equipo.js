"use server";
import prisma from "@/lib/prisma";
import { z, ZodError } from "@/lib/es-zod";
import { revalidatePath } from "next/cache";



const schema = z.object({
  // id: z.coerce.number(),
  id: z.union([z.coerce.number(), z.string().nullish()]),
  nombre: z.string().trim().min(1),
  proyectoId: z.coerce.number(),
  factor_funcionamiento: z.coerce.number().min(1).max(5),
  potencia: z.coerce.number().min(1).max(5)
});

// type ZodReturn = { success: true, data: Equipo } | { success: false, error: ZodError }
// type ZodReturn = { success: true, data: z.infer<typeof schema> } | { success: false, error: ZodError }


function validate(formData) {

  const datos = Object.fromEntries(formData.entries())


  const result = schema.safeParse(datos)
  return result
}

export async function insertarEquipo(prevState, formData) {
  const result = validate(formData)

  if (!result.success) {
    const simplified = result.error.issues.map(issue => [issue.path[0], issue.message])
    const issues = Object.fromEntries(simplified)
    console.log('issues (cocinados) ', issues);
    return { issues, fields: Object.fromEntries(formData.entries()) }
  }

  const { id, ...data } = result.data

  try {
    await prisma.equipo.create({ data });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
    return { success: "Operación realizada correctamente." }
  } catch (error) {
    console.log(error);
    return { error }
  }
}



export async function modificarEquipo(prevState, formData) {
  console.log('formData', formData)
  const result = validate(formData)

  if (!result.success) {
    const simplified = result.error.issues.map(issue => [issue.path[0], issue.message])
    const issues = Object.fromEntries(simplified)
    console.log('issues (cocinados) ', issues);
    return { issues, fields: Object.fromEntries(formData.entries()) }
  }

  const { id, ...data } = result.data

  try {
    await prisma.equipo.update({ where: { id }, data });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
    return { success: "Operación realizada correctamente." }
  } catch (error) {
    console.log(error);
    return { error }
  }

}



export async function eliminarEquipo(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.equipo.delete({ where: { id } });
    revalidatePath("/proyectos");
    revalidatePath("/equipos");
    return { success: "Operación realizada correctamente." }
  } catch (error) {
    console.log("Error al eliminar el equipo: ", error);
  }
}



export async function noAction() {
  'use server'
  return
}
