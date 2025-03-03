'use client'
import { useActionState, useEffect, useId, useState } from "react"
import { modificarProyecto } from "@/lib/actions/proyecto"
import Spinner from "@/components/spinner"
import DropImagen from "@/components/imagen"
import { CircleHelp } from 'lucide-react'
import { toast } from "sonner"
import Issues from "./issues"
import calcular from '@/lib/calculos'


export function ProyectoModificar({ proyecto, localidades }) {
    const formId = useId()
    const [state, action, pending] = useActionState(modificarProyecto, {})

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])

    const [localidad, setLocalidad] = useState(proyecto.localidad)
    const [calculo, setCalculo] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => setLoading(false), [])

    useEffect(() => {
        const resultado = calcular(localidad)
        setCalculo(resultado)
    }, [localidad])


    if (loading) return <p>Iniciando ...</p>

    return (
        <form id={formId} action={action}>
            <input type="hidden" name="id" defaultValue={proyecto.id} />
            <input type="hidden" name="userId" defaultValue={proyecto.userId} />

            <Issues issues={state?.issues} />

            <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
                <button disabled={pending}
                    className='bg-orange-600 hover:shadow-lg hover:font-bold text-white h-10 rounded-xl w-56 cursor-pointer'>
                    {pending ? <Spinner /> : 'Modificar proyecto'}
                </button>
            </div>

            <details open className="mt-4 p-4 border rounded shadow-md">
                <summary className="font-bold">PROYECTO:  </summary>

                <label className="grid items-start gap-2 font-bold">
                    <input
                        type="text"
                        name="nombre"
                        defaultValue={proyecto?.nombre ?? ''}
                        maxLength={50}
                        className="border-2 border-gray-300 rounded ml-2 p-2 text-left"
                    />
                </label>
                <div className="mt-4 p-4 border rounded shadow-md grid gap-4 md:grid-cols-[auto_160px]">
                    <div className="relative">
                        <label className="font-bold">Localidad:
                            <select
                                key={localidad?.id}
                                name="localidadId"
                                className="text-left border-2 border-gray-300 rounded p-2 w-full"
                                defaultValue={localidad?.id}
                                onChange={(e) => {
                                    setLocalidad(localidades.find(localidad => localidad.id == e.target.value))
                                }}
                            >
                                {localidades?.map(localidad =>
                                    <option key={localidad.id} value={localidad.id}>{localidad.nombre} </option>
                                )}
                            </select>
                        </label>

                    </div>
                    <div>
                        <label className="font-bold">Fecha de Proyecto:
                            <input
                                className="border-2 border-gray-300 rounded p-2 w-full"
                                type="date"
                                name="fecha"
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                        </label>
                    </div>
                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>DATOS: </summary>

                <div className="mt-4 grid gap-1 items-stretch sm:grid-cols-1 md:grid-cols-[300px_auto] xl:grid-cols-[500px_auto]">
                    <div className="mb-2">
                        <div className="flex justify-center">
                            <input type="hidden" name="imagen" />
                            <DropImagen
                                imgUrl={"/images/project-image-default.jpg"}
                                alt="Logo de proyecto"
                                className="w-120 h-72 rounded object-cover cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4">
                        <textarea
                            name="comentarios"
                            defaultValue={proyecto.comentarios}
                            placeholder="Comentarios"
                            title="Añadir comentario del proyecto"
                            maxLength={300}
                            className="border-2 border-gray-300 rounded p-2 w-full h-24"
                        />
                    </div>
                </div>

                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Numero personas:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                type="number"
                                name="numero_personas"
                                defaultValue={proyecto.numero_personas}
                                step={1}
                                max={1000}
                                min={0}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Ocupacion de las personas:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Ocupación de personas que participan en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <select
                                key={proyecto.ocupacion_personas}
                                name="ocupacion_personas"
                                defaultValue={proyecto.ocupacion_personas}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            >
                                <option value="sedentario">Sedentaria</option>
                                <option value="activo">Activa</option>
                            </select>
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Carga sensible por persona:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                type="number"
                                name="w_persona"
                                defaultValue={proyecto.w_persona}
                                step={0.01}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Caudales por IDA:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                type="number"
                                name="caudales_ida"
                                defaultValue={proyecto.caudales_ida}
                                step={0.01}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Caudales de aire m3:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                type="number"
                                name="caudales_aire"
                                defaultValue={proyecto.caudales_aire}
                                step={0.01}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Tipo lámpara:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <select
                                key={proyecto.tipo_lampara}
                                name="tipo_lampara"
                                defaultValue={proyecto.tipo_lampara}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            >
                                <option value="fluorescente">Fluorescente</option>
                                <option value="led">LED</option>
                            </select>
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Potencia luminica:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                type="number"
                                name="potencia_lampara"
                                defaultValue={proyecto.potencia_lampara}
                                step={0.01}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Factor seguridad:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                type="number"
                                name="valor_seguridad"
                                defaultValue={proyecto.valor_seguridad}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Carga latente por persona:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                type="number"
                                name="carga_latente"
                                defaultValue={proyecto.carga_latente}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                ODA:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <select
                                key={proyecto.oda}
                                name="oda"
                                defaultValue={proyecto.oda}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            >
                                <option value="oda1">ODA 1</option>
                                <option value="oda2">ODA 2</option>
                                <option value="oda3">ODA 3</option>
                            </select>
                        </label>
                    </div>
                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>MÉTRICAS BASE</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Temperatura (Verano):
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="temp_ext_ver"
                                className="border-2 border-gray-300 rounded p-2 w-full"
                                value={localidad?.temp_ext_ver}
                                onChange={() => { }}
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Humedad (Verano):
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="hum_ext_ver"
                                className="border-2 border-gray-300 rounded p-2 w-full"
                                value={localidad?.hum_ext_ver}
                                onChange={() => { }}
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Temperatura (Invierno):
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="temp_ext_inv"
                                value={localidad?.temp_ext_inv}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Humedad (Invierno):
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="hum_ext_inv"
                                value={localidad?.hum_ext_inv}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Altitud:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="altitud"
                                value={localidad?.altitud}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Presion:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="presion"
                                value={calculo._presion?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Zona climatica:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                name="zona_climatica"
                                value={localidad?.zona_climatica?.id}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full text-right"
                            />
                        </label>
                    </div>

                </div>


                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                us/um:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="us_um"
                                value={localidad?.zona_climatica?.exterior?.us_um}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                uc:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="uc"
                                value={localidad?.zona_climatica?.exterior?.uc}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                ut/umd:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="ut_umd"
                                value={localidad?.zona_climatica?.exterior?.ut_umd}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                uh:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="uh"
                                value={localidad?.zona_climatica?.exterior?.uh}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                up:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="up"
                                value={localidad?.zona_climatica?.exterior?.up}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                uph:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="uph"
                                value={localidad?.zona_climatica?.exterior?.uph}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                upv:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="upv"
                                value={localidad?.zona_climatica?.exterior?.upv}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                uphv:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="uphv"
                                value={localidad?.zona_climatica?.exterior?.uphv}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>
                </div>

                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                TPH:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="tph"
                                value={localidad?.zona_climatica?.interior?.TPH}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                TPV:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="tpv"
                                value={localidad?.zona_climatica?.interior?.TPV}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                TPHV:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas trabajando en el proyecto desde que se creó allá por el año nosecuantos
                                </span>
                            </div>

                            <input
                                readOnly
                                type="number"
                                name="tphv"
                                value={localidad?.zona_climatica?.interior?.TPHV}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>
                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>VERANO en el EXTERIOR</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Saturación del agua:

                            <input
                                readOnly
                                type="number"
                                name="p_sat_agua_ext_ver"
                                step={0.01}
                                value={calculo._p_sat_agua_ext_ver?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Humedad absoluta:

                            <input
                                readOnly
                                type="number"
                                name="hum_absol_ext_ver"
                                step={0.01}
                                value={calculo._hum_absol_ext_ver?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia sens:

                            <input
                                readOnly
                                type="number"
                                name="entalpia_ext_ver_sens"
                                step={0.01}
                                value={calculo._entalpia_ext_ver_sens?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia lat:

                            <input
                                readOnly
                                type="number"
                                name="entalpia_ext_ver_lat"
                                step={0.01}
                                value={calculo._entalpia_ext_ver_lat?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Volumen específico:

                            <input
                                readOnly
                                type="number"
                                name="volum_espe_ext_ver"
                                step={0.01}
                                value={calculo._volum_espe_ext_ver?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>VERANO en el INTERIOR</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Saturación del agua:

                            <input
                                readOnly
                                type="number"
                                name="p_sat_agua_int_ver"
                                step={0.01}
                                value={calculo._p_sat_agua_int_ver?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Humedad absoluta:

                            <input
                                readOnly
                                type="number"
                                name="hum_absol_int_ver"
                                step={0.01}
                                value={calculo._hum_absol_int_ver?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia sens:

                            <input
                                readOnly
                                type="number"
                                name="entalpia_int_ver_sens"
                                step={0.01}
                                value={calculo._entalpia_int_ver_sens?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia lat:

                            <input
                                readOnly
                                type="number"
                                name="entalpia_int_ver_lat"
                                step={0.01}
                                value={calculo._entalpia_int_ver_lat?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Volumen específico:
                            <input
                                readOnly
                                type="number"
                                name="volum_espe_int_ver"
                                step={0.01}
                                value={calculo._volum_espe_int_ver?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>INVIERNO en el EXTERIOR</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Saturación del agua:

                            <input
                                readOnly
                                type="number"
                                name="p_sat_agua_ext_inv"
                                step={0.01}
                                value={calculo._p_sat_agua_ext_inv?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Humedad absoluta:

                            <input
                                readOnly
                                type="number"
                                name="hum_absol_ext_inv"
                                step={0.01}
                                value={calculo._hum_absol_ext_inv?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia sens:

                            <input
                                readOnly
                                type="number"
                                name="entalpia_ext_inv_sens"
                                step={0.01}
                                value={calculo._entalpia_ext_inv_sens?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia lat:
                            <input
                                readOnly
                                type="number"
                                name="entalpia_ext_inv_lat"
                                step={0.01}
                                value={calculo._entalpia_ext_inv_lat?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Volumen específico:

                            <input
                                readOnly
                                type="number"
                                name="volum_espe_ext_inv"
                                step={0.01}
                                value={calculo._volum_espe_ext_inv?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>INVIERNO en el INTERIOR</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Saturación del agua:

                            <input
                                readOnly
                                type="number"
                                name="p_sat_agua_int_inv"
                                step={0.01}
                                value={calculo._p_sat_agua_int_inv?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Humedad absoluta:

                            <input
                                readOnly
                                type="number"
                                name="hum_absol_int_inv"
                                step={0.01}
                                value={calculo._hum_absol_int_inv?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia sens:

                            <input
                                readOnly
                                type="number"
                                name="entalpia_int_inv_sens"
                                step={0.01}
                                value={calculo._entalpia_int_inv_sens?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia lat:

                            <input
                                readOnly
                                type="number"
                                name="entalpia_int_inv_lat"
                                step={0.01}
                                value={calculo._entalpia_int_inv_lat?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <label className="grid grid-cols-[auto_140px] items-center gap-2">
                            Volumen específico:

                            <input
                                readOnly
                                type="number"
                                name="volum_espe_int_inv"
                                step={0.01}
                                value={calculo._volum_espe_int_inv?.toFixed(4)}
                                onChange={() => { }}
                                className="border-2 border-gray-300 rounded p-2 w-full"
                            />
                        </label>
                    </div>


                </div>
            </details>

        </form>
    );
}



export default ProyectoModificar;