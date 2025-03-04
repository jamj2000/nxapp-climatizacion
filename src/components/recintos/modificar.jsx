'use client'
import Spinner from "@/components/spinner";
import { useActionState, useEffect, useId, useState } from "react";
import { modificarRecinto } from "@/lib/actions/recinto";
import { toast } from "sonner";
import Issues from "./issues";
import { CircleHelp } from "lucide-react";


function RecintoModificar({ recinto, proyectos }) {
    const formId = useId()
    const [state, action, pending] = useActionState(modificarRecinto, {})
    const [loading, setLoading] = useState(true)

    useEffect(() => setLoading(false), [])

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])

    const ORIENTACION = ['NORTE', 'ESTE', 'SUR', 'OESTE'] // En el sentido de las agujas del reloj
    const [orientacion, setOrientacion] = useState(0)  //0,1,2,3
    const [altura, setAltura] = useState(0)
    const [anchura, setAnchura] = useState(0)
    const [longitud, setLongitud] = useState(0)


    if (loading) return <p>Iniciando ...</p>

    return (
        <form id={formId} action={action} >
            <input type="hidden" name="id" defaultValue={recinto?.id} />

            <Issues issues={state?.issues} />

            <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row" >
                <button disabled={pending}
                    className='bg-green-600 hover:shadow-lg hover:font-bold text-white h-10 rounded-xl w-56 cursor-pointer'>
                    {pending ? <Spinner /> : 'Nuevo recinto'}
                </button>

                <label className="grid grid-cols-[150px_auto] items-center gap-2">Proyecto asociado:
                    <select
                        key={recinto.proyectoId}
                        name="proyectoId"
                        defaultValue={recinto.proyectoId}
                        className="border-2 border-gray-300 rounded p-2" >
                        {proyectos?.map(proyecto =>
                            <option key={proyecto.id} value={proyecto.id}>  {proyecto.nombre}  </option>)
                        }
                    </select>
                </label>
            </div>

            <fieldset>

                <details open className="mt-4 p-4 border rounded shadow-md" >
                    <summary className="font-bold" > RECINTO: </summary>
                    <label className="grid items-start gap-2 font-bold">
                        <input
                            type="text"
                            name="nombre"
                            defaultValue={recinto.nombre}
                            maxLength={50}
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
                                    defaultValue={recinto.temp_ver_relativa}
                                    min={-100}
                                    max={100}
                                    step={0.01}
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
                                    defaultValue={recinto.hum_ver_relativa}
                                    // min={30}
                                    // max={70}
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
                                    defaultValue={recinto.temp_inv_relativa}
                                    min={-100}
                                    max={100}
                                    step={0.01}
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
                                    defaultValue={recinto.hum_inv_relativa}
                                    // min={30}
                                    // max={70}
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
                                    value={longitud}
                                    onChange={(e) => setLongitud(e.target.value)}
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
                                    value={anchura}
                                    onChange={(e) => setAnchura(e.target.value)}
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
                                    value={altura}
                                    onChange={(e) => setAltura(e.target.value)}
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
                                    value={altura * anchura * longitud}
                                    onChange={() => { }}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                                <div className="flex justify-between" >
                                    IDA:
                                    <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                    <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                        IDA 1: (aire de óptima calidad): hospitales, clínicas, laboratorios y guarderías.<br />
                                        IDA 2: (aire de buena calidad): oficinas, residencias, salas de lectura, museos, salas de tribunales, aulas de enseñanza y piscinas.<br />
                                        IDA 3: (aire de calidad media): edificios comerciales, cines, teatros, salones de actos, habitaciones de hoteles, restaurantes y bares,
                                        gimnasios, locales para el deporte y salas de ordenadores.<br />
                                        IDA 4: (aire de calidad baja).
                                    </span>
                                </div>

                                <select
                                    key={recinto.ida}
                                    name="ida"
                                    defaultValue={recinto.ida}
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
                                    key={recinto.ubicacion_c_1}
                                    name="ubicacion_c_1"
                                    defaultValue={recinto.ubicacion_c_1}
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
                                    key={recinto.color_c_1}
                                    name="color_c_1"
                                    defaultValue={recinto.color_c_1}
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
                                    defaultValue={recinto.temperatura_ver_c_1}
                                    min={- 100}
                                    max={100}
                                    step={0.01}
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
                                    defaultValue={recinto.temperatura_inv_c_1}
                                    min={- 100}
                                    max={100}
                                    step={0.01}
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
                                    defaultValue={recinto.superficie_c_1}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                                <select
                                    key={recinto.tipo_vidrio_c_1}
                                    name="tipo_vidrio_c_1"
                                    defaultValue={recinto.tipo_vidrio_c_1}
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
                                    defaultValue={recinto.superficie_vidrio_c_1}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                                <input
                                    type="number"
                                    name="superficie_puertas_c_1"
                                    defaultValue={recinto.superficie_puertas_c_1}
                                    min={0}
                                    max={100}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                                <select
                                    key={orientacion}
                                    name="orientacion_c_1"
                                    value={ORIENTACION[orientacion]}
                                    onChange={(e) => setOrientacion(ORIENTACION.indexOf(e.target.value))}
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
                                    key={recinto.ubicacion_c_2}
                                    name="ubicacion_c_2"
                                    defaultValue={recinto.ubicacion_c_2}
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
                                    key={recinto.color_c_2}
                                    name="color_c_2"
                                    defaultValue={recinto.color_c_2}
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
                                    defaultValue={recinto.temperatura_ver_c_2}
                                    min={- 100}
                                    max={100}
                                    step={0.01}
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
                                    defaultValue={recinto.temperatura_inv_c_2}
                                    min={- 100}
                                    max={100}
                                    step={0.01}
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
                                    defaultValue={recinto.superficie_c_2}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                                <select
                                    key={recinto.tipo_vidrio_c_2}
                                    name="tipo_vidrio_c_2"
                                    defaultValue={recinto.tipo_vidrio_c_2}
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
                                    defaultValue={recinto.superficie_vidrio_c_2}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                                <input
                                    type="number"
                                    name="superficie_puertas_c_2"
                                    defaultValue={recinto.superficie_puertas_c_2}

                                    min={0}
                                    max={100}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                                <input
                                    readOnly
                                    name="orientacion_c_2"
                                    value={ORIENTACION[(orientacion + 1) % 4]}
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
                                    key={recinto.ubicacion_c_3}
                                    name="ubicacion_c_3"
                                    defaultValue={recinto.ubicacion_c_3}
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
                                    key={recinto.color_c_3}
                                    name="color_c_3"
                                    defaultValue={recinto.color_c_3}
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
                                    defaultValue={recinto.temperatura_ver_c_3}
                                    min={- 100}
                                    max={100}
                                    step={0.01}
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
                                    defaultValue={recinto.temperatura_inv_c_3}
                                    min={- 100}
                                    max={100}
                                    step={0.01}
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
                                    defaultValue={recinto.superficie_c_3}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                                <select
                                    key={recinto.tipo_vidrio_c_3}
                                    name="tipo_vidrio_c_3"
                                    defaultValue={recinto.tipo_vidrio_c_3}
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
                                    defaultValue={recinto.superficie_vidrio_c_3}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                                <input
                                    type="number"
                                    name="superficie_puertas_c_3"
                                    defaultValue={recinto.superficie_puertas_c_3}

                                    min={0}
                                    max={100}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                                <input
                                    readOnly
                                    name="orientacion_c_3"
                                    value={ORIENTACION[(orientacion + 2) % 4]}
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
                                    key={recinto.ubicacion_c_4}
                                    name="ubicacion_c_4"
                                    defaultValue={recinto.ubicacion_c_4}
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
                                    key={recinto.color_c_4}
                                    name="color_c_4"
                                    defaultValue={recinto.color_c_4}
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
                                    defaultValue={recinto.temperatura_ver_c_4}
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
                                    defaultValue={recinto.temperatura_inv_c_4}
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
                                    defaultValue={recinto.superficie_c_4}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                                <select
                                    key={recinto.tipo_vidrio_c_4}
                                    name="tipo_vidrio_c_4"
                                    defaultValue={recinto.tipo_vidrio_c_4}
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
                                    defaultValue={recinto.superficie_vidrio_c_4}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                                <input
                                    type="number"
                                    name="superficie_puertas_c_4"
                                    defaultValue={recinto.superficie_puertas_c_4}

                                    min={0}
                                    max={100}
                                    step={0.01}
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                                <input
                                    readOnly
                                    name="orientacion_c_4"
                                    value={ORIENTACION[(orientacion + 3) % 4]}
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
                                    className="border-2 border-gray-300 rounded p-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                            <label className="grid grid-cols-[auto_140px] items-center gap-2" >
                                Orientacion del techo:

                                <select
                                    name="orientacion_techo"
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

export default RecintoModificar
