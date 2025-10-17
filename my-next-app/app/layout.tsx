// app/layout.tsx

import type { Metadata } from "next"
import "./globals.css"

// RE-ADD SidebarProvider and remove SidebarTrigger from the imports
import { 
  SidebarProvider, // <--- RE-ADDED THIS IMPORT
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarInset,
  // SidebarTrigger,  <--- REMOVED THIS IMPORT
} from "@/components/ui/sidebar"
import { Home, BookOpen, GraduationCap, Scroll } from "lucide-react"

export const metadata: Metadata = {
  title: "History Interview App",
  description: "Practice your history interview questions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* ADD Tailwind classes to enforce the fixed-sidebar layout */}
      <body className="flex min-h-screen"> 
        {/* RE-ADD SidebarProvider to fix the "must be used within" error */}
        <SidebarProvider> 
          <Sidebar>
            <SidebarHeader>
              <h2 className="px-2 text-lg font-semibold">History Interview</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="/">
                          <Home />
                          <span>Home</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="/sources">
                          <Scroll />
                          <span>Sources</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="/practice">
                          <GraduationCap />
                          <span>Practice</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* This is the main content area, which will now take up the remaining space */}
          <SidebarInset className="flex-1"> 
            {/* The old <header> (with SidebarTrigger) is correctly removed. */}
            
            <div className="flex flex-1 flex-col gap-4 p-4">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}