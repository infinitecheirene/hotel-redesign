"use client"
import { useState } from "react"
import { Eye, EyeOff, Sparkles } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both email and password",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        let errorTitle = "Login Failed"
        let errorDescription = data.message || "Invalid credentials. Please try again."

        if (response.status === 404) {
          errorTitle = "Account Not Found"
          errorDescription = "No account found with this email address"
        } else if (response.status === 401) {
          errorTitle = "Incorrect Password"
          errorDescription = "The password you entered is incorrect"
        }

        toast({
          variant: "destructive",
          title: errorTitle,
          description: errorDescription,
        })
        return
      }

      toast({
        variant: "success",
        title: "Welcome Back!",
        description: "Login successful. Redirecting...",
        duration: 2000,
      })

      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-amber-300 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-amber-300 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-amber-300/30 rounded-full" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center shadow-2xl">
                <svg viewBox="0 0 40 40" className="w-16 h-16 text-red-900">
                  <path
                    fill="currentColor"
                    d="M20 5c-2 3-5 5-8 6 3 1 5 3 6 6-1-3-3-5-6-6 3-1 6-3 8-6zm0 0c2 3 5 5 8 6-3 1-5 3-6 6 1-3 3-5 6-6-3-1-6-3-8-6zm-8 18c2-3 5-5 8-6-2 3-5 5-8 6zm16 0c-2-3-5-5-8-6 2 3 5 5 8 6zm-8 12c-2-3-5-5-8-6 3-1 5-3 6-6-1 3-3 5-6 6 3 1 6 3 8 6zm0 0c2-3 5-5 8-6-3-1-5-3-6-6 1 3 3 5 6 6-3 1-6 3-8 6z"
                  />
                </svg>
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-serif font-bold text-amber-100 mb-2 tracking-wide">
            Welcome Back
          </h1>
          <p className="text-amber-200/80 text-lg">Sign in to your account</p>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-900/30">
          <div className="space-y-6">
            <div>
              <label className="text-amber-100 mb-2 block text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-amber-900/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 placeholder-amber-700"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="text-amber-100 mb-2 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-900/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 placeholder-amber-700 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-400 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-amber-200/90 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded border-amber-900/50 bg-black/50 text-amber-600 focus:ring-amber-500"
                />
                <span className="group-hover:text-amber-100 transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-amber-100 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-red-700"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-amber-200/70">
              {"Don't have an account?"}{" "}
              <a
                href="/register"
                className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                Register here
              </a>
            </p>
          </div>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" />
            <span className="text-amber-300/50 text-sm">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black/50 border border-amber-900/30 rounded-lg hover:bg-black/70 hover:border-amber-800/50 transition-all text-amber-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-amber-300/50 text-sm">
          <p>{"Vencio's Garden Hotel & Restaurant"}</p>
        </div>
      </div>
    </div>
  )
}
