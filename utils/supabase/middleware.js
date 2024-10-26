import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Adjusted condition with proper grouping
  if (
    user && 
    (request.nextUrl.pathname.startsWith('/pages/login') || request.nextUrl.pathname.startsWith('/pages/signup'))
  ) {
    const { protocol, host } = request.nextUrl;
    const origin = `${protocol}//${host}`;
    return NextResponse.redirect(`${origin}/`);
  }

  return supabaseResponse;
}
