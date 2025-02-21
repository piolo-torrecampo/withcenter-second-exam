"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserBlogs } from "@/utils/supabase/get-blogs";
import addBlog from "@/utils/supabase/add-blog";
import updateBlog from "@/utils/supabase/update-blog";
import deleteBlog from "@/utils/supabase/delete-blog";
import Blog from "@/types/blog-types";


interface BlogContextType {
  blogs: Blog[];
  addNewBlog: (blog: Blog) => Promise<void>;
  editBlog: (blog: Blog) => Promise<void>;
  deleteBlogById: (blogId: number) => Promise<void>;
}

const UserBlogsContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  async function fetchBlogs() {
    try {
      const result = await getUserBlogs();
      if (result) {
        setBlogs([...result]);
        console.log('PASSED')
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);
   
  async function addNewBlog(blog: Blog) {
    try {
      await addBlog(blog);
      await fetchBlogs()
    } catch (error) {
      console.error("Failed to add blog:", error);
    }
  }

  async function editBlog(updatedBlog: Blog) {
    try {
      await updateBlog(updatedBlog, `${updatedBlog.id}`);
      await fetchBlogs()
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  }

  async function deleteBlogById(blogId: number) {
    try {
      await deleteBlog(blogId);
      await fetchBlogs()
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  }

  return (
    <UserBlogsContext.Provider value={{ blogs, addNewBlog, editBlog, deleteBlogById }}>
      {children}
    </UserBlogsContext.Provider>
  );
};

export function useBlog() {
  const context = useContext(UserBlogsContext);

  if (!context)  {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  
  return context;
}
