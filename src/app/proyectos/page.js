import { Suspense } from "react";
import Contenedor from "@/components/contenedor";
import Proyectos from "@/components/proyectos/lista"
import SkeletonProyectos from "@/components/skeletons/proyectos";
import { auth } from "@/auth";
import { insertarProyecto } from "@/lib/actions/proyecto";
import FormProyecto from "@/components/forms/proyecto";
import { FaPlus } from "react-icons/fa6";
import Modal from "@/components/modal";
import { obtenerLocalidades } from "@/lib/data";

async function Page(props) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const { user } = await auth()
    const localidades = await obtenerLocalidades()
    const data = { localidades, proyecto: { userId: user.id } }

    let busqueda = ""

    return (
        <Contenedor>
            <div className="flex justify-between mb-6">
                <h1 className="text-4xl">Proyectos</h1>
                <Modal icon={<FaPlus size='1rem' color='white' />} text='Crear Proyecto'
                    className='cursor-pointer flex gap-2 items-center text-white bg-green-600 p-2 rounded-md self-end hover:shadow-md'>

                    <FormProyecto id={'proyecto-create'} action={insertarProyecto} data={data} disabled={false} text="Crear Proyecto" />
                </Modal>

            </div>
            <Suspense fallback={<SkeletonProyectos />}>
                <Proyectos query={query} />
            </Suspense>
        </Contenedor>
    );
}

export default Page;

