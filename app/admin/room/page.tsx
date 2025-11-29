"use client"

import { useState } from "react"
import Image from "next/image"
import { RoomsDataTable } from "@/components/rooms-datatable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { X, Upload, Image as ImageIcon, Plus } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

interface Room {
  id: number
  name: string
  full_description?: string
  price: number
  capacity: number
  size: string
  bed_type: string
  amenities: string[]
  image: string | null
  panoramas?: Array<{
    id: string
    name: string
    panoramaUrl: string
    thumbnail: string
  }>
}

export default function AdminRoomsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    full_description: "",
    price: "",
    capacity: "",
    size: "",
    bed_type: "",
    amenities: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [panoramaFiles, setPanoramaFiles] = useState<File[]>([])
  const [panoramaPreviews, setPanoramaPreviews] = useState<string[]>([])
  const [panoramaNames, setPanoramaNames] = useState<string[]>([])

  const handleAdd = () => {
    setEditingRoom(null)
    setFormData({
      name: "",
      full_description: "",
      price: "",
      capacity: "",
      size: "",
      bed_type: "",
      amenities: "",
    })
    setImageFile(null)
    setImagePreview(null)
    setPanoramaFiles([])
    setPanoramaPreviews([])
    setPanoramaNames([])
    setIsFormOpen(true)
  }

  const handleEdit = (room: Room) => {
    setEditingRoom(room)
    setFormData({
      name: room.name,
      full_description: room.full_description || "",
      price: room.price.toString(),
      capacity: room.capacity.toString(),
      size: room.size,
      bed_type: room.bed_type,
      amenities: room.amenities.join(", "),
    })
    setImageFile(null)
    if (room.image) {
      setImagePreview(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${room.image}`)
    } else {
      setImagePreview(null)
    }

    // Load existing panoramas
    setPanoramaFiles([])
    if (room.panoramas) {
      setPanoramaPreviews(room.panoramas.map(p => `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${p.panoramaUrl}`))
      setPanoramaNames(room.panoramas.map(p => p.name))
    } else {
      setPanoramaPreviews([])
      setPanoramaNames([])
    }
    setIsFormOpen(true)
  }

  const handleDelete = (id: number) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    setLoading(true)
    try {
      const response = await fetch(`/api/rooms/${deleteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setRefresh(!refresh)
        setIsDeleteDialogOpen(false)
      } else {
        alert("Failed to delete room")
      }
    } catch (error) {
      console.error("Error deleting room:", error)
      alert("Error deleting room")
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePanoramaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setPanoramaFiles(files)
      const previews: string[] = []
      const names: string[] = []

      files.forEach((file, index) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          previews.push(reader.result as string)
          if (previews.length === files.length) {
            setPanoramaPreviews(previews)
          }
        }
        reader.readAsDataURL(file)
        names.push(`View ${index + 1}`)
      })

      setPanoramaNames(names)
    }
  }

  const removePanorama = (index: number) => {
    setPanoramaFiles(prev => prev.filter((_, i) => i !== index))
    setPanoramaPreviews(prev => prev.filter((_, i) => i !== index))
    setPanoramaNames(prev => prev.filter((_, i) => i !== index))
  }

  const updatePanoramaName = (index: number, name: string) => {
    setPanoramaNames(prev => {
      const newNames = [...prev]
      newNames[index] = name
      return newNames
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("full_description", formData.full_description)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("capacity", formData.capacity)
      formDataToSend.append("size", formData.size)
      formDataToSend.append("bed_type", formData.bed_type)

      // Parse amenities
      const amenitiesArray = formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a)

      amenitiesArray.forEach((amenity, index) => {
        formDataToSend.append(`amenities[${index}]`, amenity)
      })

      if (imageFile) {
        formDataToSend.append("image", imageFile)
      }

      // Add panorama images and names
      panoramaFiles.forEach((file, index) => {
        formDataToSend.append(`panorama_images[${index}]`, file)
      })

      panoramaNames.forEach((name, index) => {
        formDataToSend.append(`panorama_names[${index}]`, name)
      })

      const url = editingRoom
        ? `/api/rooms/${editingRoom.id}`
        : "/api/rooms"
      const method = "POST"

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      })

      if (response.ok) {
        setIsFormOpen(false)
        setRefresh(!refresh)
      } else {
        const error = await response.json()
        alert(error.error || "Failed to save room")
      }
    } catch (error) {
      console.error("Error saving room:", error)
      alert("Error saving room")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
            <p className="text-muted-foreground">
              Manage your hotel rooms and suites
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-[#5C0A1E] hover:bg-[#8B1538]"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Room
          </Button>
        </div>

        <RoomsDataTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          refresh={refresh} onAdd={function (): void {
            throw new Error("Function not implemented.")
          } }        />

        {/* Add/Edit Form Dialog - CLEAN LANDSCAPE LAYOUT */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogTitle className="text-2xl font-bold">
              {editingRoom ? "Edit Room" : "Add New Room"}
            </DialogTitle>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4">
                {/* Row 1: Name and Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">
                      Room Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Deluxe Suite"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price" className="text-sm font-medium mb-1.5 block">
                      Price per Night (PHP) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Full Description */}
                <div>
                  <Label htmlFor="full_description" className="text-sm font-medium mb-1.5 block">
                    Full Description *
                  </Label>
                  <Textarea
                    id="full_description"
                    value={formData.full_description}
                    onChange={(e) =>
                      setFormData({ ...formData, full_description: e.target.value })
                    }
                    placeholder="Detailed description with all features and highlights..."
                    rows={4}
                    className="resize-none"
                    required
                  />
                </div>

                {/* Row 3: Room Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="capacity" className="text-sm font-medium mb-1.5 block">
                      Capacity *
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                      placeholder="2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="size" className="text-sm font-medium mb-1.5 block">
                      Room Size *
                    </Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                      }
                      placeholder="30 sqm"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="bed_type" className="text-sm font-medium mb-1.5 block">
                      Bed Type *
                    </Label>
                    <Input
                      id="bed_type"
                      value={formData.bed_type}
                      onChange={(e) =>
                        setFormData({ ...formData, bed_type: e.target.value })
                      }
                      placeholder="King Size"
                      required
                    />
                  </div>
                </div>

                {/* Row 4: Amenities */}
                <div>
                  <Label htmlFor="amenities" className="text-sm font-medium mb-1.5 block">
                    Amenities (comma-separated) *
                  </Label>
                  <Textarea
                    id="amenities"
                    value={formData.amenities}
                    onChange={(e) =>
                      setFormData({ ...formData, amenities: e.target.value })
                    }
                    placeholder="WiFi, AC, Mini Bar, Smart TV"
                    rows={3}
                    className="resize-none"
                    required
                  />
                </div>
              </div>

              {/* Images Section */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Main Image */}
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      Main Room Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="relative block w-full h-[180px] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized={imagePreview.startsWith('data:')}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 shadow-lg z-10"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setImageFile(null)
                              setImagePreview(null)
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50 hover:bg-gray-100 transition-colors">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="text-sm font-medium text-gray-600">Click to upload</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG (MAX. 5MB)</p>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Panorama Images */}
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">
                      360° Panorama Images
                    </Label>
                    <Input
                      id="panoramas"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePanoramaChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="panoramas"
                      className="flex flex-col items-center justify-center w-full h-[180px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">Upload panoramas</p>
                        <p className="text-xs text-gray-500 mt-1">Multiple files allowed</p>
                      </div>
                    </label>

                    {/* Panorama Previews - Right under upload */}
                    {panoramaPreviews.length > 0 && (
                      <div className="mt-3 space-y-2 max-h-[200px] overflow-y-auto">
                        {panoramaPreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 border rounded-lg bg-white"
                          >
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={preview}
                                alt={`Panorama ${index + 1}`}
                                fill
                                className="object-cover rounded"
                                unoptimized={preview.startsWith('data:')}
                              />
                            </div>
                            <Input
                              value={panoramaNames[index] || ""}
                              onChange={(e) => updatePanoramaName(index, e.target.value)}
                              placeholder={`View ${index + 1}`}
                              className="text-sm h-9 flex-1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removePanorama(index)}
                              className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-6 pt-5 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#5C0A1E] hover:bg-[#8B1538]"
                  disabled={loading}
                >
                  {loading ? "Saving..." : editingRoom ? "Update Room" : "Add Room"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the room
                and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminSidebar>
  )
}