'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    category: 'Website',
    title: 'Design',
    description: 'Driven by a deep passion for design, we craft meaningful visuals that spark emotion and leave a powerful, lasting impression on your audience.',
    img: 'https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d10d0123c0be15052ede_Glossy%20Tote%20Bags%20on%20Vibrant%20Background.webp',
  },
  {
    category: 'SEO',
    title: 'Marketing',
    description: 'We utilize a diverse blend of strategic channels and tailored tactics, each carefully selected and refined to effectively reach your goals.',
    img: 'https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d1498f8548f8568bc6f7_Pastel%20Sneakers%20Display.webp',
  },
  {
    category: 'Front-end',
    title: 'Prototype',
    description: 'Highlighting the essential features, interactive elements, and practical functionalities that bring your idea to life.',
    img: 'https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d16b259fd242a0ee6c1e_Modern%20Device%20Close-Up.webp',
  },
  {
    category: 'Business',
    title: 'Branding',
    description: 'A thoughtful craft rooted in storytelling and design—shaping perceptions, stirring emotions, and curating meaningful experiences.',
    img: 'https://cdn.prod.website-files.com/689989c2270f878736e77534/68a2d19782c018e44a110307_Modern%20Elegance_%20Tech%20%26%20Texture.webp',
  },
];

export default function ServicesList2() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Create a tall scrollable track. 
  // 300vh allows enough distance to scrub through 4 items comfortably.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white -mt-20">
      
      {/* STICKY CONTAINER: Pins the view while we scroll the 300vh track */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* HEADER: Stays fixed at the top of the section */}
        {/* <div className="absolute top-0 left-0 w-full px-6 lg:px-16 z-50">
           <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-black max-w-4xl leading-[1.1]">
             Services We're <br/> Passionate About.
           </h2>
        </div> */}

        {/* CONTENT GRID */}
        <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full mt-20">
          
          {/* LEFT SIDE: Stacked Images */}
          <div className="relative h-[60vh] sm:h-[70vh] w-full rounded-[2.5rem] overflow-hidden bg-gray-100">
            {services.map((service, index) => (
              <StackedImage 
                key={index} 
                service={service} 
                index={index} 
                total={services.length} 
                progress={scrollYProgress} 
              />
            ))}
          </div>

          {/* RIGHT SIDE: Text Content */}
          <div className="relative h-[60vh] flex flex-col justify-center">
            {services.map((service, index) => (
              <StackedText
                key={index}
                service={service}
                index={index}
                total={services.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// Sub-component for the Image Stack Logic
function StackedImage({ service, index, total, progress }: { service: any, index: number, total: number, progress: MotionValue }) {
  
  const step = 1 / (total - 1); // Size of one transition step
  const start = index * step;
  const end = start + step;

  // The Z-Index is reversed. First item is on top (40), last is bottom (10).
  const zIndex = total - index;

  // Calculate movement
  // If it's the last item, it stays at 0% (doesn't slide up).
  // Otherwise, it slides from 0% to -100% (upwards) as scroll passes its sector.
  const y = useTransform(
    progress,
    [start, end],
    ['0%', index === total - 1 ? '0%' : '-100%']
  );

  // Optional: Add a slight scale effect to the image *behind* to make it feel like it's coming forward
  // We only scale if this is NOT the first item
  // This is a subtle polish seen in high-end sites
  const scale = useTransform(
    progress,
    // When the previous item (index - 1) is moving away...
    [(index - 1) * step, index * step], 
    [0.9, 1] 
  );

  // If it's the first item, no scaling needed.
  const finalScale = index === 0 ? 1 : scale;

  return (
    <motion.div
      style={{ 
        y, 
        zIndex, 
        scale: index === 0 ? 1 : finalScale 
      }}
      className="absolute inset-0 w-full h-full will-change-transform"
    >
      <img 
        src={service.img} 
        alt={service.title} 
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

// Sub-component for the Text Fade Logic
function StackedText({ service, index, total, progress }: { service: any, index: number, total: number, progress: MotionValue }) {
  const step = 1 / (total - 1);
  const start = index * step;
  const end = start + step;

  // Opacity Logic:
  // Visible only when this specific slide is "active"
  // We create a small buffer so text fades nicely
  const opacity = useTransform(
    progress,
    [start - step/2, start, end - step/2, end], 
    [0, 1, 1, 0]
  );
  
  // Special case for first and last items to ensure they are visible at start/end
  let finalOpacity = opacity;
  if (index === 0) {
    finalOpacity = useTransform(progress, [0, step/2], [1, 0]);
  } else if (index === total - 1) {
    finalOpacity = useTransform(progress, [start - step/2, start], [0, 1]);
  }

  // Slide effect for text
  const y = useTransform(
    progress,
    [start - step/2, start, end - step/2],
    [50, 0, -50]
  );
  
  // Disable pointer events when not active so we can click buttons correctly
  const pointerEvents = useTransform(finalOpacity, (v) => v > 0.5 ? "auto" : "none");

  return (
    <motion.div
      style={{ opacity: finalOpacity, y: index === total - 1 ? 0 : y, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 rounded-full bg-black" />
        <span className="text-black font-semibold uppercase tracking-widest text-sm">
          {service.category}
        </span>
      </div>
      
      <h3 className="text-5xl md:text-7xl font-semibold text-black mb-8 leading-tight">
        {service.title}
      </h3>
      
      <p className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed mb-10">
        {service.description}
      </p>
      
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full w-fit font-medium transition-colors"
      >
        LEARN MORE
        <div className="bg-white/20 p-1.5 rounded-full">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </motion.button>
    </motion.div>
  );
}