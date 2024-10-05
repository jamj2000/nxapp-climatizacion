import Modal from '@/components/modal'
import Form from '@/components/forms/equipo'
import { FaPen, FaTrash, FaEye } from "react-icons/fa6";
import { updateEquipo, deleteEquipo, noAction } from "@/lib/actions/equipo"

export default async function TarjetaEquipo({ equipo, proyectos }) {

  const data = { equipo, proyectos }

  return (
    <>
      <div className=" w-full max-w-xs rounded-lg bg-gradient-to-tr dark:from-sky-100 dark:to-sky-400 from-gray-300 to-blue-500 dark:bg-gray-800 p-0.5 shadow-lg">

        <div className=" bg-gray-100 dark:bg-gray-900/90 p-7 rounded-md">
          <h1 className="font-bold text-xl mb-2">  {equipo?.nombre ?? "Sin definir"}  </h1>

          <div className="flex justify-around flex-col">
            <p>{"Potencias (W): " + equipo?.potencia ?? "Sin definir"}</p>
            <p>{"Factor funcionamiento: " + equipo?.factor_funcionamiento ?? "Sin definir"} </p>
          </div>
        </div>



        <div className="flex justify-around gap-1 py-4">

          <Modal icon={<FaEye size='1rem' color='white' />} text='Ver'
            className='cursor-pointer flex gap-2 items-center text-white bg-blue-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'equipo-view-' + equipo.id} action={noAction} data={data} disabled={true} text="Cerrar" />
          </Modal>

          <Modal icon={<FaPen size='1rem' color='white' />} text='Editar'
            className='cursor-pointer flex gap-2 items-center text-white bg-yellow-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'equipo-update-' + equipo.id} action={updateEquipo} data={data} disabled={false} text="Actualizar este equipo" />
          </Modal>


          <Modal icon={<FaTrash size='1rem' color='white' />} text='Eliminar'
              className='cursor-pointer flex gap-2 items-center text-white bg-red-600 p-2 rounded-md self-end hover:shadow-md'>

            <Form id={'equipo-delete-' + equipo.id} action={deleteEquipo} data={data} disabled={true} text="Eliminar este equipo" />
          </Modal>

        </div>
      </div>
    </>
  );
}

