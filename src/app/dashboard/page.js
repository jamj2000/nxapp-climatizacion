import { auth } from "@/auth";
import Tarjeta from "@/components/contenedor";

async function page() {
  const sesion = await auth();

  return (
    <>
      <Tarjeta>
        <div className="flex flex-col items-center h-full">
          <div>
            <h1 className="text-2xl">🔐 Dashboard</h1>
            <p>{sesion?.user.name}</p>
            <p>{sesion?.user.email}</p>
            <p>{sesion?.user.role}</p>
            <div className="flex w-full justify-center">
              {sesion?.user.image ? (
                <img src={sesion.user.image} alt={sesion.user.name} />
              ) : (
                <img
                  src="/images/user.svg"
                  alt="Imagen por defecto"
                  className="h-10"
                />
              )}
            </div>
          </div>
        </div>
      </Tarjeta>
    </>
  );
}

export default page;
