'use client'
import Spinner from "@/components/spinner";
import { useActionState, useEffect, useId } from "react";
import { eliminarEquipo } from "@/lib/actions/equipo";
import { toast } from "sonner";



function EquipoEliminar({ equipo }) {
    const formId = useId()
    const [state, action, pending] = useActionState(eliminarEquipo, {})

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])

    return (
        <form id={formId} action={action} >
            <input type="hidden" name="id" defaultValue={equipo.id} />
            <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
                <button disabled={pending}
                    className='bg-red-600 hover:shadow-lg hover:font-bold text-white h-10 rounded-xl w-56 cursor-pointer'>
                    {pending ? <Spinner /> : 'Eliminar equipo'}
                </button>

                <div className="grid items-center gap-2">
                    <p>Proyecto asociado: {equipo.proyecto.nombre}</p>
                </div>
            </div>

            <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-3">

                <div className="bg-slate-50 rounded-md p-4 grid grid-cols-2 place-items-center gap-2">
                    <p className="justify-self-start">Nombre</p>
                    <p className="justify-self-end">{equipo.nombre}</p>
                </div>

                <div className="bg-slate-50 rounded-md p-4 grid grid-cols-2 place-items-center gap-2">
                    <p className="justify-self-start">Potencia (W)</p>
                    <p className="justify-self-end">{equipo.potencia}</p>
                </div>

                <div className="bg-slate-50 rounded-md p-4 grid grid-cols-2 place-items-center gap-2">
                    <p className="justify-self-start">Factor de funcionamiento (%)</p>
                    <p className="justify-self-end">{equipo.factor_funcionamiento}</p>
                </div>
            </div>
        </form>
    );
}

export default EquipoEliminar
