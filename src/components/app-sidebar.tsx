"use client";

import { LogOut, Trash2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { signOut } from "@/utils/supabase/sign-out";
import { useBlog } from "@/context/UserBlogsContext";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { blogs = [], deleteBlogById } = useBlog();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href={'/dashboard'} passHref>
                <SidebarMenuButton asChild>
                  <span className="font-medium truncate">Blog Stream</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={'/dashboard/create'} passHref>
                <SidebarMenuButton asChild>
                  <span className="font-medium truncate">Create Blog</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Blogs</SidebarGroupLabel>
          <SidebarMenu>
            <div className="max-h-[400px] overflow-y-auto">
              {blogs.map((blog) => (
                <SidebarMenuSubItem key={blog.id}>
                  <div className="flex flex-row justify-between">
                    <Link href={`/dashboard/edit?id=${blog.id}`} passHref>
                      <SidebarMenuButton asChild>
                        <span className="font-medium truncate">{blog.title}</span>
                      </SidebarMenuButton>
                    </Link>
                    <Button
                      className="bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (blog?.id !== undefined) {
                          deleteBlogById(blog.id);
                        } else {
                          console.error("Blog ID is missing!");
                        }
                      }}
                    >
                      <Trash2 color="black" />
                    </Button>
                  </div>
                </SidebarMenuSubItem>
              ))}
            </div>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="w-full">
        <Button variant="outline" className="flex flex-row justify-between w-full" onClick={handleLogout}>
          <p>Logout</p>
          <LogOut />
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
