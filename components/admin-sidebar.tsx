"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { 
  Home, 
  Bed, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  children: React.ReactNode
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Bed, label: "Rooms", href: "/admin/rooms" },
    { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
    { icon: Users, label: "Guests", href: "/admin/guests" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      if (response.ok) {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#5C0A1E] z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image 
              src="https://i.imgur.com/YOUR_LOGO.png" 
              alt="Vencio's Garden" 
              fill
              className="object-contain"
            />
          </div>
          <div className="text-white">
            <h2 className="font-serif text-lg">Vencios Garden</h2>
            <p className="text-xs text-gray-300">Admin Panel</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white hover:bg-[#8B1538]"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#5C0A1E] to-[#8B1538] 
          transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="h-24 flex flex-col items-center justify-center border-b border-white/10 pt-4">
          <div className="relative h-14 w-14 mb-2">
            <Image 
              src="https://i.imgur.com/YOUR_LOGO.png" 
              alt="Vencio's Garden" 
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-white font-serif text-xl">Vencios Garden</h1>
          <p className="text-gray-300 text-xs">Hotel & Restaurant</p>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href)
                  setIsSidebarOpen(false)
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-white text-[#5C0A1E] shadow-lg' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  )
}