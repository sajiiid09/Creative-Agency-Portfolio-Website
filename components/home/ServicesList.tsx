'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    name: "Product shots",
    link: "https://www.trend.io/content-type/content-type-details-page-product-photography?",
    src: "https://cdn.prod.website-files.com/62c13e3f6b73683c91c0df7c/62c5d7b93f28cc55513c3b01_daviscadam-D299652E-820B-4936-AE70-1B09C270E7A0.jpg",
    type: "image"
  },
  {
    name: "Testimonial videos",
    link: "/testimonial_video.mp4",
    src: "/testimonial_video.mp4",
    type: "video"
  },
  {
    name: "Unboxing videos",
    link: "/unboxing_vid.mp4",
    src: "/unboxing_vid.mp4",
    type: "video"
  },
  {
    name: "Product in action videos",
    link: "https://cdn.pixabay.com/video/2024/04/27/209634_large.mp4",
    src: "https://cdn.pixabay.com/video/2024/04/27/209634_large.mp4",
    type: "video"
  },
  {
    name: "Portrait style shots",
    link: "https://www.trend.io/content-type/content-type-details-page-portrait-photography?",
    src: "https://cdn.prod.website-files.com/62c13e3f6b73683c91c0df7c/62c5d8e1ec90be50700b14a7_tangtangjulia-bba7c89c-5657-46a3-af78-25e87f3e0dcc%20(1).jpg",
    type: "image"
  },
  {
    name: "Lifestyle shots",
    link: "https://www.trend.io/content-type/content-type-details-page-lifestyle-photography?",
    src: "https://cdn.prod.website-files.com/62c13e3f6b73683c91c0df7c/62dd899be724d74efb5858ec_jr_abernathy-0a57ed48-73b1-413d-b35c-a6997c17ea89.jpg",
    type: "image"
  }
];

export default function ServicesList() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth follow
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // We want the image to be positioned relative to the viewport or container.
    // Since it's fixed, clientX/Y works best.
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 sm:py-32 bg-white text-black cursor-default overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Headline */}
        <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-6xl sm:text-6xl font-semibold mb-24 sm:mb-36"
        >
          User-generated content that boosts sales and builds trust.
        </motion.h2>

        {/* List */}
        <div className="flex flex-col border-t border-black/10">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative flex items-center justify-between py-12 sm:py-16 border-b border-black/10 transition-colors duration-300 hover:bg-gray-50 px-2 sm:px-4"
            >
              <h3 className="text-2xl sm:text-4xl md:text-6xl font-semibold tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                {service.name}
              </h3>
              
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Reveal Image */}
      <AnimatePresence>
        {activeService !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ 
              x, 
              y,
              translateX: '-50%',
              translateY: '-50%' 
            }}
            className="fixed top-0 left-0 z-50 pointer-events-none w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900"
          >
            {services[activeService].type === 'video' ? (
              <video
                src={services[activeService].src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={services[activeService].src}
                alt={services[activeService].name}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
