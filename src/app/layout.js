import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";


export const metadata = {
  title: "FloWeather",
  description:
    "Pagina para realizar cuentas para climatizar hospedajes en tu ciudad",
  manifest: "/pwa/manifest.json",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="py-8">

            {children}

          </main>
          <Footer />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
