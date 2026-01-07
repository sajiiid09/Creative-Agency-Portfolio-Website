'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const assets = {
  left: [
    'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66baf162b757a39b091_Tennis%20Net%20Close-Up.webp',
    'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp',
  ],
  right: [
    'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a06273d7ac585cdfd38aff_Striking%20Fashion%20Portrait.webp',
    'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66c64dc19cb7248b949_Color%20Block%20Tote%20Bag.webp'
  ],
  centerBg: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a061f4c6476b52f101c546_Tennis%20Court%20Smiley.webp'
};

export default function ImageGridCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a tall scroll track (300vh) to drive the animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ANIMATION LOGIC:
  // 1. Side Columns: Move horizontally OUT of the screen (Left goes <--, Right goes -->)
  // 2. Center Card: Starts vertical (narrow), expands to horizontal (wide)
  // 3. CTA Content: Fades in as the card expands
  
  // Sides move out fast
  const xLeft = useTransform(scrollYProgress, [0, 0.5], [0, -800]); 
  const xRight = useTransform(scrollYProgress, [0, 0.5], [0, 800]);
  const opacitySides = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Center Card Transformation
  // Width: Starts at roughly 33% (grid col size), expands to 95%
  const width = useTransform(scrollYProgress, [0, 0.6], ["30%", "95%"]);
  // Height: Starts vertical (500px), becomes shorter/horizontal aspect (600px or viewport relative)
  const height = useTransform(scrollYProgress, [0, 0.6], ["60vh", "80vh"]);
  
  // CTA Content Opacity (Reveal)
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.4, 0.7], [0.5, 1]);

  return (
    // Track Height: 300vh gives us space to scrub the animation
    <section ref={containerRef} className="relative h-[300vh] bg-white">
      
      {/* Sticky Viewport: This pins the content so we can animate it in place */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Main Flex Container */}
        <div className="relative w-full max-w-[1600px] flex items-center justify-center gap-8 px-4">
          
          {/* LEFT COLUMN */}
          <motion.div 
            style={{ x: xLeft, opacity: opacitySides }} 
            className="flex flex-col gap-6 w-[25%] min-w-[300px]"
          >
            {assets.left.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] w-full">
                <img src={src} alt="Left" className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>

          {/* CENTER COLUMN (THE HERO) */}
          {/* We animate width/height directly to change aspect ratio */}
          <motion.div 
            style={{ 
              width: width,
              height: height,
            }}
            className="relative z-20 rounded-[3rem] overflow-hidden shadow-2xl flex-shrink-0"
          >
            {/* Background Image */}
            <img 
              src={assets.centerBg} 
              alt="Tennis Court Smiley" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* CTA Content (Reveals on Scroll) */}
            <motion.div 
              style={{ opacity: contentOpacity }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white"
            >
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-semibold mb-12 tracking-tight leading-none">
                Let's Work <br /> Together
              </h2>
              
              <motion.button 
                style={{ scale: buttonScale }}
                className="bg-black text-white pl-10 pr-2 py-2 rounded-full font-medium flex items-center gap-6 transition-transform hover:scale-105 active:scale-95"
              >
                <span className="text-xl tracking-wide">CONTACT US</span>
                <div className="bg-white text-black rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <ArrowUpRight className="w-8 h-8" />
                </div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div 
            style={{ x: xRight, opacity: opacitySides }} 
            className="flex flex-col gap-6 w-[25%] min-w-[300px] pt-32" // Offset pt-32 for staggered look
          >
            {assets.right.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] w-full">
                <img src={src} alt="Right" className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}