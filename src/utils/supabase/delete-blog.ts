"use server"

import { createClientForServer } from "./server"


export default async function deleteBlog(id: number) {
  const supabase = await createClientForServer()

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete Blog: ' + error)
    return;
  }
  
  return;
}