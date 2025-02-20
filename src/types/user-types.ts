export default interface User {
  id?: number,
  created_at?: string,
  fullname: string,
  avatar: string,
  email: string,
  supabase_auth_id: string
}