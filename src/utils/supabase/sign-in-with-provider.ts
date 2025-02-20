"use server"

import { createClientForServer } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

type ProviderType = 'google' | 'github';


const signInWithProvider = (provider: ProviderType) => async() => {
  const supabase = await createClientForServer()

  const auth_callback_url = `${process.env.NEXT_WEBSITE_URL}/auth/callback`

  const {data, error}= await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  })

  if (error) {
    console.error('Sign In With Auth (Error): ' + JSON.stringify(error))
    return;
  } 

  redirect(data.url)
}

const signInWithGoogle = await signInWithProvider('google')
const signInWithGithub = await signInWithProvider('github')

export {signInWithGoogle, signInWithGithub};