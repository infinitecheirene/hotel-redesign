// components/booking-section.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Star, Calendar, Users, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface Room {
  id: number
  name: string
  price: number
  capacity: number
  bed_type: string
}

interface BookingSectionProps {
  room: Room
}

export function BookingSection({ room }: BookingSectionProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
  })

  const [priceDetails, setPriceDetails] = useState({
    nights: 0,
    total: 0,
  })

  // Check if user is authenticated
  useEffect(() => {
    checkAuth()
  }, [])

  // Calculate price when dates change
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn)
      const checkOut = new Date(formData.checkOut)
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      
      if (nights > 0) {
        setPriceDetails({
          nights,
          total: nights * room.price,
        })
      }
    }
  }, [formData.checkIn, formData.checkOut, room.price])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      setIsAuthenticated(response.ok)
    } catch {
      setIsAuthenticated(false)
    }
  }

  const checkAvailability = async () => {
    if (!formData.checkIn || !formData.checkOut) {
      setError('Please select check-in and check-out dates')
      return false
    }

    setCheckingAvailability(true)
    setError('')

    try {
      const response = await fetch('/api/bookings/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_id: room.id,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setError('Please login to check availability')
          return false
        }
        throw new Error(data.message || 'Failed to check availability')
      }

      if (!data.data.available) {
        setError('This room is not available for the selected dates. Please choose different dates.')
        return false
      }

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check availability'
      setError(errorMessage)
      return false
    } finally {
      setCheckingAvailability(false)
    }
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Check if user is authenticated
    if (isAuthenticated === false) {
      setError('Please login to make a booking')
      router.push(`/login?redirect=/rooms/${room.id}`)
      setLoading(false)
      return
    }

    // Validate dates
    if (!formData.checkIn || !formData.checkOut) {
      setError('Please select check-in and check-out dates')
      setLoading(false)
      return
    }

    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (checkIn < today) {
      setError('Check-in date cannot be in the past')
      setLoading(false)
      return
    }

    if (checkOut <= checkIn) {
      setError('Check-out date must be after check-in date')
      setLoading(false)
      return
    }

    // Check availability before booking
    const isAvailable = await checkAvailability()
    if (!isAvailable) {
      setLoading(false)
      return
    }

    try {
      // Create booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_id: room.id,
          room_name: room.name,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          guests: formData.guests,
          price_per_night: room.price,
          special_requests: formData.specialRequests,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setError('Please login to make a booking')
          router.push(`/login?redirect=/rooms/${room.id}`)
          return
        }
        if (response.status === 409) {
          setError('This room is no longer available for the selected dates. Please choose different dates.')
          return
        }
        throw new Error(data.message || 'Booking failed')
      }

      // Success! Show message and redirect to room page
      setSuccess('Booking created successfully! Redirecting to your bookings...')
      
      // Clear form
      setFormData({
        checkIn: '',
        checkOut: '',
        guests: 1,
        specialRequests: '',
      })

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/rooms')
        router.refresh() // Refresh the page data
      }, 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-8 rounded-lg shadow-lg sticky top-24">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-[#5C0A1E] mb-2">
            ₱{formatPrice(room.price)}
            <span className="text-lg font-normal text-[#5C0A1E]/60">/night</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>

        <form onSubmit={handleBooking} className="space-y-4 mb-6">
          {/* Check-in Date */}
          <div>
            <label className="block text-sm font-medium text-[#5C0A1E] mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Check-in
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              min={getTodayDate()}
              required
              className="w-full px-4 py-3 border border-[#5C0A1E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A1E] focus:border-transparent"
            />
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-sm font-medium text-[#5C0A1E] mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Check-out
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              min={formData.checkIn || getTodayDate()}
              required
              className="w-full px-4 py-3 border border-[#5C0A1E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A1E] focus:border-transparent"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-[#5C0A1E] mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Guests
            </label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-[#5C0A1E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A1E] focus:border-transparent"
            >
              {[...Array(room.capacity)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-[#5C0A1E] mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              rows={3}
              maxLength={1000}
              placeholder="Any special requests or requirements?"
              className="w-full px-4 py-3 border border-[#5C0A1E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A1E] focus:border-transparent resize-none"
            />
          </div>

          {/* Price Breakdown */}
          {priceDetails.nights > 0 && (
            <div className="border-t border-[#5C0A1E]/10 pt-4">
              <div className="flex justify-between items-center mb-2 text-[#5C0A1E]/70">
                <span>₱{formatPrice(room.price)} × {priceDetails.nights} nights</span>
                <span>₱{formatPrice(priceDetails.nights * room.price)}</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg text-[#5C0A1E] pt-2 border-t border-[#5C0A1E]/10">
                <span>Total</span>
                <span>₱{formatPrice(priceDetails.total)}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || checkingAvailability || isAuthenticated === null}
            className="w-full bg-[#5C0A1E] hover:bg-[#8B1538] text-[#F5E6C8] py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : checkingAvailability ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Checking...
              </>
            ) : isAuthenticated === null ? (
              'Loading...'
            ) : isAuthenticated === false ? (
              'Login to Book'
            ) : (
              'Book This Room'
            )}
          </Button>
        </form>

        <div className="space-y-3 text-sm">
          <div className="border-t border-[#5C0A1E]/10 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#5C0A1E]/70">Room Type</span>
              <span className="font-semibold text-[#5C0A1E]">{room.bed_type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#5C0A1E]/70">Max Guests</span>
              <span className="font-semibold text-[#5C0A1E]">{room.capacity} Guests</span>
            </div>
          </div>

          <p className="text-center text-xs text-[#5C0A1E]/50 pt-3">
            Free cancellation up to 24 hours before check-in
          </p>
        </div>
      </div>
    </div>
  )
}