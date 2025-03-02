import { Suspense } from "react";
import Contenedor from "@/components/contenedor"
import Equipos from "@/components/equipos/lista"
import SkeletonEquipos from "@/components/skeletons/equipos";



async function Page() {

    return (
        <Contenedor>
            <h1 className="text-4xl">Equipos</h1>

            <Suspense fallback={<SkeletonEquipos />}>
                <Equipos />
            </Suspense>
        </Contenedor>
    );
}

export default Page;
