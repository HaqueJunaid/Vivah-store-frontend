import { Link } from 'react-router-dom'
import Heading from '../../components/common/Heading'
import React, { useEffect } from 'react'
import { Sparkles, Heart, HeartHandshake, ArrowRight, Star } from 'lucide-react'

const AboutUs: React.FC = () => {
    useEffect(() => {
        document.title = "VivahStore | About Us"
    }, [])

    return (
        <div className="bg-stone-50/50 min-h-screen py-12 pb-20 w-full font-sans tracking-wide">
            {/* Header Hero Banner */}
            <div className="max-w-5xl mx-auto text-center px-6 mb-16">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#E41F66] bg-[#E41F66]/5 px-4 py-1.5 rounded-full uppercase inline-block mb-3 border border-[#E41F66]/10">
                    Artisanal Graphic Studio
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                    Crafting Love &amp; Visual Legacies
                </h1>
                <p className="text-stone-500 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                    Based out of Surat, we translate human emotions into luxury wedding stationery, bespoke return gifts, and graphic branding experiences.
                </p>
            </div>

            {/* Cinematic Hero Image */}
            <div className="max-w-6xl mx-auto px-6 mb-20">
                <div className="relative h-[250px] md:h-[450px] rounded-[32px] overflow-hidden shadow-lg border border-stone-200/50">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1600&auto=format&fit=crop&q=80"
                        alt="Creative Studio workspace"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-950/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white max-w-md">
                        <p className="text-rose-200 text-xs md:text-sm font-bold tracking-widest uppercase mb-1">Our Studio Philosophy</p>
                        <h2 className="text-lg md:text-2xl font-bold">"Translating raw feelings into tactile stationery you can hold and cherish forever."</h2>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
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
                            Every curve, typography layout, and color palette is uniquely tailored to the client's individual story and legacy.
                        </p>
                    </div>

                    <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow">
                        <div className="size-12 bg-rose-50 text-[#E41F66] rounded-2xl flex items-center justify-center mb-4">
                            <Heart className="size-6" />
                        </div>
                        <h3 className="font-bold text-stone-900 text-base mb-2">Emotional Connection</h3>
                        <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                            We don't just print stationery—we write emotions. We translate family bonds and joy into visual art and gifting templates.
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

            {/* The Founders & Superhumans Highlight */}
            <div className="max-w-5xl mx-auto px-6 space-y-20">
                <div className="text-center">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-stone-950">Meet Our Superhumans</h2>
                    <p className="text-stone-500 text-xs md:text-sm mt-2">The heart, soul, and rockstars of the Srishbish studio.</p>
                    <div className="w-16 h-0.5 bg-[#E41F66] mx-auto mt-3" />
                </div>

                {/* Section 1: Srishti Bhartia (Founder) */}
                <section className="flex flex-col lg:flex-row items-center gap-10 md:gap-14 bg-white border border-stone-200/60 rounded-4xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300">
                    <div className="relative rounded-3xl overflow-hidden shrink-0 w-full md:max-w-md aspect-[4/5] lg:aspect-square bg-stone-100 border border-stone-200/50">
                        <img
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                            alt="Miss Srishti Bhartia"
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#E41F66] shadow-sm uppercase tracking-wider">
                            FOUNDER &amp; CREATIVE HEART
                        </div>
                    </div>
                    <div className="flex-1 text-stone-600 text-sm md:text-base space-y-4">
                        <h3 className="text-xl md:text-3xl font-extrabold text-stone-900">Srishti Bhartia</h3>
                        <p className="leading-relaxed">
                            Srishbish is a small design studio with big dreams based out of Surat. Being the brainchild of the lovely Miss Srishti Bhartia, we work to deliver the best graphic and branding experiences to our clients and also help to translate emotions through visuals and stationery gifting for our wonderful customers all over the world.
                        </p>
                        <p className="text-stone-500 italic">
                            "Connecting hearts, one handcrafted wax seal and elegant envelope at a time."
                        </p>
                    </div>
                </section>

                {/* Section 2: Nani Intern (Rockstar) */}
                <section className="flex flex-col lg:flex-row-reverse items-center gap-10 md:gap-14 bg-white border border-stone-200/60 rounded-4xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300">
                    <div className="relative rounded-3xl overflow-hidden shrink-0 w-full md:max-w-md aspect-[4/5] lg:aspect-square bg-stone-100 border border-stone-200/50">
                        <img
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
                            alt="Nani Intern"
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#E41F66] shadow-sm uppercase tracking-wider">
                            70 YEARS YOUNG ROCKSTAR
                        </div>
                    </div>
                    <div className="flex-1 text-stone-600 text-sm md:text-base space-y-4">
                        <div className="flex items-center gap-2 text-amber-500">
                            <Star className="size-5 fill-current" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#E41F66]">Intern Extraordinaire</span>
                        </div>
                        <h3 className="text-xl md:text-3xl font-extrabold text-stone-900">Our Rockstar Nani Intern</h3>
                        <p className="leading-relaxed">
                            In a graphic studio, what job profile do you assign someone who has advanced life experience, a little less than intermediary, almost non-existent software experience but pro-level hand skills? Odd candidate you think? Well, we disagree because our Nani Intern is a rockstar. She's 100% high on life, 150% high on art and craft skills and occasionally, more secretly, a little high on gulab jamun.
                        </p>
                        <strong className="block text-stone-900 font-semibold text-base leading-snug">
                            Defining old age as simply bold age, she is 70 years young with the passion of an 18-year-old.
                        </strong>
                    </div>
                </section>

                {/* Section 3: Srishbish Mom (The Soul) */}
                <section className="flex flex-col lg:flex-row items-center gap-10 md:gap-14 bg-white border border-stone-200/60 rounded-4xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300">
                    <div className="relative rounded-3xl overflow-hidden shrink-0 w-full md:max-w-md aspect-[4/5] lg:aspect-square bg-stone-100 border border-stone-200/50">
                        <img
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                            alt="Srishbish Mom"
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#E41F66] shadow-sm uppercase tracking-wider">
                            THE BACKBONE &amp; SOUL
                        </div>
                    </div>
                    <div className="flex-1 text-stone-600 text-sm md:text-base space-y-4">
                        <h3 className="text-xl md:text-3xl font-extrabold text-stone-900">Srishbish Mom</h3>
                        <p className="leading-relaxed">
                            They said to me: "Aaj mere pass MacBook Pros hai, iPad Pro hai, 100k followers hai, blue tick hai, 7 million views hai, kya hai tumhare paas?"
                        </p>
                        <strong className="block text-[#E41F66] font-bold text-lg md:text-xl leading-snug">
                            "Mere paas Srishbish Mom hai!!"
                        </strong>
                        <p className="leading-relaxed">
                            She is our grounding light, the protector of the studio, and the magic spark that holds our superhumans together during high-pressure wedding seasons.
                        </p>
                    </div>
                </section>
            </div>

            {/* Experience Luxury CTA Banner */}
            <div className="max-w-3xl mx-auto px-6 mt-20 text-center">
                <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
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