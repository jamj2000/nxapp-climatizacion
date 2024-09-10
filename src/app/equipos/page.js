import { Suspense } from "react";
import Link from "next/link";
import TarjetaContenedor from "@/components/contenedor"
import Equipos from "@/components/equipos"
import SkeletonEquipos from "@/components/skeletons/equipos";
import Modal from "@/components/modal";
import FormEquipo from "@/components/forms/equipo";
import { FaEye, FaPlus } from "react-icons/fa6";
import { createEquipo } from "@/lib/actions/equipo";

async function Page() {

    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Equipos</h1>
                <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Equipo'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <FormEquipo action={createEquipo} data={null} disabled={false} text="Crear Equipo" />
                </Modal>

            </div>
            <Suspense fallback={<SkeletonEquipos />}>
                <Equipos />
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;
