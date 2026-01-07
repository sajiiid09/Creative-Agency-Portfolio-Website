'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// --- 1. CONFIGURATION DATA (Icons with Blur & Positions) ---

const LEFT_ICONS = [
  // Far Left (Blurred/Background)
  { type: 'emoji', content: '👏', theme: 'bg-orange-50', top: '15%', left: '8%', blur: 'blur-[1px]', scale: 0.8 },
  { type: 'emoji', content: '❤️', theme: 'bg-red-50', top: '55%', left: '5%', blur: 'blur-sm', scale: 0.7 },
  
  // Mid Left (Sharp/Foreground)
  { type: 'svg', name: 'youtube', top: '25%', left: '18%', blur: 'blur-none', scale: 1 },
  { type: 'svg', name: 'linkedin', top: '45%', left: '22%', blur: 'blur-none', scale: 1 },
  
  // Near Center (Slightly blurred)
  { type: 'emoji', content: '🚀', theme: 'bg-purple-50', top: '75%', left: '15%', blur: 'blur-[0.5px]', scale: 0.9 },
  { type: 'svg', name: 'x', top: '5%', left: '35%', blur: 'blur-none', scale: 1 },
];

const RIGHT_ICONS = [
  // Far Right (Blurred)
  { type: 'emoji', content: '🗓️', theme: 'bg-blue-50', top: '10%', right: '8%', blur: 'blur-[1px]', scale: 0.8 },
  { type: 'emoji', content: '🤳', theme: 'bg-orange-50', top: '65%', right: '5%', blur: 'blur-sm', scale: 0.7 },
  
  // Mid Right (Sharp)
  { type: 'emoji', content: '🦋', theme: 'bg-blue-50', top: '5%', right: '25%', blur: 'blur-none', scale: 1 },
  { type: 'svg', name: 'pinterest', top: '30%', right: '20%', blur: 'blur-none', scale: 1 },
  { type: 'svg', name: 'threads', top: '50%', right: '25%', blur: 'blur-none', scale: 1 },
  
  // Near Center
  { type: 'emoji', content: '🌸', theme: 'bg-pink-50', top: '20%', right: '35%', blur: 'blur-sm', scale: 0.6 }, // Decoration blur
  { type: 'emoji', content: '💬', theme: 'bg-pink-50', top: '80%', right: '15%', blur: 'blur-[1px]', scale: 0.8 },
];

// --- 2. SUB-COMPONENTS ---

function MagneticBadge({ children, className, style }: { children: React.ReactNode, className?: string, style?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distance = Math.hypot(clientX - centerX, clientY - centerY);
      
      if (distance < 200) { // Increased range for better effect
        const pull = 0.35;
        position.x.set((clientX - centerX) * pull);
        position.y.set((clientY - centerY) * pull);
      } else {
        position.x.set(0);
        position.y.set(0);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div ref={ref} style={{ x, y, ...style }} className={`absolute ${className}`}>
      {children}
    </motion.div>
  );
}

function IconTile({ item }: { item: any }) {
  // Base classes for the tile look
  const baseClasses = `
    flex items-center justify-center 
    rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] 
    border border-gray-100/50 bg-white 
    select-none transition-shadow hover:shadow-lg
    w-14 h-14 md:w-16 md:h-16
  `;

  return (
    <MagneticBadge 
      style={{ top: item.top, left: item.left, right: item.right }}
      className={`z-10 ${item.blur}`} // Apply blur class here
    >
      <div 
        className={`${baseClasses} ${item.type === 'emoji' ? item.theme : ''}`}
        style={{ transform: `scale(${item.scale})` }}
      >
        {item.type === 'emoji' ? (
          <span className="text-2xl">{item.content}</span>
        ) : (
          <div className="text-gray-700 w-6 h-6 md:w-8 md:h-8">
            <SocialIcon name={item.name} />
          </div>
        )}
      </div>
    </MagneticBadge>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'x': return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.903 10.469 21.348 2h-1.764l-6.465 7.353L7.955 2H2l7.808 11.12L2 22h1.764l6.828-7.765L16.044 22H22l-8.097-11.531Zm-2.417 2.748-.791-1.107L4.4 3.3h2.71l5.08 7.11.791 1.107 6.604 9.242h-2.71l-5.389-7.542Z"/></svg>;
    case 'linkedin': return <svg viewBox="0 0 24 24" fill="#0077b5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.542V1.729C24 .774 23.2 0 22.225 0z"/></svg>;
    case 'pinterest': return <svg viewBox="0 0 24 24" fill="#e60023"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.966 1.407-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.992 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C11.27 23.96 11.628 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>;
    case 'youtube': return <svg viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case 'threads': return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.19 1.9c-5.88 0-9.82 4.16-9.82 9.61 0 5.43 4.26 9.34 9.69 9.34 3.03 0 5.46-1.12 7.15-3.08l-1.92-1.48c-1.38 1.48-3.14 2.19-5.18 2.19-3.77 0-6.84-2.88-6.84-6.95 0-4.07 3.25-7.14 7.21-7.14 3.44 0 5.25 2.45 5.25 5.29 0 1.25-.33 2.76-2.26 2.76-.79 0-1.5-.39-1.5-1.5 0-1.12.82-3.16 2.39-4.8l-1.63-1.61c-1.74 1.76-2.92 4.29-2.92 6.6 0 2.44 1.57 3.83 3.89 3.83 2.94 0 4.69-2.2 4.69-5.46 0-3.92-2.58-7.79-7.2-7.79zm-.25 5.29c1.65 0 2.97 1.35 2.97 3.01 0 1.66-1.33 3.02-2.97 3.02-1.65 0-2.98-1.36-2.98-3.02 0-1.66 1.33-3.01 2.98-3.01z"/></svg>;
    default: return null;
  }
}

// --- 3. MAIN COMPONENT ---

export default function HeroCTA() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white">
      
      {/* 1. GRID BACKGROUND */}
      {/* Creates the subtle graph-paper look from the image */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* LEFT ICONS */}
      <div className="absolute left-70 top-0 bottom-0 w-[40%] hidden lg:block pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {LEFT_ICONS.map((item, i) => <IconTile key={`left-${i}`} item={item} />)}
        </div>
      </div>

      {/* RIGHT ICONS */}
      <div className="absolute right-70 top-0 bottom-0 w-[40%] hidden lg:block pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {RIGHT_ICONS.map((item, i) => <IconTile key={`right-${i}`} item={item} />)}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-20 max-w-3xl text-center px-4 mt-[-40px]">
        
        {/* Headings */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D2D2D] mb-6 leading-[1.1]">
          Your social media <br /> workspace
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-10 font-medium">
          Share consistently without the chaos
        </p>

        {/* 2. COMBINED PILL FORM */}
        {/* White container with nested green button */}
        <div className="flex items-center w-full max-w-xl mx-auto bg-white border border-gray-300 rounded-full shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-blue-100 transition-shadow hover:shadow-md">
          
          <input 
            type="email" 
            placeholder="Enter your email..." 
            className="flex-1 px-6 py-3 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
          />
          
          <button className="bg-[#B6EA8D] hover:bg-[#A4DE76] text-[#2D2D2D] px-8 py-3.5 rounded-full font-semibold transition-transform active:scale-95 flex items-center gap-2 group text-lg">
            Get started for free
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          By entering your email, you agree to receive emails from Pulse.
        </p>

      </div>
    </section>
  );
}