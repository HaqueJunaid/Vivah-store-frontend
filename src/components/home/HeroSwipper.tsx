import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import type { HeroSlide } from '../../types/allTypes';

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    tag: "BESPOKE WEDDING COLLECTION",
    title: "Unique Designs Tailored For Your Special Moments",
    subtitle: "Handcrafted wedding stationery, keepsake luggage tags, bespoke ritual kits, and elegant celebration favors.",
    primaryCtaText: "Explore Collection",
    primaryCtaLink: "/products",
    secondaryCtaText: "Custom Invites",
    secondaryCtaLink: "/products/invites-planner",
    imageUrl: "/Banner/cards.png",
  },
  {
    id: 2,
    tag: "TRENDING IN WEDDINGS",
    title: "Custom Wedding Newspapers For Your Story",
    subtitle: "Share your love journey, fun quizzes, and heartfelt memories with fully personalized, premium print wedding newspapers.",
    primaryCtaText: "Shop Newspapers",
    primaryCtaLink: "/products/fun-entertainment",
    secondaryCtaText: "Fun & Entertainment",
    secondaryCtaLink: "/products/fun-entertainment",
    imageUrl: "/Banner/customnewspaper.png",
  },
  {
    id: 3,
    tag: "VIVAH EXCLUSIVE STATIONERY",
    title: "Artisanal Wedding Stationery & Decor",
    subtitle: "Make your celebration one-of-a-kind with ambient table decor, luxury menu cards, door danglers, and ritual kits.",
    primaryCtaText: "Shop Stationery",
    primaryCtaLink: "/products/room-stationery",
    secondaryCtaText: "Utility Stationery",
    secondaryCtaLink: "/products/utility-stationery",
    imageUrl: "/Banner/weddingstationery.png",
  },
  {
    id: 4,
    tag: "CUSTOM CELEBRATION KEEPSAKES",
    title: "Custom Childhood Badges & Favors",
    subtitle: "Turn little memories into lasting keepsakes with custom photo badges, team pins, and personalized celebration gifts.",
    primaryCtaText: "Shop Badges & Favors",
    primaryCtaLink: "/products/favour-gifts",
    secondaryCtaText: "Browse All Gifts",
    secondaryCtaLink: "/products/favour-gifts",
    imageUrl: "/Banner/badge.png",
  },
  {
    id: 5,
    tag: "ALL THINGS WEDDING",
    title: "Personalized Signages & Essentials",
    subtitle: "Complete your wedding setup with custom acrylic welcome boards, playful signs, drink pouches, and stationery.",
    primaryCtaText: "Shop Boards & Signage",
    primaryCtaLink: "/products/boards-signage",
    secondaryCtaText: "View All Products",
    secondaryCtaLink: "/products",
    imageUrl: "/Banner/weddingthings.png",
  },
];

export default function HeroSwipper() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] min-h-125 max-h-screen overflow-hidden bg-stone-950 text-white select-none">
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
            {/* Optimized Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Lightweight Gradient Overlays */}
              <div className="absolute inset-0 bg-linear-to-r from-stone-950/90 via-stone-950/50 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-black/30" />
            </div>

            {/* Slide Content Overlay */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-16 flex flex-col justify-center">
              <div className="max-w-2xl space-y-5">
                {/* Badge Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900/80 border border-white/20 text-pink-300 text-xs font-semibold tracking-widest uppercase shadow-md">
                  <Sparkles className="size-3.5 text-pink-400" />
                  <span>{slide.tag}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-stone-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.primaryCtaLink}
                    className="group inline-flex items-center gap-2.5 bg-[#E41F66] hover:bg-[#c60b4d] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-colors text-sm md:text-base cursor-pointer"
                  >
                    <ShoppingBag className="size-5" />
                    <span>{slide.primaryCtaText}</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {slide.secondaryCtaText && slide.secondaryCtaLink && (
                    <Link
                      to={slide.secondaryCtaLink}
                      className="inline-flex items-center gap-2 bg-stone-900/80 hover:bg-stone-800 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm md:text-base cursor-pointer"
                    >
                      <span>{slide.secondaryCtaText}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Custom Controls & Indicator Bar */}
      <div className="absolute bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between pointer-events-none">
        {/* Slide Counter / Indicators */}
        <div className="pointer-events-auto flex items-center gap-3 bg-stone-950/80 px-4 py-2 rounded-full border border-white/15 shadow-xl">
          <span className="text-xs font-bold tracking-widest text-pink-400">
            0{activeIndex + 1}
          </span>
          <div className="flex items-center gap-1.5">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index ? 'w-6 bg-[#E41F66]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-stone-400 tracking-widest">
            0{heroSlides.length}
          </span>
        </div>

        {/* Custom Arrow Buttons */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="p-3 rounded-full bg-stone-950/80 hover:bg-[#E41F66] border border-white/15 text-white shadow-lg transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="p-3 rounded-full bg-stone-950/80 hover:bg-[#E41F66] border border-white/15 text-white shadow-lg transition-colors cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
