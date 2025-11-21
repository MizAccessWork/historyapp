// app/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  // Get the cookie store from the incoming request headers
  const cookieStore = cookies()
  
  // Try to get the authentication token
  const authToken = (await cookieStore).get('auth_token')

  // Check if the auth_token cookie is present
  if (!authToken || authToken.value !== 'valid_token') {
    // If no token or the token value doesn't match, redirect to the login page
    // Note: In a real app, you would likely verify a JWT token here.
    redirect('/login') 
  }

  // If the token is valid, render the main protected content
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50">
      <h1 className="text-4xl font-bold text-green-800">
        Welcome to the Dashboard
      </h1>
      <p className="mt-4 text-lg text-green-600">
        You are successfully logged in and vewing the protected content!
      </p>
      {/* You would typically render your main dashboard content here */}
      <p className="mt-8 text-sm text-gray-500">
        Your auth_token is: {authToken.value}
      </p>
      {/* You'll need a way to log out, which would involve a Server Action to delete the cookie */}
    </div>
  )
}