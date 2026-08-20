import React, { useState } from 'react';
import { Leaf, Send, MapPin, Phone, Mail, Sparkles } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = ({ setActivePage, setSelectedCategory }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const handleLinkClick = (page, category = null) => {
    setActivePage(page);
    if (category && setSelectedCategory) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Curated premium images simulating Instagram feed grid
  const instagramGrid = [
    { id: 1, url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80", tag: "Drying Pepper" },
    { id: 2, url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=150&q=80", tag: "Kashmiri Chilis" },
    { id: 3, url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=150&q=80", tag: "Cardamom Pods" },
    { id: 4, url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80", tag: "Stone Roasting" },
    { id: 5, url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=150&q=80&q=turmeric", tag: "Lakadong Harvest" },
    { id: 6, url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80&q=gift", tag: "Gift Packing" }
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 font-sans border-t-4 border-terracotta-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Summary */}
          <div className="space-y-4">
            <span className="flex items-center gap-1.5 font-serif text-2xl font-bold tracking-tight text-white">
              M3_spices <span className="text-saffron-400 font-sans text-lg">🌱</span>
            </span>
            <p className="text-xs leading-relaxed text-neutral-400">
              M3_spices (*Veda Spice Co.*) specializes in farm-to-table organic artisanal spices. We partner directly with Indian estate growers in Wayanad, Kashmir, and Meghalaya, cutting out middlemen to deliver fresh, high-oil-content culinary treasures.
            </p>
            <div className="space-y-2 pt-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-saffron-400 shrink-0" />
                <span>108 Spice Lane, Fort Kochi, KL, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-saffron-400 shrink-0" />
                <span>+91 484 223 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-saffron-400 shrink-0" />
                <span>sourcing@veda-spice.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-neutral-800 pb-2">
              Explore Our Store
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-saffron-400 transition-colors text-left">
                  Our Sourcing Story
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-saffron-400 transition-colors text-left">
                  Browse All Spices
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop', 'Ground Blends')} className="hover:text-saffron-400 transition-colors text-left">
                  Organic Ground Blends
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop', 'Whole Spices')} className="hover:text-saffron-400 transition-colors text-left">
                  Single-Origin Whole Pods
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('quiz')} className="hover:text-saffron-400 flex items-center gap-1 transition-colors text-left text-saffron-400 font-medium">
                  <Sparkles className="h-3.5 w-3.5" /> Flavor Matcher Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Instagram Feed Grid Simulation */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-neutral-800 pb-2 flex items-center gap-1.5">
              <InstagramIcon className="h-4 w-4 text-saffron-400" /> Instagram Feed
            </h3>
            <p className="text-[10px] text-neutral-500 -mt-2">Follow our sourcing trail @M3_spices</p>
            <div className="grid grid-cols-3 gap-2">
              {instagramGrid.map((img) => (
                <div 
                  key={img.id} 
                  className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-800"
                >
                  <img 
                    src={img.url} 
                    alt={img.tag} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white text-center px-1 font-sans">
                      {img.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup (15% off) */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide border-b border-neutral-800 pb-2">
              Claim Your 15% Off
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Join the Veda Spice Circle. Subscribe to receive single-origin harvesting alerts, farm reports, and a 15% discount code on your first purchase.
            </p>
            
            {submitted ? (
              <div className="p-3 bg-terracotta-500/10 text-saffron-400 border border-terracotta-500/20 rounded-xl text-xs font-semibold animate-fade-in">
                📩 Code SENT! Check your inbox for your 15% off coupon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter gourmet email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-saffron-400 focus:border-saffron-400 font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 p-1.5 bg-saffron-500 hover:bg-saffron-600 rounded-full text-neutral-900 transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Social Share Buttons */}
            <div className="flex items-center gap-3 pt-3">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans">Share Brand:</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-saffron-400 hover:bg-neutral-700 transition-all">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-saffron-400 hover:bg-neutral-700 transition-all">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-saffron-400 hover:bg-neutral-700 transition-all flex items-center justify-center">
                <span className="font-bold text-[10px] font-sans h-4 w-4 leading-4 text-center">P</span>
              </a>
            </div>
          </div>

        </div>

        {/* SEO Keywords footer list & bottom copyright */}
        <div className="border-t border-neutral-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-[10px]">
          <div className="text-center md:text-left leading-relaxed">
            <p>© 2026 M3_spices (Veda Spice Co.). All Rights Reserved.</p>
            <p className="mt-1">
              Popular Tags: <strong className="text-neutral-400">organic artisanal spices</strong>, <strong className="text-neutral-400">buy pure Indian spices online</strong>, <strong className="text-neutral-400">hand-ground masala blends</strong>, <strong className="text-neutral-400">single-origin cardamom</strong>.
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleLinkClick('home')} className="hover:underline hover:text-neutral-400 text-[10px]">
              Privacy & Ethical Policy
            </button>
            <button onClick={() => handleLinkClick('shop')} className="hover:underline hover:text-neutral-400 text-[10px]">
              Shipping & Sourcing Terms
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
