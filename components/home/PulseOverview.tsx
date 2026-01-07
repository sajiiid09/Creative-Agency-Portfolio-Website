'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. DATA CONFIGURATION (Extracted from your HTML) ---

type MediaType = 'video' | 'image';

interface TabData {
  id: string;
  label: string;
  color: string; // Hex color for active state
  iconPath: React.ReactNode;
  features: {
    title: string;
    desc: string;
    link: string;
    icon: React.ReactNode;
  }[];
  media: {
    type: MediaType;
    src: string;
    poster?: string;
  };
}

const TABS: TabData[] = [
  {
    id: 'publishing',
    label: 'Publishing',
    color: '#1067FE',
    iconPath: <path d="M10.8622 12.982L1.9552 9.50209C1.20927 9.23105 1.21405 8.18265 1.96243 7.91832L21.5431 1.00236C22.4094 0.696383 23.2452 1.52569 22.9368 2.3852L15.9663 21.8124C15.6999 22.555 14.6432 22.5597 14.37 21.8196L10.8622 12.982ZM10.8622 12.982L18.2191 5.625" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />,
    features: [
      {
        title: 'Content Calendar',
        desc: 'Plan, organize, and schedule posts for consistent publishing.',
        link: '#',
        icon: <path d="M18.5 3H5.5C3.01472 3 1 5.01472 1 7.5V9V18.5C1 20.9853 3.01472 23 5.5 23H18.5C20.9853 23 23 20.9853 23 18.5V9V7.5C23 5.01472 20.9853 3 18.5 3Z" fill="#4F95FF" opacity="0.2"/>
      },
      {
        title: 'AI Pilot',
        desc: 'Breakthrough the creative barriers and generate engaging content.',
        link: '#',
        icon: <path fillRule="evenodd" clipRule="evenodd" d="M24.0044 5.14544C21.1594 5.14544 18.8616 2.83729 18.8616 0C18.8616 2.83729 16.5546 5.14544 13.7188 5.14544C16.5546 5.14544 18.8616 7.44447 18.8616 10.2818C18.8616 7.44447 21.1594 5.14544 24.0044 5.14544Z" fill="#FFAF15"/>
      },
      {
        title: 'Bulk Scheduling',
        desc: 'Manage the social calendar with 500+ posts scheduled at once.',
        link: '#',
        icon: <path d="M12 0.75L0.75 6.375L12 12L23.25 6.375L12 0.75Z" fill="#23A06C" stroke="#23A06C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      }
    ],
    media: {
      type: 'video',
      src: 'https://video-production.socialpilot.co/1419985/Publishing-new.webm',
      poster: 'https://www.socialpilot.co/wp-content/uploads/2025/06/video-frame.webp'
    }
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    color: '#23A06C',
    iconPath: <g><path d="M12.5 10C9.73858 10 7.5 12.3505 7.5 15.25V18C7.5 19.6569 8.84315 21 10.5 21H14.5C16.1569 21 17.5 19.6569 17.5 18V15.25C17.5 12.3505 15.2614 10 12.5 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.5 12C3.29086 12 1.5 13.8804 1.5 16.2C1.5 17.7464 2.7536 19 4.3 19H7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></g>,
    features: [
      {
        title: 'Approvals On-The-Go',
        desc: 'Streamline social content review, feedback, and approval.',
        link: '#',
        icon: <path d="M10.4957 1.71712C11.2924 0.807696 12.7076 0.807697 13.5043 1.71712L14.0592 2.35046C14.5429 2.90255 15.2901 3.14534 16.0059 2.98299" fill="#47BA8A"/>
      },
      {
        title: 'Content Library',
        desc: 'Access pre-approved content from the library for quick publishing.',
        link: '#',
        icon: <path fillRule="evenodd" clipRule="evenodd" d="M14.7695 3.73657C14.2324 3.8648 13.9008 4.40423 14.0291 4.94142L18.1292 22.118C18.2574 22.6552 18.7969 22.9867 19.3341 22.8585" fill="#FFC55B"/>
      }
    ],
    media: {
      type: 'video',
      src: 'https://video-production.socialpilot.co/1419985/colaboration-new.webm',
      poster: 'https://www.socialpilot.co/wp-content/uploads/2025/06/video-frame.webp'
    }
  },
  {
    id: 'engagement',
    label: 'Engagement',
    color: '#E85150',
    iconPath: <g><path d="M18.5 2H5.5C3.01472 2 1 4.01472 1 6.5V15.5C1 17.9853 3.01472 20 5.5 20H9L12 23L15 20H18.5C20.9853 20 23 17.9853 23 15.5V6.5C23 4.01472 20.9853 2 18.5 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></g>,
    features: [
      {
        title: 'Social Media Inbox',
        desc: 'Monitor and respond instantly to the comments and messages.',
        link: '#',
        icon: <path fillRule="evenodd" clipRule="evenodd" d="M5.5 2H18.5C20.3925 2 22.0122 3.16829 22.6771 4.823" fill="#4F95FF"/>
      }
    ],
    media: {
      type: 'image', // Placeholder based on engagement tab image in HTML
      src: 'https://www.socialpilot.co/wp-content/uploads/2025/06/engagement.webp'
    }
  },
  {
    id: 'analytics',
    label: 'Analytics',
    color: '#CF60F0',
    iconPath: <g><rect x="2" y="13" width="5" height="10" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><rect x="10" y="7" width="5" height="16" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><rect x="18" y="2" width="5" height="21" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></g>,
    features: [
      {
        title: 'Social Analytics',
        desc: 'Track views, likes, comments, and shares on posts and pages.',
        link: '#',
        icon: <path d="M6 15.5C6 16.8807 4.88071 18 3.5 18C2.11929 18 1 16.8807 1 15.5C1 14.1193 2.11929 13 3.5 13" fill="#47BA8A"/>
      },
      {
        title: 'Advanced Reports',
        desc: 'Customize reports with metrics that matter and automate deliveries.',
        link: '#',
        icon: <path d="M15.7081 0H4C2.89543 0 2 0.89543 2 2V22C2 23.1046 2.89543 24 4 24H20C21.1046 24 22 23.1046 22 22V6.35796" fill="#FB817F"/>
      }
    ],
    media: {
      type: 'image',
      src: 'https://www.socialpilot.co/wp-content/uploads/2025/06/analytics_web.webp'
    }
  },
  {
    id: 'reviews',
    label: 'Reviews',
    color: '#FFAF15',
    iconPath: <path d="M11.818 1.40009C11.889 1.24386 12.111 1.24386 12.182 1.40009L15.3105 8.27576C15.3396 8.33974 15.4002 8.38374 15.47 8.39165L22.9759 9.2423" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>,
    features: [
      {
        title: 'Review Management',
        desc: 'Track and respond to all Facebook and Google Business reviews.',
        link: '#',
        icon: <path d="M11.0903 2.99245C11.4462 2.21288 12.5538 2.21288 12.9097 2.99245L15.1299 7.85535" fill="#FFC55B"/>
      }
    ],
    media: {
      type: 'image',
      src: 'https://www.socialpilot.co/wp-content/uploads/2025/06/reviews.webp'
    }
  }
];

export default function PulseOverview() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeContent = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.2]">
            Top-Tier Capabilities Designed <br className="hidden md:block" />
            for Scaling Marketing Agencies and Brands
          </h2>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap justify-center border-b border-gray-200 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group flex items-center gap-3 px-6 py-4 md:px-10 md:py-6 border-b-2 text-base md:text-lg font-semibold transition-all duration-200
                ${activeTab === tab.id 
                  ? 'border-current text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
              style={{ color: activeTab === tab.id ? tab.color : undefined }}
            >
              {/* Icon SVG Container */}
              <svg 
                width="24" height="24" viewBox="0 0 24 24" fill="none" 
                className={`transition-colors duration-200 ${activeTab === tab.id ? '' : 'stroke-gray-400 group-hover:stroke-gray-600'}`}
                style={{ stroke: activeTab === tab.id ? tab.color : undefined }}
              >
                {tab.iconPath}
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[500px]">
          
          {/* LEFT COLUMN: Feature List */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-10"
              >
                {activeContent.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-5 group cursor-pointer">
                    {/* Feature Icon */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center">
                       <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                         {feature.icon}
                       </svg>
                    </div>
                    {/* Feature Text */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {feature.desc}
                      </p>
                      <a 
                        href={feature.link} 
                        className="text-blue-600 font-semibold text-base mt-2 inline-flex items-center gap-1 hover:underline"
                      >
                        Learn More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Media Preview */}
          <div className="lg:col-span-8">
             <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-[16/9] border border-gray-200">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.4 }}
                   className="absolute inset-0 w-full h-full"
                 >
                   {activeContent.media.type === 'video' ? (
                     <video 
                       className="w-full h-full object-cover"
                       src={activeContent.media.src} 
                       poster={activeContent.media.poster}
                       autoPlay 
                       loop 
                       muted 
                       playsInline 
                     />
                   ) : (
                     <img 
                       src={activeContent.media.src} 
                       alt={activeContent.label} 
                       className="w-full h-full object-cover"
                     />
                   )}
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}