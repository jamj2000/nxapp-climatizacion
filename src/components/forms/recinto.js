// Manejar el evento onWheel en los inputs type number
// https://github.com/facebook/react/issues/24986
// https://codesandbox.io/s/friendly-browser-ueyekx
'use client'
import Boton from "@/components/boton";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";


export default function FormRecinto({ action, data, disabled, text }) {

  const router = useRouter()

  const ORIENTACION = ['NORTE', 'ESTE', 'SUR', 'OESTE'] // En el sentido de las agujas del reloj

  const [recinto, setRecinto] = useState({})
  const [proyectos, setProyectos] = useState([])
  const [errores, setErrores] = useState(null)

  let volumen = recinto?.longitud * recinto?.anchura * recinto?.altura;
  let alturaXanchura = recinto?.altura * recinto?.anchura;
  let alturaXlongitud = recinto?.altura * recinto?.longitud;
  let anchuraXlongitud = recinto?.anchura * recinto?.longitud;


  useEffect(() => {
    setRecinto(data?.recinto)
    setProyectos(data?.proyectos)
  }, [data?.recinto, data?.proyectos])


  function updateOrientacion(event) {
    const orientacionC1 = event.target.value
    const orientacionC1Index = ORIENTACION.indexOf(orientacionC1)

    setRecinto({
      ...recinto,
      orientacion_c_1: orientacionC1,
      orientacion_c_2: ORIENTACION[(orientacionC1Index + 1) % 4],
      orientacion_c_3: ORIENTACION[(orientacionC1Index + 2) % 4],
      orientacion_c_4: ORIENTACION[(orientacionC1Index + 3) % 4]
    })
  }


  async function wrapper(formData) {
    const errores = await action(formData);
    setErrores(errores)
    // if (!errores) router.back()
  }




  return (
    <form action={wrapper} >
      <input type="hidden" name="id" defaultValue={recinto?.id} />

      <div className={`text-red-700 rounded-md bg-red-50  ${errores ? 'block p-4' : 'hidden'}`}>
        <p className="uppercase mb-2 text-black" > Errores detectados: </p>
        {errores
          && errores.map(({ campo, mensaje }, index) => (
            <div key={index} >
              <p className="font-light" > {campo} </p>
              <p className="indent-10" > {mensaje} </p>
            </div>))
        }
      </div>


      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row" >
        <Boton texto={text} />
        <label className="grid grid-cols-[150px_auto] items-center gap-2" > Proyecto asociado:
          {disabled
            ? <>
              <input type='hidden' name="proyectoId" defaultValue={recinto?.proyectoId} />
              <span className="font-bold">{proyectos.find(p => p.id === recinto?.proyectoId)?.nombre}  </span>
            </>
            : <select
              name="proyectoId"
              className="border-2 border-gray-300 rounded p-2"
              value={recinto?.proyectoId}
              onChange={(e) => setRecinto({ ...recinto, proyectoId: e.target.value })}
            >
              {
                proyectos
                  ?.map(proyecto => <option key={proyecto.id} value={proyecto.id} >  {proyecto.nombre} </option>)
              }
            </select>
          }
        </label>
      </div>

      <fieldset disabled={disabled} >

        <details open className="mt-4 p-4 border rounded shadow-md" >
          <summary className="font-bold" > RECINTO: </summary>
          <label className="grid items-start gap-2 font-bold">
            <input
              type="text"
              name="nombre"
              maxLength={50}
              value={recinto?.nombre}
              onChange={(e) => setRecinto({ ...recinto, nombre: e.target.value })}
              className="border-2 border-gray-300 rounded ml-2 p-2 text-left"
            />
          </label>
        </details>



        <details className="mt-4 p-4 border rounded shadow-md" >
          <summary className="font-bold" > DATOS </summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura relativa(Verano):

                <input
                  type="number"
                  name="temp_ver_relativa"
                  min={-100}
                  max={100}
                  step={0.01}
                  value={recinto?.temp_ver_relativa}
                  onChange={(e) => setRecinto({ ...recinto, temp_ver_relativa: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Humedad relativa(Verano):

                <input
                  type="number"
                  name="hum_ver_relativa"
                  // min={30}
                  // max={70}
                  value={recinto?.hum_ver_relativa}
                  onChange={(e) => setRecinto({ ...recinto, hum_ver_relativa: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura relativa(Invierno):

                <input
                  type="number"
                  name="temp_inv_relativa"
                  min={-100}
                  max={100}
                  step={0.01}
                  value={recinto?.temp_inv_relativa}
                  onChange={(e) => setRecinto({ ...recinto, temp_inv_relativa: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Humedad relativa(Invierno):

                <input
                  type="number"
                  name="hum_inv_relativa"
                  // min={30}
                  // max={70}
                  value={recinto?.hum_inv_relativa}
                  onChange={(e) => setRecinto({ ...recinto, hum_inv_relativa: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Longitud:
                <input
                  type="number"
                  name="longitud"
                  value={recinto?.longitud}
                  onChange={(e) => setRecinto({ ...recinto, longitud: e.target.value })}
                  step={0.01}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Anchura:
                <input
                  type="number"
                  name="anchura"
                  value={recinto?.anchura}
                  onChange={(e) => setRecinto({ ...recinto, anchura: e.target.value })}
                  step={0.01}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Altura:
                <input
                  type="number"
                  name="altura"
                  value={recinto?.altura}
                  onChange={(e) => setRecinto({ ...recinto, altura: e.target.value })}
                  // onChange={(e) => setAltura(e.target.value)}
                  step={0.01}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Volumen:
                <input
                  readOnly
                  type="number"
                  name="volumen"
                  value={volumen.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                <div className="flex justify-between" >
                  IDA:
                  <Image width={20} height={20}
                    src="/question.svg"
                    className="ml-2"
                    alt="info"
                    title={`.                    
                      IDA 1: (aire de óptima calidad): hospitales, clínicas, laboratorios y guarderías.${""}
                      IDA 2: (aire de buena calidad): oficinas, residencias, salas de lectura, museos, salas de tribunales, aulas de enseñanza y piscinas. ${""} 
                      IDA 3: (aire de calidad media): edificios comerciales, cines, teatros, salones de actos, habitaciones de hoteles, restaurantes y bares, 
                      gimnasios, locales para el deporte y salas de ordenadores. ${""}
                      IDA 4: (aire de calidad baja).`}
                  />
                </div>


                <select
                  name="ida"
                  value={recinto?.ida}
                  onChange={(e) => setRecinto({ ...recinto, ida: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="ida1" > IDA 1 </option>
                  <option value="ida2" > IDA 2 </option>
                  <option value="ida3" > IDA 3 </option>
                  <option value="ida4" > IDA 4 </option>
                </select>
              </label>
            </div>
          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md" >
          <summary className="font-bold" > Cerramiento 1: </summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                <select
                  name="ubicacion_c_1"
                  value={recinto?.ubicacion_c_1}
                  onChange={(e) => setRecinto({ ...recinto, ubicacion_c_1: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior" > Interior </option>
                  <option value="exterior" > Exterior </option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Color:
                <select
                  name="color_c_1"
                  value={recinto?.color_c_1}
                  onChange={(e) => setRecinto({ ...recinto, color_c_1: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="claro" > Claro </option>
                  <option value="medio" > Medio </option>
                  <option value="oscuro" > Oscuro </option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura cerramiento(Verano):

                <input
                  type="number"
                  name="temperatura_ver_c_1"
                  min={- 100}
                  max={100}
                  step={0.01}
                  value={recinto?.temperatura_ver_c_1}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_ver_c_1: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura cerramiento(Invierno):

                <input
                  type="number"
                  name="temperatura_inv_c_1"
                  min={- 100}
                  max={100}
                  step={0.01}
                  value={recinto?.temperatura_inv_c_1}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_inv_c_1: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Superficie cerramiento(m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_c_1"
                  step={0.01}
                  value={alturaXlongitud.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                <select
                  name="tipo_vidrio_c_1"
                  value={recinto?.tipo_vidrio_c_1}
                  onChange={(e) => setRecinto({ ...recinto, tipo_vidrio_c_1: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal" > Normal </option>
                  <option value="doble" > Doble </option>
                  <option value="triple" > Triple </option>
                  <option value="baja_emisividad" > Baja emisividad </option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie vidrio:
                <input
                  type="number"
                  name="superficie_vidrio_c_1"
                  step={0.01}
                  value={recinto?.superficie_vidrio_c_1}
                  onChange={(e) => setRecinto({ ...recinto, superficie_vidrio_c_1: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                <input
                  type="number"
                  name="superficie_puertas_c_1"
                  min={0}
                  max={100}
                  step={0.01}
                  value={recinto?.superficie_puertas_c_1}
                  onChange={(e) => setRecinto({ ...recinto, superficie_puertas_c_1: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                <select
                  name="orientacion_c_1"
                  value={recinto?.orientacion_c_1 ?? ORIENTACION[0]}
                  onChange={updateOrientacion}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value={ORIENTACION[0]}> {ORIENTACION[0]} </option>
                  <option value={ORIENTACION[1]}> {ORIENTACION[1]} </option>
                  <option value={ORIENTACION[2]}> {ORIENTACION[2]} </option>
                  <option value={ORIENTACION[3]}> {ORIENTACION[3]} </option>
                </select>
              </label>
            </div>

          </div>
        </details>

        <details className="mt-4 p-4 border rounded shadow-md" >
          <summary className="font-bold" > Cerramiento 2: </summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                <select
                  name="ubicacion_c_2"
                  value={recinto?.ubicacion_c_2}
                  onChange={(e) => setRecinto({ ...recinto, ubicacion_c_2: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior" > Interior </option>
                  <option value="exterior" > Exterior </option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Color:
                <select
                  name="color_c_2"
                  value={recinto?.color_c_2}
                  onChange={(e) => setRecinto({ ...recinto, color_c_2: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="claro" > Claro </option>
                  <option value="medio" > Medio </option>
                  <option value="oscuro" > Oscuro </option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura cerramiento(Verano):

                <input
                  type="number"
                  name="temperatura_ver_c_2"
                  min={- 100}
                  max={100}
                  step={0.01}
                  value={recinto?.temperatura_ver_c_2}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_ver_c_2: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura cerramiento(Invierno):

                <input
                  type="number"
                  name="temperatura_inv_c_2"
                  min={- 100}
                  max={100}
                  step={0.01}
                  value={recinto?.temperatura_ver_c_2}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_ver_c_2: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Superficie cerramiento(m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_c_2"
                  step={0.01}
                  value={alturaXanchura.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                <select
                  name="tipo_vidrio_c_2"
                  value={recinto?.tipo_vidrio_c_2}
                  onChange={(e) => setRecinto({ ...recinto, tipo_vidrio_c_2: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal" > Normal </option>
                  <option value="doble" > Doble </option>
                  <option value="triple" > Triple </option>
                  <option value="baja_emisividad" > Baja emisividad </option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie vidrio:
                <input
                  type="number"
                  name="superficie_vidrio_c_2"
                  step={0.01}
                  value={recinto?.superficie_vidrio_c_2}
                  onChange={(e) => setRecinto({ ...recinto, superficie_vidrio_c_2: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                <input
                  type="number"
                  name="superficie_puertas_c_2"
                  min={0}
                  max={100}
                  step={0.01}
                  value={recinto?.superficie_puertas_c_2}
                  onChange={(e) => setRecinto({ ...recinto, superficie_puertas_c_2: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                <input
                  readOnly
                  name="orientacion_c_2"
                  value={recinto?.orientacion_c_2}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md" >
          <summary className="font-bold" > Cerramiento 3: </summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                <select
                  name="ubicacion_c_3"
                  value={recinto?.ubicacion_c_3}
                  onChange={(e) => setRecinto({ ...recinto, ubicacion_c_3: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior" > Interior </option>
                  <option value="exterior" > Exterior </option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Color:
                <select
                  name="color_c_3"
                  value={recinto?.color_c_3}
                  onChange={(e) => setRecinto({ ...recinto, color_c_3: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="claro" > Claro </option>
                  <option value="medio" > Medio </option>
                  <option value="oscuro" > Oscuro </option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura cerramiento(Verano):

                <input
                  type="number"
                  name="temperatura_ver_c_3"
                  min={- 100}
                  max={100}
                  step={0.01}
                  value={recinto?.temperatura_ver_c_3}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_ver_c_3: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura cerramiento(Invierno):

                <input
                  type="number"
                  name="temperatura_inv_c_3"
                  min={- 100}
                  max={100}
                  step={0.01}
                  value={recinto?.temperatura_inv_c_3}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_inv_c_3: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Superficie cerramiento(m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_c_3"
                  step={0.01}
                  value={alturaXlongitud.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                <select
                  name="tipo_vidrio_c_3"
                  value={recinto?.tipo_vidrio_c_3}
                  onChange={(e) => setRecinto({ ...recinto, tipo_vidrio_c_3: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal" > Normal </option>
                  <option value="doble" > Doble </option>
                  <option value="triple" > Triple </option>
                  <option value="baja_emisividad" > Baja emisividad </option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie vidrio:
                <input
                  type="number"
                  name="superficie_vidrio_c_3"
                  step={0.01}
                  value={recinto?.superficie_vidrio_c_3}
                  onChange={(e) => setRecinto({ ...recinto, superficie_vidrio_c_3: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                <input
                  type="number"
                  name="superficie_puertas_c_3"
                  min={0}
                  max={100}
                  step={0.01}
                  value={recinto?.superficie_puertas_c_3}
                  onChange={(e) => setRecinto({ ...recinto, superficie_puertas_c_3: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                <input
                  readOnly
                  name="orientacion_c_3"
                  value={recinto?.orientacion_c_3}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

          </div>
        </details>

        <details className="mt-4 p-4 border rounded shadow-md" >
          <summary className="font-bold" > Cerramiento 4: </summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                <select
                  name="ubicacion_c_4"
                  value={recinto?.ubicacion_c_4}
                  onChange={(e) => setRecinto({ ...recinto, ubicacion_c_4: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior" > Interior </option>
                  <option value="exterior" > Exterior </option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Color:
                <select
                  name="color_c_4"
                  value={recinto?.color_c_4}
                  onChange={(e) => setRecinto({ ...recinto, color_c_4: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="claro" > Claro </option>
                  <option value="medio" > Medio </option>
                  <option value="oscuro" > Oscuro </option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura cerramiento(Verano):

                <input
                  type="number"
                  min={- 100}
                  max={100}
                  step={0.01}
                  name="temperatura_ver_c_4"
                  value={recinto?.temperatura_ver_c_4}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_ver_c_4: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura cerramiento(Invierno):

                <input
                  type="number"
                  min={- 100}
                  max={100}
                  step={0.01}
                  name="temperatura_inv_c_4"
                  value={recinto?.temperatura_inv_c_4}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_inv_c_4: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Superficie cerramiento(m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_c_4"
                  step={0.01}
                  value={alturaXanchura.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                <select
                  name="tipo_vidrio_c_4"
                  value={recinto?.tipo_vidrio_c_4}
                  onChange={(e) => setRecinto({ ...recinto, tipo_vidrio_c_4: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal" > Normal </option>
                  <option value="doble" > Doble </option>
                  <option value="triple" > Triple </option>
                  <option value="baja_emisividad" > Baja emisividad </option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie vidrio:
                <input
                  type="number"
                  name="superficie_vidrio_c_4"
                  step={0.01}
                  value={recinto?.superficie_vidrio_c_4}
                  onChange={(e) => setRecinto({ ...recinto, superficie_vidrio_c_4: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                <input
                  type="number"
                  name="superficie_puertas_c_4"
                  min={0}
                  max={100}
                  step={0.01}
                  value={recinto?.superficie_puertas_c_4}
                  onChange={(e) => setRecinto({ ...recinto, superficie_puertas_c_4: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                <input
                  readOnly
                  name="orientacion_c_4"
                  value={recinto?.orientacion_c_4}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

          </div>

        </details>

        <details className="mt-4 p-4 border rounded shadow-md" >
          <summary className="font-bold" > Suelo: </summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                <select
                  name="ubicacion_suelo"
                  value={recinto?.ubicacion_suelo}
                  onChange={(e) => setRecinto({ ...recinto, ubicacion_suelo: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior" > Interior </option>
                  <option value="exterior" > Exterior </option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura suelo(Verano):

                <input
                  type="number"
                  min={- 100}
                  max={100}
                  step={0.01}
                  name="temperatura_ver_suelo"
                  value={recinto?.temperatura_ver_suelo}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_ver_suelo: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura suelo(Invierno):

                <input
                  type="number"
                  min={- 100}
                  max={100}
                  step={0.01}
                  name="temperatura_inv_suelo"
                  value={recinto?.temperatura_inv_suelo}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_inv_suelo: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Superficie suelo(m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_suelo"
                  value={anchuraXlongitud.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
          </div>
        </details>

        <details className="mt-4 p-4 border rounded shadow-md" >
          <summary className="font-bold" > Techo: </summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                <select
                  name="ubicacion_techo"
                  value={recinto?.ubicacion_techo}
                  onChange={(e) => setRecinto({ ...recinto, ubicacion_techo: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior" > Interior </option>
                  <option value="exterior" > Exterior </option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura techo(Verano):

                <input
                  type="number"
                  min={- 100}
                  max={100}
                  step={0.01}
                  name="temperatura_ver_techo"
                  value={recinto?.temperatura_ver_techo}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_ver_techo: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Temperatura techo(Invierno):

                <input
                  type="number"
                  min={- 100}
                  max={100}
                  step={0.01}
                  name="temperatura_inv_techo"
                  value={recinto?.temperatura_inv_techo}
                  onChange={(e) => setRecinto({ ...recinto, temperatura_inv_techo: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Superficie techo(m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_techo"
                  step={0.01}
                  value={anchuraXlongitud.toFixed(4)}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                Orientacion del techo:

                <select
                  name="orientacion_techo"
                  value={recinto?.orientacion_techo}
                  onChange={(e) => setRecinto({ ...recinto, orientacion_techo: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="NORTE" > NORTE </option>
                  <option value="ESTE" > ESTE </option>
                  <option value="SUR" > SUR </option>
                  <option value="OESTE" > OESTE </option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center" >
              <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                <select
                  name="tipo_vidrio_techo"
                  value={recinto?.tipo_vidrio_techo}
                  onChange={(e) => setRecinto({ ...recinto, tipo_vidrio_techo: e.target.value })}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal" > Normal </option>
                  <option value="doble" > Doble </option>
                  <option value="triple" > Triple </option>
                  <option value="baja_emisividad" > Baja emisividad </option>
                </select>
              </label>
            </div>
          </div>
        </details>
      </fieldset>

      {/* 
          <p>
            Cargas térmicas a través de los cerramientos (W):
            {valorTransmisibilidad}
          </p>
          <p>
            Carga sensible de las personas (W):
            {valorOcupacionPersonas.toFixed(2)}
          </p> */}
      {/* <p>Carga sensible iluminación (W): {valorIluminacion}</p> */}
      {/* <p>Carga sensible renovación de aire (W): {valorrenovacionAire}</p> */}
      {/* <p>Carga total sensible refrigeración (W): {valorTotal}</p> */}
      {/* <p>Carga latente renovación de aire (W): {lat_renov}</p> */}
      {/* <p>Carga latente de las personas (W): {ocupacionLat}</p> */}
      {/* <p>Carga latente refrigeración (W): {qr_lat}</p> */}
      {/* <p>Potencia refrigeración (W): {qr.toFixed(2)}</p> */}

      {/* <p>Carga sensible radiación vidrios (W): {valorRadiacion} </p> */}


    </form >
  );
}


