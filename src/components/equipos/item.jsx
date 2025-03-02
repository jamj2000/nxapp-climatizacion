import { FaEye, FaPen, FaTrash } from "react-icons/fa6";
import Modal from "../modal";
import EquipoVer from "./ver";
import EquipoEliminar from "./eliminar";
import EquipoModificar from "./modificar";
import { auth } from '@/auth'

async function Equipo({ equipo, proyectos }) {
    const { user } = await auth()

    return (
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

                    <EquipoVer equipo={equipo} />
                </Modal>

                <Modal icon={<FaPen size='1rem' color='white' />} text='Editar'
                    className='cursor-pointer flex gap-2 items-center text-white bg-yellow-600 p-2 rounded-md self-end hover:shadow-md'>

                    <EquipoModificar equipo={equipo} proyectos={proyectos} />
                </Modal>


                <Modal icon={<FaTrash size='1rem' color='white' />} text='Eliminar'
                    className='cursor-pointer flex gap-2 items-center text-white bg-red-600 p-2 rounded-md self-end hover:shadow-md'>

                    <EquipoEliminar equipo={equipo} />
                </Modal>

            </div>
        </div>
    );
}

export default Equipo;