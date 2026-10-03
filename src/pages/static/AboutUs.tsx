import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Sparkles, Heart, HeartHandshake, ArrowRight, Quote, Award, Palette, MapPin } from 'lucide-react'

const AboutUs: React.FC = () => {
    useEffect(() => {
        document.title = "VivahStore | About Us"
    }, [])

    return (
        <div className="bg-stone-50/50 min-h-screen py-12 pb-20 w-full font-sans tracking-wide">
            {/* Top Banner Header */}
            <div className="max-w-5xl mx-auto text-center px-6 mb-16">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#E41F66] bg-[#E41F66]/5 px-4 py-1.5 rounded-full uppercase inline-block mb-3 border border-[#E41F66]/10">
                    Artisanal Graphic Studio
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                    Crafting Love &amp; Visual Legacies
                </h1>
                <p className="text-stone-500 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                    Based out of Jamshedpur, we translate human emotions into luxury wedding stationery, bespoke return gifts, and graphic branding experiences.
                </p>
            </div>

            {/* Studio Hero Showcase */}
            <div className="max-w-6xl mx-auto px-6 mb-20">
                <div className="relative h-64 md:h-112 rounded-4xl overflow-hidden shadow-lg border border-stone-200/50">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600&auto=format&fit=crop&q=80"
                        alt="Creative Studio workspace"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-stone-900/70 via-stone-950/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white max-w-md">
                        <p className="text-rose-200 text-xs md:text-sm font-bold tracking-widest uppercase mb-1">Our Studio Philosophy</p>
                        <h2 className="text-lg md:text-2xl font-bold leading-snug">"Translating raw feelings into tactile stationery you can hold and cherish forever."</h2>
                    </div>
                </div>
            </div>

            {/* Studio Pillars */}
            <div className="max-w-6xl mx-auto px-6 mb-24">
                <div className="text-center mb-10">
                    <h2 className="text-xl md:text-3xl font-bold text-stone-950">Our Studio Pillars</h2>
                    <div className="w-12 h-0.5 bg-[#E41F66] mx-auto mt-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow">
                        <div className="size-12 bg-rose-50 text-[#E41F66] rounded-2xl flex items-center justify-center mb-4">
                            <Sparkles className="size-6" />
                        </div>
                        <h3 className="font-bold text-stone-900 text-base mb-2">Bespoke Graphics</h3>
                        <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                            Every curve, typography layout, and color palette is uniquely tailored to the client&apos;s individual story and legacy.
                        </p>
                    </div>

                    <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow">
                        <div className="size-12 bg-rose-50 text-[#E41F66] rounded-2xl flex items-center justify-center mb-4">
                            <Heart className="size-6" />
                        </div>
                        <h3 className="font-bold text-stone-900 text-base mb-2">Emotional Connection</h3>
                        <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                            We don&apos;t just print stationery—we write emotions. We translate family bonds and joy into visual art and gifting templates.
                        </p>
                    </div>

                    <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow">
                        <div className="size-12 bg-rose-50 text-[#E41F66] rounded-2xl flex items-center justify-center mb-4">
                            <HeartHandshake className="size-6" />
                        </div>
                        <h3 className="font-bold text-stone-900 text-base mb-2">Multitasking Superhumans</h3>
                        <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                            A highly dedicated, small team working hard through chaotic yet aesthetically pleasing routines to conquer one project at a time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Redesigned Founder Profile Card Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
                <div className="text-center mb-10">
                    <span className="text-[11px] font-bold tracking-widest text-[#E41F66] uppercase bg-[#E41F66]/5 px-3 py-1 rounded-full border border-[#E41F66]/10">
                        Leadership &amp; Vision
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-stone-950 mt-2">Meet Our Creative Heart</h2>
                    <p className="text-stone-500 text-xs md:text-sm mt-1">The soul, passion, and artistic direction behind Vivah Store.</p>
                </div>

                <div className="relative bg-linear-to-br from-white via-stone-50/90 to-rose-50/20 border border-stone-200/90 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-stone-200/40 hover:shadow-xl hover:border-[#E41F66]/30 transition-all duration-300 overflow-hidden">
                    {/* Subtle ambient light accents */}
                    <div className="absolute -top-24 -right-24 size-72 bg-[#E41F66]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 size-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Left Column: Portrait & Floating Badges (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col items-center">
                            <div className="relative w-full max-w-sm aspect-4/5 rounded-3xl overflow-hidden bg-stone-100 border-2 border-stone-200/80 shadow-md group">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    src="/Assets/AdarshSharma.jpeg"
                                    alt="Mr Adarsh Sharma"
                                    onError={(e) => {
                                        // Fallback if public path varies
                                        (e.target as HTMLImageElement).src = "public/Assets/AdarshSharma.jpeg";
                                    }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                
                                {/* Overlay Founder Tag */}
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                                    <span className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-extrabold text-[#E41F66] shadow-sm uppercase tracking-wider flex items-center gap-1.5 border border-stone-200/60">
                                        <Sparkles size={13} className="text-[#E41F66]" />
                                        Founder &amp; Creative Heart
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Bio, Vision & Quote (7 Cols) */}
                        <div className="lg:col-span-7 space-y-5 text-stone-600">
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="px-2.5 py-0.5 rounded-md bg-[#E41F66]/10 text-[#E41F66] text-[10px] font-bold uppercase tracking-wider">
                                        Visionary &amp; Designer
                                    </span>
                                    <span className="text-stone-300">•</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
                                    Adarsh Sharma
                                </h3>
                            </div>



                            {/* Narrative Paragraphs */}
                            <div className="space-y-3.5 text-xs sm:text-sm md:text-base leading-relaxed text-stone-600">
                                <p>
                                    <strong className="text-stone-900 font-bold">Vivah Store</strong> is a dedicated wedding stationery &amp; gifting studio founded with one true mission: making every couple&apos;s once-in-a-lifetime celebration exquisitely beautiful, personal, and unforgettable.
                                </p>
                                <p>
                                    Backed by <strong className="text-stone-900 font-semibold">6+ years of specialized experience</strong> across graphic design, typography, branding, luxury printing, and visual communication, Adarsh brings together profound artisanal craft with a modern understanding of wedding aesthetics.
                                </p>
                                <p>
                                    From interactive e-invites and physical wedding invitation suites to detailed itineraries, custom welcome boards, return gift hampers, and wax-sealed stationery, every single detail is thoughtfully curated to reflect each couple&apos;s unique love story.
                                </p>
                            </div>

                            {/* Featured Quote Card */}
                            <div className="relative mt-4 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-start gap-3.5 group hover:border-[#E41F66]/30 transition-all">
                                <div className="p-2 rounded-xl bg-rose-50 text-[#E41F66] shrink-0 mt-0.5">
                                    <Quote size={18} />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-bold text-stone-800 italic leading-snug">
                                        &ldquo;We turn your wedding stories into beautiful details, one invitation at a time.&rdquo;
                                    </p>
                                    <p className="text-[11px] font-semibold text-stone-400 mt-1">
                                        — Adarsh Sharma, Founder &amp; Creative Heart
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="max-w-3xl mx-auto px-6 mt-20 text-center">
                <div className="bg-linear-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
                    <div className="absolute -right-16 -bottom-16 size-48 bg-[#E41F66]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-16 -top-16 size-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                        Experience Vivah Store Stationery
                    </h2>
                    <p className="text-stone-400 text-xs md:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                        Explore our handcrafted, luxury catalog of invite templates, return gift element kits, and welcome signage.
                    </p>

                    <div className="mt-8">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 bg-[#E41F66] hover:bg-[#c60b4d] text-white text-xs md:text-sm font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
                        >
                            Explore Collections
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs