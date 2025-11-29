"use client"
import { useState } from "react"
import { Eye, EyeOff, Check, Sparkles } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    agreedToTerms: false,
  })

  const passwordRequirements: Record<string, { text: string; valid: boolean }> = {
    length: {
      text: "At least 8 characters",
      valid: formData.password.length >= 8,
    },
    uppercase: {
      text: "One uppercase letter",
      valid: /[A-Z]/.test(formData.password),
    },
    number: {
      text: "One number",
      valid: /[0-9]/.test(formData.password),
    },
    special: {
      text: "One special character",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!formData.agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please agree to the Terms of Service and Privacy Policy",
      })
      return
    }

    if (formData.phone.length !== 11) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Phone number must be exactly 11 digits",
      })
      return
    }

    if (formData.password !== formData.passwordConfirmation) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
      })
      return
    }

    // Check if all password requirements are met
    const allRequirementsMet = Object.values(passwordRequirements).every(req => req.valid)
    if (!allRequirementsMet) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Please meet all password requirements",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error messages from backend
        const errorMessage = data.message || "Unable to create account. Please try again."
        
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: errorMessage,
        })
        return
      }

      toast({
        variant: "success",
        title: "Account Created!",
        description: "Welcome to Vencio's Garden. Redirecting...",
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
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-amber-300 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-amber-300 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-amber-300/30 rounded-full" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Logo and Header */}
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
            Join Vencio&apos;s Garden
          </h1>
          <p className="text-amber-200/80 text-lg">Create your exclusive account</p>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-900/30">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-amber-100 mb-2 block text-sm font-medium">First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-900/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 placeholder-amber-700"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="text-amber-100 mb-2 block text-sm font-medium">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-amber-900/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 placeholder-amber-700"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

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
              <label className="text-amber-100 mb-2 block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  // Only allow digits and limit to 11 characters
                  const value = e.target.value.replace(/\D/g, "").slice(0, 11)
                  setFormData((prev) => ({ ...prev, phone: value }))
                }}
                className="w-full px-4 py-3 bg-black/50 border border-amber-900/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 placeholder-amber-700"
                placeholder="09123456789"
                maxLength={11}
                required
              />
              <p className="text-xs text-amber-300/60 mt-1">
                {formData.phone.length}/11 digits {formData.phone.length === 11 && "✓"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label className="text-amber-100 mb-2 block text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-amber-900/50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 placeholder-amber-700 pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-400 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-amber-950/30 border border-amber-900/30 p-5 rounded-lg">
              <p className="text-sm text-amber-200 mb-3 font-medium">Password Requirements:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(passwordRequirements).map(([key, req]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      req.valid ? "text-green-400" : "text-amber-300/60"
                    }`}
                  >
                    <Check className={`w-4 h-4 ${req.valid ? "opacity-100" : "opacity-40"}`} />
                    <span>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm text-amber-200/90 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="rounded border-amber-900/50 mt-0.5 bg-black/50 text-amber-600 focus:ring-amber-500"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-amber-400 hover:text-amber-300 underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-amber-400 hover:text-amber-300 underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-amber-100 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-red-700"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-amber-200/70">
              Already have an account?{" "}
              <a href="/login" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-6 text-amber-300/50 text-sm">
          <p>Vencio&apos;s Garden Hotel & Restaurant</p>
        </div>
      </div>
    </div>
  )
}