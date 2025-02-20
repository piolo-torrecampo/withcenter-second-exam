import { updateSession } from '@/utils/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { createClientForServer } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const supabase = await createClientForServer();
  const { data: { session } } = await supabase.auth.getSession();

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
