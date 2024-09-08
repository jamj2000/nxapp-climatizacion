import { Suspense } from "react";
import TarjetaContenedor from "@/components/cards/contenedor"
import Recintos from "@/components/cards/recintos"
import SkeletonRecintos from "@/components/skeletons/recintos";
import Modal from "@/components/modal";
import { FaPlus } from "react-icons/fa6";
import FormRecinto from "@/components/forms/recinto";
import { createRecinto } from "@/lib/actions/recinto";

async function Page() {

    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Recintos</h1>
                <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Recinto'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <FormRecinto action={createRecinto} data={null} disabled={false} text="Crear Recinto" />
                </Modal>

            </div>

            <Suspense fallback={<SkeletonRecintos />}>
                <Recintos />
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;

