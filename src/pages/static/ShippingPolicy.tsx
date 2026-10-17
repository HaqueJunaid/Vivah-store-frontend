import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Truck,
    Package,
    Clock,
    Search,
    Gift,
    ShieldAlert,
    Layers,
    MapPin,
    AlertCircle,
    Mail,
    Phone,
    ArrowRight
} from 'lucide-react'

const ShippingPolicy: React.FC = () => {
    useEffect(() => {
        document.title = "VivahStore | Shipping Policy"
    }, [])

    const lastUpdated = "October 2026"

    const highlightCards = [
        {
            icon: <Clock className="size-5 text-[#E41F66]" />,
            title: "15-Day Dispatch",
            description: "Customized wedding stationery and handcrafted favors are crafted and dispatched within 15 business days."
        },
        {
            icon: <Truck className="size-5 text-[#E41F66]" />,
            title: "15-20 Days Delivery",
            description: "Total door-to-door delivery usually takes 15 to 20 business days depending on destination pincode and complexity."
        },
        {
            icon: <Search className="size-5 text-[#E41F66]" />,
            title: "Courier Tracking ID",
            description: "A tracking number with carrier link is dispatched to your email the instant your parcel is handed to couriers."
        },
        {
            icon: <Gift className="size-5 text-[#E41F66]" />,
            title: "Luxury Gift Wrap",
            description: "Exquisite celebratory gift packaging is available for any item for a nominal add-on of ₹75 per piece."
        }
    ]

    const timelineMilestones = [
        {
            badge: "Phase 1",
            title: "Order Placement & Confirmation",
            time: "Day 0",
            desc: "Order is registered and an immediate confirmation email with your Order ID is sent."
        },
        {
            badge: "Phase 2",
            title: "Design Proofing & Handcrafted Production",
            time: "Days 1 – 14",
            desc: "Artisanal printing, foil embossing, wax sealing, personalized badge pressing, and strict quality control."
        },
        {
            badge: "Phase 3",
            title: "Studio Dispatch & Tracking Notification",
            time: "By Day 15",
            desc: "Dispatched via premier express couriers (Blue Dart, Delhivery, DTDC) with email tracking details."
        },
        {
            badge: "Phase 4",
            title: "Safe Doorstep Delivery",
            time: "Days 15 – 20",
            desc: "Safely delivered to your doorstep across India. Please remember to record an unboxing video."
        }
    ]

    const shippingSections = [
        {
            id: "processing-time",
            icon: <Clock className="size-5 text-[#E41F66]" />,
            title: "1. Artisanal Processing & Dispatch Timelines",
            content: (
                <div className="space-y-3">
                    <p>
                        Unlike mass-manufactured commercial goods, each wedding invitation suite, custom badge, and favor hamper at Vivah Store is tailored specifically to your love story and event specifications.
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>
                            <strong>Standard Dispatch Window:</strong> We normally ship all orders within <strong>15 business days</strong> from order confirmation and proof approval.
                        </li>
                        <li>
                            <strong>Bespoke Customization Delays:</strong> There may be minor delays in shipment depending upon high-tier customizations (e.g. handmade wax seal stamping, specialized foil dies, custom calligraphy) or during peak Indian wedding season.
                        </li>
                        <li>
                            <strong>Estimated Delivery Time:</strong> It usually takes <strong>15–20 business days</strong> for your order to reach your doorstep. Delivery times vary according to destination city, state, and courier accessibility.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: "shipping-charges",
            icon: <Truck className="size-5 text-[#E41F66]" />,
            title: "2. Shipping Costs & Weight Calculation",
            content: (
                <div className="space-y-3">
                    <p>
                        Delivery charges depend directly on the total weight and dimensions of your parcel and your destination postal code. The exact shipping fee is transparently calculated and displayed at checkout before you finalize payment.
                    </p>
                    <p>
                        There are never any hidden handling fees or surprise tariffs collected upon delivery.
                    </p>
                </div>
            )
        },
        {
            id: "order-tracking",
            icon: <Search className="size-5 text-[#E41F66]" />,
            title: "3. Real-Time Order Tracking",
            content: (
                <div className="space-y-3">
                    <p>
                        An email containing your unique <strong>Tracking ID</strong> and service provider details is sent to you immediately after your parcel is dispatched from our Jamshedpur workshop.
                    </p>
                    <p>
                        If you cannot find your tracking email, or have any queries regarding your shipment's journey, simply reach out to our concierge at <a href="mailto:vivahstore.india@gmail.com" className="text-[#E41F66] font-semibold hover:underline">vivahstore.india@gmail.com</a> or phone <a href="tel:+918507756877" className="text-[#E41F66] font-semibold hover:underline">+91 8507756877</a>, and our team will provide instant updates.
                    </p>
                </div>
            )
        },
        {
            id: "multi-parcel",
            icon: <Layers className="size-5 text-[#E41F66]" />,
            title: "4. Multi-Parcel & Split Shipments",
            content: (
                <div className="space-y-3">
                    <p>
                        If your order includes bulk quantities (e.g., hundreds of wedding favors, large welcome signage, or multi-item bridal hampers), it may be packed and shipped in <strong>more than one parcel</strong> to ensure structural safety during transport.
                    </p>
                    <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 text-xs md:text-sm text-stone-800 leading-relaxed">
                        <strong>Missing Items / Split Parcel Notice:</strong> In multi-parcel cases, you will receive one dispatch email per individual parcel. If you have only received one dispatch notification and find items missing from your order, please notify our team within <strong>7 days</strong> so we can investigate.
                    </div>
                </div>
            )
        },
        {
            id: "gift-wrapping",
            icon: <Gift className="size-5 text-[#E41F66]" />,
            title: "5. Bespoke Gift-Wrapping Service",
            content: (
                <div className="space-y-3">
                    <p>
                        We offer our signature luxury gift-wrapping option for all products across our store. Each item is delicately wrapped in artisanal handmade wrapping paper, finished with elegant satin ribbon and a personalized calligraphy tag.
                    </p>
                    <p>
                        This service is available for a modest add-on fee of <strong>₹75 per product</strong>, selectable on product pages and at checkout.
                    </p>
                </div>
            )
        },
        {
            id: "order-updates",
            icon: <Package className="size-5 text-[#E41F66]" />,
            title: "6. Modifying Orders or Shipping Address",
            content: (
                <div className="space-y-3">
                    <p>
                        Because we dispatch your bespoke items as rapidly as possible, we may not be able to modify your order details once production has commenced.
                    </p>
                    <p>
                        If your order has not yet been processed or dispatched, please contact us immediately at <a href="mailto:vivahstore.india@gmail.com" className="text-[#E41F66] font-semibold hover:underline">vivahstore.india@gmail.com</a> or call <a href="tel:+918507756877" className="text-[#E41F66] font-semibold hover:underline">+91 8507756877</a> with your Order ID and updated details. Please note that modifications cannot be guaranteed once materials are printed or courier pickup is scheduled.
                    </p>
                </div>
            )
        },
        {
            id: "transit-damage",
            icon: <ShieldAlert className="size-5 text-[#E41F66]" />,
            title: "7. Damaged Shipments & Unboxing Video Protocol",
            content: (
                <div className="space-y-3">
                    <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-4 text-xs md:text-sm text-stone-700 leading-relaxed">
                        <strong className="text-[#E41F66]">Unboxing Video Evidence is Mandatory:</strong> If your parcel or products arrive damaged, you must capture a continuous, uninterrupted 360° unboxing video showing the shipping label, packaging condition, and the damage in detail.
                    </div>
                    <p>
                        Submit the video along with your Order ID to <a href="mailto:vivahstore.india@gmail.com" className="text-[#E41F66] font-semibold hover:underline">vivahstore.india@gmail.com</a> within <strong>24 hours of delivery</strong> so our team can coordinate a prompt product exchange.
                    </p>
                </div>
            )
        },
        {
            id: "failed-delivery-charges",
            icon: <AlertCircle className="size-5 text-[#E41F66]" />,
            title: "8. Failed Delivery Attempts & Re-shipping Fees",
            content: (
                <div className="space-y-3">
                    <p>
                        Please provide a full, accurate delivery address with nearby landmarks and a reachable mobile phone number.
                    </p>
                    <p>
                        If a parcel is returned to our studio by the courier service due to reasons such as:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 marker:text-[#E41F66]">
                        <li>Customer's phone not reachable / unanswered delivery OTP calls</li>
                        <li>Incorrect or incomplete recipient address provided</li>
                        <li>Customer unavailable or refusing delivery</li>
                    </ul>
                    <p>
                        <strong>You will be required to pay the re-shipping courier charges</strong> before we can dispatch the package again.
                    </p>
                </div>
            )
        }
    ]

    return (
        <div className="bg-stone-50/50 min-h-screen py-12 pb-20 w-full font-sans tracking-wide">
            {/* Header Banner */}
            <div className="max-w-4xl mx-auto text-center px-6 mb-12">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#E41F66] bg-[#E41F66]/5 px-4 py-1.5 rounded-full uppercase inline-block mb-3 border border-[#E41F66]/10">
                    Artisanal Fulfillment
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                    Shipping Policy
                </h1>
                <p className="text-stone-500 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
                    Everything you need to know about our handcrafted production times, courier tracking, packaging, and pan-India doorstep delivery.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-stone-400">
                    <Clock className="size-3.5 text-stone-400" />
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            </div>

            {/* Quick Highlights */}
            <div className="max-w-6xl mx-auto px-6 mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {highlightCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-white/80 backdrop-blur-xs border border-stone-200/70 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow"
                        >
                            <div className="p-2.5 rounded-xl bg-rose-50 w-fit mb-3">
                                {card.icon}
                            </div>
                            <h3 className="font-bold text-stone-900 text-sm mb-1.5">
                                {card.title}
                            </h3>
                            <p className="text-stone-500 text-xs leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline Breakdown Card */}
            <div className="max-w-4xl mx-auto px-6 mb-16">
                <div className="bg-white border border-stone-200/70 rounded-3xl p-6 md:p-8 shadow-xs">
                    <div className="text-center mb-8">
                        <span className="text-[11px] font-bold tracking-widest text-[#E41F66] uppercase bg-[#E41F66]/5 px-3 py-1 rounded-full border border-[#E41F66]/10">
                            Fulfillment Journey
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">From Studio to Your Doorstep</h2>
                        <p className="text-stone-500 text-xs md:text-sm mt-1">Our average artisanal lifecycle for bespoke stationery.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {timelineMilestones.map((milestone, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-stone-50/60 border border-stone-200/60 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E41F66] bg-[#E41F66]/10 px-2 py-0.5 rounded-md">
                                            {milestone.badge}
                                        </span>
                                        <span className="text-xs font-semibold text-stone-400">
                                            {milestone.time}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-stone-800 text-sm mb-1 leading-snug">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-stone-500 text-xs leading-relaxed">
                                        {milestone.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Policy Sections */}
            <div className="max-w-4xl mx-auto px-6 space-y-8">
                {shippingSections.map((section) => (
                    <div
                        key={section.id}
                        id={section.id}
                        className="bg-white border border-stone-200/70 rounded-3xl p-6 md:p-8 shadow-xs hover:border-[#E41F66]/30 transition-colors"
                    >
                        <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-stone-100">
                            <div className="p-2.5 rounded-xl bg-[#E41F66]/10 shrink-0">
                                {section.icon}
                            </div>
                            <h2 className="text-lg md:text-xl font-bold text-stone-900">
                                {section.title}
                            </h2>
                        </div>
                        <div className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                            {section.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tracking Support Concierge Card */}
            <div className="max-w-4xl mx-auto px-6 mt-16">
                <div className="bg-linear-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden text-center md:text-left">
                    <div className="absolute -right-16 -bottom-16 size-48 bg-[#E41F66]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-16 -top-16 size-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 max-w-xl">
                            <span className="text-[10px] font-bold tracking-widest text-[#E41F66] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10">
                                Courier Support
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold">Need Live Shipment Assistance?</h3>
                            <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                                Our logistics coordinators can track your wedding stationery package, provide courier phone numbers, or resolve delivery queries.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                            <a
                                href="mailto:vivahstore.india@gmail.com"
                                className="inline-flex items-center justify-center gap-2 bg-[#E41F66] hover:bg-[#c60b4d] text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-xl shadow-lg transition-colors"
                            >
                                <Mail className="size-4" />
                                Email Tracking Desk
                            </a>
                            <a
                                href="tel:+918507756877"
                                className="inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-xl border border-stone-700 transition-colors"
                            >
                                <Phone className="size-4" />
                                +91 8507756877
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingPolicy
