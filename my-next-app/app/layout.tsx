// app/layout.tsx

import type { Metadata } from "next"
import "./globals.css"
// We remove SidebarProvider and SidebarTrigger as they relate to collapsing
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarInset,
} from "@/components/ui/sidebar" // ⚠️ Check if you need to remove SidebarProvider from the import!
// If your component library requires SidebarProvider, you might need to keep it
// and check its documentation for a 'defaultOpen' or 'non-collapsible' prop.

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
      <body>
        {/* 1. REMOVED: SidebarProvider - to remove state management for collapse.
               If your library's Sidebar components require a provider, you must keep it, 
               but check if it has a prop to disable collapsing. */}
        
        {/* If your components are working without SidebarProvider, use this: */}
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
        
        <SidebarInset>
            {/* 2. REMOVED: The entire <header> element, which contained SidebarTrigger and 
                   created the space at the top of the main content. */}
            
            {/* This is now the very first element in SidebarInset */}
            <div className="flex flex-1 flex-col gap-4 p-4">
              {children}
            </div>
        </SidebarInset>
        
        {/* If you had to keep SidebarProvider (see note above), uncomment this: */}
        {/* </SidebarProvider> */}

      </body>
    </html>
  )
}