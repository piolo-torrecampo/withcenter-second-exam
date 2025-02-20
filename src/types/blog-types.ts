import User from "./user-types"

export default interface Blog {
  id?: number,
  supabase_auth_id?: string,
  created_at?: string
  title: string,
  description: string,
  body: string 
  users?: User
}