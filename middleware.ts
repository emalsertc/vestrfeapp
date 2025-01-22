import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/login';
  
  // Si on a les paramètres d'authentification, on laisse passer
  if (request.nextUrl.searchParams.has('token') && request.nextUrl.searchParams.has('user')) {
    return NextResponse.next();
  }

  // Vérifier le token dans les cookies
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = !!token;

  // Redirection selon l'état d'authentification
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 