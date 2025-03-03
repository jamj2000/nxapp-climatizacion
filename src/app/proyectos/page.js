import { Suspense } from "react";
import Contenedor from "@/components/contenedor";
import Proyectos from "@/components/proyectos/lista"
import SkeletonProyectos from "@/components/skeletons/proyectos";


async function Page(props) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    // const { user } = await auth()
    // const localidades = await obtenerLocalidades()
    // const data = { localidades, proyecto: { userId: user.id } }

    let busqueda = ""

    return (
        <Contenedor>
            <h1 className="text-4xl">Proyectos</h1>

            <Suspense fallback={<SkeletonProyectos />}>
                <Proyectos query={query} />
            </Suspense>
        </Contenedor>
    );
}

export default Page;

