import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

// import { NextResponse } from "next/server";

// export default function middleware(request) {
//   const isAuthenticate = true;

//   if (!isAuthenticate) {
//     return NextResponse.redirect(new URL('/auth/login', request.url))
//   }


//   return NextResponse.next();
// }

// export default auth((request) => {
//   console.log(request.auth);
//   console.log(request.nextUrl);

//   console.log('MIDDLEWARE ', request.nextUrl.pathname);

//   // Rutas públicas
//   if (request.nextUrl.pathname.startsWith('/about')) return null


//   // Rutas privadas
//   if (!request.auth) {
//     return NextResponse.redirect(new URL('/auth/login', request.url))
//   }

//   return NextResponse.next();
// });




export default auth((req) => {
  // console.log(req.auth);
  // console.log(req.nextUrl);

  console.log('MIDDLEWARE ', req.nextUrl.pathname);

  // Rutas públicas
  if (req.nextUrl.pathname.startsWith('/about')) return null


  // Rutas privadas
  if (!req.auth) {
    console.log("no autenticado");

    let callbackUrl = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      req.nextUrl.origin + `/auth/login?callbackUrl=${encodedCallbackUrl}`
    );
  }
});



export const config = {
  matcher: [
    // rutas públicas: las incluimos para no perder la sesión
    '/about',

    // rutas de admin
    '/admin(.*)',

    // rutas de user
    '/dashboard(.*)',
    '/proyectos(.*)',
    '/recintos(.*)',
    '/equipos(.*)'
  ]
};
