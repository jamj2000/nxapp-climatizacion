import Equipo from "@/components/equipo";
import { auth } from "@/auth";
import { obtenerProyecto, obtenerProyectos } from "@/lib/data";
import Modal from "@/components/modal";
import FormEquipo from "@/components/forms/equipo";
import { FaPlus } from "react-icons/fa6";
import { insertarEquipo } from "@/lib/actions/equipo";

async function Equipos({ proyectoId }) {
    const sesion = await auth();
    const { user } = sesion;

    const proyectos = await obtenerProyectos({ id: proyectoId, userId: user?.id, include: { equipos: true } })
    let equipos;

    if (proyectoId) {
        const proyecto = await obtenerProyecto({ id: proyectoId, include: { equipos: true } })
        equipos = proyecto?.equipos
    }
    else {
        equipos = proyectos?.map(proyecto => proyecto.equipos).flat()
    }


    return (
        <div className="flex flex-col gap-8">
            <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Equipo'
                className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>
                <FormEquipo id={'equipo-create'} action={insertarEquipo} user={user} disabled={false} text="Crear Equipo" />

            </Modal>
            <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
                {
                    equipos
                        ?.sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                        .map((equipo) => (
                            // <Equipo key={equipo.id} equipo={equipo} proyectos={proyectos} />
                            <Equipo key={equipo.id} equipo={equipo} proyectos={proyectos} />

                        ))}

            </div>
        </div>

    )
}

export default Equipos

