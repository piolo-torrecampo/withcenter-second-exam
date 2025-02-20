import { NextResponse } from 'next/server'
import { createClientForServer } from '@/utils/supabase/server'
import addUser from '@/utils/supabase/add-user'


// https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=web&queryGroups=environment&environment=server&queryGroups=framework&framework=nextjs
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  console.log(origin)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClientForServer()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data } = await supabase.auth.getUserIdentities();
      const identity = data?.identities[0]?.identity_data;
      
      console.log(identity)

      await addUser({
        fullname: identity?.full_name ?? "",
        avatar: identity?.avatar_url ?? "",
        email: identity?.email ?? "",
        supabase_auth_id: data?.identities[0].user_id ?? ""
      }, )
      
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}