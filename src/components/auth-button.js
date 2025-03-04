import Link from "next/link";
import { auth } from '@/auth'


async function AuthButton() {
  const sesion = await auth()

  {
    sesion
      ?
      <Link href="/auth/logout"
        className="px-4 py-2 flex gap-2 items-center rounded-lg bg-white/80 dark:bg-blue-400/80 transition duration-500 hover:bg-white hover:shadow-xl">
        <img
          src={sesion.user?.image ?? "/images/user.svg"}
          className="w-6 rounded-[50%] bg-white outline outline-1 outline-white"
          alt="FloWeather Logo"
        />
        Logout
      </Link>
      :
      <Link href="/auth/login"
        className="px-4 py-2 flex gap-2 items-center rounded-lg bg-white/80 dark:bg-blue-400/80  transition duration-500 hover:bg-white hover:shadow-xl">
        <img
          src={"/images/logo-login.png"}
          className="w-6"
          alt="FloWeather Logo"
        />
        Login
      </Link>
  }
}

export default AuthButton;

