// app/api/auth/me/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const token = (await cookies()).get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 401) {
        // Delete expired / invalid token
        (await cookies()).delete('auth_token')
      }
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}
