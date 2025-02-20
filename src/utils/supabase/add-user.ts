"use server"

import { createClientForServer } from "./server";
import User from "@/types/user-types";

export default async function addUser(user: User) {
  const supabase = await createClientForServer()
  
  const { data: users } = await supabase
      .from('users')
      .select('email')

  if(!users?.some((u) => u.email === user.email)) {
    const { error } = await supabase
      .from('users')
      .insert({
        supabase_auth_id: user.supabase_auth_id,
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar
      }) 

    if(error){
      console.log(error)
      return;
    }
  }

  return;
}