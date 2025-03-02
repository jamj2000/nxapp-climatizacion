'use client'
import Spinner from "@/components/spinner";
import { useActionState, useEffect, useId } from "react";
import { modificarEquipo } from "@/lib/actions/equipo";
import { toast } from "sonner";


function EquipoModificar({ equipo, proyectos }) {
    const formId = useId()
    const [state, action, pending] = useActionState(modificarEquipo, {})

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])

    return (
        <form id={formId} action={action}>
            <input type="hidden" name="id" defaultValue={equipo.id} />

            <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
                <button disabled={pending}
                    className='bg-orange-600 hover:shadow-lg hover:font-bold text-white h-10 rounded-xl w-56 cursor-pointer'>
                    {pending ? <Spinner /> : 'Modificar equipo'}
                </button>
                <label className="grid grid-cols-[150px_auto] items-center gap-2">Proyecto asociado:
                    <select
                        name="proyectoId"
                        key={equipo.proyectoId}
                        defaultValue={equipo.proyectoId}
                        className="border-2 border-gray-300 rounded p-2"
                    >
                        {proyectos?.map(proyecto =>
                            <option key={proyecto.id} value={proyecto.id}>  {proyecto.nombre}  </option>)
                        }
                    </select>
                </label>
            </div>

            <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-3">
                <div className="bg-slate-50 rounded-md p-4 grid items-start">
                    <label className="grid grid-cols-[auto_140px] items-start gap-2">Nombre:
                        <input
                            type="text"
                            name="nombre"
                            defaultValue={equipo?.nombre ?? ''}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </label>
                    {state.issues?.nombre &&
                        <div className="text-red-700 rounded-md bg-red-50">
                            <p> {state.issues?.nombre} </p>
                        </div>
                    }
                </div>

                <div className="bg-slate-50 rounded-md p-4 grid  items-start">
                    <label className="grid grid-cols-[auto_140px] items-start gap-2">Potencia (W)
                        <input
                            type="number"
                            name="potencia"
                            defaultValue={equipo?.potencia ?? ''}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </label>
                    {state.issues?.potencia &&
                        <div className="text-red-700 rounded-md bg-red-50">
                            <p> {state.issues?.potencia} </p>
                        </div>
                    }
                </div>


                <div className="bg-slate-50 rounded-md p-4 grid  items-start">
                    <label className="grid grid-cols-[auto_140px] items-start gap-2">Factor funcimiento (%):
                        <input
                            type="number"
                            name="factor_funcionamiento"
                            defaultValue={equipo?.factor_funcionamiento ?? ''}
                            className="border-2 border-gray-300 rounded p-2 w-full"
                        />
                    </label>
                    {state.issues?.factor_funcionamiento &&
                        <div className="text-red-700 rounded-md bg-red-50">
                            <p> {state.issues?.factor_funcionamiento} </p>
                        </div>
                    }
                </div>
            </div>
        </form>
    );
}

export default EquipoModificar
