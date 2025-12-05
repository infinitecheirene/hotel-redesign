"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CheckCircle2, Utensils, Phone, CircleX } from "lucide-react";

export default function RestaurantPage() {
const [step, setStep] = useState(1);
const stepIcons = [Utensils, Phone]

const [pageLoading, setPageLoading] = useState(true)
const [contentReady, setContentReady] = useState(false)

    type FormDataType = {
    name: string;
    email: string;
    phone: string;
    order: string;
    address: string;
    payment: string;
    items: OrderItem[];  
    price: string,
    quantity: string;
    request: string;
    };

    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        email: "",
        phone: "",
        order: "",
        address: "",
        payment: "",
        items: [], 
        price: "",
        quantity: "",
        request: "",
    });

    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    type OrderItem = {
        name: string;
        price: string;
        quantity: string;
    };

    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { name: "", price: "", quantity: ""},
    ]);


useEffect(() => {
        const timer = setTimeout(() => {
            setContentReady(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const handleLoadingComplete = () => {
        setPageLoading(false)
    }
    
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            items: orderItems
        }))
    }, [orderItems])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Failed to send message')
            }

            setSubmitted(true)
            setOrderItems([])
            setFormData({
                name: "",
                email: "",
                phone: "",
                order: "",
                address: "",
                payment: "",
                items: [],
                price: "",
                quantity: "",
                request: "",
            })

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleItemChange = (
            index: number,
            field: keyof OrderItem,
            value: string
            ) => {
            const updated = [...orderItems];
            updated[index][field] = value;
            setOrderItems(updated);
        };


    const addItem = () => {
        setOrderItems([...orderItems, { name: "", price: "", quantity: "" }]);
    };

    const removeItem = (index: number) => {
        setOrderItems(orderItems.filter((_, i) => i !== index));
    };

    const getItemTotal = (item: OrderItem) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 0;
        return price * qty;
    };

    const overallTotal = orderItems.reduce(
    (sum, item) => sum + getItemTotal(item),
        0
    );

    const next = () => setStep((prev) => prev + 1);
    const back = () => setStep((prev) => prev - 1);

    const stepAnimation = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.35 },
    };

return (
    <div className="min-h-screen bg-[#F5E6C8]/30">
      <Header />

        {/* Hero Section */}
        <main className="pt-20">
            <section className="py-20 bg-gradient-to-br from-rose-950 via-red-900 to-rose-950 text-white text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Place Your Order</h1>
                <p className="opacity-80 max-w-xl mx-auto">
                Fast, easy & fresh — Vencio’s Garden Restaurant serves the best meals for dine-in or takeout.
                </p>
            </section>

            <section className="py-16 px-4 flex justify-center">
                <div className="w-full max-w-7xl bg-white/70 p-8 rounded-2xl shadow-xl backdrop-blur-md">

                {/* Step indicators */}
                <div className="flex justify-between mb-12">
                    {[1, 2, 3].map((n) => (
                    <div key={n} className="flex flex-col items-center">
                        <div
                        className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg transition-all ${
                            step === n
                            ? "bg-[#5C0A1E] text-white scale-110 shadow-xl"
                            : "bg-red-100 text-[#5C0A1E]"
                        }`}
                        >
                        {n}
                        </div>
                        <p className="mt-2 text-[#5C0A1E] font-medium">
                        {n === 1 && "Personal Info"}
                        {n === 2 && "Order Details"}
                        {n === 3 && "Review & Submit"}
                        </p>
                    </div>
                    ))}
                </div>

                {/* FORM CONTENT */}
                <AnimatePresence mode="wait">
                    {/* STEP 1 — PERSONAL INFO */}
                    {step === 1 && (
                    <motion.div {...stepAnimation} key="step1" className="space-y-6">
                        <h2 className="text-2xl font-bold text-[#5C0A1E]">Personal Details</h2>

                        <Label htmlFor="name" className="font-bold text-[#5C0A1E]">
                            Full Name *
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Contact Name"
                            className="h-12 border-2 border-red-200 focus:border-red-500 focus:ring-red-500 rounded-lg"
                        />

                        <Label htmlFor="name" className="font-bold text-[#5C0A1E]">
                            Email Address *
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email Address"
                            className="h-12 border-2 border-red-200 focus:border-red-500 focus:ring-red-500 rounded-lg"
                        />

                        <Label htmlFor="name" className="font-bold text-[#5C0A1E]">
                            Contact Number *
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+63 900 000 0000"
                            className="h-12 border-2 border-red-200 focus:border-red-500 focus:ring-red-500 rounded-lg"
                        />

                        <div className="flex justify-end">
                        <Button onClick={next} className="bg-[#5C0A1E] text-white px-6">
                            Next →
                        </Button>
                        </div>
                    </motion.div>
                    )}

                    {/* STEP 2 — ORDER DETAILS */}
                    {step === 2 && (
                    <motion.div {...stepAnimation} key="step2" className="space-y-6">
                        <h2 className="text-2xl font-bold text-[#5C0A1E]">Order Information</h2>
                        
                        {/* ORDER TYPE */}
                        <div className="space-y-2">
                            <Label htmlFor="order" className="font-bold text-[#5C0A1E]">
                                Order Type *
                            </Label>

                            <div className="max-w-md">
                                <Select
                                    name="order"
                                    value={formData.order}
                                    onValueChange={(value) =>
                                        handleChange({ target: { name: "order", value } } as any)
                                    }
                                >
                                    <SelectTrigger className="h-12 border-2 border-red-200 focus:border-red-500 focus:ring-red-500 rounded-lg bg-white">
                                        <SelectValue placeholder="Order Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dine">Dine In</SelectItem>
                                        <SelectItem value="takeout">Takeout</SelectItem>
                                        <SelectItem value="bunroll">Buns & Rolls</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {formData.order === "takeout" && (
                                <div className="mt-3">
                                    <Label htmlFor="address" className="font-bold text-[#5C0A1E]">
                                        Delivery Address *
                                    </Label>

                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter delivery address"
                                        className="h-12 mt-1 border-2 border-red-200 focus:border-red-500 focus:ring-red-500 rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        {/* PAYMENT METHOD */}
                        <div className="space-y-2">
                            <Label htmlFor="payment" className="font-bold text-[#5C0A1E]">
                                Payment Method *
                            </Label>

                            <div className="max-w-md">
                                <Select
                                    name="payment"
                                    value={formData.payment}
                                    onValueChange={(value) =>
                                        handleChange({ target: { name: "payment", value } } as any)
                                    }
                                >
                                    <SelectTrigger className="h-12 border-2 border-red-200 focus:border-red-500 focus:ring-red-500 rounded-lg bg-white">
                                        <SelectValue placeholder="Payment Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="gcash">GCash</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {formData.payment === "gcash" && (
                                <div className="mt-3">
                                    <Label htmlFor="gcashReceipt" className="font-bold text-[#5C0A1E]">
                                        Upload GCash Receipt *
                                    </Label>

                                    <input
                                        id="gcashReceipt"
                                        type="file"
                                        name="gcashReceipt"
                                        accept="image/*"
                                        required
                                        onChange={handleChange}
                                        className="mt-1 border-2 border-red-200 rounded-lg file:bg-red-100 file:text-[#5C0A1E] file:px-4 file:py-2 file:rounded-md file:border-0"
                                    />
                                </div>
                            )}
                        </div>

                        {/* ORDER ITEMS */}
                        <div className="space-y-4">
                            <Label className="font-bold text-[#5C0A1E]">Order Items *</Label>

                            {orderItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-red-200"
                                >
                                    {/* Item Name */}
                                    <div className="space-y-3">
                                        <Label className="font-bold text-[#5C0A1E]">Item Name *</Label>
                                        <Input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) =>
                                            handleItemChange(index, "name", e.target.value)
                                            }
                                            placeholder={`Item ${index + 1}`}
                                            className="border-2 border-red-200 focus:border-red-500 rounded-lg"
                                            required
                                        />
                                    </div>

                                    {/* Price */}
                                    <div className="space-y-3">
                                        <Label className="font-bold text-[#5C0A1E]">Price *</Label>
                                        <Input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) =>
                                            handleItemChange(index, "price", e.target.value)
                                            }
                                            placeholder="Price"
                                            className="border-2 border-red-200 focus:border-red-500 rounded-lg"
                                            required
                                        />
                                    </div>

                                    {/* Quantity */}
                                    <div className="space-y-3">
                                        <Label className="font-bold text-[#5C0A1E]">Quantity *</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                            handleItemChange(index, "quantity", e.target.value)
                                            }
                                            placeholder="Qty"
                                            className="border-2 border-red-200 focus:border-red-500 rounded-lg"
                                            required
                                        />
                                    </div>

                                    {/* Item Total */}
                                    <div className="space-y-3">
                                        <Label className="font-bold text-[#5C0A1E]">Item Total *</Label>
                                            <div className="flex items-center justify-between font-semibold text-[#5C0A1E]">
                                                ₱ {getItemTotal(item).toLocaleString()}
                                            

                                                {/* Remove Button */}
                                                {index > 0 && (
                                                    <button
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    className="text-[#5C0A1E] hover:text-red-500 mt-2 md:mt-0 flex items-center justify-center"
                                                    >
                                                    <CircleX className="w-6 h-6" />
                                                    </button>
                                                )}
                                            </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add Item */}
                            <button
                                type="button"
                                onClick={addItem}
                                className="px-4 py-2 bg-[#5C0A1E] text-white rounded-lg hover:bg-[#4b0718]"
                            >
                                + Add Item
                            </button>

                            {/* Overall Total */}
                            <div className="text-right text-2xl font-bold text-[#5C0A1E] mt-4">
                                Total: ₱ {overallTotal.toLocaleString()}
                            </div>
                        </div>


                        <div className="flex justify-between">
                        <Button onClick={back} variant="outline">
                            ← Back
                        </Button>
                        <Button onClick={next} className="bg-[#5C0A1E] text-white px-6">
                            Next →
                        </Button>
                        </div>
                    </motion.div>
                    )}

                    {/* STEP 3 — REVIEW & SUBMIT */}
                    {step === 3 && (
                    <motion.div {...stepAnimation} key="step3" className="space-y-6">
                        <h2 className="text-2xl font-bold text-[#5C0A1E]">Confirm Your Order</h2>

                        {/* PERSONAL INFORMATION */}
                        <div className="bg-red-50 p-4 rounded-xl border space-y-1">
                            <p className="font-semibold text-[#5C0A1E] text-lg">Personal Information</p>
                            <p className="text-[#5C0A1E]/80">👤 {formData.name}</p>
                            <p className="text-[#5C0A1E]/80">📧 {formData.email}</p>
                            <p className="text-[#5C0A1E]/80">📞 {formData.phone}</p>

                            {formData.order === "takeout" && (
                                <p className="text-[#5C0A1E]/80">📍 {formData.address}</p>
                            )}
                        </div>

                        {/* ORDER DETAILS */}
                        <div className="bg-red-50 p-4 rounded-xl border">
                            <p className="font-semibold text-[#5C0A1E] text-lg mb-3">Order Items</p>

                            <div className="space-y-3">
                                {orderItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center bg-white p-3 rounded-lg border"
                                        >
                                        <div>
                                            <p className="font-bold text-[#5C0A1E]">{item.name}</p>
                                            <p className="text-sm text-[#5C0A1E]/70">
                                                Qty: {item.quantity} × ₱{Number(item.price).toLocaleString()}
                                            </p>
                                        </div>

                                        <p className="font-bold text-[#5C0A1E]">
                                            ₱ {getItemTotal(item).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* OVERALL TOTAL */}
                            <div className="text-right text-2xl font-bold text-[#5C0A1E] mt-4">
                                Total: ₱ {overallTotal.toLocaleString()}
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-between">
                                <Button onClick={back} variant="outline">
                                    ← Back
                                </Button>
                                <Button className="bg-green-600 text-white px-8">Submit</Button>
                            </div>
                    </motion.div>
                    )}

                </AnimatePresence>
                </div>
            </section>
        </main>
      <Footer />
    </div>
  );
}
