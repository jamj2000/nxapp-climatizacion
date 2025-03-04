function Issues({ issues }) {

    if (issues) return (
        <div className={'text-red-700 rounded-md bg-red-50 p-2 mb-2'}>
            <p className="uppercase mb-2 text-black">Errores detectados:</p>
            {issues && issues.map(([campo, mensaje], index) => (
                <div key={index} className="grid grid-cols-[auto_auto]">
                    <p>{campo}</p> <p className="ml-2">{mensaje}</p>
                </div>))
            }
        </div>
    );
}

export default Issues;