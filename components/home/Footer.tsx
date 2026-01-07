'use client';

import React from 'react';
import { motion } from 'framer-motion';

const socialIcons = [
  { name: 'Twitter', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e77560_twitter.png' },
  { name: 'Instagram', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e77624_instagram-black.webp' },
  { name: 'Facebook', src: 'https://cdn.prod.website-files.com/689989c2270f878736e77521/689989c2270f878736e7761d_facebook-black.webp' },
];

const links = {
  explore: ['Home', 'About', 'Works', 'Services', 'Contact'],
  more: ['Style Guide', 'Licensing', 'Changelog', 'Password', '404'],
  contact: ['123 Styler Ave, NY', 'contact@styler.com', '+1 (555) 012-3456']
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-24 pb-8 overflow-hidden rounded-t-[2.5rem]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Section: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">Pulse.</h2>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Crafting digital experiences that blend creativity with technology.
            </p>
            <div className="flex gap-4 mt-4">
              {socialIcons.map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <img src={icon.src} alt={icon.name} className="w-5 h-5 object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Explore */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold mb-2">Explore</h4>
              {links.explore.map((link, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
              ))}
            </div>
            {/* More */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold mb-2">More</h4>
              {links.more.map((link, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
              ))}
            </div>
            {/* Contacts */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold mb-2">Contacts</h4>
              {links.contact.map((info, i) => (
                <span key={i} className="text-gray-400">{info}</span>
              ))}
            </div>
          </div>

        </div>

        {/* Big Text Feature */}
        <div className="border-t border-white/10 pt-20 pb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10vw] font-semibold leading-none text-center tracking-tight"
          >
            Design is Our Passion.
          </motion.h1>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Styler. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Built by Yves Adrales</span>
            <span>Powered by Webflow</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
