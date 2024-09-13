import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import { auth } from "@/auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FloWeather",
  description:
    "Pagina para realizar cuentas para climatizar hospedajes en tu ciudad",
  manifest: "/manifest.json",
};

export default async function RootLayout({ children }) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session} />
        <main className="py-8">
       
          {children}
      
        </main>
        <Footer />
      </body>
    </html>
  );
}
