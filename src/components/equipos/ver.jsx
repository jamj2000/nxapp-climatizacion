'use client'
import { useId } from "react";


function EquipoVer({ equipo }) {
    const divId = useId()

    return (
        <div id={divId} >

            <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
                <div onClick={() => document.getElementById(divId)?.closest('dialog')?.close()}
                    className='bg-sky-600 hover:shadow-lg hover:font-bold text-white py-2 rounded-xl w-56  cursor-pointer'>
                    <p className="text-center">Aceptar</p>
                </div>

                <div className="grid items-center gap-2">
                    <p>Proyecto asociado: {equipo.proyecto.nombre}</p>
                </div>
            </div>

            <div className="mt-4 grid gap-1 items-stretch md:grid-cols-2 xl:grid-cols-3">

                <div className="bg-slate-50 rounded-md p-4 grid grid-cols-2 place-items-center gap-2">
                    <p className="justify-self-start">Nombre</p>
                    <p className="justify-self-end">{equipo.nombre}</p>
                </div>

                <div className="bg-slate-50 rounded-md p-4 grid grid-cols-2 place-items-center gap-2">
                    <p className="justify-self-start">Potencia (W)</p>
                    <p className="justify-self-end">{equipo.potencia}</p>
                </div>

                <div className="bg-slate-50 rounded-md p-4 grid grid-cols-2 place-items-center gap-2">
                    <p className="justify-self-start">Factor de funcionamiento (%)</p>
                    <p className="justify-self-end">{equipo.factor_funcionamiento}</p>
                </div>
            </div>
        </div >
    );
}

export default EquipoVer
