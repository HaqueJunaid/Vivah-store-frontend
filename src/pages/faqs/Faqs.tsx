import React, { useState, useMemo, useEffect } from 'react'
import Heading from '../../components/common/Heading'
import {
    Search,
    ChevronDown,
    RefreshCcw,
    CreditCard,
    Truck,
    Package,
    Gift,
    ShieldAlert,
    HelpCircle,
    Phone,
    Mail,
    Sparkles,
    FileText
} from 'lucide-react'

interface FaqItem {
    question: string
    answer: string
    category: 'shipping' | 'returns' | 'payments'
    icon?: React.ReactNode
}

const Faqs: React.FC = () => {
    useEffect(() => {
        document.title = "VivahStore | Support & FAQs"
    }, [])

    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState<'all' | 'shipping' | 'returns' | 'payments'>('all')
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    // Reset open index when filtering changes
    useEffect(() => {
        setOpenIndex(null)
    }, [searchQuery, activeCategory])

    const faqs: FaqItem[] = useMemo(() => [
        // Shipping & Orders
        {
            category: 'shipping',
            question: "Is my Order Confirmed?",
            answer: "Once you have placed your order, you should receive an email confirmation with your Order Id.",
            icon: <Package className="size-5 text-[#E41F66]" />
        },
        {
            category: 'shipping',
            question: "When will you Ship My Order?",
            answer: "We normally ship all orders within 15 business days, but there might be a slight delay in shipment depending upon your order customization or in the case of some unavoidable circumstances. Final delivery time will vary based on your location.",
            icon: <Truck className="size-5 text-[#E41F66]" />
        },
        {
            category: 'shipping',
            question: "When will my order get Delivered?",
            answer: "It usually takes 15-20 business days for your order to get delivered. But the delivery time may vary depending on your order customization and location.",
            icon: <Truck className="size-5 text-[#E41F66]" />
        },
        {
            category: 'shipping',
            question: "How much do you Charge for Delivery?",
            answer: "Delivery charges depend on the weight of your parcel and will be calculated at the checkout page.",
            icon: <CreditCard className="size-5 text-[#E41F66]" />
        },
        {
            category: 'shipping',
            question: "How can I Track my Order?",
            answer: "An Email containing your Tracking Id and details of the service provider is sent to you after the order is shipped. If you can't find the tracking information in your email, or if you have any other questions related to tracking, reach out to us on bishrish@gmail.com or contact us on +91 77668 88626. They will be glad to assist you and provide the necessary information.",
            icon: <Search className="size-5 text-[#E41F66]" />
        },
        {
            category: 'shipping',
            question: "What if I have not received some part of my order?",
            answer: "If some part of your order is missing, it's possible that it could have been sent in more than one parcel, due to the large size of your order. In this case, you will receive one dispatch email per parcel. If you have only received one dispatch email and haven't received all of your items, please contact us within 7 days.",
            icon: <HelpCircle className="size-5 text-[#E41F66]" />
        },
        {
            category: 'shipping',
            question: "Can I Update My Order?",
            answer: "Kindly note that we work hard to get your order dispatched as quickly as possible, we may not be able to update your order in time. If your order has not been shipped, please reach out to us at bishrish@gmail.com or contact us on +91 77668 88626 with your details. Kindly note that we cannot guarantee that the change will be made as the order may have been already processed.",
            icon: <Package className="size-5 text-[#E41F66]" />
        },
        {
            category: 'shipping',
            question: "Can I have my order Gift-Wrapped?",
            answer: "Gift wrap option is available for all products. An additional amount of ₹75 will be charged.",
            icon: <Gift className="size-5 text-[#E41F66]" />
        },
        {
            category: 'shipping',
            question: "I have received a Damaged Product, what should I do?",
            answer: "In case you receive a damaged product, please capture an unboxing video for evidence and reach out to us on bishrish@gmail.com and we will resolve the issue ASAP.",
            icon: <ShieldAlert className="size-5 text-[#E41F66]" />
        },

        // Returns & Exchange
        {
            category: 'returns',
            question: "What is your Return Policy?",
            answer: "You can return certain products upto 5 days from the date of delivery. You can send a request to bishrish@gmail.com or call our number +91 77668 88626. The returned product should be in its original packaging and in the same unused condition as received.",
            icon: <RefreshCcw className="size-5 text-[#E41F66]" />
        },
        {
            category: 'returns',
            question: "What items can I Return?",
            answer: "You can only return items that are damaged/defective. You will need to inform us of any damages/defects within 24 hours of delivery of the product, in order to receive the replacement.",
            icon: <ShieldAlert className="size-5 text-[#E41F66]" />
        },
        {
            category: 'returns',
            question: "Do you arrange for Reverse Pickups?",
            answer: "Reverse pickup is not available on any items, you will have to ship the item back to our address.",
            icon: <Truck className="size-5 text-[#E41F66]" />
        },
        {
            category: 'returns',
            question: "Where do I Ship the Returns?",
            answer: "Please mail the item(s) to the address below. Do remember to mention your Order ID and Contact Number. Srishti Bhartia. 414-15, A, Villa, New City light, Althan, Surat, Gujarat, India, Contact Number - +91 77668 88626.",
            icon: <Package className="size-5 text-[#E41F66]" />
        },
        {
            category: 'returns',
            question: "What if the parcel gets returned back by the shipping company?",
            answer: "In any circumstance if your parcel gets returned back to us by the company, lets say because the customer's phone was not reachable, you'll have to pay the shipping amount again for us to reship it to you.",
            icon: <ShieldAlert className="size-5 text-[#E41F66]" />
        },
        {
            category: 'returns',
            question: "When will I receive my Replacement?",
            answer: "Replacement will be shipped after the original item has been received, subject to the following conditions: 1.The item(s) should be unused, unsoiled and unwashed. 2.The package should have the original packaging. They should be returned within 7 days from the dispatch date. Any returned item received by us that does not meet the above mentioned conditions will not be accepted. No amount will be reimbursed in this case.",
            icon: <RefreshCcw className="size-5 text-[#E41F66]" />
        },
        {
            category: 'returns',
            question: "Can I choose a Different Item in Exchange?",
            answer: "You can only exchange your item if it is damaged/defective within 5 days and receive a replacement of that exact product or another product of the same value. If the value of the replacement product exceeds that of the previously purchased product, the difference will have to be paid in advance.",
            icon: <RefreshCcw className="size-5 text-[#E41F66]" />
        },
        {
            category: 'returns',
            question: "What is your Refund Policy?",
            answer: "We do not refund money even if the item(s) is damaged/defective. We only exchange the product.",
            icon: <ShieldAlert className="size-5 text-[#E41F66]" />
        },
        {
            category: 'returns',
            question: "Do you have Discounts / Sales?",
            answer: "Yes we do. Subscribe to our newsletter for all the perks!",
            icon: <Sparkles className="size-5 text-[#E41F66]" />
        },

        // Payments & Billing
        {
            category: 'payments',
            question: "What Payment Methods do you accept?",
            answer: "We accept UPI payments (Google Pay, PhonePe, Paytm), net banking, as well as all major credit and debit cards at checkout.",
            icon: <CreditCard className="size-5 text-[#E41F66]" />
        },
        {
            category: 'payments',
            question: "Is my payment information secure?",
            answer: "Yes, all transactions are processed through highly secure, industry-standard encrypted payment gateways. We do not store any card details on our servers.",
            icon: <CreditCard className="size-5 text-[#E41F66]" />
        },
        {
            category: 'payments',
            question: "Can I request a GST Invoice?",
            answer: "An invoice is automatically emailed to you upon order confirmation. If you need a GST invoice or custom company billing info, please reach out to us at bishrish@gmail.com with your GST details.",
            icon: <FileText className="size-5 text-[#E41F66]" />
        }
    ], [])

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
    }, [faqs, activeCategory, searchQuery])

    return (
        <div className="bg-stone-50/50 min-h-screen py-12 pb-20 w-full font-sans tracking-wide">
            {/* Header / Hero Section */}
            <div className="max-w-4xl mx-auto text-center px-6">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#E41F66] bg-[#E41F66]/5 px-4 py-1.5 rounded-full uppercase inline-block mb-3 border border-[#E41F66]/10">
                    Vivah Store Concierge
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                    How Can We Assist You?
                </h1>
                <p className="text-stone-500 text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">
                    Explore our curated guides regarding shipping, customized orders, returns, exchanges, and payment details.
                </p>

                {/* Premium Search Bar */}
                <div className="mt-8 max-w-lg mx-auto relative group">
                    <div className="absolute inset-0 bg-[#E41F66]/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center bg-white border border-stone-200/80 focus-within:border-[#E41F66]/80 rounded-2xl shadow-xs focus-within:shadow-md transition-all duration-300 px-4 py-3.5">
                        <Search className="text-stone-400 group-focus-within:text-[#E41F66] size-5 mr-3 transition-colors shrink-0" />
                        <input
                            type="text"
                            placeholder="Search questions, policies, shipping times..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-stone-800 placeholder:text-stone-400 text-sm md:text-base"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-stone-400 hover:text-stone-600 font-medium text-xs px-2 cursor-pointer"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Policy Summaries */}
            <div className="max-w-6xl mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/70 backdrop-blur-xs border border-stone-200/60 rounded-3xl p-6 shadow-xs">
                    <div className="flex items-start gap-4 p-2">
                        <div className="rounded-full bg-[#E41F66]/10 p-3.5 text-[#E41F66] shrink-0">
                            <RefreshCcw size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-stone-900 text-sm md:text-base mb-1">Returns &amp; Refunds</h3>
                            <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                                Return damaged or defective products within 5 days of delivery. Reach out via email to <span className="font-semibold text-stone-800 hover:underline">bishrish@gmail.com</span>. Note: Reverse pickups are client-arranged.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block bg-stone-200 w-px h-16 self-center justify-self-center" />

                    <div className="flex items-start gap-4 p-2">
                        <div className="rounded-full bg-[#E41F66]/10 p-3.5 text-[#E41F66] shrink-0">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-stone-900 text-sm md:text-base mb-1">Secure Payments</h3>
                            <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                                Pay securely with UPI (GPay, PhonePe, Paytm), Net Banking, or major credit/debit cards. All invoice queries can be directed to support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="max-w-3xl mx-auto px-6 mt-12 flex justify-center flex-wrap gap-2 md:gap-3">
                {[
                    { id: 'all', label: 'All FAQs' },
                    { id: 'shipping', label: 'Shipping & Orders' },
                    { id: 'returns', label: 'Returns & Exchange' },
                    { id: 'payments', label: 'Payments & Billing' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveCategory(tab.id as any)}
                        className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold border transition-all duration-300 cursor-pointer ${activeCategory === tab.id
                                ? 'bg-[#E41F66] border-[#E41F66] text-white shadow-md shadow-[#E41F66]/20 hover:bg-[#c60b4d]'
                                : 'bg-white border-stone-200/80 text-stone-600 hover:bg-stone-50 hover:text-stone-800'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* FAQs List Accordion */}
            <div className="max-w-3xl mx-auto px-6 mt-8 space-y-4">
                {filteredFaqs.length === 0 ? (
                    <div className="text-center py-12 bg-white/50 border border-dashed border-stone-200 rounded-3xl p-6">
                        <HelpCircle className="size-10 text-stone-300 mx-auto mb-3" />
                        <h3 className="font-semibold text-stone-700 text-lg">No Results Found</h3>
                        <p className="text-stone-400 text-sm mt-1 max-w-xs mx-auto">
                            We couldn't find any FAQs matching "{searchQuery}". Try adjusting your filters or query.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('')
                                setActiveCategory('all')
                            }}
                            className="mt-4 text-sm font-bold text-[#E41F66] hover:underline cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    filteredFaqs.map((faq, idx) => {
                        const isOpen = openIndex === idx
                        return (
                            <div
                                key={idx}
                                className={`group overflow-hidden bg-white/60 backdrop-blur-xs border rounded-2xl shadow-xs transition-all duration-300 hover:shadow-md ${isOpen ? 'border-[#E41F66]/30 bg-white' : 'border-stone-200/70'
                                    }`}
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between text-left p-5 gap-4 cursor-pointer outline-none select-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl transition-colors duration-300 ${isOpen ? 'bg-[#E41F66]/10' : 'bg-stone-100 group-hover:bg-[#E41F66]/5'
                                            }`}>
                                            {faq.icon || <HelpCircle className="size-5 text-[#E41F66]" />}
                                        </div>
                                        <h3 className={`font-semibold text-stone-800 text-sm md:text-base leading-snug transition-colors group-hover:text-stone-900 ${isOpen ? 'text-[#E41F66]' : ''
                                            }`}>
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <ChevronDown
                                        className={`size-5 text-stone-400 group-hover:text-[#E41F66] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#E41F66]' : ''
                                            }`}
                                    />
                                </button>

                                {/* Accordion Body with CSS Grid row transition */}
                                <div
                                    className={`transition-all duration-300 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-stone-100/60' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-5 md:pl-20 text-stone-500 text-xs md:text-sm leading-relaxed bg-stone-50/20">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            {/* Still Need Help Concierge Card */}
            <div className="max-w-3xl mx-auto px-6 mt-16 text-center">
                <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
                    {/* Decorative Ambient Glow shapes */}
                    <div className="absolute -right-16 -bottom-16 size-48 bg-[#E41F66]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-16 -top-16 size-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                        Still have questions?
                    </h2>
                    <p className="text-stone-400 text-xs md:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                        Can't find the answers you're looking for? Reach out directly to our luxury customer concierge.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a
                            href="mailto:bishrish@gmail.com"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E41F66] hover:bg-[#c60b4d] text-white text-xs md:text-sm font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
                        >
                            <Mail className="size-4.5" />
                            Email Support
                        </a>
                        <a
                            href="tel:+917766888626"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-white text-xs md:text-sm font-semibold px-6 py-3.5 rounded-xl border border-stone-700 transition-colors cursor-pointer"
                        >
                            <Phone className="size-4.5" />
                            +91 77668 88626
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faqs