import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    ShieldCheck,
    Lock,
    Eye,
    Database,
    Share2,
    Cookie,
    UserCheck,
    Mail,
    Phone,
    Clock,
    FileText,
    ArrowRight
} from 'lucide-react'

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        document.title = "VivahStore | Privacy Policy"
    }, [])

    const lastUpdated = "October 2026"

    const highlightCards = [
        {
            icon: <Lock className="size-5 text-[#E41F66]" />,
            title: "Bank-Grade Encryption",
            description: "We do not store credit/debit card numbers or UPI PINs. Transactions are routed via PCI-DSS compliant gateways."
        },
        {
            icon: <Share2 className="size-5 text-[#E41F66]" />,
            title: "No Selling of Data",
            description: "We will never sell, rent, or trade your personal information or wedding photos to third-party advertisers."
        },
        {
            icon: <Database className="size-5 text-[#E41F66]" />,
            title: "Secure Custom Files",
            description: "Custom wedding invites, names, and photos are strictly used for your order production and safely safeguarded."
        },
        {
            icon: <UserCheck className="size-5 text-[#E41F66]" />,
            title: "Your Rights & Privacy",
            description: "You have full control to request review, correction, or deletion of your stored profile data at any time."
        }
    ]

    const sections = [
        {
            id: "introduction",
            icon: <ShieldCheck className="size-5 text-[#E41F66]" />,
            title: "1. Introduction & Overview",
            content: (
                <div className="space-y-3">
                    <p>
                        Welcome to <strong>Vivah Store</strong> ("we," "our," or "us"), founded and managed by Adarsh Sharma, headquartered in Jamshedpur, Jharkhand, India. We specialize in bespoke wedding stationery, personalized badges, luxury invitations, and curated gifts.
                    </p>
                    <p>
                        We respect your privacy and are committed to protecting the personal information you share with us while browsing our website (<strong>vivahstore.com</strong>) or utilizing our design and concierge services. This Privacy Policy outlines what information we collect, how it is handled, and your privacy rights.
                    </p>
                    <p>
                        By visiting our website or ordering our handcrafted products, you acknowledge and agree to the practices outlined in this policy.
                    </p>
                </div>
            )
        },
        {
            id: "data-collection",
            icon: <Eye className="size-5 text-[#E41F66]" />,
            title: "2. Information We Collect",
            content: (
                <div className="space-y-3">
                    <p>To provide high-quality personalized wedding stationery and seamless delivery, we collect the following categories of data:</p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>
                            <strong>Personal Identifiers:</strong> Your full name, email address, mobile phone number, WhatsApp contact, billing address, and recipient shipping address.
                        </li>
                        <li>
                            <strong>Bespoke Customization Details:</strong> Names of the couple, wedding dates, venue locations, custom monograms, family hierarchy for invitation suites, guest name lists for badges, and any high-resolution photos you upload for personalized items.
                        </li>
                        <li>
                            <strong>Account Information:</strong> If you register an account, we store your username, encrypted authentication credentials, order history, and saved wishlist items.
                        </li>
                        <li>
                            <strong>Payment & Billing Data:</strong> Transaction IDs, payment method choice (UPI, Net Banking, Card), and billing address. We <em>do not</em> store or have access to your full credit card numbers, CVVs, or bank passwords.
                        </li>
                        <li>
                            <strong>Technical & Device Data:</strong> IP address, browser type, operating system, pages viewed, and referral URLs collected via session logs and essential cookies to optimize user experience.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: "data-usage",
            icon: <Database className="size-5 text-[#E41F66]" />,
            title: "3. How We Use Your Information",
            content: (
                <div className="space-y-3">
                    <p>We use your information exclusively for legitimate artisanal, operational, and customer support purposes:</p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>
                            <strong>Order Creation & Production:</strong> Generating digital invitation proofs, printing wedding cards, typesetting personalized text, and packaging bespoke favors.
                        </li>
                        <li>
                            <strong>Order Fulfillment & Logistics:</strong> Communicating parcel status, tracking numbers, and sharing recipient details with our trusted courier partners for safe doorstep delivery.
                        </li>
                        <li>
                            <strong>Customer Concierge Support:</strong> Responding promptly to your design revisions, billing questions, or delivery queries via email, phone, or WhatsApp.
                        </li>
                        <li>
                            <strong>Invoicing & Compliance:</strong> Issuing tax-compliant invoices, maintaining accounting records, and honoring GST requests.
                        </li>
                        <li>
                            <strong>Curated Marketing (Opt-in only):</strong> If you subscribe to our newsletter, we periodically send product launches, wedding styling inspiration, and seasonal promotional discounts. You can unsubscribe anytime with one click.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: "payment-security",
            icon: <Lock className="size-5 text-[#E41F66]" />,
            title: "4. Payment Security & Financial Data",
            content: (
                <div className="space-y-3">
                    <p>
                        Your financial security is paramount. All online payments processed on Vivah Store are facilitated through RBI-authorized, industry-standard encrypted payment gateways (including Cashfree Payments, Google Pay, PhonePe, Paytm, and certified card networks).
                    </p>
                    <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-4 text-xs md:text-sm text-stone-700 leading-relaxed">
                        <strong className="text-[#E41F66]">Important Notice:</strong> Vivah Store servers never intercept, view, or retain your private banking passwords, UPI MPINs, or credit/debit card numbers. All payment transmissions utilize TLS/SSL 256-bit encryption.
                    </div>
                </div>
            )
        },
        {
            id: "data-sharing",
            icon: <Share2 className="size-5 text-[#E41F66]" />,
            title: "5. Information Sharing with Third Parties",
            content: (
                <div className="space-y-3">
                    <p>
                        We do not sell, rent, or trade your personal information to third parties. We share data only with verified partners who assist in essential store operations:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li>
                            <strong>Logistics Partners:</strong> Certified express couriers (such as Blue Dart, Delhivery, DTDC, India Post) to deliver physical packages to your destination.
                        </li>
                        <li>
                            <strong>Payment Processors:</strong> Authorized financial gateways to verify and settle payment transactions securely.
                        </li>
                        <li>
                            <strong>Cloud & Communications Infrastructure:</strong> Encrypted hosting providers and transactional email/SMS services for automated order confirmations and tracking alerts.
                        </li>
                        <li>
                            <strong>Legal Compliance:</strong> If required by Indian law, judicial court orders, or governmental law enforcement agencies to protect our rights and comply with legal processes.
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: "cookies",
            icon: <Cookie className="size-5 text-[#E41F66]" />,
            title: "6. Cookies & Tracking Technologies",
            content: (
                <div className="space-y-3">
                    <p>
                        Vivah Store uses essential cookies and local storage tokens to keep you logged in, preserve items in your shopping bag, save your wishlist preferences, and analyze aggregate visitor trends.
                    </p>
                    <p>
                        You can adjust your web browser settings to reject cookies or notify you when cookies are placed. However, disabling essential cookies may impact specific website features such as cart hydration and checkout workflows.
                    </p>
                </div>
            )
        },
        {
            id: "data-retention",
            icon: <Clock className="size-5 text-[#E41F66]" />,
            title: "7. Data Retention & Archival",
            content: (
                <div className="space-y-3">
                    <p>
                        We retain your order records and transaction receipts for as long as necessary to comply with taxation and corporate statutory requirements in India.
                    </p>
                    <p>
                        Custom digital artwork files (invitation drafts, photos, custom vector badges) are archived temporarily to allow convenient re-printing or add-ons for your celebration, after which raw design assets are purged from active production servers upon request.
                    </p>
                </div>
            )
        },
        {
            id: "user-rights",
            icon: <UserCheck className="size-5 text-[#E41F66]" />,
            title: "8. Your Privacy Rights",
            content: (
                <div className="space-y-3">
                    <p>As a valued patron of Vivah Store, you hold the following rights regarding your personal information:</p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#E41F66]">
                        <li><strong>Right to Access:</strong> Inquire about what personal data we have stored regarding your account.</li>
                        <li><strong>Right to Rectification:</strong> Request corrections to outdated addresses, phone numbers, or profile information.</li>
                        <li><strong>Right to Erasure:</strong> Request the deletion of your account and personal identifiers, subject to ongoing order delivery and tax compliance obligations.</li>
                        <li><strong>Opt-Out of Marketing:</strong> Unsubscribe from non-essential promotional newsletters at any time.</li>
                    </ul>
                    <p>
                        To exercise any of these rights, email us at <a href="mailto:vivahstore.india@gmail.com" className="text-[#E41F66] font-semibold hover:underline">vivahstore.india@gmail.com</a>.
                    </p>
                </div>
            )
        },
        {
            id: "policy-updates",
            icon: <FileText className="size-5 text-[#E41F66]" />,
            title: "9. Updates to This Policy",
            content: (
                <div className="space-y-3">
                    <p>
                        Vivah Store reserves the right to amend or update this Privacy Policy periodically to reflect changes in our operational procedures, legal statutes, or new store features. Any modifications will be posted directly to this page with an updated revision date. We encourage you to review this page periodically.
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
                    Transparency &amp; Trust
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                    Privacy Policy
                </h1>
                <p className="text-stone-500 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
                    How Vivah Store collects, protects, and handles your personal information, bespoke event details, and payment privacy.
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
                {sections.map((section) => (
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

            {/* Concierge & Contact Callout */}
            <div className="max-w-4xl mx-auto px-6 mt-16">
                <div className="bg-linear-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden text-center md:text-left">
                    <div className="absolute -right-16 -bottom-16 size-48 bg-[#E41F66]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-16 -top-16 size-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 max-w-xl">
                            <span className="text-[10px] font-bold tracking-widest text-[#E41F66] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10">
                                Privacy Grievances &amp; Concierge
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold">Have Privacy Questions or Requests?</h3>
                            <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                                If you wish to update your profile data, request deletion, or ask questions about how your event details are managed, reach out to our team directly.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                            <a
                                href="mailto:vivahstore.india@gmail.com"
                                className="inline-flex items-center justify-center gap-2 bg-[#E41F66] hover:bg-[#c60b4d] text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-xl shadow-lg transition-colors"
                            >
                                <Mail className="size-4" />
                                Email Privacy Desk
                            </a>
                            <Link
                                to="/contact-us"
                                className="inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-xl border border-stone-700 transition-colors"
                            >
                                Contact Us
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
