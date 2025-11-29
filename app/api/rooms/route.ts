import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get('auth_token')?.value
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || '1'
  const search = searchParams.get('search') || ''
  const perPage = searchParams.get('per_page') || '10'

  try {
    const token = await getAuthToken()
    
    const response = await fetch(
      `${API_URL}/api/rooms?page=${page}&search=${search}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch rooms')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthToken()
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()

    const response = await fetch(`${API_URL}/api/rooms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errRes = await response.json()
      throw new Error(errRes.message || 'Failed to create room')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to create room'

    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
