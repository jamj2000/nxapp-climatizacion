import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import prisma from "@/lib/prisma";
import Modal from '@/components/modal'
import Form from '@/components/forms/proyecto'
import { FaPen, FaTrash, FaEye, FaCopy } from "react-icons/fa6";
import { updateProyecto, deleteProyecto, noAction, createProyecto } from "@/lib/actions/proyecto"

async function TarjetaProyecto({ proyecto, localidades }) {

  const data = { proyecto, localidades }

  const sesion = await auth();
  let nombre = "Desconocido";

  if (proyecto?.userId) {
    const { name } = await prisma.user.findUnique({
      select: { name: true },
      where: { id: proyecto.userId }
    });
    nombre = name;
  }

  // await new Promise( (resolve) => { setTimeout( resolve, 4000) })

  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/proyectos/manage/${proyecto?.id}`}>
        {/* Con Image:  Imagenes externas requieren configuración en next.config.mjs */}
        <Image
          width={320} height={192}
          priority={true}          // Permite precargar imágenes responsivas
          src={proyecto?.imagen || "/images/project-image-default.jpg"}
          alt="Logo de proyecto"
          className="rounded-t-lg w-full h-auto object-cover"
        />
        {/* Con img: Imágenes externas No requieren configuración en next.config.mjs */}
        {/* <img width={320} height={192}
          src={proyecto?.imagen || "/images/project-image-default.jpg"}
          className="rounded-t-lg w-full h-auto object-cover"  /> */}

      </Link>
      <div className="p-5 bg-slate-100 rounded-b-lg ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {proyecto?.nombre}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2 h-12">
          {proyecto?.comentarios
            ? proyecto.comentarios
            : "Sin comentarios..."}
        </p>

        {sesion?.user.role === "ADMIN" &&
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Creado por: {nombre}
          </p>
        }

        <div className="flex flex-wrap justify-around gap-2 py-4">
          <Modal icon={<FaEye size='1rem' color='white' />} text='Ver'
            className='cursor-pointer flex gap-2 items-center text-white bg-blue-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'proyecto-view-' + proyecto.id} action={noAction} data={data} disabled={true} text="Cerrar" />
          </Modal>

          <Modal icon={<FaPen size='1rem' color='white' />} text='Editar'
            className='cursor-pointer flex gap-2 items-center text-white bg-yellow-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'proyecto-update-' + proyecto.id} action={updateProyecto} data={data} disabled={false} text="Actualizar este equipo" />
          </Modal>

          <Modal icon={<FaTrash size='1rem' color='white' />} text='Eliminar'
            className='cursor-pointer flex gap-2 items-center text-white bg-red-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'proyecto-delete-' + proyecto.id} action={deleteProyecto} data={data} disabled={true} text="Eliminar este equipo" />
          </Modal>


          {sesion?.user.role === "ADMIN" &&
            <Modal icon={<FaCopy size='1rem' color='white' />} text='Copiar'
              className='cursor-pointer flex gap-2 items-center text-white bg-violet-600 p-2 rounded-md self-end hover:shadow-md'>

              <Form id={'proyecto-copy'} action={createProyecto} data={data} disabled={false} text="Copiar este proyecto" />
            </Modal>
          }
        </div>
      </div>
    </div>
  );

}

export default TarjetaProyecto;
