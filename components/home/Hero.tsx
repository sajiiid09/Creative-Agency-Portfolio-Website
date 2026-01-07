
'use client';

import React, { useRef, useState } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useScroll,
  useVelocity,
  AnimatePresence 
} from 'framer-motion';

const allImages = [
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a05fd7ef83f7891c8de8cf_Vivid%20Portrait%20with%20Bold%20Colors.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a06008abba88ce9c298e21_Modern%20Digital%20Alarm%20Clock.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a06151478c76ab4363e948_Dapper%20Young%20Man%20with%20Stylish%20Attire%20and%20Joyful%20Smile.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a061f4c6476b52f101c546_Tennis%20Court%20Smiley.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a06273d7ac585cdfd38aff_Striking%20Fashion%20Portrait.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a45215a4a12e56b42_Minimalist%20Object%20Display.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a0644e4273b79085a54536_Dynamic%20Basketball%20Action.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a064a3345c18200dff8cbf_Baseball%20Armchair%20Concept.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a05e16480e875b283de085_Minimalist%20Fashion%20Pose.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a0635361fda760fd73dd59_Geometric%20Object%20Display.webp',
  'https://cdn.prod.website-files.com/689989c2270f878736e77521/68a0652e9342e48ac7b62412_Vibrant%20Portrait%20Style.webp',
];

export default function StylerHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shuffleIdx, setShuffleIdx] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const velX = useVelocity(mouseX);
  const rotationVal = useTransform(velX, [-2500, 2500], [-18, 18]);
  const smoothRotation = useSpring(rotationVal, { stiffness: 400, damping: 40 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
    if (dist > 75) {
      setShuffleIdx((prev) => (prev + 1) % allImages.length);
      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[400vh] bg-white"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        
        <AnimatePresence>
          {hoveredImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 z-40"
            >
              <img src={hoveredImage} className="w-full h-full object-cover" alt="Preview" />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="absolute z-10 text-[26vw] font-semibold tracking-tighter text-black select-none uppercase leading-none opacity-100">
          Pulse
        </h1>

        <AnimatePresence>
          {!hoveredImage && (
            <motion.div 
              style={{ rotate: smoothRotation }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-20 w-[24vw] aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-[14px] border-white bg-white"
            >
              <img src={allImages[shuffleIdx]} className="w-full h-full object-cover" alt="Shuffle" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ARC ELEMENTS CAROUSEL */}
        <div className="absolute inset-0 z-50 pointer-events-none flex items-end justify-center pb-12">
          <div className="relative w-full h-[300px] flex items-center justify-center max-w-[1400px]">
            {allImages.map((img, i) => {
              // Stagger each image's journey through the arc
              // Each image starts its journey at a different scroll point
              const itemCount = allImages.length;
              const delay = i / itemCount;
              
              // Each image gets a local progress from 0 to 1 as it travels the arc
              const localStart = delay;
              const localEnd = Math.min(1, delay + 0.4); // 40% of scroll duration per image
              
              // Map scroll to this image's journey progress (0 = right entry, 0.5 = center apex, 1 = left exit)
              const imageProgress = useTransform(
                scrollYProgress,
                [localStart, localEnd],
                [0, 1]
              );
              
              // Horizontal position: right → center → left
              const xPos = useTransform(imageProgress, [0, 0.5, 1], [600, 0, -600]);
              
              // Vertical position (arc): low → high (apex) → low
              // Using a parabolic curve for smooth arc
              const yPos = useTransform(
                imageProgress,
                [0, 0.5, 1],
                [200, -100, 200]
              );
              
              // Rotation: tilted right → straight → tilted left
              const rotation = useTransform(
                imageProgress,
                [0, 0.5, 1],
                [35, 0, -35]
              );
              
              // Opacity: fade in at entry, visible through journey, fade out at exit
              const opacity = useTransform(
                imageProgress,
                [0, 0.1, 0.9, 1],
                [0, 1, 1, 0]
              );
              
              // Scale: slightly smaller at edges, full size at center
              const scale = useTransform(
                imageProgress,
                [0, 0.5, 1],
                [0.8, 1, 0.8]
              );

              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredImage(img)}
                  onMouseLeave={() => setHoveredImage(null)}
                  style={{ 
                    x: xPos,
                    y: yPos,
                    rotate: rotation,
                    opacity: opacity,
                    scale: scale
                  }}
                  className="absolute w-24 h-32 sm:w-40 sm:h-56 rounded-3xl overflow-hidden border-4 border-white shadow-xl cursor-pointer bg-white origin-bottom pointer-events-auto will-change-transform"
                >
                  <img src={img} className="w-full h-full object-cover pointer-events-none" alt="" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}