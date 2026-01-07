'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';

const assets = {
  robot: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp',
  bags: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66ced2610f6911fafcf_Glossy%20Tote%20Bags%20on%20Vibrant%20Background.webp',
  hat: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp',
};

export default function HeroTextReveal() {
  const containerRef = useRef(null);
  // Using useInView to trigger animation when the component enters viewport
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 60, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      } 
    },
  };

  const InlineImage = ({ src, alt }: { src: string; alt: string }) => (
    <span className="inline-block align-middle mx-2 sm:mx-4 relative h-[0.9em] w-[1.4em] sm:w-[1.6em] overflow-hidden rounded-full sm:rounded-2xl shadow-lg bg-gray-100">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </span>
  );

  return (
    <section className="w-full py-24 sm:py-32 md:py-48 px-4 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          ref={containerRef}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.2] tracking-tight -tracking-[0.03em]"
        >
          <motion.span variants={item} className="inline-block">Pulse blends</motion.span>
          
          <motion.span variants={item} className="inline-block">
            <InlineImage src={assets.robot} alt="Robot" />
          </motion.span>
          
          <motion.span variants={item} className="inline-block">creativity with</motion.span>
          
          <br className="hidden md:block" />
          
          <motion.span variants={item} className="inline-block">technology to</motion.span>
          
          <motion.span variants={item} className="inline-block">
            <InlineImage src={assets.bags} alt="Tote Bags" />
          </motion.span>
          
          <motion.span variants={item} className="inline-block">change</motion.span>
          
          <br className="hidden md:block" />

          <motion.span variants={item} className="inline-block">how branding</motion.span>
          
          <motion.span variants={item} className="inline-block">
             <InlineImage src={assets.hat} alt="Fashion Hat" />
          </motion.span>
          
          <motion.span variants={item} className="inline-block">meets reality.</motion.span>
        </motion.h2>
      </div>
    </section>
  );
}
