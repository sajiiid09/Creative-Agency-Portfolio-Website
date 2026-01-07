'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const assets = [
  { src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a437c887f81eeb0e3_Modern%20Keyboard%20Close-Up.webp', alt: 'Keyboard', className: 'top-0 left-[10%] w-32 md:w-48 rotate-[-6deg]' },
  { src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a70c7da6d8e84b00d_Modern%20Pastel%20Chair.webp', alt: 'Chair', className: 'top-20 right-[15%] w-40 md:w-56 rotate-[12deg]' },
  { src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66b451619260e657a43_Pristine%20White%20Sneakers%20on%20Light%20Blue%20Background.webp', alt: 'Sneakers', className: 'bottom-10 left-[20%] w-36 md:w-52 rotate-[4deg]' },
  { src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66aaf9aa1041b8b3d8b_Minimalist%20Fashion%20Pose.webp', alt: 'Fashion', className: 'top-[40%] left-[5%] w-28 md:w-40 rotate-[-15deg]' },
  { src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a260387e191729798_Modern%20Gaming%20Controller.webp', alt: 'Controller', className: 'bottom-[20%] right-[5%] w-32 md:w-44 rotate-[-8deg]' },
  { src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a95b7b1338ffaefc6_Urban%20Chic%20in%20Pink%20and%20Teal.webp', alt: 'Chic', className: 'top-[10%] right-[35%] w-24 md:w-36 rotate-[6deg] z-0' },
];

const stats = [
  { label: 'Clients', value: 120, suffix: '+' },
  { label: 'Projects', value: 350, suffix: '+' },
  { label: 'Developers', value: 20, suffix: '+' },
  { label: 'AI Engineers', value: 15, suffix: '+' },
];

const CounterItem = ({ value, label, suffix }: { value: number, label: string, suffix: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-semibold mb-2 flex justify-center items-center">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-sm uppercase tracking-widest text-black/60">{label}</p>
    </div>
  );
};

export default function Metrics() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        
        {/* Headline */}
        <div className="relative z-20 text-center max-w-2xl mb-24 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
          >
            We are always striving to bring cutting-edge ideas to life.
          </motion.h2>
        </div>

        {/* Scattered Images Container */}
        {/* Hidden on very small screens to avoid clutter, visible on md+ */}
        <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-10">
          {assets.map((img, idx) => (
            <motion.div
              key={idx}
              className={`absolute ${img.className} rounded-2xl overflow-hidden shadow-2xl border-4 border-white`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              animate={{ 
                y: [0, -15, 0],
              }}
              // Add floating animation
              // We use a randomized duration/delay for natural feel
              // but for simplicity here we assume standard spring
            >
              <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ 
                   duration: 3 + idx, 
                   repeat: Infinity, 
                   ease: "easeInOut",
                   delay: idx * 0.5 
                 }}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="relative z-20 w-full grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-black/10 pt-16">
          {stats.map((stat, idx) => (
            <CounterItem key={idx} {...stat} />
          ))}
        </div>

      </div>
    </section>
  );
}
