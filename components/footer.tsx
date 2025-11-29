import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#5C0A1E] text-[#F5E6C8]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#F5E6C8] flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#5C0A1E]">
                  <path
                    fill="currentColor"
                    d="M20 5c-2 3-5 5-8 6 3 1 5 3 6 6-1-3-3-5-6-6 3-1 6-3 8-6zm0 0c2 3 5 5 8 6-3 1-5 3-6 6 1-3 3-5 6-6-3-1-6-3-8-6zm-8 18c2-3 5-5 8-6-2 3-5 5-8 6zm16 0c-2-3-5-5-8-6 2 3 5 5 8 6zm-8 12c-2-3-5-5-8-6 3-1 5-3 6-6-1 3-3 5-6 6 3 1 6 3 8 6zm0 0c2-3 5-5 8-6-3-1-5-3-6-6 1 3 3 5 6 6-3 1-6 3-8 6z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold">Vencio&apos;s Garden</h3>
                <p className="text-[#D4AF37] text-xs tracking-wider">Hotel & Restaurant</p>
              </div>
            </div>
            <p className="text-[#F5E6C8]/80 text-sm leading-relaxed">
              Experience luxury and tranquility at our garden retreat. Where every stay becomes a cherished memory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {["Home", "About", "Rooms", "Reservation", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="text-[#F5E6C8]/80 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-[#F5E6C8]/80 text-sm">
                  123 Garden Boulevard
                  <br />
                  Paradise City, PC 12345
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <p className="text-[#F5E6C8]/80 text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <p className="text-[#F5E6C8]/80 text-sm">info@venciosgarden.com</p>
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#8B1538] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#5C0A1E] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-[#F5E6C8]/80 text-sm mb-3">Subscribe to our newsletter</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-[#8B1538] border border-[#D4AF37]/30 rounded text-sm placeholder:text-[#F5E6C8]/50 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#D4AF37] text-[#5C0A1E] rounded font-semibold text-sm hover:bg-[#F5E6C8] transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#8B1538] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#F5E6C8]/60 text-sm">
            © 2025 Vencio&apos;s Garden Hotel & Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[#F5E6C8]/60 hover:text-[#D4AF37] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#F5E6C8]/60 hover:text-[#D4AF37] text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
