'use client';

/**
 * SECTION 02 (intro) — preserved editorial word-by-word reveal with inline
 * media chips, re-written for Pulse.
 */
import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { MessageCircle, ReceiptText } from 'lucide-react';
import { ANCHORS, CHAOS } from '@/content/pulse';
import { Eyebrow } from '../ui/primitives';

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', damping: 22, stiffness: 110 } },
};

function Chip({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative mx-2 inline-flex h-[0.86em] w-[1.5em] translate-y-[-0.06em] items-center justify-center overflow-hidden rounded-full align-middle shadow-soft sm:mx-3 sm:w-[1.7em] sm:rounded-[0.32em] ${className}`}>
      {children}
    </span>
  );
}

export default function IntroReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <section id={ANCHORS.product} className="relative overflow-hidden bg-mesh-soft px-5 pb-10 pt-28 sm:pt-36 md:pt-44">
      <div className="mx-auto max-w-6xl text-center">
        <Eyebrow className="mb-8">{CHAOS.eyebrow}</Eyebrow>
        <motion.h2
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          aria-label={CHAOS.headline}
          className="text-balance font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-forest sm:text-6xl md:text-7xl lg:text-[86px]"
        >
          <span aria-hidden>
            <motion.span variants={item} className="inline-block">Your business</motion.span>{' '}
            <motion.span variants={item} className="inline-block">happens in</motion.span>
            <motion.span variants={item} className="inline-block">
              <Chip className="bg-teal text-white">
                <MessageCircle className="h-[0.42em] w-[0.42em]" />
              </Chip>
            </motion.span>
            <motion.span variants={item} className="inline-block">conversations.</motion.span>{' '}
            <br className="hidden md:block" />
            <motion.span variants={item} className="inline-block text-teal">Pulse brings</motion.span>
            <motion.span variants={item} className="inline-block">
              <Chip>
                <img src="/media/products/sneakers-white.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
              </Chip>
            </motion.span>
            <motion.span variants={item} className="inline-block text-teal">it all</motion.span>
            <motion.span variants={item} className="inline-block">
              <Chip className="bg-brand text-forest">
                <ReceiptText className="h-[0.42em] w-[0.42em]" />
              </Chip>
            </motion.span>
            <motion.span variants={item} className="inline-block text-teal">together.</motion.span>
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
