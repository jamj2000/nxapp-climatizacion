import Link from "next/link";
import { auth } from '@/auth'
import { KeyRound, Lock, ShieldPlus } from "lucide-react";


async function AuthButton() {
  const sesion = await auth()


  if (sesion) return (
    <div className="dropdown dropdown-bottom dropdown-end z-100">
      <div tabIndex={0} role="button" >
        <img
          src={sesion.user?.image ?? "/images/user.svg"}
          className="w-8 rounded-[50%] bg-white outline outline-1 outline-white"
          alt="auth icon" />
      </div>
      <ul tabIndex={0} className="mt-2 dropdown-content bg-base-100 rounded-md  w-fit p-4 pl-10 text-right shadow-sm">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/auth/logout">Logout</Link></li>
      </ul>
    </div>
  )

  return (
    <div className="dropdown dropdown-bottom dropdown-end h-full">
      <div tabIndex={0} role="button" >
        {/* <img
          src={"/images/logo-login.png"}
          className="w-8 p-1 rounded-[50%] bg-white outline outline-1 outline-white"
          alt="auth icon" /> */}
        <ShieldPlus className="size-8 rounded-[50%] bg-white text-blue-600 " />
      </div>
      <ul tabIndex={0} className="mt-2 dropdown-content bg-base-100 rounded-md z-100 w-fit p-4 pl-10 text-right shadow-sm">
        <li><Link href="/auth/login">Login</Link></li>
      </ul>
    </div>
  )
}

export default AuthButton;

