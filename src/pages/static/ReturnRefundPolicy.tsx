import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    RefreshCcw,
    ShieldAlert,
    Video,
    PackageCheck,
    Truck,
    MapPin,
    AlertOctagon,
    Clock,
    Mail,
    Phone,
    ArrowRight,
    HelpCircle
} from 'lucide-react'

const ReturnRefundPolicy: React.FC = () => {
    useEffect(() => {
        document.title = "VivahStore | Return & Refund Policy"
    }, [])

    const lastUpdated = "October 2026"

    const policyHighlights = [
        {
            icon: <AlertOctagon className="size-5 text-[#E41F66]" />,
            title: "Strict Exchange Only",
            description: "We do not offer cash refunds even for damaged items. We exclusively offer replacement / exchange for verified issues."
        },
        {
            icon: <Video className="size-5 text-[#E41F66]" />,
            title: "24-Hour Damage Notice",
            description: "Any damaged or defective package must be reported within 24 hours of delivery with a mandatory unboxing video."
        },
        {
            icon: <Clock className="size-5 text-[#E41F66]" />,
            title: "5-Day Return Window",
            description: "Official exchange requests must be registered within 5 calendar days from the parcel delivery date."
        },
        {
            icon: <Truck className="size-5 text-[#E41F66]" />,
            title: "Client-Arranged Shipping",
            description: "Reverse pickup is not available. Customers must securely pack and ship the item back to our Jamshedpur workshop."
        }
    ]

    const exchangeSteps = [
        {
            step: "01",
            title: "Capture Unboxing Video",
            description: "Record a continuous video from opening the courier bag/box to inspecting the damaged goods. Send this evidence to vivahstore.india@gmail.com within 24 hours of delivery."
        },
        {
            step: "02",
            title: "Concierge Approval",
            description: "Our quality team will review your photos and video evidence. Once approved, we will provide you with an authorized return confirmation within 24–48 hours."
        },
        {
            step: "03",
            title: "Ship to Our Studio",
            description: "Pack the items safely in their original packaging. Clearly write your Order ID and Phone Number on the box and ship to our Sonari, Jamshedpur address."
        },
        {
            step: "04",
            title: "Quality Check & Replacement Dispatch",
            description: "Upon receiving your parcel, we verify that the product is unused, unsoiled, and in original packaging, then craft and dispatch your replacement."
        }
    ]

    const returnSections = [
        {
            id: "refund-policy",
            icon: <AlertOctagon className="size-5 text-[#E41F66]" />,
            title: "1. Strict No-Refund Policy (Exchange Only)",
            content: (
                <div className="space-y-3">
                    <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-4 text-xs md:text-sm text-stone-700 leading-relaxed">
                        <strong className="text-[#E41F66]">Important Store Rule:</strong> We do not refund money even if the item(s) is damaged or defective. We only exchange the product or replace defective components.
                    </div>
                    <p>
                        Because our products consist of personalized wedding stationery, customized badges, monogrammed invitations, and tailored event favors, each piece is uniquely printed for your specific celebration. We cannot cancel, restock, or issue cash/bank refunds once an order has been created.
                    </p>
                </div>
            )
        },
        {
            id: "eligible-items",
            icon: <ShieldAlert className="size-5 text-[#E41F66]" />,
            title: "2. Eligible Criteria for Replacement / Exchange",
            content: (
                <div className="space-y-3">
                    <p>
                        You can only return items that arrive <strong>damaged or defective</strong> due to transit or manufacturing faults:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>
                            <strong>Reporting Deadline:</strong> You must inform us of any damages or defects within <strong>24 hours of delivery</strong>.
                        </li>
                        <li>
                            <strong>Mandatory Unboxing Video:</strong> In case you receive a damaged product, please capture a full, continuous unboxing video as tangible evidence. Requests submitted without video evidence cannot be entertained.
                        </li>
                        <li>
                            <strong>5-Day Return Window:</strong> Formal return requests must be raised within <strong>5 days</strong> from the delivery timestamp.
                        </li>
                        <li>
                            <strong>Non-Returnable Items:</strong> Items damaged due to improper customer handling, moisture exposure after delivery, or typographical errors previously approved during digital proofing are strictly non-returnable.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: "exchange-options",
            icon: <RefreshCcw className="size-5 text-[#E41F66]" />,
            title: "3. Exchange Options & Value Adjustment",
            content: (
                <div className="space-y-3">
                    <p>When an exchange request is validated by our concierge team:</p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>
                            <strong>Exact Product Replacement:</strong> You will receive a brand-new replacement of the exact product you originally purchased.
                        </li>
                        <li>
                            <strong>Alternative Product of Equal Value:</strong> You may also choose another product from our catalog of the exact same value.
                        </li>
                        <li>
                            <strong>Upgrades / Higher Value Items:</strong> If the replacement product you select exceeds the monetary value of your original item, the price difference must be paid in advance before the new item is produced and dispatched.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: "return-conditions",
            icon: <PackageCheck className="size-5 text-[#E41F66]" />,
            title: "4. Return Conditions & Inspection Standards",
            content: (
                <div className="space-y-3">
                    <p>
                        Replacements are initiated after the original parcel is received and inspected at our workshop, subject to the following mandatory conditions:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1.5 marker:text-[#E41F66] font-medium text-stone-700">
                        <li>The item(s) must be completely unused, unsoiled, and unwashed.</li>
                        <li>The parcel must include all original packaging, tags, wax seals, envelopes, inserts, and protective boxes.</li>
                        <li>The returned parcel must be dispatched to our address within <strong>7 days from the return authorization date</strong>.</li>
                    </ol>
                    <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 text-xs md:text-sm text-stone-800 leading-relaxed">
                        <strong>Inspection Clause:</strong> Any returned item received by us that does not meet the conditions mentioned above will not be accepted. No replacement or reimbursement will be provided in such cases.
                    </div>
                </div>
            )
        },
        {
            id: "shipping-returns",
            icon: <Truck className="size-5 text-[#E41F66]" />,
            title: "5. Return Shipping & Reverse Pickup Policy",
            content: (
                <div className="space-y-3">
                    <p>
                        <strong>Reverse pickup is not available on any items.</strong> You will have to arrange and pay for shipping the item back to our studio using a reliable courier service with package tracking (e.g., Blue Dart, DTDC, Delhivery, Speed Post).
                    </p>
                    <p>
                        We strongly suggest obtaining a tracking number and courier receipt, as Vivah Store cannot be held responsible for return parcels lost or damaged during transit back to us.
                    </p>
                </div>
            )
        },
        {
            id: "return-address",
            icon: <MapPin className="size-5 text-[#E41F66]" />,
            title: "6. Workshop Address for Returns",
            content: (
                <div className="space-y-3">
                    <p>
                        Please securely pack the return parcel and mail it to our workshop address below. <strong>You must mention your Order ID and Contact Number clearly on the package:</strong>
                    </p>
                    <div className="bg-stone-100/80 border border-stone-200 rounded-2xl p-5 text-stone-800 text-xs sm:text-sm leading-relaxed font-mono">
                        <p className="font-bold text-stone-900 mb-1">Attention: Adarsh Sharma (Vivah Store Returns)</p>
                        <p>Auto Stand, in front of ICICI Bank, near Kagal Nagar,</p>
                        <p>Sonari East, Kagal Nagar, Sonari,</p>
                        <p>Jamshedpur, Jharkhand - 831011, India</p>
                        <p className="mt-2 text-[#E41F66] font-bold">Contact Number: +91 8507756877</p>
                    </div>
                </div>
            )
        },
        {
            id: "failed-deliveries",
            icon: <AlertOctagon className="size-5 text-[#E41F66]" />,
            title: "7. Returned by Shipping Company (Failed Deliveries)",
            content: (
                <div className="space-y-3">
                    <p>
                        In any circumstance if your parcel is returned back to us by the courier company (for reasons such as customer's phone unreachable, incomplete address, or receiver unavailable after multiple delivery attempts), <strong>you will have to pay the shipping amount again</strong> for us to reship it to you.
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
                    Confidence &amp; Assurance
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                    Return &amp; Refund Policy
                </h1>
                <p className="text-stone-500 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
                    Transparent guidelines on how we handle damaged goods, unboxing video requirements, return timelines, and product exchanges.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-stone-400">
                    <Clock className="size-3.5 text-stone-400" />
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            </div>

            {/* Quick Highlight Cards */}
            <div className="max-w-6xl mx-auto px-6 mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {policyHighlights.map((card, idx) => (
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

            {/* Step-by-Step Return Flow Visual Guide */}
            <div className="max-w-4xl mx-auto px-6 mb-16">
                <div className="bg-white border border-stone-200/70 rounded-3xl p-6 md:p-8 shadow-xs">
                    <div className="text-center mb-8">
                        <span className="text-[11px] font-bold tracking-widest text-[#E41F66] uppercase bg-[#E41F66]/5 px-3 py-1 rounded-full border border-[#E41F66]/10">
                            Process Walkthrough
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">How to Request an Exchange</h2>
                        <p className="text-stone-500 text-xs md:text-sm mt-1">Simple 4-step process to get replacement for damaged stationery items.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {exchangeSteps.map((step) => (
                            <div key={step.step} className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50/50 border border-stone-200/60">
                                <div className="text-xl font-extrabold text-[#E41F66] bg-[#E41F66]/10 rounded-xl size-11 flex items-center justify-center shrink-0">
                                    {step.step}
                                </div>
                                <div>
                                    <h3 className="font-bold text-stone-900 text-sm md:text-base mb-1">{step.title}</h3>
                                    <p className="text-stone-500 text-xs leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="max-w-4xl mx-auto px-6 space-y-8">
                {returnSections.map((section) => (
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

            {/* Concierge Card */}
            <div className="max-w-4xl mx-auto px-6 mt-16">
                <div className="bg-linear-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden text-center md:text-left">
                    <div className="absolute -right-16 -bottom-16 size-48 bg-[#E41F66]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-16 -top-16 size-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 max-w-xl">
                            <span className="text-[10px] font-bold tracking-widest text-[#E41F66] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10">
                                Concierge Support
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold">Received a Damaged Parcel?</h3>
                            <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                                Send your unboxing video and Order ID to our direct customer concierge team. We will resolve your exchange immediately.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                            <a
                                href="mailto:vivahstore.india@gmail.com"
                                className="inline-flex items-center justify-center gap-2 bg-[#E41F66] hover:bg-[#c60b4d] text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-xl shadow-lg transition-colors"
                            >
                                <Mail className="size-4" />
                                Email Support
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

export default ReturnRefundPolicy
