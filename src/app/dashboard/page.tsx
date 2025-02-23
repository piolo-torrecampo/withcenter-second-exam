"use client"

import { useEffect, useState } from "react";
import { getBlogs } from "@/utils/supabase/get-blogs";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import Blog from "@/types/blog-types";

const DashboardPage = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs ? <DashboardLayout blogs={blogs} /> : <div>Loading...</div>}
    </div>
  );
};

export default DashboardPage;
