"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, ChevronLeft, ChevronRight, Edit, Trash2, Plus } from "lucide-react"

interface Room {
  id: number
  name: string
  full_description: string
  price: number
  capacity: number
  size: string
  bed_type: string
  amenities: string[]
  image: string | null
}

interface PaginationData {
  data: Room[]
  total: number
  per_page: number
  current_page: number
  last_page: number
}

interface RoomsDataTableProps {
  onEdit: (room: Room) => void
  onDelete: (id: number) => void
  onAdd: () => void
  refresh: boolean
}

export function RoomsDataTable({ onEdit, onDelete, onAdd, refresh }: RoomsDataTableProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1) // Reset to page 1 on new search
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  // Fetch rooms
  const fetchRooms = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `/api/rooms?page=${currentPage}&search=${debouncedSearch}&per_page=10`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch rooms')
      }
      
      const data = await response.json()
      
      // Handle different response structures
      if (data.data && Array.isArray(data.data)) {
        setRooms(data.data)
        setPagination(data)
      } else if (Array.isArray(data)) {
        setRooms(data)
        setPagination(null)
      } else {
        setRooms([])
        setPagination(null)
      }
    } catch (error) {
      console.error("Error fetching rooms:", error)
      setError("Failed to load rooms. Please try again.")
      setRooms([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }, [currentPage, debouncedSearch])

  useEffect(() => {
    fetchRooms()
  }, [fetchRooms, refresh])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.last_page) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={onAdd}
          className="bg-[#5C0A1E] hover:bg-[#8B1538] text-white whitespace-nowrap"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Bed Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5C0A1E]"></div>
                      <span>Loading rooms...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="text-red-600">
                      <p className="font-medium">{error}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={fetchRooms}
                        className="mt-2"
                      >
                        Try Again
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : !rooms || rooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="text-gray-500">
                      <p className="font-medium">No rooms found</p>
                      {search && (
                        <p className="text-sm mt-1">Try adjusting your search</p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.id}</TableCell>
                    <TableCell>
                      {room.image ? (
                        <div className="relative w-16 h-16">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${room.image}`}
                            alt={room.name}
                            fill
                            className="object-cover rounded"
                            sizes="64px"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>{room.bed_type}</TableCell>
                    <TableCell>{room.capacity} guests</TableCell>
                    <TableCell>{room.size}</TableCell>
                    <TableCell className="font-semibold">₱{room.price}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(room)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(room.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * (pagination.per_page || 10) + 1} to{" "}
            {Math.min(currentPage * (pagination.per_page || 10), pagination.total)} of {pagination.total} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                .filter((page) => {
                  return (
                    page === 1 ||
                    page === pagination.last_page ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                })
                .map((page, index, array) => (
                  <div key={page} className="flex items-center">
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-[#5C0A1E] hover:bg-[#8B1538]"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  </div>
                ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === pagination.last_page}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}