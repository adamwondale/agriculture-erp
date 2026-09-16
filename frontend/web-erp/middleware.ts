import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt_token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname === '/login' || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // In production, decode and verify JWT claim
    const role = request.cookies.get('user_role')?.value || 'Admin';

    if (pathname.startsWith('/(admin)') || pathname.startsWith('/dashboard')) {
      if (role !== 'Admin' && role !== 'Executive') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    if (pathname.startsWith('/hr') && role !== 'HR' && role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/field-form') && role !== 'Agronomist' && role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/portal') && role !== 'Investor' && role !== 'Buyer' && role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
