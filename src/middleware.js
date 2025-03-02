import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);



export default auth((req) => {
  console.log('MIDDLEWARE ', req.nextUrl.pathname, req.auth);

  if (!req.auth) {
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(req.nextUrl.origin + `/auth/login?callbackUrl=${encodedCallbackUrl}`)
  }

  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'This is a custom header');
  return response;
})


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - images
     * - auth
     * - about
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - $ (home page)
     */
    '/((?!api|pwa|images|auth|about|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)',
  ],
}




// export const config = {
//   matcher: [
//     // rutas públicas: las incluimos para no perder la sesión
//     // '/about',

//     // rutas de admin
//     '/admin(.*)',

//     // rutas de user
//     '/dashboard(.*)',
//     '/proyectos(.*)',
//     '/recintos(.*)',
//     '/equipos(.*)'
//   ]
// };
