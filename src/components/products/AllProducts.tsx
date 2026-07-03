import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../common/Heading';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { BentoCategory } from '../../types/allTypes';

const bentoCategories: BentoCategory[] = [
  {
    title: "Boards & Signage",
    url: "boards-signage",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
    spanClass: "lg:col-span-2 lg:row-span-2 min-h-[350px] lg:min-h-[540px]",
    badge: "FEATURED COLLECTION",
    subtitle: "Welcome boards, vow boards & pickup cards for your big day"
  },
  {
    title: "Invites & Planner",
    url: "invites-planner",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWaW-lTPUpMIt0i0-wXUUaq5wOKk9M2uQxw2qplUdWLM8ma0H5B-heu-rF&s=10",
    spanClass: "lg:col-span-1 lg:row-span-2 min-h-[350px] lg:min-h-[540px]",
    badge: "POPULAR",
    subtitle: "E-invites, logos, wardrobe planners & wax seals"
  },
  {
    title: "Room Stationery",
    url: "room-stationery",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    spanClass: "lg:col-span-1 lg:row-span-1 min-h-[260px]",
    subtitle: "Door danglers, hangover kits & itineraries"
  },
  {
    title: "Utility Stationery",
    url: "utility-stationery",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    spanClass: "lg:col-span-1 lg:row-span-1 min-h-[260px]",
    subtitle: "Elegant menu cards & ritual kits"
  },
  {
    title: "Favour & Gifts",
    url: "favour-gifts",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1000&auto=format&fit=crop&q=80",
    spanClass: "lg:col-span-2 lg:row-span-1 min-h-[270px]",
    badge: "CUSTOM HANDMADE",
    subtitle: "Luxury hampers, jute bags, envelopes & stickers"
  },
  {
    title: "Fun & Entertainment",
    url: "fun-entertainment",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    spanClass: "lg:col-span-1 lg:row-span-1 min-h-[270px]",
    subtitle: "Filters, games, tambola & party props"
  },
  {
    title: "Thermatic Elements",
    url: "thermatic-elements",
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80",
    spanClass: "lg:col-span-1 lg:row-span-1 min-h-[270px]",
    subtitle: "Drink stirrers, stamps & decor accents"
  },
  {
    title: "Assets",
    url: "assets",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&auto=format&fit=crop&q=80",
    spanClass: "lg:col-span-2 lg:row-span-1 min-h-[270px]",
    subtitle: "High quality artistic design templates"
  },
];

const AllProducts: React.FC = () => {
  return (
    <section className="bg-stone-50 py-12 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Heading title="Shop By Collection" />
          <p className="text-stone-500 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            Explore our curated luxury wedding and event stationery collections, crafted to perfection.
          </p>
        </div>

        {/* Premium Bento Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 auto-rows-[minmax(250px,auto)]">
          {bentoCategories.map((cat) => (
            <Link
              key={cat.url}
              to={`/products/${cat.url}`}
              className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out border border-stone-200/90 hover:border-[#E41F66]/60 ${cat.spanClass}`}
            >
              {/* Background Image with Smooth Zoom */}
              <img
                src={cat.imageUrl}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-black/10 transition-opacity duration-300 group-hover:from-stone-950/95" />

              {/* Top Pill Badge if applicable */}
              {cat.badge && (
                <div className="absolute top-5 left-5 z-20">
                  <span className="bg-white/90 backdrop-blur-md text-[#E41F66] text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm border border-white/40">
                    {cat.badge}
                  </span>
                </div>
              )}

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 text-white">
                <div className="space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center justify-between">
                    <span>{cat.title}</span>
                    <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-lg bg-[#E41F66] text-white p-2 rounded-full size-8 flex items-center justify-center shadow-md">
                      <ArrowLeft className='rotate-180' />
                    </span>
                  </h3>

                  <p className="text-stone-300 text-xs md:text-sm font-normal line-clamp-2 opacity-90 group-hover:text-white transition-colors duration-300">
                    {cat.subtitle}
                  </p>

                  {/* Action Button Pill */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E41F66] group-hover:text-white bg-white/90 group-hover:bg-[#E41F66] px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 shadow-sm">
                      Explore Collection
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Explore All Products Call-To-Action Card */}
          <Link
            to="/products"
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out border border-stone-200/90 lg:col-span-2 lg:row-span-1 min-h-[270px] bg-gradient-to-br from-[#E41F66] via-pink-600 to-rose-700 p-8 flex flex-col justify-between"
          >
            {/* Ambient Background Glow Shapes */}
            <div className="absolute -right-10 -bottom-10 size-48 bg-white/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute top-0 right-1/4 size-32 bg-yellow-300/20 rounded-full blur-xl pointer-events-none" />

            {/* Header / Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/30">
                <Sparkles className="size-3 text-yellow-300 animate-spin" /> DISCOVER FULL CATALOG
              </span>
            </div>

            {/* Main CTA Content */}
            <div className="relative z-10 mt-6 space-y-3">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Explore All Products
                <ArrowLeft className="transform group-hover:translate-x-2 rotate-180 transition-transform duration-300" />

              </h3>
              <p className="text-rose-100 text-xs md:text-sm max-w-md font-medium">
                Browse our entire showcase of luxury wedding stationery, custom planners, gifts, and event assets.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 bg-white text-[#E41F66] font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl shadow-md group-hover:bg-stone-900 group-hover:text-white transition-all duration-300">
                  Browse All Products <ArrowLeft className="rotate-180 size-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;