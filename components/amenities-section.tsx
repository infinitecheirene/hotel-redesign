import { Utensils, Waves, Dumbbell, Leaf, Wine, Car, Wifi, Shield } from "lucide-react"

const amenities = [
  { icon: Utensils, title: "Fine Dining", description: "Exquisite culinary experiences" },
  { icon: Waves, title: "Swimming Pool", description: "Infinity pool with garden views" },
  { icon: Dumbbell, title: "Fitness Center", description: "State-of-the-art equipment" },
  { icon: Leaf, title: "Spa & Wellness", description: "Relaxing treatments & massages" },
  { icon: Wine, title: "Bar & Lounge", description: "Premium beverages & cocktails" },
  { icon: Car, title: "Valet Parking", description: "Complimentary parking service" },
  { icon: Wifi, title: "High-Speed WiFi", description: "Free internet throughout" },
  { icon: Shield, title: "24/7 Security", description: "Safe and secure premises" },
]

export function AmenitiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-3">Our Services</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#5C0A1E] mb-4">Hotel Amenities</h2>
          <p className="text-[#5C0A1E]/70 max-w-2xl mx-auto">
            Enjoy world-class facilities and services designed to make your stay extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="group p-6 bg-[#F5E6C8]/30 rounded-lg hover:bg-[#5C0A1E] transition-colors duration-300 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#5C0A1E] group-hover:bg-[#D4AF37] flex items-center justify-center transition-colors">
                <amenity.icon className="w-7 h-7 text-[#D4AF37] group-hover:text-[#5C0A1E]" />
              </div>
              <h3 className="font-serif font-semibold text-[#5C0A1E] group-hover:text-[#F5E6C8] mb-2 transition-colors">
                {amenity.title}
              </h3>
              <p className="text-sm text-[#5C0A1E]/70 group-hover:text-[#F5E6C8]/80 transition-colors">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
