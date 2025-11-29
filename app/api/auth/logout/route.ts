// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const token = (await cookies()).get('auth_token')?.value

    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    }

    // Delete the cookie
    ;(await cookies()).delete('auth_token')

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch {
    // Still delete the cookie even if API call fails
    ;(await cookies()).delete('auth_token')

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })
  }
}
