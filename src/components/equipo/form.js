'use client'
import { useActionState, useEffect, useId } from "react";
import { updateEquipo } from "@/lib/actions/equipo"
import { toast } from "sonner";
import Spinner from "../spinner";



export default function FormEquipo({ id, action, data, disabled, text }) {

  const formId = useId()
  const { equipo, proyectos } = data
  const [state, formAction, pending] = useActionState(updateEquipo, {})



  useEffect(() => {
    if (state?.success) {
      toast.success(state.success)
      document.getElementById(formId)?.closest('dialog')?.close()
    }
  }, [state, formId])



  return (
    <form id={formId} action={formAction}>
      <input type="hidden" name="id" defaultValue={equipo?.id} />

      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
        <button type='submit' disabled={pending}
          className='bg-sky-600 transition duration-500 hover:bg-sky-600/50 bg-center text-white bg-no-repeat h-10 rounded-xl w-56  cursor-pointer'>
          {pending ? <Spinner /> : text}
        </button>

        <label className="grid grid-cols-[150px_auto] items-center gap-2">Proyecto asociado:
          {disabled
            ? <>
              <input type='hidden' name="proyectoId" defaultValue={equipo?.proyectoId} />
              <span className="font-bold">{proyectos?.find(p => p.id === equipo.proyectoId)?.nombre} </span>
            </>
            : <select
              name="proyectoId"
              className="border-2 border-gray-300 rounded p-2"
              key={equipo?.proyectoId}
              value={equipo?.proyectoId}
            >
              {proyectos?.map(proyecto =>
                <option key={proyecto.id} value={proyecto.id}>  {proyecto.nombre}  </option>
              )}
            </select>
          }
        </label>
      </div>

      <fieldset disabled={disabled}>

        <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-3">
          <div className="bg-slate-50 rounded-md p-4 grid items-start">
            <label className="grid grid-cols-[auto_140px] items-start gap-2">Nombre:

              <input
                type="text"
                name="nombre"
                defaultValue={equipo?.nombre}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
            {state.issues?.nombre
              &&
              <div className={`text-red-700 rounded-md bg-red-50`}>
                {state.issues.nombre}
              </div>
            }
          </div>

          <div className="bg-slate-50 rounded-md p-4 grid  items-start">
            <label className="grid grid-cols-[auto_140px] items-start gap-2">Potencia (W)
              <input
                // type="number"
                name="potencia"
                defaultValue={Number(equipo?.potencia)}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
            {state.issues?.potencia
              &&
              <div className={`text-red-700 rounded-md bg-red-50}`}>
                {state.issues.potencia}
              </div>
            }
          </div>


          <div className="bg-slate-50 rounded-md p-4 grid  items-start">
            <label className="grid grid-cols-[auto_140px] items-start gap-2">Factor funcimiento (%):
              <input
                // type="number"
                name="factor_funcionamiento"
                defaultValue={Number(equipo?.factor_funcionamiento)}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
            {state.issues?.factor_funcionamiento && state.issues.factor_funcionamiento}
            {state.issues?.factor_funcionamiento
              &&

              <div className={`text-red-700 rounded-md bg-red-50`}>
                {state.issues.factor_funcionamiento}
              </div>
            }
          </div>
        </div>
      </fieldset>


    </form>
  );
}

