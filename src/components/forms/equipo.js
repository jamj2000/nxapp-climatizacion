'use client'
import Boton from "@/components/boton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function FormEquipo({ action, data, disabled, text }) {

  const router = useRouter()

  const [equipo, setEquipo] = useState({})
  const [proyectos, setProyectos] = useState([])
  const [errores, setErrores] = useState(null)


  useEffect(() => {
    setEquipo(data?.equipo)
    setProyectos(data?.proyectos)
  }, [data?.equipo, data?.proyectos])


  async function wrapper(formData) {
    const errores = await action(formData);
    setErrores(errores)
    // if (!errores) { router.prefetch('/equipos'); router.forward() }
  }

  return (
    <form action={wrapper}>
      <input type="hidden" name="id" defaultValue={equipo?.id} />

      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
        <Boton texto={text} />
        <label className="grid grid-cols-[150px_auto] items-center gap-2">Proyecto asociado:
          {disabled
              ? <>
                <input type='hidden' name="proyectoId" defaultValue={equipo?.proyectoId} />
                <span className="font-bold">{proyectos.find(p => p.id === equipo.proyectoId)?.nombre} </span>
              </>
              : <select
                name="proyectoId"
                className="border-2 border-gray-300 rounded p-2"
                value={equipo?.proyectoId}
                onChange={(e) => setEquipo({ ...equipo, proyectoId: e.target.value })}
              >
                { proyectos
                    ?.map(proyecto => <option key={proyecto.id} value={proyecto.id}>  {proyecto.nombre}  </option>)
                }
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
                value={equipo?.nombre}
                onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
            <div className={`text-red-700 rounded-md bg-red-50  ${errores?.nombre ? 'block p-4' : 'hidden'}`}>
              <p> {errores?.nombre} </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-md p-4 grid  items-start">
            <label className="grid grid-cols-[auto_140px] items-start gap-2">Potencia (W)
              <input
                type="number"
                name="potencia"
                value={Number(equipo?.potencia)}
                onChange={(e) => setEquipo({ ...equipo, potencia: e.target.value })}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
            <div className={`text-red-700 rounded-md bg-red-50  ${errores?.potencia ? 'block p-4' : 'hidden'}`}>
              <p> {errores?.potencia} </p>
            </div>
          </div>


          <div className="bg-slate-50 rounded-md p-4 grid  items-start">
            <label className="grid grid-cols-[auto_140px] items-start gap-2">Factor funcimiento (%):
              <input
                type="number"
                name="factor_funcionamiento"
                value={Number(equipo?.factor_funcionamiento)}
                onChange={(e) => setEquipo({ ...equipo, factor_funcionamiento: e.target.value })}
                className="border-2 border-gray-300 rounded p-2 w-full"
              />
            </label>
            <div className={`text-red-700 rounded-md bg-red-50  ${errores?.factor_funcionamiento ? 'block p-4' : 'hidden'}`}>
              <p> {errores?.factor_funcionamiento} </p>
            </div>
          </div>
        </div>
      </fieldset>


    </form>
  );
}

