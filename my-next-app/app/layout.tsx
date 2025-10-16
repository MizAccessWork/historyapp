// app/layout.tsx
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Sidebar } from "@/components/ui/sidebar" // adjust path as needed

export const metadata: Metadata = {
  title: "My App",
  description: "A Next.js app with shadcn sidebar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar stays fixed on the left */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
