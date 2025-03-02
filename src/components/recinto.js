import Modal from '@/components/modal'
import Form from '@/components/forms/recinto'
import { FaPen, FaTrash, FaEye } from "react-icons/fa6";
import { modificarRecinto, eliminarRecinto, noAction } from "@/lib/actions/recinto"

export default async function TarjetaRecinto({ recinto, proyectos }) {

  const data = { recinto, proyectos }

  return (
    <>
      <div className=" w-full max-w-xs rounded-lg bg-gradient-to-tr dark:from-sky-100 dark:to-sky-400 from-gray-300 to-blue-500 p-0.5 shadow-lg">

        <div className="bg-gray-100 dark:bg-gray-900/90 p-7 rounded-md">
          <h1 className="font-bold text-xl mb-2"> {recinto?.nombre ?? "Sin definir"}  </h1>

          <div className="flex justify-around flex-col">
            <div className="flex gap-4">
              <p> {"Longitud: " + recinto?.longitud ?? "Sin definir"} </p>
              <p> {"Anchura: " + recinto?.anchura ?? "Sin definir"} </p>
              <p> {"Altura: " + recinto?.altura ?? "Sin definir"} </p>
            </div>

            <p> {"Temperatura verano: " + recinto?.temp_ver_relativa ?? "Sin definir"} </p>
            <p> {"Humedad verano: " + recinto?.hum_ver_relativa ?? "Sin definir"} </p>
            <p> {"Temperatura invierno: " + recinto?.temp_inv_relativa ?? "Sin definir"} </p>
            <p> {"Humedad invierno: " + recinto?.hum_inv_relativa ?? "Sin definir"} </p>
            <p> {recinto?.ida.toUpperCase() ?? "Sin definir"}</p>
          </div>
        </div>



        <div className="flex justify-around gap-2 py-4">
          <Modal icon={<FaEye size='1rem' color='white' />} text='Ver'
            className='cursor-pointer flex gap-2 items-center text-white bg-blue-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'recinto-view-' + recinto.id} action={noAction} data={data} disabled={true} text="Cerrar" />
          </Modal>

          <Modal icon={<FaPen size='1rem' color='white' />} text='Editar'
            className='cursor-pointer flex gap-2 items-center text-white bg-yellow-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'recinto-update-' + recinto.id} action={modificarRecinto} data={data} disabled={false} text="Actualizar este equipo" />
          </Modal>

          <Modal icon={<FaTrash size='1rem' color='white' />} text='Eliminar'
            className='cursor-pointer flex gap-2 items-center text-white bg-red-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'recinto-delete-' + recinto.id} action={eliminarRecinto} data={data} disabled={true} text="Eliminar este equipo" />
          </Modal>

        </div>
      </div>
    </>
  );
}


