import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BlogProvider } from "@/context/UserBlogsContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </BlogProvider>
  )
}
