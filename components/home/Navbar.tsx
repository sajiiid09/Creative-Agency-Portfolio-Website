'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FlipLink from '../Effects/FlipLink';
// --- DATA CONFIGURATION ---

const NAV_LINKS = {
  left: [
    {
      label: "Features",
      hasDropdown: true,
      content: [
        { title: "Advanced Analytics", desc: "Real-time data insights", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d10d0123c0be15052ede_Glossy%20Tote%20Bags%20on%20Vibrant%20Background.webp" },
        { title: "Smart Scheduling", desc: "Automate your workflow", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d16b259fd242a0ee6c1e_Modern%20Device%20Close-Up.webp" },
        { title: "Team Collaboration", desc: "Work together seamlessly", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a07c52d7ac585cdfd6fa7e_Elegant%20Blonde%20Profile.webp" },
        { title: "Asset Management", desc: "Organize your creative assets", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a07c6aeaa832d6e630e0ef_Vibrant%20Sports%20Jersey.webp" }
      ]
    },
    {
      label: "Use Cases",
      hasDropdown: true,
      content: [
        { title: "For Agencies", desc: "Scale your client work", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a07c8e09898fa9493b1bbc_Modern%20Elegance%20Tech%20%26%20Texture.webp" },
        { title: "For Startups", desc: "Move fast and break things", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d19782c018e44a110307_Modern%20Elegance_%20Tech%20%26%20Texture.webp" }
      ]
    }
  ],
  right: [
    {
      label: "Pricing",
      hasDropdown: false,
      href: "/pricing"
    },
    {
      label: "Resources",
      hasDropdown: true,
      content: [
        { title: "Blog", desc: "Latest industry news", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a07c52d7ac585cdfd6fa7e_Elegant%20Blonde%20Profile.webp" },
        { title: "Support", desc: "Get help 24/7", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d10d0123c0be15052ede_Glossy%20Tote%20Bags%20on%20Vibrant%20Background.webp" },
        { title: "Community", desc: "Join our discord", img: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d16b259fd242a0ee6c1e_Modern%20Device%20Close-Up.webp" }
      ]
    }
  ]
};


export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (tab: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveTab(tab);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 150);
  };

  // Find the content for the active tab
  const activeContent = [...NAV_LINKS.left, ...NAV_LINKS.right].find(
    (link) => link.label === activeTab && link.hasDropdown
  )?.content;

  return (
    <div 
      className="fixed top-8 left-0 right-0 z-50 flex flex-col items-center justify-start pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      {/* HEADER ROW: Branding, CTAs, and Navbar Pill */}
      <div className="w-full px-12 flex items-center justify-center relative pointer-events-auto z-50">
        
        {/* 1. BRANDING LINK (Far Left) */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <a 
            href="https://raco.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold tracking-[0.2em] text-neutral-800/60 hover:text-neutral-800 uppercase transition-colors"
          >
            Powered by RACOAI
          </a>
        </div>

        {/* 4. EXISTING NAVBAR PILL (Centered) */}
        <nav 
          className="relative px-5 py-2 rounded-full flex items-center gap-3
                   bg-[#d3d3d3]/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)]
                   transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
          onMouseLeave={handleMouseLeave}
        >
          {/* LEFT LINKS */}
          <div className="flex items-center gap-5">
            {NAV_LINKS.left.map((link) => (
              <div 
                key={link.label}
                onMouseEnter={() => handleMouseEnter(link.label)}
              >
                <FlipLink hasDropdown={link.hasDropdown} isActive={activeTab === link.label}>
                  {link.label}
                </FlipLink>
              </div>
            ))}
          </div>

          {/* LOGO */}
          <div className="shrink-0 flex items-center justify-center mx-4">
            <a href="/" className="block hover:scale-105 transition-transform duration-300 opacity-90 hover:opacity-100">
              <img 
                src="https://cdn.prod.website-files.com/689989c2270f878736e77521/689ef50f877065195c75d892_IconStyler.svg" 
                alt="Logo" 
                className="h-7 w-auto" 
              />
            </a>
          </div>

          {/* RIGHT LINKS */}
          <div className="flex items-center gap-5">
            {NAV_LINKS.right.map((link) => (
              <div 
                key={link.label}
                onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.label)}
              >
                {link.hasDropdown ? (
                  <FlipLink hasDropdown={true} isActive={activeTab === link.label}>
                    {link.label}
                  </FlipLink>
                ) : (
                  <a href={link.href}>
                    <FlipLink hasDropdown={false}>{link.label}</FlipLink>
                  </a>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* 2 & 3. CTAs (Far Right) */}
        <div className="absolute right-30 top-1/2 -translate-y-1/2 flex items-center gap-6">
          <a 
            href="/demo"
          >
            <FlipLink hasDropdown={false}>Book a  demo</FlipLink>
          </a>

          <a 
            href="/try-pulse"
            className="px-4 py-2.5 rounded-full bg-[#FF2E62]/50 backdrop-blur-md border border-white/40 shadow-sm font-semibold text-neutral-800 hover:bg-white/80 hover:shadow-md transition-all inline-block"
          >
            <FlipLink hasDropdown={false}>Try Pulse</FlipLink>
          </a>
        </div>
      </div>

      {/* MEGA DROPDOWN CONTAINER */}
      <AnimatePresence>
        {activeTab && activeContent && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto absolute top-full pt-4 w-full flex justify-center"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* GLASS CARD */}
            <div className="w-[90vw] max-w-6xl overflow-hidden rounded-[2rem] p-5 
                          bg-[#F4F4F4]/70 backdrop-blur-2xl border border-white/50 
                          shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)]">
              
              <div className="grid grid-cols-4 gap-5">
                {activeContent.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative cursor-pointer"
                  >
                    {/* IMAGE CARD */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 mb-4">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                    
                    {/* TEXT CONTENT */}
                    <div className="space-y-1 pl-1">
                      <h3 className="text-base font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      {item.desc && (
                        <p className="text-sm text-neutral-500 group-hover:text-neutral-700 transition-colors">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* BOTTOM FOOTER / CTA (Optional polish) */}
              <div className="mt-6 pt-4 border-t border-neutral-200/50 flex justify-between items-center px-2">
                <span className="text-sm font-medium text-neutral-400">
                  Discover more possibilities with Pulse
                </span>
                <button className="text-sm font-semibold text-neutral-900 flex items-center gap-2 group">
                  View all features 
                  <span className="block transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}