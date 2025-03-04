'use client'
import Spinner from "@/components/spinner";
import { CircleHelp } from "lucide-react";
import { useId } from "react";


function RecintoVer({ recinto }) {
    const divId = useId()

    return (
        <div id={divId}>
            <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
                <div onClick={() => document.getElementById(divId)?.closest('dialog')?.close()}
                    className='bg-sky-600 hover:shadow-lg hover:font-bold text-white py-2 rounded-xl w-56  cursor-pointer'>
                    <p className="text-center">Aceptar</p>
                </div>

                <div className="grid items-center gap-2">
                    <p>Proyecto asociado: {recinto.proyecto.nombre}</p>
                </div>
            </div>


            <details open className="mt-4 p-4 border rounded shadow-md" >
                <summary className="font-bold" > RECINTO: </summary>
                <div className="grid items-start gap-2 font-bold">
                    <p className="ml-2 p-2 text-left">
                        {recinto?.nombre}
                    </p>
                </div>
            </details>



            <details className="mt-4 p-4 border rounded shadow-md" >
                <summary className="font-bold" > DATOS </summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura relativa(Verano):

                            <p className="text-right p-2 w-full">
                                {recinto?.temp_ver_relativa}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Humedad relativa(Verano):

                            <p className="text-right p-2 w-full">
                                {recinto?.hum_ver_relativa}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura relativa(Invierno):

                            <p className="text-right p-2 w-full">
                                {recinto?.temp_inv_relativa}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Humedad relativa(Invierno):

                            <p className="text-right p-2 w-full">
                                {recinto?.hum_inv_relativa}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Longitud:
                            <p className="text-right p-2 w-full">
                                {recinto?.longitud}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Anchura:
                            <p className="text-right p-2 w-full">
                                {recinto?.anchura}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Altura:
                            <p className="text-right p-2 w-full">
                                {recinto?.altura}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Volumen:
                            <p className="text-right p-2 w-full">
                                {recinto.volumen.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
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

                            <p className="text-right p-2 w-full">
                                {recinto?.ida}
                            </p>
                        </div>
                    </div>
                </div>
            </details>


            <details className="mt-4 p-4 border rounded shadow-md" >
                <summary className="font-bold" > Cerramiento 1: </summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.ubicacion_c_1}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Color:
                            <p className="text-right p-2 w-full">
                                {recinto?.color_c_1}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura cerramiento(Verano):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_ver_c_1}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura cerramiento(Invierno):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_inv_c_1}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Superficie cerramiento(m2):

                            <p className="text-right p-2 w-full">
                                {recinto.superficie_c_1.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.tipo_vidrio_c_1}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.superficie_vidrio_c_1}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                            <p className="text-right p-2 w-full">
                                {recinto?.superficie_puertas_c_1}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.orientacion_c_1}
                            </p>
                        </div>
                    </div>

                </div>
            </details>

            <details className="mt-4 p-4 border rounded shadow-md" >
                <summary className="font-bold" > Cerramiento 2: </summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.ubicacion_c_2}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Color:
                            <p className="text-right p-2 w-full">
                                {recinto?.color_c_2}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura cerramiento(Verano):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_ver_c_2}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura cerramiento(Invierno):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_ver_c_2}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Superficie cerramiento(m2):

                            <p className="text-right p-2 w-full">
                                {recinto.superficie_c_2.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.tipo_vidrio_c_2}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.superficie_vidrio_c_2}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                            <p className="text-right p-2 w-full">
                                {recinto?.superficie_puertas_c_2}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.orientacion_c_2}
                            </p>
                        </div>
                    </div>
                </div>
            </details >


            <details className="mt-4 p-4 border rounded shadow-md" >
                <summary className="font-bold" > Cerramiento 3: </summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.ubicacion_c_3}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Color:
                            <p className="text-right p-2 w-full">
                                {recinto?.color_c_3}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura cerramiento(Verano):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_ver_c_3}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura cerramiento(Invierno):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_inv_c_3}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Superficie cerramiento(m2):

                            <p className="text-right p-2 w-full">
                                {recinto.superficie_c_3.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.tipo_vidrio_c_3}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.superficie_vidrio_c_3}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                            <p className="text-right p-2 w-full">
                                {recinto?.superficie_puertas_c_3}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.orientacion_c_3}
                            </p>
                        </div>
                    </div>

                </div>
            </details>

            <details className="mt-4 p-4 border rounded shadow-md" >
                <summary className="font-bold" > Cerramiento 4: </summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.ubicacion_c_4}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Color:
                            <p className="text-right p-2 w-full">
                                {recinto?.color_c_4}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura cerramiento(Verano):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_ver_c_4}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura cerramiento(Invierno):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_inv_c_4}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Superficie cerramiento(m2):

                            <p className="text-right p-2 w-full">
                                {recinto.superficie_c_4.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.tipo_vidrio_c_4}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.superficie_vidrio_c_4}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Superficie Puertas:
                            <p className="text-right p-2 w-full">
                                {recinto?.superficie_puertas_c_4}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Orientacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.orientacion_c_4}
                            </p>
                        </div>
                    </div>

                </div>

            </details>

            <details className="mt-4 p-4 border rounded shadow-md" >
                <summary className="font-bold" > Suelo: </summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.ubicacion_suelo}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura suelo(Verano):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_ver_suelo}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura suelo(Invierno):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_inv_suelo}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Superficie suelo(m2):

                            <p className="text-right p-2 w-full">
                                {recinto.superficie_suelo.toFixed(4)}
                            </p>
                        </div>
                    </div>
                </div>
            </details>

            <details className="mt-4 p-4 border rounded shadow-md" >
                <summary className="font-bold" > Techo: </summary>
                <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 2xl:grid-cols-4" >

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Ubicacion:
                            <p className="text-right p-2 w-full">
                                {recinto?.ubicacion_techo}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura techo(Verano):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_ver_techo}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Temperatura techo(Invierno):

                            <p className="text-right p-2 w-full">
                                {recinto?.temperatura_inv_techo}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Superficie techo(m2):

                            <p className="text-right p-2 w-full">
                                {recinto.superficie_techo.toFixed(4)}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" >
                            Orientacion del techo:

                            <p className="text-right p-2 w-full">
                                {recinto?.orientacion_techo}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-md p-4 grid items-center" >
                        <div className="grid grid-cols-[auto_140px] items-center gap-2" > Tipo de vidrio:
                            <p className="text-right p-2 w-full">
                                {recinto?.tipo_vidrio_techo}
                            </p>
                        </div>
                    </div>
                </div>
            </details>


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


        </div >
    );
}

export default RecintoVer
