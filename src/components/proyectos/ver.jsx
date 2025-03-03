'use client'
import { CircleHelp } from "lucide-react";
import { useId } from "react";


export function ProyectoVer({ proyecto }) {
    const divId = useId()
    const { localidad } = proyecto

    return (
        <div id={divId} >
            <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
                <div onClick={() => document.getElementById(divId)?.closest('dialog')?.close()}
                    className='bg-sky-600 hover:shadow-lg hover:font-bold text-white py-2 rounded-xl w-56  cursor-pointer'>
                    <p className="text-center">Aceptar</p>
                </div>
            </div>

            <details open className="mt-4 p-4 border rounded shadow-md">
                <summary className="font-bold">PROYECTO:  </summary>

                <p className="font-bold ml-2 p-2">
                    {proyecto?.nombre ?? ''}
                </p>

                <div className="mt-4 p-4 border rounded shadow-md grid gap-4 md:grid-cols-[auto_160px]">
                    <div className="relative">
                        <p className="font-bold">Localidad:</p>
                        <p className="p-2 pr-6">{localidad.nombre} </p>
                    </div>
                    <div>
                        <p className="font-bold">Fecha de Proyecto:</p>
                        <p className="p-2 pr-6 text-right">{proyecto?.fecha?.toLocaleDateString() ?? new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </details>

            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>DATOS: </summary>


                <div className="mt-4 grid gap-1 items-stretch sm:grid-cols-1 md:grid-cols-[300px_auto] xl:grid-cols-[500px_auto]">
                    <img
                        src={proyecto?.imagen || "/images/project-image-default.jpg"}
                        alt="Logo de proyecto"
                        className="w-120 h-72 rounded object-cover mb-4 flex justify-center"
                    />
                    <div className="bg-slate-50 rounded-md p-4">
                        <p className="border-2 border-gray-300 rounded p-2 w-full h-24">
                            {proyecto?.comentarios || 'Sin comentarios'}
                        </p>
                    </div>
                </div>

                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Numero personas:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Numero de personas
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.numero_personas}
                            </p>

                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Ocupacion de las personas:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Este campo identifica la ocupacion de las personas
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.ocupacion_personas.toUpperCase()}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Carga sensible por persona:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    w por persona
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.w_persona}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Caudales por IDA:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Caudales por IDA
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.caudales_ida}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Caudales de aire m3:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.caudales_aire}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Tipo lámpara:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.tipo_lampara.toUpperCase()}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Potencia luminica:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.potencia_lampara}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Factor seguridad:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.valor_seguridad}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Carga latente por persona:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.carga_latente}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                ODA:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto?.oda.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>MÉTRICAS BASE</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Temperatura (Verano):
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.temp_ext_ver}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Humedad (Verano):
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.hum_ext_ver}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Temperatura (Invierno):
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.temp_ext_inv}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Humedad (Invierno):
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.hum_ext_inv}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Altitud:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.altitud}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Presion:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {proyecto.presion?.toFixed(4)}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                Zona climatica:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.id}
                            </p>
                        </div>
                    </div>

                </div>


                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                us/um:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.exterior?.us_um}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                uc:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.exterior?.uc}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                ut/umd:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.exterior?.ut_umd}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                uh:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.exterior?.uh}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                up:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.exterior?.up}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                uph:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.exterior?.uph}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                upv:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.exterior?.upv}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                uphv:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.exterior?.uphv}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                TPH:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.interior?.TPH}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                TPV:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.interior?.TPV}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            <div className="flex justify-between items-center relative">
                                TPHV:
                                <CircleHelp className="peer text-blue-700 size-4 shrink-0" />
                                <span className="peer-hover:block hidden rounded-md absolute p-2 bg-slate-200 text-xs">
                                    Valor
                                </span>
                            </div>

                            <p className="p-2 pr-6 text-right">
                                {localidad?.zona_climatica?.interior?.TPHV}
                            </p>
                        </div>
                    </div>
                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>VERANO en el EXTERIOR</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Saturación del agua:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.p_sat_agua_ext_ver?.toFixed(4)}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Humedad absoluta:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.hum_absol_ext_ver?.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia sens:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.entalpia_ext_ver_sens?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia lat:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.entalpia_ext_ver_lat?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Volumen específico:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.volum_espe_ext_ver?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>VERANO en el INTERIOR</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Saturación del agua:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.p_sat_agua_int_ver?.toFixed(4)}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Humedad absoluta:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.hum_absol_int_ver?.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia sens:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.entalpia_int_ver_sens?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia lat:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.entalpia_int_ver_lat?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Volumen específico:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.volum_espe_int_ver?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>INVIERNO en el EXTERIOR</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Saturación del agua:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.p_sat_agua_ext_inv?.toFixed(4)}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Humedad absoluta:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.hum_absol_ext_inv?.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia sens:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.entalpia_ext_inv_sens?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia lat:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.entalpia_ext_inv_lat?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Volumen específico:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.volum_espe_ext_inv?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md">
                <summary>INVIERNO en el INTERIOR</summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 4xl:grid-cols-4">

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Saturación del agua:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.p_sat_agua_int_inv?.toFixed(4)}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Humedad absoluta:
                            <p className="p-2 pr-6 text-right">
                                {proyecto.hum_absol_int_inv?.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia sens:
                            <p className="p-2 pr-6 text-right">
                                {proyecto.entalpia_int_inv_sens?.toFixed(4)}
                            </p>

                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Entalpia lat:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.entalpia_int_inv_lat?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                    <div className="bg-slate-50 rounded-md p-4 grid items-center">
                        <div className="grid grid-cols-[auto_140px] items-center gap-2">
                            Volumen específico:

                            <p className="p-2 pr-6 text-right">
                                {proyecto.volum_espe_int_inv?.toFixed(4)}
                            </p>
                        </div>
                    </div>


                </div>
            </details>

        </div>
    );
}



export default ProyectoVer;

