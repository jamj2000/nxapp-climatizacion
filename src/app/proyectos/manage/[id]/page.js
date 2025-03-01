import { Suspense } from "react";
import TarjetaContenedor from "@/components/contenedor";
import Recintos from "@/components/recintos"
import SkeletonRecintos from "@/components/skeletons/recintos";
import Equipos from "@/components/equipos"
import SkeletonEquipos from "@/components/skeletons/equipos";
import Modal from "@/components/modal";
import { FaPlus } from "react-icons/fa6";
import FormRecinto from "@/components/forms/recinto";
import FormEquipo from "@/components/forms/equipo";
import { createEquipo } from "@/lib/actions/equipo";
import { createRecinto } from "@/lib/actions/recinto";
import { getProyectos } from "@/lib/actions/proyecto";
import { auth } from "@/auth";


async function Page(props) {
    const params = await props.params;
    const { user } = await auth()
    const proyectos = await getProyectos({ userId: user?.id, include: { equipos: true, recintos: true} })
    const data = { proyectos, equipo: { userId: user.id}, recinto: { userId: user.id} }

    return (
        <TarjetaContenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl font-semibold">Recintos y Equipos</h1>
                {/* <Link
                    href="/proyectos/create"
                    className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                > Crear Proyecto
                </Link>
                {
                    user?.role === "ADMIN" &&
                    <input
                        className="ml-5 text-center"
                        defaultValue={busqueda}
                        placeholder="Busqueda de proyectos"
                    />
                } */}
            </div>
                   
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Recintos</h1>
                <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Recinto'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <FormRecinto id={'recinto-create'} action={createRecinto} data={data} disabled={false} text="Crear Recinto" />
                </Modal>

            </div>
            <Suspense fallback={<SkeletonRecintos />}>
                <Recintos proyectoId={Number(params.id)}/>
            </Suspense>


            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Equipos</h1>
                <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Equipo'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <FormEquipo id={'equipo-create'} action={createEquipo} data={data} disabled={false} text="Crear Equipo" />
                </Modal>

            </div>
            <Suspense fallback={<SkeletonEquipos />}>
                <Equipos proyectoId={Number(params.id)}/>
            </Suspense>
        </TarjetaContenedor>
    );
}

export default Page;


