"use server"
import { createClientForServer } from "@/utils/supabase/server";

const readUsers = async () => {
  const supabase = await createClientForServer()

  const { data: users } = await supabase
      .from('users')
      .select('email')

  return users
}

export default readUsers
