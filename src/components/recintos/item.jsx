import { FaEye, FaPen, FaTrash } from "react-icons/fa6";
import Modal from "../modal";
import RecintoVer from "./ver";
import RecintoEliminar from "./eliminar";
import RecintoModificar from "./modificar";
import { auth } from '@/auth'

async function Recinto({ recinto, proyectos }) {
    const { user } = await auth()

    return (
        <div className=" w-full max-w-xs rounded-lg bg-gradient-to-tr dark:from-sky-100 dark:to-sky-400 from-gray-300 to-blue-500 dark:bg-gray-800 p-0.5 shadow-lg">

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


            <div className="flex justify-around gap-1 py-4">

                <Modal icon={<FaEye size='1rem' color='white' />} text='Ver'
                    className='cursor-pointer flex gap-2 items-center text-white bg-blue-600 p-2 rounded-md self-end hover:shadow-md'>

                    <RecintoVer recinto={recinto} />
                </Modal>

                <Modal icon={<FaPen size='1rem' color='white' />} text='Editar'
                    className='cursor-pointer flex gap-2 items-center text-white bg-yellow-600 p-2 rounded-md self-end hover:shadow-md'>

                    <RecintoModificar recinto={recinto} proyectos={proyectos} />
                </Modal>

                <Modal icon={<FaTrash size='1rem' color='white' />} text='Eliminar'
                    className='cursor-pointer flex gap-2 items-center text-white bg-red-600 p-2 rounded-md self-end hover:shadow-md'>

                    <RecintoEliminar recinto={recinto} />
                </Modal>

            </div>
        </div>
    );
}

export default Recinto;