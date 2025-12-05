"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, loading, logout } = useAuth()
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/rooms", label: "Rooms" },
    { href: "/reservation", label: "Reservation" },
    { href: "/restaurant", label: "Dine" },
    { href: "/contact", label: "Contact" },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        variant: "success",
        title: "Logged Out",
        description: "You have been successfully logged out",
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout. Please try again.",
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900 via-red-950 to-black backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 40 40" className="w-8 h-8 text-red-900">
                <path
                  fill="currentColor"
                  d="M20 5c-2 3-5 5-8 6 3 1 5 3 6 6-1-3-3-5-6-6 3-1 6-3 8-6zm0 0c2 3 5 5 8 6-3 1-5 3-6 6 1-3 3-5 6-6-3-1-6-3-8-6zm-8 18c2-3 5-5 8-6-2 3-5 5-8 6zm16 0c-2-3-5-5-8-6 2 3 5 5 8 6zm-8 12c-2-3-5-5-8-6 3-1 5-3 6-6-1 3-3 5-6 6 3 1 6 3 8 6zm0 0c2-3 5-5 8-6-3-1-5-3-6-6 1 3 3 5 6 6-3 1-6 3-8 6z"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-amber-100 text-xl font-serif font-semibold leading-tight">
                Vencio&apos;s Garden
              </h1>
              <p className="text-amber-400 text-xs tracking-wider">Hotel & Restaurant</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide uppercase font-medium transition-colors relative ${
                    isActive
                      ? "text-amber-400"
                      : "text-amber-100 hover:text-amber-300"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400"></span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            ) : user ? (
              // Logged In User Menu
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-black/30 border border-amber-900/50 hover:bg-black/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-red-900" />
                  </div>
                  <div className="text-left">
                    <p className="text-amber-100 text-sm font-semibold">{user.first_name}</p>
                    <p className="text-amber-300/70 text-xs">{user.email}</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-sm border border-amber-900/50 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-4 border-b border-amber-900/30">
                      <p className="text-amber-100 font-semibold">{user.name}</p>
                      <p className="text-amber-300/70 text-sm">{user.email}</p>
                      <p className="text-amber-300/70 text-xs mt-1">{user.phone}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-3 py-2 text-amber-100 hover:bg-amber-900/20 rounded transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-300 hover:bg-red-900/20 rounded transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not Logged In
              <>
                <Button
                  variant="ghost"
                  className="text-amber-100 hover:text-amber-300 hover:bg-transparent"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-red-900 hover:from-amber-400 hover:to-amber-500 font-semibold shadow-lg"
                  asChild
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-amber-100 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-red-800/50">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm tracking-wide uppercase font-medium py-2 transition-colors ${
                      isActive
                        ? "text-amber-400 border-l-2 border-amber-400 pl-3"
                        : "text-amber-100 hover:text-amber-300 pl-1"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-red-800/50">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-black/30 border border-amber-900/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                          <User className="w-6 h-6 text-red-900" />
                        </div>
                        <div>
                          <p className="text-amber-100 font-semibold">{user.name}</p>
                          <p className="text-amber-300/70 text-xs">{user.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 text-amber-100 text-sm hover:text-amber-300 mb-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center gap-2 text-red-300 text-sm hover:text-red-200 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="ghost"
                      className="text-amber-100 hover:text-amber-300 hover:bg-transparent flex-1"
                      asChild
                    >
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-red-900 hover:from-amber-400 hover:to-amber-500 font-semibold flex-1"
                      asChild
                    >
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        Register
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  )
}