'use client';

import React from 'react';
import { motion } from 'framer-motion';

const marqueeImages = [
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66baf162b757a39b091_Tennis%20Net%20Close-Up.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66b1580d9ca27b80500_Dapper%20Young%20Man%20with%20Stylish%20Attire%20and%20Joyful%20Smile.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66c64dc19cb7248b949_Color%20Block%20Tote%20Bag.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bd60d48c5c5315745_Matte%20Black%20Circular%20Object%20on%20Red.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66b451619260e657a43_Pristine%20White%20Sneakers%20on%20Light%20Blue%20Background.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a260387e191729798_Modern%20Gaming%20Controller.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f669754b169a3dbd5c7f_Mini%20Car%20Flower%20Vase.webp',
];

// Double the array to ensure seamless loop
const marqueeItems = [...marqueeImages, ...marqueeImages];

export default function ImageMarquee() {
  return (
    <section className="w-full py-12 sm:py-24 bg-white overflow-hidden flex flex-col gap-6 sm:gap-8">
      {/* Row 1: Right to Left */}
      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex gap-6 sm:gap-8 flex-nowrap min-w-full"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
        >
          {marqueeItems.map((src, index) => (
            <div 
              key={`row1-${index}`} 
              className="relative w-[280px] h-[200px] sm:w-[350px] sm:h-[250px] md:w-[450px] md:h-[320px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              <img
                src={src}
                alt="Styler Design"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex gap-6 sm:gap-8 flex-nowrap min-w-full"
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, 
          }}
        >
          {marqueeItems.map((src, index) => (
            <div 
              key={`row2-${index}`} 
              className="relative w-[280px] h-[200px] sm:w-[350px] sm:h-[250px] md:w-[450px] md:h-[320px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              <img
                src={src}
                alt="Styler Design"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
