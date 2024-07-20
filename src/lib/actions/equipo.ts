"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Equipo } from "@prisma/client";
import { z, ZodError } from "@/lib/es-zod";


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



export async function newEquipo(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  try {
    const equipo = await prisma.equipo.create({ data });
  } catch (error) {
    console.log(error);
    // console.log(recinto)
    console.log("Error al crear el cerramiento");
  }

  redirect("/equipos");
}



export async function editEquipo(formData: FormData) {
  const result = validate(formData)

  if (!result.success) {
    const issues = result.error.issues.map(issue => ({ campo: issue.path[0], mensaje: issue.message }))
    return issues;
  }

  const { id, ...data } = result.data

  try {
    await prisma.equipo.update({ where: { id }, data });
  } catch (error) {
    console.log(error);
  }
  redirect("/equipos");
}



export async function deleteEquipo(formData: FormData) {

  const id = Number(formData.get('id'))
  const proyectoId = Number(formData.get('proyectoId'))

  try {
    await prisma.equipo.delete({ where: { id } });
  } catch (error) {
    console.log("Error al eliminar el cerramiento:", error);
  }
  redirect("/equipos");
}