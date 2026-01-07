'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const leftColumnProjects = [
  {
    title: "Elegant",
    tag: "Design",
    src: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a07c52d7ac585cdfd6fa7e_Elegant%20Blonde%20Profile.webp"
  },
  {
    title: "Digital",
    tag: "Marketing",
    src: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a07c0514986ec265bcd4e7_Modern%20Design%20Objects.webp"
  }
];

const rightColumnProjects = [
  {
    title: "Vibrant",
    tag: "Branding",
    src: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a07c6aeaa832d6e630e0ef_Vibrant%20Sports%20Jersey.webp"
  },
  {
    title: "Texture",
    tag: "Design",
    src: "https://cdn.prod.website-files.com/689989c2270f878736e77534/68a07c8e09898fa9493b1bbc_Modern%20Elegance%20Tech%20%26%20Texture.webp"
  }
];

const ProjectCard = ({ project }: { project: typeof leftColumnProjects[0] }) => (
  <div className="group relative w-full mb-12 sm:mb-20">
    <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] w-full aspect-[4/5] sm:aspect-[3/4]">
      <motion.img
        src={project.src}
        alt={project.title}
        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </div>
    <div className="mt-4 sm:mt-6 flex justify-between items-center px-2">
      <h3 className="text-2xl sm:text-3xl font-semibold">{project.title}</h3>
      <span className="text-sm uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full text-black/60">
        {project.tag}
      </span>
    </div>
  </div>
);

export default function FeaturedWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the right column
  // It moves faster/more than natural scroll to create depth
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} className="w-full py-24 sm:py-32 px-4 sm:px-8 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight max-w-4xl"
          >
            Featured Works for <br /> Our Incredible Clients.
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 relative">
          
          {/* Left Column (Static) */}
          <div className="flex flex-col">
            {leftColumnProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>

          {/* Right Column (Parallax) */}
          {/* Added mt to create the staggered masonry look initially */}
          <motion.div 
            style={{ y }} 
            className="flex flex-col md:mt-32 lg:mt-48"
          >
            {rightColumnProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
