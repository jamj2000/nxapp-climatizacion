import { auth } from "@/auth";
import { obtenerProyecto, obtenerProyectos, obtenerEquipos } from "@/lib/data";
import { FaPlus } from "react-icons/fa6";
import Modal from "@/components/modal";
import Equipo from "@/components/equipos/item";
import EquipoInsertar from "@/components/equipos/insertar";


async function Equipos({ proyectoId }) {
    const { user } = await auth();

    let proyectos;
    let equipos;

    if (proyectoId) {
        const proyecto = await obtenerProyecto({
            id: proyectoId,
            userId: user.id,
            include: {
                user: true,
                equipos: {
                    include: {
                        proyecto: true
                    },
                }
            }
        })
        equipos = proyecto.equipos
        // equipos = await obtenerEquipos({
        //     where: { proyectoId },
        //     include: {
        //         proyecto: {
        //             include: { user: true }
        //         }
        //     }
        // })
    }
    else {
        proyectos = await obtenerProyectos({
            userId: user.id,
            include: {
                user: true,
                equipos: {
                    include: {
                        proyecto: true
                    },
                }
            }
        })

        equipos = proyectos.map(proyecto => proyecto.equipos).flat()
        // console.log(`equipos`, equipos);
        // equipos = await obtenerEquipos({
        //     include: {
        //         proyecto: {
        //             include: { user: true }
        //         }
        //     }
        // })
    }


    return (
        <div className="flex flex-col gap-8">
            <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Equipo'
                className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>
                <EquipoInsertar proyectos={proyectos} />
            </Modal>

            <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
                {equipos
                    ?.sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                    .map((equipo) => (
                        <Equipo key={equipo.id} equipo={equipo} proyectos={proyectos} />
                    ))}
            </div>
        </div>

    )
}

export default Equipos