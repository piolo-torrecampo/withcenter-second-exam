"use server"

import Blog from "@/types/blog-types";
import { createClientForServer } from "./server";

export default async function updateBlog(blog: Blog, id: string) {
  const supabase = await createClientForServer()
  
  const blogId = parseInt(id, 10)

  const { error } = await supabase
  .from('blogs')
  .update({
    title: blog.title,
    description: blog.description,
    body: blog.body
   })
  .eq('id', blogId)

  if(error) {
    console.error("Update Blog: " + error)
    return;
  }

  return;
}
