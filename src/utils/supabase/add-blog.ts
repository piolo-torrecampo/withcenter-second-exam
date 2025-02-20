"use server"

import Blog from "@/types/blog-types";
import { createClientForServer } from "@/utils/supabase/server";

export default async function addBlog(blog: Blog) {
  const supabase = await createClientForServer()
  const { data } = await supabase.auth.getUserIdentities();

  const { data: insertedBlogs, error } = await supabase
    .from('blogs')
    .insert({
      supabase_auth_id: data?.identities[0].user_id ? data?.identities[0].user_id : '',
      title: blog.title,
      description: blog.description,
      body: blog.body
    }).select().single()

  if(error){
    console.error("Add Blog: " + JSON.stringify(error))
    return;
  }

  return insertedBlogs
}