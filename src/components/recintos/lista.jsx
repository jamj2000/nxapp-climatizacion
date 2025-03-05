import { auth } from "@/auth";
import { obtenerProyecto, obtenerProyectos } from "@/lib/data";
import { Plus } from "lucide-react";
import Modal from "@/components/modal";
import Recinto from "@/components/recintos/item";
import RecintoInsertar from "@/components/recintos/insertar";


async function Recintos({ proyectoId }) {
    const { user } = await auth();

    let proyectos;
    let recintos;

    if (proyectoId) {
        const proyecto = await obtenerProyecto({
            id: proyectoId,
            userId: user.id,
            include: {
                user: true,
                recintos: {
                    include: {
                        proyecto: true
                    },
                }
            }
        })
        recintos = proyecto.recintos
    }
    else {
        proyectos = await obtenerProyectos({
            userId: user.id,
            include: {
                user: true,
                recintos: {
                    include: {
                        proyecto: true
                    },
                }
            }
        })

        recintos = proyectos.map(proyecto => proyecto.recintos).flat()
    }

    await new Promise((resolve) => setTimeout(resolve, 4000))



    return (
        <div className="flex flex-col gap-8">
            <Modal icon={<Plus className='size-4 color-white' />} text='Crear Recinto'
                className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>
                <RecintoInsertar proyectos={proyectos} />
            </Modal>

            <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
                {recintos
                    ?.sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                    .map((recinto) => (
                        <Recinto key={recinto.id} recinto={recinto} proyectos={proyectos} />
                    ))}
            </div>
        </div>

    )
}

export default Recintos