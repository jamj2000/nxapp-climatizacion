// Manejar el evento onWheel en los inputs type number
// https://github.com/facebook/react/issues/24986
// https://codesandbox.io/s/friendly-browser-ueyekx
'use client'
import Boton from "@/components/boton";
import Image from "next/image";
import React, { useEffect, useState } from "react";


export default function FormRecinto({
  action,
  texto,
  recinto,
  proyectos,
  disabled = false
}) {

  const ORIENTACION = ['NORTE', 'ESTE', 'SUR', 'OESTE'] // En el sentido de las agujas del reloj

  const [errores, setErrores] = useState(null)
  
  async function wrapper(formData) {
    const errores = await action(formData);
    console.log(errores);
    setErrores(errores)
  }
  
  const [longitud, setLongitud] = useState(recinto?.longitud)
  const [anchura, setAnchura] = useState(recinto?.anchura)
  const [altura, setAltura] = useState(recinto?.altura)

  // Toma valores 0, 1, 2 o 3
  const [orientacion, setOrientacion] = useState(() => {
      const orienta =  ORIENTACION.indexOf(recinto?.orientacion_c_1)
      if (orienta == -1) return 0   
      else return orienta 
  })

  useEffect(() => {
    // Para poder usar la rueda del ratón dentro de los inputs de tipo number
    const inputs = document.querySelectorAll("input[type='number']")
    inputs.forEach(input => input.addEventListener('wheel', () => { }));
  }, [])


  return (
    <form action={wrapper}>
      {/* IMPORTANTE: Comentar. El id del proyecto lo cogemos de la lista de proyectos */}
      {/* cuando no está disabled */}
      <input type="hidden" name="id" defaultValue={recinto?.id} />
      {disabled && <input type='hidden' name="proyectoId" defaultValue={recinto?.proyectoId} />}

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
            ? <span className="font-bold">{proyectos.find(p => p.id == recinto?.proyectoId)?.nombre ?? proyectos[0].nombre} </span>
            : <select
              name="proyectoId"
              className="border-2 border-gray-300 rounded p-2"
              defaultValue={recinto?.proyectoId}
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

      <fieldset disabled={disabled}  >

        <details open className="mt-4 p-4 border rounded shadow-md">
          <summary className="font-bold">RECINTO:
            <input
              type="text"
              name="nombre"
              maxLength={50}
              defaultValue={recinto?.nombre}
              className="border-2 border-gray-300 rounded ml-2 p-2 text-center"
            />
          </summary>


          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura relativa (Verano):

                <input
                  type="number"
                  name="temp_ver_relativa"
                  min={-100}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.temp_ver_relativa)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Humedad relativa (Verano):

                <input
                  type="number"
                  name="hum_ver_relativa"
                  min={30}
                  max={70}
                  defaultValue={Number(recinto?.hum_ver_relativa)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura relativa (Invierno):

                <input
                  type="number"
                  name="temp_inv_relativa"
                  min={-100}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.temp_inv_relativa)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Humedad relativa (Invierno):

                <input
                  type="number"
                  name="hum_inv_relativa"
                  min={30}
                  max={70}
                  defaultValue={Number(recinto?.hum_inv_relativa)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Longitud:
                <input
                  type="number"
                  name="longitud"
                  onChange={(e) => setLongitud(e.target.value)}
                  defaultValue={longitud}
                  step={0.01}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Anchura:
                <input
                  type="number"
                  name="anchura"
                  onChange={(e) => setAnchura(e.target.value)}
                  defaultValue={anchura}
                  step={0.01}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Altura:
                <input
                  type="number"
                  name="altura"
                  defaultValue={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  step={0.01}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Volumen:
                <input
                  readOnly
                  type="number"
                  name="volumen"
                  value={(longitud * altura * anchura).toFixed(4)}
                  onChange={()=>{}}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                <div className="flex justify-between">
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
                  defaultValue={recinto?.ida}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="ida1">IDA 1</option>
                  <option value="ida2">IDA 2</option>
                  <option value="ida3">IDA 3</option>
                  <option value="ida4">IDA 4</option>
                </select>
              </label>
            </div>
          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md">
          <summary className="font-bold">Cerramiento 1:</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Ubicacion:
                <select
                  name="ubicacion_c_1"
                  defaultValue={recinto?.ubicacion_c_1}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Color:
                <select
                  name="color_c_1"
                  defaultValue={recinto?.color_c_1}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="claro">Claro</option>
                  <option value="medio">Medio</option>
                  <option value="oscuro">Oscuro</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura cerramiento (Verano):

                <input
                  type="number"
                  name="temperatura_ver_c_1"
                  min={-100}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.temperatura_ver_c_1)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura cerramiento (Invierno):

                <input
                  type="number"
                  name="temperatura_inv_c_1"
                  min={-100}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.temperatura_inv_c_1)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Superficie cerramiento (m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_c_1"
                  step={0.01}
                  value={(longitud * altura).toFixed(4)}
                  onChange={()=>{}}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Tipo de vidrio:
                <select
                  name="tipo_vidrio_c_1"
                  defaultValue={recinto?.tipo_vidrio_c_1}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal">Normal</option>
                  <option value="doble">Doble</option>
                  <option value="triple">Triple</option>
                  <option value="baja_emisividad">Baja emisividad</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Superficie vidrio:
                <input
                  type="number"
                  name="superficie_vidrio_c_1"
                  step={0.01}
                  defaultValue={Number(recinto?.superficie_vidrio_c_1)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Superficie Puertas:
                <input
                  type="number"
                  name="superficie_puertas_c_1"
                  min={0}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.superficie_puertas_c_1)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <input type="hidden" name="orientacion_c_1" defaultValue={ORIENTACION[orientacion]} />
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Orientacion:
                <select
                  name="orientacion"
                  defaultValue={orientacion}
                  onChange={(e) => setOrientacion(e.target.value)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value={0}> {ORIENTACION[0]} </option>
                  <option value={1}> {ORIENTACION[1]} </option>
                  <option value={2}> {ORIENTACION[2]} </option>
                  <option value={3}> {ORIENTACION[3]} </option>
                </select>
              </label>
            </div>

          </div>
        </details>

        <details className="mt-4 p-4 border rounded shadow-md">
          <summary className="font-bold">Cerramiento 2:</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Ubicacion:
                <select
                  name="ubicacion_c_2"
                  defaultValue={recinto?.ubicacion_c_2}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Color:
                <select
                  name="color_c_2"
                  defaultValue={recinto?.color_c_2}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="claro">Claro</option>
                  <option value="medio">Medio</option>
                  <option value="oscuro">Oscuro</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura cerramiento (Verano):

                <input
                  type="number"
                  name="temperatura_ver_c_2"
                  min={-100}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.temperatura_ver_c_2)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura cerramiento (Invierno):

                <input
                  type="number"
                  name="temperatura_inv_c_2"
                  min={-100}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.temperatura_inv_c_2)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Superficie cerramiento (m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_c_2"
                  step={0.01}
                  value={(anchura * altura).toFixed(4)}
                  onChange={()=>{}}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Tipo de vidrio:
                <select
                  name="tipo_vidrio_c_2"
                  defaultValue={recinto?.tipo_vidrio_c_2}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal">Normal</option>
                  <option value="doble">Doble</option>
                  <option value="triple">Triple</option>
                  <option value="baja_emisividad">Baja emisividad</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Superficie vidrio:
                <input
                  type="number"
                  name="superficie_vidrio_c_2"
                  step={0.01}
                  defaultValue={Number(recinto?.superficie_vidrio_c_2)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Superficie Puertas:
                <input
                  type="number"
                  name="superficie_puertas_c_2"
                  min={0}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.superficie_puertas_c_2)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Orientacion:
                <input
                  readOnly
                  name="orientacion_c_2"
                  value={ORIENTACION[(+orientacion + 1) % +4]}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
          </div>
        </details>


        <details className="mt-4 p-4 border rounded shadow-md">
          <summary className="font-bold">Cerramiento 3:</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Ubicacion:
                <select
                  name="ubicacion_c_3"
                  defaultValue={recinto?.ubicacion_c_3}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Color:
                <select
                  name="color_c_3"
                  defaultValue={recinto?.color_c_3}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="claro">Claro</option>
                  <option value="medio">Medio</option>
                  <option value="oscuro">Oscuro</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura cerramiento (Verano):

                <input
                  type="number"
                  name="temperatura_ver_c_3"
                  min={-100}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.temperatura_ver_c_3)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura cerramiento (Invierno):

                <input
                  type="number"
                  name="temperatura_inv_c_3"
                  min={-100}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.temperatura_inv_c_3)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Superficie cerramiento (m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_c_3"
                  step={0.01}
                  value={(longitud * altura).toFixed(4)}
                  onChange={()=>{}}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Tipo de vidrio:
                <select
                  name="tipo_vidrio_c_3"
                  defaultValue={recinto?.tipo_vidrio_c_3}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal">Normal</option>
                  <option value="doble">Doble</option>
                  <option value="triple">Triple</option>
                  <option value="baja_emisividad">Baja emisividad</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Superficie vidrio:
                <input
                  type="number"
                  name="superficie_vidrio_c_3"
                  step={0.01}
                  defaultValue={Number(recinto?.superficie_vidrio_c_3)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Superficie Puertas:
                <input
                  type="number"
                  name="superficie_puertas_c_3"
                  min={0}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.superficie_puertas_c_3)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Orientacion:
                <input
                  readOnly
                  name="orientacion_c_3"
                  value={ORIENTACION[(+orientacion + 2) % +4]}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

          </div>
        </details>

        <details className="mt-4 p-4 border rounded shadow-md">
          <summary className="font-bold">Cerramiento 4:</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Ubicacion:
                <select
                  name="ubicacion_c_4"
                  defaultValue={recinto?.ubicacion_c_4}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Color:
                <select
                  name="color_c_4"
                  defaultValue={recinto?.color_c_4}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="claro">Claro</option>
                  <option value="medio">Medio</option>
                  <option value="oscuro">Oscuro</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura cerramiento (Verano):

                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={0.01}
                  name="temperatura_ver_c_4"
                  defaultValue={Number(recinto?.temperatura_ver_c_4)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura cerramiento (Invierno):

                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={0.01}
                  name="temperatura_inv_c_4"
                  defaultValue={Number(recinto?.temperatura_inv_c_4)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Superficie cerramiento (m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_c_4"
                  value={(altura * anchura).toFixed(4)}
                  onChange={()=>{}}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Tipo de vidrio:
                <select
                  name="tipo_vidrio_c_4"
                  defaultValue={recinto?.tipo_vidrio_c_4}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal">Normal</option>
                  <option value="doble">Doble</option>
                  <option value="triple">Triple</option>
                  <option value="baja_emisividad">Baja emisividad</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Superficie vidrio:
                <input
                  type="number"
                  name="superficie_vidrio_c_4"
                  step={0.01}
                  defaultValue={Number(recinto?.superficie_vidrio_c_4)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Superficie Puertas:
                <input
                  type="number"
                  name="superficie_puertas_c_4"
                  min={0}
                  max={100}
                  step={0.01}
                  defaultValue={Number(recinto?.superficie_puertas_c_4)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Orientacion:
                <input
                  readOnly
                  name="orientacion_c_4"
                  value={ORIENTACION[(+orientacion + 3) % +4]}
                  onChange={() => { }}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

          </div>

        </details>

        <details className="mt-4 p-4 border rounded shadow-md">
          <summary className="font-bold">Suelo:</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Ubicacion:
                <select
                  name="ubicacion_suelo"
                  defaultValue={recinto?.ubicacion_suelo}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura suelo (Verano):

                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={0.01}
                  name="temperatura_ver_suelo"
                  defaultValue={Number(recinto?.temperatura_ver_suelo)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura suelo (Invierno):

                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={0.01}
                  name="temperatura_inv_suelo"
                  defaultValue={Number(recinto?.temperatura_inv_suelo)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Superficie suelo (m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_suelo"
                  value={(longitud * anchura).toFixed(4)}
                  onChange={()=>{}}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
          </div>
        </details>

        <details className="mt-4 p-4 border rounded shadow-md">
          <summary className="font-bold">Techo:</summary>
          <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-4">

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Ubicacion:
                <select
                  name="ubicacion_techo"
                  defaultValue={recinto?.ubicacion_techo}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura techo (Verano):

                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={0.01}
                  name="temperatura_ver_techo"
                  defaultValue={Number(recinto?.temperatura_ver_techo)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Temperatura techo (Invierno):

                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={0.01}
                  name="temperatura_inv_techo"
                  defaultValue={Number(recinto?.temperatura_inv_techo)}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Superficie techo (m2):

                <input
                  readOnly
                  type="number"
                  name="superficie_techo"
                  step={0.01}
                  value={(longitud * anchura).toFixed(4)}
                  onChange={()=>{}}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                />
              </label>
            </div>
            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">
                Orientacion del techo:

                <select
                  name="orientacion_techo"
                  defaultValue={recinto?.orientacion_techo}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="norte">Norte</option>
                  <option value="sur">Sur</option>
                  <option value="este">Este</option>
                  <option value="oeste">Oeste</option>
                </select>
              </label>
            </div>

            <div className="bg-slate-50 rounded-md p-4 grid items-center">
              <label className="grid grid-cols-[auto_140px] items-center gap-2">Tipo de vidrio:
                <select
                  name="tipo_vidrio_techo"
                  defaultValue={recinto?.tipo_vidrio_techo}
                  className="border-2 border-gray-300 rounded p-2 w-full"
                >
                  <option value="normal">Normal</option>
                  <option value="doble">Doble</option>
                  <option value="triple">Triple</option>
                  <option value="baja_emisividad">Baja emisividad</option>
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


