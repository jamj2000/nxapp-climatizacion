import Contenedor from "@/components/contenedor";
import Modal from "@/components/modal";
import Recintos from "@/components/recintos/lista"
import Equipos from "@/components/equipos/lista"
import SkeletonRecintos from "@/components/skeletons/recintos";
import SkeletonEquipos from "@/components/skeletons/equipos";
import RecintoInsertar from "@/components/recintos/insertar";
import EquipoInsertar from "@/components/equipos/insertar";
import { Suspense } from "react";
import { obtenerProyectos } from "@/lib/data";
import { auth } from "@/auth";
import { Plus } from "lucide-react";

async function Page(props) {
    const params = await props.params;
    const { user } = await auth()
    const proyectos = await obtenerProyectos({ userId: user?.id, include: { equipos: true, recintos: true } })
    // const data = { proyectos, equipo: { userId: user.id }, recinto: { userId: user.id } }

    return (
        <Contenedor>
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
                <Modal icon={<Plus className='size-4 color-white' />} text='Crear Recinto'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <RecintoInsertar proyectos={proyectos} />
                </Modal>

            </div>
            <Suspense fallback={<SkeletonRecintos />}>
                <Recintos proyectoId={Number(params.id)} />
            </Suspense>


            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Equipos</h1>
                <Modal icon={<Plus className='size-4 color-white' />} text='Crear Equipo'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <EquipoInsertar proyectos={proyectos} />
                </Modal>

            </div>
            <Suspense fallback={<SkeletonEquipos />}>
                <Equipos proyectoId={Number(params.id)} />
            </Suspense>
        </Contenedor>
    );
}

export default Page;


