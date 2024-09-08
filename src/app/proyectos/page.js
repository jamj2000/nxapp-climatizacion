import { Suspense } from "react";
import TarjetaContenedor from "@/components/cards/contenedor";
import Proyectos from "@/components/cards/proyectos"
import SkeletonProyectos from "@/components/skeletons/proyectos";
import { auth } from "@/auth";
import { createProyecto } from "@/lib/actions/proyecto";
import FormProyecto from "@/components/forms/proyecto";
import { FaPlus } from "react-icons/fa6";
import Modal from "@/components/modal";

async function Page() {
    const { user } = await auth()

    let busqueda = ""

    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Proyectos</h1>
                <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Proyecto'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <FormProyecto action={createProyecto} data={null} disabled={false} text="Crear Proyecto" />
                </Modal>

                {
                    user?.role === "ADMIN" &&
                    <input
                        className="ml-5 text-center"
                        defaultValue={busqueda}
                        placeholder="Busqueda de proyectos"
                    />
                }
            </div>
            <Suspense fallback={<SkeletonProyectos />}>
                <Proyectos />
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;

