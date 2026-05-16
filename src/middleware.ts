import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  
  // Protect detailed division/product views (e.g., /divisions/cardiology)
  // but allow the main divisions list (/divisions)
  const isProductRoute = pathname.startsWith('/divisions/') && pathname !== '/divisions';
  
  // Public verification route for consumers (QR codes)
  const isVerifyRoute = pathname.startsWith('/verify/');

  if ((isAdminRoute || isProductRoute) && !isVerifyRoute) {
    // Check for our simple auth cookie
    const authCookie = request.cookies.get('padowa_admin_auth');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Not logged in, redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/divisions/:path*'],
};
