import Proyecto from "@/components/proyectos/item";
import { auth } from "@/auth";
import { obtenerProyectosFiltrados } from "@/lib/data";
import { obtenerLocalidades } from "@/lib/data";
import Modal from "../modal";
import { Plus } from "lucide-react";
import ProyectoInsertar from "./insertar";

async function Proyectos({ query }) {
    const { user } = await auth();
    const localidades = await obtenerLocalidades()
    // const data = { localidades, proyecto: { userId: user.id } }

    let proyectos = {}

    if (user?.role === "ADMIN")
        proyectos = await obtenerProyectosFiltrados({
            include: {
                user: true,
                localidad: {
                    include: { zona_climatica: true }
                }
            }
        }, query)
    else {
        proyectos = await obtenerProyectosFiltrados({
            userId: user?.id,
            include: {
                user: true,
                localidad: {
                    include: { zona_climatica: true }
                }
            }
        }, query)
    }


    return (
        <div className="flex flex-col gap-8">
            {/* <Search /> */}

            <Modal icon={<Plus className='size-4 color-white' />} text='Crear Proyecto '
                className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>
                <ProyectoInsertar localidades={localidades} user={user} />
            </Modal>

            <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
                {proyectos
                    ?.sort((a, b) => a.nombre.localeCompare(b.nombre.toLowerCase()))     // Ordenamos por nombre
                    .map((proyecto) => (
                        <Proyecto key={proyecto.id} proyecto={proyecto} localidades={localidades} />
                    ))}
            </div>
        </div>

    );

}

export default Proyectos;
