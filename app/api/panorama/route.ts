// app/api/panorama/route.ts
import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json(
      { error: 'Path parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Fetch the image from Laravel backend
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch panorama image')
    }

    // Get the image as a buffer
    const imageBuffer = await response.arrayBuffer()
    
    // Get content type from Laravel response
    const contentType = response.headers.get('content-type') || 'image/webp'

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error fetching panorama:', error)
    return NextResponse.json(
      { error: 'Failed to fetch panorama image' },
      { status: 500 }
    )
  }
}