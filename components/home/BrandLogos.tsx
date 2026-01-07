'use client';

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'TerraLight', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e778c2_TerraLight.svg' },
  { name: 'ProLine', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e778c4_ProLineLight.svg' },
  { name: 'Penta', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e778c3_PentaLight.svg' },
  { name: 'PinPoint', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e778db_PinpointLight.svg' },
  { name: 'Invert', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e778dc_InvertLight.svg' },
  { name: 'Hitech', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e778da_HitechLight.svg' },
  { name: 'Iceberg', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e778c1_Iceberglight.svg' },
  { name: 'Dune', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e778c0_DuneLight.svg' },
];

// Duplicate the array to ensure seamless looping
const duplicatedBrands = [...brands, ...brands];

export default function BrandLogos() {
  return (
    // Reduced padding (py-10) to decrease overall height
    <section className="w-full py-20 sm:py-28 bg-neutral-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="mb-8 text-center sm:text-left">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // Reduced font size to match the smaller scale
            className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-400 max-w-xl"
          >
            We worked with brands across the globe.
          </motion.h3>
        </div>

        {/* Slider Container */}
        <div className="relative flex w-full overflow-hidden mask-gradient">
          
          {/* Gradient Masks for smooth entry/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-900 to-transparent z-10" />

          {/* Marquee Track */}
          <motion.div 
            className="flex gap-16 pr-16" // pr-16 ensures the gap after the last item matches the gap between items
            animate={{ 
              x: "-50%" // Move exactly half the width (the length of one full set of brands)
            }}
            transition={{ 
              ease: "linear", 
              duration: 20, // Adjust speed: lower is faster
              repeat: Infinity 
            }}
          >
            {duplicatedBrands.map((brand, idx) => (
              <div 
                key={`${brand.name}-${idx}`} 
                className="flex items-center justify-center flex-shrink-0"
              >
                <img 
                  src={brand.src} 
                  alt={brand.name} 
                  // Reduced height (h-6) to 60% of previous size
                  className="h-15 sm:h-15 w-auto opacity-50 transition-opacity duration-300 hover:opacity-100" 
                />
              </div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}