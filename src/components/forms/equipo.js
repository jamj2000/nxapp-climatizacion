'use client'
import Boton from "@/components/boton";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function FormEquipo({ action, texto,  equipo, proyectos, disabled = false }) {
  const router = useRouter()
 
  const [errores, setErrores] = useState(null)

  async function wrapper(formData) {
    const errores = await action(formData);
    // console.log(errores);
    setErrores(errores)
    if (!errores) router.back()
  }

  return (
    <form action={wrapper}>
      <input type="hidden" name="id" defaultValue={equipo?.id} />
      {disabled && <input type='hidden' name="proyectoId" defaultValue={equipo?.proyectoId} />}

      <div className={`text-red-700 rounded-md bg-red-50  ${errores ? 'block p-4' : 'hidden'}`}>
        <p className="uppercase mb-2 text-black">Errores detectados:</p>
        {errores
          && errores.map(({ campo, mensaje }, index) => (
            <div key={index}>
              <p className="font-light">{campo}</p>
              <p className="indent-10">{mensaje}</p>
            </div>))
        }
      </div>


      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
        <Boton texto={texto} />
        <label className="grid grid-cols-[150px_auto] items-center gap-2">Proyecto asociado:
          {disabled
            ? <span className="font-bold">{proyectos.find(p => p.id == equipo?.proyectoId)?.nombre ?? proyectos[0].nombre} </span>
            : <select
              name="proyectoId"
              // disabled={disabled} Esto interfiere al devolver el valor
              className="border-2 border-gray-300 rounded p-2"
              defaultValue={equipo?.proyectoId}
            >
              {proyectos?.map((proyecto) =>
                <option key={proyecto.id} value={proyecto.id}>
                  {proyecto.nombre}
                </option>
              )}
            </select>
          }
        </label>
      </div>

      <fieldset disabled={disabled}>

        <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-3">
          <div className="bg-slate-50 rounded-md p-4 grid items-center">
            <label className="grid grid-cols-[auto_140px] items-center gap-2">Nombre:

              <input
                type="text"
                name="nombre"
                defaultValue={equipo?.nombre}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>

          <div className="bg-slate-50 rounded-md p-4 grid items-center">
            <label className="grid grid-cols-[auto_140px] items-center gap-2">Potencia (W)
              <input
                type="number"
                name="potencia"
                defaultValue={Number(equipo?.potencia)}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>


          <div className="bg-slate-50 rounded-md p-4 grid items-center">
            <label className="grid grid-cols-[auto_140px] items-center gap-2">Factor funcimiento (%):
              <input
                type="number"
                name="factor_funcionamiento"
                defaultValue={Number(equipo?.factor_funcionamiento)}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
          </div>
        </div>
      </fieldset>


    </form>
  );
}

