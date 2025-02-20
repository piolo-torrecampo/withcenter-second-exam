"use server"

import { createClientForServer } from "./server"

const getBlogCount = async () => {
  const supabase = await createClientForServer();
  const supabase_auth_id = (await supabase.auth.getUserIdentities()).data?.identities?.[0]?.user_id;

  const { count, error } = await supabase
    .from("blogs")
    .select('*', { count: 'exact', head: true })
    .neq("supabase_auth_id", supabase_auth_id);

  if (error) {
    console.error("Get Blog Count: ", error);
    return 0;
  }

  return count;
};

const getBlogs = async () => {
  const supabase = await createClientForServer();
  const supabase_auth_id = (await supabase.auth.getUserIdentities()).data?.identities?.[0]?.user_id;

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*, users(*)")
    .neq("supabase_auth_id", supabase_auth_id);

  if (error) {
    console.error("Get Blogs: ", error);
    return [];
  }

  return blogs ? blogs.reverse() : [];
};


const getUserBlogs = async () => {
  const supabase = await createClientForServer()
  const supabase_auth_id = (await supabase.auth.getUserIdentities()).data?.identities?.[0].user_id

  const { data: blogs, error } = await supabase
    .from('blogs')
    .select("*").eq('supabase_auth_id', supabase_auth_id)
    
  if (error) {
    console.error("Get Users Blog: " + error)
    return [];
  }

  return blogs ? blogs.reverse() : [];
}

const getSpecificBlog = async (id: string) => {
  const supabase = await createClientForServer()

  const blogId = parseInt(id, 10)

  if (isNaN(blogId)) {
    return null;
  }

  const { data: blog, error } = await supabase
    .from('blogs')
    .select("*, users(*)").eq('id', blogId)

  if (error) {
    console.log("Get Specific Blog: " + error)
    return [];
  }

  return blog
}

export { getBlogs, getUserBlogs, getSpecificBlog, getBlogCount }