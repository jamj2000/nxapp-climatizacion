import { Suspense } from "react";
import Equipos from "@/components/tarjetas/equipos"
import SkeletonEquipos from "@/components/skeletons/equipos";

async function Page() {

    return (
        <Suspense fallback={<SkeletonEquipos />}>
            <Equipos />
        </Suspense>
    );
}

export default Page;
