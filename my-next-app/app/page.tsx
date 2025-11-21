import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  // 1. Get the cookie store
  const cookieStore = await cookies()
  
  // 2. Check if the login cookie exists
  const hasCookie = cookieStore.has('auth_token')

  // 3. If NOT logged in, redirect immediately
  if (!hasCookie) {
    redirect('/login')
  }

  // 4. If they ARE logged in, show the page content
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome to the Secret Dashboard</h1>
      <p>You are logged in!</p>
    </main>
  )
}