import { Suspense } from "react";
import Recintos from "@/components/tarjetas/recintos"
import SkeletonRecintos from "@/components/skeletons/recintos";

async function Page() {

    return (
        <Suspense fallback={<SkeletonRecintos />}>
            <Recintos />
        </Suspense>
    );
}

export default Page;

