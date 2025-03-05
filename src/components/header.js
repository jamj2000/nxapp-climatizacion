import Link from "next/link";
import Menu from "@/components/menu"
import Image from "next/image";
import AuthButton from "@/components/auth-button"
import { auth } from '@/auth'

async function Header() {
  const sesion = await auth()
  console.log(`sesion header`, sesion);

  return (
    <header className="flex justify-between px-10 w-screen bg-sky-400 dark:bg-gray-900 items-center font-bold p-2 sticky top-0 z-50 border-b-[3px] border-blue-400/90 dark:border-sky-600">
      <div className="flex items-center gap-2 lg:gap-10">
        <div className="lg:order-last">
          <Menu />
          {/* <Link href="/proyectos">Proyectos</Link>
          <Link href="/recintos">Recintos</Link>
          <Link href="/equipos">Equipos</Link>
          <Link href="/about">Sobre mí</Link> */}
        </div>
        <div>
          <Logo />
        </div>
      </div>


      <AuthButton />

    </header>
  );
}

export default Header


function Logo() {
  return (
    <nav className="bg-sky-400 border-gray-200 dark:bg-transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto">
        <div>
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              height={48} width={48}
              src="/images/cli-logo.svg"
              alt="FloWeather Logo"
            />
            <span className="hidden sm:block self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100/80">
              FloWeather
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
