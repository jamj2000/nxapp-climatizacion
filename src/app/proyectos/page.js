import { Suspense } from "react";
import Proyectos from "@/components/tarjetas/proyectos"
import SkeletonProyectos from "@/components/skeletons/proyectos";

async function Page() {

    return (
        <Suspense fallback={<SkeletonProyectos />}>
            <Proyectos />
        </Suspense>
    );
}

export default Page;

