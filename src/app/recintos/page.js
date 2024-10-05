import { Suspense } from "react";
import TarjetaContenedor from "@/components/contenedor"
import Recintos from "@/components/recintos"
import SkeletonRecintos from "@/components/skeletons/recintos";
import Modal from "@/components/modal";
import { FaPlus } from "react-icons/fa6";
import FormRecinto from "@/components/forms/recinto";
import { createRecinto } from "@/lib/actions/recinto";
import { auth } from "@/auth";
import { readProyectos } from "@/lib/actions/proyecto";

async function Page() {
    const { user } = await auth()
    const proyectos = await readProyectos({ userId: user?.id, include: { recintos: true} })
    const data = { proyectos, recinto: { userId: user.id} }

    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Recintos</h1>
                <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Recinto'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <FormRecinto id={'recinto-create'} action={createRecinto} data={data} disabled={false} text="Crear Recinto" />
                </Modal>

            </div>

            <Suspense fallback={<SkeletonRecintos />}>
                <Recintos />
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;

