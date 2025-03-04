import { Suspense } from "react";
import Contenedor from "@/components/contenedor"
import Recintos from "@/components/recintos/lista"
import SkeletonRecintos from "@/components/skeletons/recintos";



async function Page() {
    return (
        <Contenedor>
            <h1 className="text-4xl">Recintos</h1>

            <Suspense fallback={<SkeletonRecintos />}>
                <Recintos />
            </Suspense>
        </Contenedor>
    );
}

export default Page;
