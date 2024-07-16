"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getProyectos } from "@/lib/actions-proyecto";

function getOrientacionContigua(orientacion) {
  const orientaciones = ["norte", "este", "sur", "oeste"];
  const index = orientaciones.indexOf(orientacion);
  return orientaciones[(index + 1) % orientaciones.length];
}

export async function newRecinto(formData) {

  try {
    const nombre = formData.get("nombre");
    const proyectoId = Number(formData.get("proyectoId"));
    const temp_ver_relativa = Number(formData.get("temp_ver_relativa"));
    const temp_inv_relativa = Number(formData.get("temp_inv_relativa"));
    const hum_ver_relativa = Number(formData.get("hum_ver_relativa"));
    const hum_inv_relativa = Number(formData.get("hum_inv_relativa"));
    const longitud = Number(formData.get("longitud"));
    const anchura = Number(formData.get("anchura"));
    const altura = Number(formData.get("altura"));
    const volumen = Number(formData.get("volumen"));
    // const volumen = longitud * altura *   anchura;
    const ida = formData.get("ida");

    // Cerramiento 1
    const orientacion = formData.get("orientacion");
    const ubicacion_c_1 = formData.get("ubicacion_c_1");
    const color_c_1 = formData.get("color_c_1");
    const temperatura_ver_c_1 = Number(formData.get("temperatura_ver_c_1"));
    const temperatura_inv_c_1 = Number(formData.get("temperatura_inv_c_1"));
    const superficie_c_1 = longitud * altura;
    const tipo_vidrio_c_1 = formData.get("tipo_vidrio_c_1");
    const superficie_vidrio_c_1 = Number(formData.get("superficie_vidrio_c_1"));
    const superficie_puertas_c_1 = Number(
      formData.get("superficie_puertas_c_1")
    );

    // Cerramiento 2
    const orientacion_2 = getOrientacionContigua(orientacion);
    const ubicacion_c_2 = formData.get("ubicacion_c_2");
    const color_c_2 = formData.get("color_c_2");
    const temperatura_ver_c_2 = Number(formData.get("temperatura_ver_c_2"));
    const temperatura_inv_c_2 = Number(formData.get("temperatura_inv_c_2"));
    const superficie_c_2 = anchura * altura;
    const tipo_vidrio_c_2 = formData.get("tipo_vidrio_c_2");
    const superficie_vidrio_c_2 = Number(formData.get("superficie_vidrio_c_2"));
    const superficie_puertas_c_2 = Number(
      formData.get("superficie_puertas_c_2")
    );

    // Cerramiento 3
    const orientacion_3 = getOrientacionContigua(orientacion_2);
    const ubicacion_c_3 = formData.get("ubicacion_c_3");
    const color_c_3 = formData.get("color_c_3");
    const temperatura_ver_c_3 = Number(formData.get("temperatura_ver_c_3"));
    const temperatura_inv_c_3 = Number(formData.get("temperatura_inv_c_3"));
    const superficie_c_3 = longitud * altura;
    const tipo_vidrio_c_3 = formData.get("tipo_vidrio_c_3");
    const superficie_vidrio_c_3 = Number(formData.get("superficie_vidrio_c_3"));
    const superficie_puertas_c_3 = Number(
      formData.get("superficie_puertas_c_3")
    );

    // Cerramiento 4
    const orientacion_4 = getOrientacionContigua(orientacion_3);
    const ubicacion_c_4 = formData.get("ubicacion_c_4");
    const color_c_4 = formData.get("color_c_4");
    const temperatura_ver_c_4 = Number(formData.get("temperatura_ver_c_4"));
    const temperatura_inv_c_4 = Number(formData.get("temperatura_inv_c_4"));
    const superficie_c_4 = anchura * altura;
    const tipo_vidrio_c_4 = formData.get("tipo_vidrio_c_4");
    const superficie_vidrio_c_4 = Number(formData.get("superficie_vidrio_c_4"));
    const superficie_puertas_c_4 = Number(
      formData.get("superficie_puertas_c_4")
    );

    // Techo
    const orientacion_techo = formData.get("orientacion_techo");
    const ubicacion_techo = formData.get("ubicacion_techo");
    const temperatura_ver_techo = Number(formData.get("temperatura_ver_techo"));
    const temperatura_inv_techo = Number(formData.get("temperatura_inv_techo"));
    const superficie_techo = anchura * longitud;
    const tipo_vidrio_techo = formData.get("tipo_vidrio_techo");

    // Suelo
    const ubicacion_suelo = formData.get("ubicacion_suelo");
    const temperatura_ver_suelo = Number(formData.get("temperatura_ver_suelo"));
    const temperatura_inv_suelo = Number(formData.get("temperatura_inv_suelo"));
    const superficie_suelo = anchura * longitud;

    const recinto = await prisma.recinto.create({
      data: {
        nombre,
        proyectoId,
        temp_ver_relativa,
        temp_inv_relativa,
        hum_ver_relativa,
        hum_inv_relativa,
        longitud,
        anchura,
        altura,
        volumen,
        ida,

        // Cerramiento 1
        orientacion,
        ubicacion_c_1,
        color_c_1,
        temperatura_ver_c_1,
        temperatura_inv_c_1,
        superficie_c_1,
        tipo_vidrio_c_1,
        superficie_vidrio_c_1,
        superficie_puertas_c_1,

        // Cerramiento 2
        orientacion_2,
        ubicacion_c_2,
        color_c_2,
        temperatura_ver_c_2,
        temperatura_inv_c_2,
        superficie_c_2,
        tipo_vidrio_c_2,
        superficie_vidrio_c_2,
        superficie_puertas_c_2,

        // Cerramiento 3
        orientacion_3,
        ubicacion_c_3,
        color_c_3,
        temperatura_ver_c_3,
        temperatura_inv_c_3,
        superficie_c_3,
        tipo_vidrio_c_3,
        superficie_vidrio_c_3,
        superficie_puertas_c_3,

        // Cerramiento 4
        orientacion_4,
        ubicacion_c_4,
        color_c_4,
        temperatura_ver_c_4,
        temperatura_inv_c_4,
        superficie_c_4,
        tipo_vidrio_c_4,
        superficie_vidrio_c_4,
        superficie_puertas_c_4,

        // Techo
        orientacion_techo,
        ubicacion_techo,
        temperatura_ver_techo,
        temperatura_inv_techo,
        superficie_techo,
        tipo_vidrio_techo,

        // Suelo
        ubicacion_suelo,
        temperatura_ver_suelo,
        temperatura_inv_suelo,
        superficie_suelo,
      },
    });

    console.log(recinto);
    revalidatePath("/recintos");
  } catch (error) {
    console.log(error);
    // console.log(recinto)
    console.log("Error al crear el cerramiento");
  }

  redirect("/recintos");
}

export async function getRecinto(recintoId) {
  try {
    const recinto = await prisma.recinto.findUnique({
      where: { id: Number(recintoId) },
    });

    return recinto;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRecintoWithProyecto(recintoId) {
  try {
    const recinto = await prisma.recinto.findUnique({
      where: { id: Number(recintoId) },
      include: { proyecto: true }
    });

    return recinto;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function getRecintos(proyectoId) {
  try {
    const proyectos = await getProyectos();
    const recintos = await prisma.recinto.findMany({
      where: { proyectoId: proyectoId },
    });

    return { proyectos, recintos };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteRecinto(formData) {
  const id = Number(formData.get("id"));
  const proyectoId = Number(formData.get("proyectoId"));
  console.log("ID recibido:", proyectoId);

  try {
    const recinto = await prisma.recinto.delete({
      where: { id: id },
    });
    // console.log("recintos eliminado:", recinto);
    revalidatePath("/recintos");
  } catch (error) {
    console.log("Error al eliminar el cerramiento:", error);
  }
  redirect("/recintos");
}

export async function editRecinto(formData) {
  const id = Number(formData.get("id"));
  const proyectoId = Number(formData.get("proyectoId"));
  const nombre = formData.get("nombre");
  const temp_ver_relativa = Number(formData.get("temp_ver_relativa"));
  const temp_inv_relativa = Number(formData.get("temp_inv_relativa"));
  const hum_ver_relativa = Number(formData.get("hum_ver_relativa"));
  const hum_inv_relativa = Number(formData.get("hum_inv_relativa"));
  const longitud = Number(formData.get("longitud"));
  const anchura = Number(formData.get("anchura"));
  const altura = Number(formData.get("altura"));
  // const volumen = Number(formData.get("volumen"));
  const volumen = longitud * altura * anchura;
  const ida = formData.get("ida");

  // Cerramiento 1

  const orientacion = formData.get("orientacion");
  const ubicacion_c_1 = formData.get("ubicacion_c_1");
  const temperatura_ver_c_1 = Number(formData.get("temperatura_ver_c_1"));
  const temperatura_inv_c_1 = Number(formData.get("temperatura_inv_c_1"));
  const superficie_c_1 = longitud * altura;
  const tipo_vidrio_c_1 = formData.get("tipo_vidrio_c_1");
  const superficie_vidrio_c_1 = Number(formData.get("superficie_vidrio_c_1"));
  const superficie_puertas_c_1 = Number(formData.get("superficie_puertas_c_1"));

  // Cerramiento 2

  const ubicacion_c_2 = formData.get("ubicacion_c_2");
  const temperatura_ver_c_2 = Number(formData.get("temperatura_ver_c_2"));
  const temperatura_inv_c_2 = Number(formData.get("temperatura_inv_c_2"));
  const superficie_c_2 = anchura * altura;
  const tipo_vidrio_c_2 = formData.get("tipo_vidrio_c_2");
  const superficie_vidrio_c_2 = Number(formData.get("superficie_vidrio_c_2"));
  const superficie_puertas_c_2 = Number(formData.get("superficie_puertas_c_2"));

  // Cerramiento 3

  const ubicacion_c_3 = formData.get("ubicacion_c_3");
  const temperatura_ver_c_3 = Number(formData.get("temperatura_ver_c_3"));
  const temperatura_inv_c_3 = Number(formData.get("temperatura_inv_c_3"));
  const superficie_c_3 = longitud * altura;
  const tipo_vidrio_c_3 = formData.get("tipo_vidrio_c_3");
  const superficie_vidrio_c_3 = Number(formData.get("superficie_vidrio_c_3"));
  const superficie_puertas_c_3 = Number(formData.get("superficie_puertas_c_3"));

  // Cerramiento 4

  const ubicacion_c_4 = formData.get("ubicacion_c_4");
  const temperatura_ver_c_4 = Number(formData.get("temperatura_ver_c_4"));
  const temperatura_inv_c_4 = Number(formData.get("temperatura_inv_c_4"));
  const superficie_c_4 = anchura * altura;
  const tipo_vidrio_c_4 = formData.get("tipo_vidrio_c_4");
  const superficie_vidrio_c_4 = Number(formData.get("superficie_vidrio_c_4"));
  const superficie_puertas_c_4 = Number(formData.get("superficie_puertas_c_4"));

  // techo
  const orientacion_techo = formData.get("orientacion_techo");
  const ubicacion_techo = formData.get("ubicacion_techo");
  const temperatura_ver_techo = Number(formData.get("temperatura_ver_techo"));
  const temperatura_inv_techo = Number(formData.get("temperatura_inv_techo"));
  const superficie_techo = anchura * longitud;
  const tipo_vidrio_techo = formData.get("tipo_vidrio_techo");

  // suelo
  const ubicacion_suelo = formData.get("ubicacion_suelo");
  const temperatura_ver_suelo = Number(formData.get("temperatura_ver_suelo"));
  const temperatura_inv_suelo = Number(formData.get("temperatura_inv_suelo"));
  const superficie_suelo = anchura * longitud;

  try {
    const recinto = await prisma.recinto.update({
      where: { id },
      data: {
        nombre,
        proyectoId,
        temp_ver_relativa,
        temp_inv_relativa,
        hum_ver_relativa,
        hum_inv_relativa,
        longitud,
        anchura,
        altura,
        volumen,
        ida,

        // Cerramiento 1

        orientacion,
        ubicacion_c_1,
        temperatura_ver_c_1,
        temperatura_inv_c_1,
        superficie_c_1,
        tipo_vidrio_c_1,
        superficie_vidrio_c_1,
        superficie_puertas_c_1,

        // Cerramiento 2

        ubicacion_c_2,
        temperatura_ver_c_2,
        temperatura_inv_c_2,
        superficie_c_2,
        tipo_vidrio_c_2,
        superficie_vidrio_c_2,
        superficie_puertas_c_2,

        // Cerramiento 3

        ubicacion_c_3,
        temperatura_ver_c_3,
        temperatura_inv_c_3,
        superficie_c_3,
        tipo_vidrio_c_3,
        superficie_vidrio_c_3,
        superficie_puertas_c_3,

        // Cerramiento 4

        ubicacion_c_4,
        temperatura_ver_c_4,
        temperatura_inv_c_4,
        superficie_c_4,
        tipo_vidrio_c_4,
        superficie_vidrio_c_4,
        superficie_puertas_c_4,

        // techo

        orientacion_techo,
        ubicacion_techo,
        temperatura_ver_techo,
        temperatura_inv_techo,
        superficie_techo,
        tipo_vidrio_techo,

        // suelo

        ubicacion_suelo,
        temperatura_ver_suelo,
        temperatura_inv_suelo,
        superficie_suelo,
      },
    });
    // console.log(recinto);
    revalidatePath("/recintos");
  } catch (error) {
    console.log(error);
  }
  redirect("/recintos");
}

