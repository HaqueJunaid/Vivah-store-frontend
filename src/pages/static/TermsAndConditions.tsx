import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    FileCheck,
    CheckCircle2,
    Palette,
    AlertTriangle,
    CreditCard,
    RotateCcw,
    Scale,
    Shield,
    Clock,
    Mail,
    ArrowRight
} from 'lucide-react'

const TermsAndConditions: React.FC = () => {
    useEffect(() => {
        document.title = "VivahStore | Terms & Condition"
    }, [])

    const lastUpdated = "October 2026"

    const highlightCards = [
        {
            icon: <Palette className="size-5 text-[#E41F66]" />,
            title: "Artisanal Variations",
            description: "Handcrafted stationery may carry natural slight variations in cardstock texture and foil sheen from screen previews."
        },
        {
            icon: <CheckCircle2 className="size-5 text-[#E41F66]" />,
            title: "Proofing Approval",
            description: "Clients are responsible for thoroughly proofreading names, dates, and venue text before signing off on final print runs."
        },
        {
            icon: <RotateCcw className="size-5 text-[#E41F66]" />,
            title: "Exchange Only",
            description: "We maintain a strict exchange-only policy for damaged items. Monetary refunds are not offered on custom goods."
        },
        {
            icon: <Scale className="size-5 text-[#E41F66]" />,
            title: "Governing Law",
            description: "All transactions and disputes are governed under the laws of India and subject to Jamshedpur, Jharkhand jurisdiction."
        }
    ]

    const termsSections = [
        {
            id: "acceptance",
            icon: <FileCheck className="size-5 text-[#E41F66]" />,
            title: "1. Agreement to Terms",
            content: (
                <div className="space-y-3">
                    <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you," "customer," or "patron"), and <strong>Vivah Store</strong> ("we," "us," or "our"), operated by Adarsh Sharma, located at Auto Stand, in front of ICICI Bank, near Kagal Nagar, Sonari East, Jamshedpur, Jharkhand - 831011, India.
                    </p>
                    <p>
                        By accessing our website (<strong>vivahstore.com</strong>), registering an account, or purchasing any of our bespoke wedding stationery, personalized badges, luxury invitations, or curated gifts, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms and Conditions.
                    </p>
                    <p>
                        If you do not agree with all of these Terms and Conditions, you are expressly prohibited from using the site and must discontinue use immediately.
                    </p>
                </div>
            )
        },
        {
            id: "bespoke-craft",
            icon: <Palette className="size-5 text-[#E41F66]" />,
            title: "2. Bespoke Stationery & Artisanal Craft",
            content: (
                <div className="space-y-3">
                    <p>
                        Vivah Store specializes in personalized, artisanal wedding stationery, handcrafted wax seals, foil-stamped cards, and custom event favors. Because our items are made-to-order and handcrafted:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>
                            <strong>Color Display Disclaimer:</strong> Computer monitors, tablets, and smartphone screens display colors in RGB light, whereas physical items are printed using commercial CMYK inks, foil stamping, and specialty dyes. As such, slight variations in color tone, saturation, and metallic reflection between digital mockups and finished physical cards are normal and expected.
                        </li>
                        <li>
                            <strong>Handmade Texture:</strong> Hand-deckled edges, handmade cotton cardstocks, wax seal impressions, and ribbon ties possess individual artistic nuances that enhance their bespoke authenticity.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: "proof-approval",
            icon: <CheckCircle2 className="size-5 text-[#E41F66]" />,
            title: "3. Digital Proofing & Client Approval Responsibility",
            content: (
                <div className="space-y-3">
                    <p>
                        Before custom stationery enters production, a digital draft or proof is coordinated with the client via email or WhatsApp:
                    </p>
                    <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs md:text-sm text-stone-800 leading-relaxed">
                        <strong className="text-amber-800">Client Proofreading Requirement:</strong> It is the client's sole responsibility to inspect all spellings, couple names, parent names, auspicious timings, wedding dates, RSVP contacts, itinerary sequences, and venue addresses in the provided digital proof.
                    </div>
                    <p>
                        Once you grant written or digital approval to proceed with production, Vivah Store cannot be held liable for typographical errors or omissions that were approved by you. Any reprints required due to customer proofing oversight will be billed at regular production cost.
                    </p>
                </div>
            )
        },
        {
            id: "orders-payment",
            icon: <CreditCard className="size-5 text-[#E41F66]" />,
            title: "4. Pricing, Orders & Payment Processing",
            content: (
                <div className="space-y-3">
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>
                            <strong>Currency &amp; Taxes:</strong> All prices on our store are listed in Indian National Rupees (₹ / INR). Delivery charges are calculated based on weight at checkout.
                        </li>
                        <li>
                            <strong>Advance Payment:</strong> Because all bespoke wedding products are personalized and cannot be resold, full payment is required prior to order processing and manufacturing.
                        </li>
                        <li>
                            <strong>Payment Methods:</strong> We accept all major Indian UPI platforms (Google Pay, PhonePe, Paytm), Net Banking, and major Debit/Credit Cards processed securely via verified payment gateways.
                        </li>
                        <li>
                            <strong>Order Confirmation:</strong> An automated confirmation email with your unique Order ID is generated immediately upon successful payment authorization.
                        </li>
                        <li>
                            <strong>GST Invoicing:</strong> Tax invoices are automatically emailed upon dispatch. If you require your corporate GSTIN included, please inform our concierge before dispatch.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: "shipping-terms",
            icon: <Clock className="size-5 text-[#E41F66]" />,
            title: "5. Production Timelines & Delivery Terms",
            content: (
                <div className="space-y-3">
                    <p>
                        Standard production and dispatch takes up to <strong>15 business days</strong>, with final delivery requiring approximately <strong>15-20 business days</strong> from order confirmation, depending on location and customization complexity.
                    </p>
                    <p>
                        While we partner with premier express courier networks, Vivah Store is not responsible for transit delays caused by courier logistics disruptions, extreme weather conditions, festive peak volumes, or force majeure events outside our reasonable control.
                    </p>
                    <p>
                        If an order is returned to us due to an incorrect address provided by the customer or unanswered phone calls during delivery attempts, the customer is liable for paying re-shipping charges before the package is re-dispatched.
                    </p>
                </div>
            )
        },
        {
            id: "returns-policy-summary",
            icon: <RotateCcw className="size-5 text-[#E41F66]" />,
            title: "6. Exchange Policy & No-Refund Rule",
            content: (
                <div className="space-y-3">
                    <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-4 text-xs md:text-sm text-stone-700 leading-relaxed">
                        <strong className="text-[#E41F66]">Strict Exchange Policy:</strong> As our products are customized and made-to-order, we do not provide cash or monetary refunds under any circumstances, even if an item arrives damaged or defective. We strictly offer replacement or exchange of the damaged/defective product.
                    </div>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>You must report any manufacturing defects or transit damages within <strong>24 hours of delivery</strong> accompanied by an unboxing video.</li>
                        <li>Return requests are accepted up to <strong>5 days</strong> from delivery date.</li>
                        <li>Reverse pickup is not available. The customer must ship the parcel back to our Jamshedpur workshop at their expense.</li>
                        <li>Items must be unused, unsoiled, and in original packaging to qualify for replacement dispatch.</li>
                    </ul>
                </div>
            )
        },
        {
            id: "intellectual-property",
            icon: <Shield className="size-5 text-[#E41F66]" />,
            title: "7. Intellectual Property & Design Rights",
            content: (
                <div className="space-y-3">
                    <p>
                        All content, illustrations, invitation templates, badge designs, monograms, graphic assets, typography styles, website code, and photographs displayed on Vivah Store are the proprietary intellectual property of Vivah Store and Adarsh Sharma, protected by copyright and intellectual property laws of India.
                    </p>
                    <p>
                        Patrons are granted a limited, personal, non-exclusive license to use the physical printed invitations and stationery for their private celebrations. You may not reproduce, resell, republish, distribute, or commercially exploit any of our proprietary design templates without prior written authorization.
                    </p>
                </div>
            )
        },
        {
            id: "limitation-liability",
            icon: <AlertTriangle className="size-5 text-[#E41F66]" />,
            title: "8. Limitation of Liability & Indemnification",
            content: (
                <div className="space-y-3">
                    <p>
                        To the maximum extent permitted by Indian law, Vivah Store, its founder, staff, or contractors shall not be liable for any indirect, consequential, incidental, or special damages (including lost event profits, rescheduled venue expenses, or emotional distress) arising out of the use or inability to use our products or services.
                    </p>
                    <p>
                        In all circumstances, our maximum aggregate liability for any claim arising out of an order placed on our platform shall be strictly limited to the total monetary amount actually paid by you for the specific item in dispute.
                    </p>
                </div>
            )
        },
        {
            id: "governing-law",
            icon: <Scale className="size-5 text-[#E41F66]" />,
            title: "9. Governing Law & Dispute Resolution",
            content: (
                <div className="space-y-3">
                    <p>
                        These Terms and Conditions and any separate agreements whereby we provide you goods or services shall be governed by and construed in accordance with the substantive laws of the Republic of India.
                    </p>
                    <p>
                        Any legal action, suit, or judicial proceeding arising out of or related to these terms shall be instituted exclusively in the competent civil courts situated within the jurisdiction of <strong>Jamshedpur, Jharkhand, India</strong>.
                    </p>
                </div>
            )
        },
        {
            id: "contact-queries",
            icon: <Mail className="size-5 text-[#E41F66]" />,
            title: "10. Contact Information & Inquiries",
            content: (
                <div className="space-y-2">
                    <p>For questions or formal inquiries regarding these Terms &amp; Conditions, please reach out to us:</p>
                    <p className="font-semibold text-stone-800">
                        Vivah Store (Attn: Adarsh Sharma)<br />
                        Auto Stand, in front of ICICI Bank, near Kagal Nagar,<br />
                        Sonari East, Kagal Nagar, Sonari, Jamshedpur, Jharkhand - 831011<br />
                        Email: <a href="mailto:vivahstore.india@gmail.com" className="text-[#E41F66] hover:underline">vivahstore.india@gmail.com</a><br />
                        Phone: <a href="tel:+918507756877" className="text-[#E41F66] hover:underline">+91 8507756877</a>
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
                    Legal &amp; Operating Policies
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                    Terms &amp; Condition
                </h1>
                <p className="text-stone-500 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
                    Please review our guidelines regarding bespoke stationery orders, proofing approvals, artisanal crafting, and customer responsibilities.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-stone-400">
                    <Clock className="size-3.5 text-stone-400" />
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            </div>

            {/* Quick Highlight Cards */}
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

            {/* Main Content Sections */}
            <div className="max-w-4xl mx-auto px-6 space-y-8">
                {termsSections.map((section) => (
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

            {/* Concierge Help Callout */}
            <div className="max-w-4xl mx-auto px-6 mt-16">
                <div className="bg-linear-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden text-center md:text-left">
                    <div className="absolute -right-16 -bottom-16 size-48 bg-[#E41F66]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-16 -top-16 size-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 max-w-xl">
                            <span className="text-[10px] font-bold tracking-widest text-[#E41F66] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10">
                                Vivah Store Concierge
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold">Need Clarification on Our Terms?</h3>
                            <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                                Our bespoke team is always available to discuss custom specifications, bulk bridal stationery timelines, and terms.
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
                            <Link
                                to="/faqs"
                                className="inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-xl border border-stone-700 transition-colors"
                            >
                                Browse FAQs
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions
