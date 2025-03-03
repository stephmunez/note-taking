import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Allow Supabase to process OAuth callback
  const url = request.nextUrl;
  const isOAuthCallback = url.searchParams.has('code');

  if (isOAuthCallback) {
    return supabaseResponse; // Let Supabase handle the authentication flow
  }

  // Do not run code between createServerClient and supabase.auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authPages = [
    '/login',
    '/signup',
    '/reset-password',
    '/forgot-password',
    '/error',
  ];

  if (
    !user &&
    !authPages.some((page) => request.nextUrl.pathname.startsWith(page))
  ) {
    const newUrl = url.clone();
    newUrl.pathname = '/login';
    return NextResponse.redirect(newUrl);
  }

  return supabaseResponse;
}
