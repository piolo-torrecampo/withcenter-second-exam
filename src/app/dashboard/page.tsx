import { getBlogs } from "@/utils/supabase/get-blogs";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

const DashboardPage = async () => {
  const blogs = await getBlogs()

  return (
    <DashboardLayout blogs={blogs}/>
  );
};

export default DashboardPage;