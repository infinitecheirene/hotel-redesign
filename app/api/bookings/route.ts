// app/api/bookings/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// ==============================
// GET /api/bookings
// ==============================
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

// ==============================
// POST /api/bookings
// ==============================
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please login first.' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        room_id: body.room_id,
        room_name: body.room_name,
        check_in: body.check_in,
        check_out: body.check_out,
        guests: body.guests,
        price_per_night: body.price_per_night,
        special_requests: body.special_requests,
      }),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}
