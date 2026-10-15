import React, { useState, useEffect } from 'react'
import { faqs, type FaqCategory } from '../../constants/faqs'
import {
    Search,
    ChevronDown,
    RefreshCcw,
    CreditCard,
    HelpCircle,
    Phone,
    Mail,
} from 'lucide-react'

type FaqFilter = 'all' | FaqCategory

const categoryTabs: { id: FaqFilter; label: string }[] = [
    { id: 'all', label: 'All FAQs' },
    { id: 'shipping', label: 'Shipping & Orders' },
    { id: 'returns', label: 'Returns & Exchange' },
    { id: 'payments', label: 'Payments & Billing' },
]

const Faqs: React.FC = () => {
    useEffect(() => {
        document.title = "VivahStore | Support & FAQs"
    }, [])

    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState<FaqFilter>('all')
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

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
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setOpenIndex(null)
                            }}
                            className="bg-transparent border-none outline-none w-full text-stone-800 placeholder:text-stone-400 text-sm md:text-base"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setOpenIndex(null)
                                }}
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
                                Return damaged or defective products within 5 days of delivery. Reach out via email to <span className="font-semibold text-stone-800 hover:underline">vivahstore.india@gmail.com</span>. Note: Reverse pickups are client-arranged.
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
                {categoryTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveCategory(tab.id)
                            setOpenIndex(null)
                        }}
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
                                setOpenIndex(null)
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
                <div className="bg-linear-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
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
                            href="mailto:vivahstore.india@gmail.com"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E41F66] hover:bg-[#c60b4d] text-white text-xs md:text-sm font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
                        >
                            <Mail className="size-4.5" />
                            Email Support
                        </a>
                        <a
                            href="tel:+918507756877"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-white text-xs md:text-sm font-semibold px-6 py-3.5 rounded-xl border border-stone-700 transition-colors cursor-pointer"
                        >
                            <Phone className="size-4.5" />
                            +91 8507756877
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faqs