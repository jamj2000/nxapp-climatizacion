"use client";
import { useActionState, useEffect } from "react";
import { login } from "@/lib/actions/auth";
import { toast } from "sonner";
import Link from "next/link";



function LoginForm() {

  const [state, action, pending] = useActionState(login, {})

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success)
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <form
      action={action}
      className="credentials flex flex-col items-center text-sky-500"
    >
      <div className="flex flex-col items-center mb-4 ">
        <label className="mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="nombre@gmail.com"
          className="border p-2 rounded text-center"
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <label className="mb-2">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="******"
          className="border p-2 rounded text-center"
        />
      </div>
      <div className="flex justify-around items-center gap-5 mb-5">
        <button
          type="submit"
          disabled={pending}
          className="bg-sky-600 rounded-[10px] px-4 py-2 cursor-pointer text-white disabled:bg-slate-400"
        >
          {pending ? 'Iniciando sesión ...' : 'Iniciar sesión'}
        </button>
        <Link
          href="/auth/register"
          className="bg-sky-600  rounded-[10px] px-4 py-2 cursor-pointer text-white"
        >
          Crear cuenta
        </Link>
      </div>

    </form>
  );
}

export default LoginForm;
