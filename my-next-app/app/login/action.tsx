import { cookies } from 'next/headers'

export async function login(formData: FormData) {
    const password = formData.get('password') as string

    if (password === process.env.ADMIN_PASSWORD) {
        const cookieStore = await cookies()
        cookieStore.set('auth_token', 'valid_token',
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/',
        })
        return { success: true }
    }
    return { success: false, message: 'invalid' }
}