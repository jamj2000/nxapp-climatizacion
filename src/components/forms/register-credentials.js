"use client";
import { register } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";



function RegisterForm() {
  const router = useRouter()


  const [state, action, pending] = useActionState(register, {})

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success)
      router.push("/auth/login")
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state, router])


  return (
    <div className="flex flex-col items-center justify-center ">
      <form action={action} className="credentials">
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="mb-1">Nombre</span>
            <input
              type="text"
              name="name"
              placeholder="Michael Garrido"
              className="p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Garrido@mail.com"
              className="p-2 border border-gray-300 rounded"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Contraseña</span>
            <input
              type="password"
              name="password"
              placeholder="******"
              className="p-2 border border-gray-300 rounded"
            />
          </label>

        </div>
        <div className="flex justify-around gap-5 mt-5">
          <button
            type="submit"
            disabled={pending}
            className="bg-sky-600  rounded-[10px] px-4 py-2 cursor-pointer text-white disabled:bg-slate-400"
          >
            {pending ? 'Creando cuenta ...' : 'Crear cuenta'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm;
