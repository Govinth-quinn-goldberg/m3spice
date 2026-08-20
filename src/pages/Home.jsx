import React, { useState, useEffect } from 'react';
import { ArrowRight, Leaf, ShieldCheck, Heart, Sparkles, BookOpen, Quote, TrendingUp, TrendingDown } from 'lucide-react';
import { products } from '../data/products';
import { blogPosts } from '../data/blogPosts';

const Home = ({ setActivePage, onProductClick, onBlogClick }) => {
  // Simulated Live Market Commodity Auction Prices (₹ / kg or gram)
  const [marketPrices, setMarketPrices] = useState([
    { name: "Kashmir Mongra Saffron", price: 315000, unit: "kg", change: 0.8, trend: "up" },
    { name: "Green Cardamom (Jumbo)", price: 3420, unit: "kg", change: -1.2, trend: "down" },
    { name: "Malabar Black Pepper", price: 745, unit: "kg", change: 1.5, trend: "up" },
    { name: "Idukki Cloves (Bold)", price: 1180, unit: "kg", change: 0.3, trend: "up" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMarketPrices(prevPrices => 
        prevPrices.map(item => {
          // Fluctuate price by a small percentage
          const percent = (Math.random() * 0.4 - 0.2) / 100; // -0.2% to +0.2%
          const delta = Math.round(item.price * percent);
          const newPrice = Math.max(10, item.price + (delta === 0 ? (Math.random() > 0.5 ? 2 : -2) : delta));
          const changeVal = parseFloat(((newPrice - (item.price / (1 + percent))) / newPrice * 100).toFixed(2));
          return {
            ...item,
            price: newPrice,
            change: changeVal,
            trend: changeVal >= 0 ? "up" : "down"
          };
        })
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Filter out the 3 distinct cardamom products for the hero section
  const cardamomProducts = products.filter(p => p.id.includes('cardamom'));
  // Select best sellers (excluding cardamom to avoid duplication, or just other popular ones)
  const otherBestSellers = products.filter(p => !p.id.includes('cardamom')).slice(0, 3);
  // Select latest blog post
  const latestPost = blogPosts[0];

  const valueProps = [
    {
      icon: Leaf,
      title: "100% Organic Sourcing",
      desc: "Zero chemical fumigants or pesticides. We preserve the earth and harvest in native shade ecosystems."
    },
    {
      icon: ShieldCheck,
      title: "Traceable Micro-Lots",
      desc: "Bypass warehouse degradation. We partner directly with smallholder farmers in Wayanad, Idukki, and Kashmir."
    },
    {
      icon: Heart,
      title: "Double the Fair Trade",
      desc: "By paying our growers 120% above local market rates, we support sustainable communities and premium crop care."
    }
  ];

  const steps = [
    { num: "01", name: "High-Oil Cultivation", desc: "Harvested only at peak ripeness under native shade canopy." },
    { num: "02", name: "Sun-Dried Cure", desc: "Slow natural moisture removal on local artisanal straw mats." },
    { num: "03", name: "Bi-Weekly Milling", desc: "Cold stone-ground in micro-batches to lock in volatile oils." },
    { num: "04", name: "UV Glass Sealing", desc: "Shipped in protective jars directly to your kitchen." }
  ];

  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* Live Market Price Feed Section */}
      <section className="bg-white border border-saffron-100 rounded-2xl p-4 shadow-sm text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <h3 className="font-serif text-sm font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
              Live Spices Auction Market Feed
            </h3>
            <span className="text-[9px] font-sans text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">Daily Commodity Updates</span>
          </div>

          {/* Pricing Feed Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 lg:max-w-4xl lg:ml-6">
            {marketPrices.map((item, idx) => (
              <div 
                key={idx}
                className="bg-cream-100 border border-saffron-50 rounded-xl p-2.5 flex items-center justify-between transition-all duration-500 hover:shadow-inner"
              >
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-500 truncate max-w-[120px]">{item.name}</h4>
                  <p className="text-xs font-bold text-neutral-800 font-sans mt-0.5">
                    ₹{item.price.toLocaleString('en-IN')} <span className="text-[8.5px] font-normal text-neutral-400">/ {item.unit}</span>
                  </p>
                </div>
                <span className={`flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  item.trend === 'up' 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {item.trend === 'up' ? '+' : ''}{item.change}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section focusing on Cardamom */}
      <section className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white min-h-[620px] flex flex-col justify-between shadow-xl border border-neutral-800 p-8 sm:p-12 gap-8">
        
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-25 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/90 to-neutral-950"></div>

        {/* Top Text content */}
        <div className="relative z-10 max-w-3xl space-y-4 text-left">
          <span className="inline-flex items-center gap-1.5 bg-saffron-500/20 border border-saffron-500/30 text-saffron-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full font-sans">
            <Sparkles className="h-3.5 w-3.5" /> 100% Organically Cultivated
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif leading-[1.1] text-white">
            From our farms directly to your kitchen. <br/>
            <span className="text-saffron-400">Pure, natural, ethically cultivated.</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed font-sans">
            M3_spices introduces our signature single-origin green cardamom harvest. Ethically sourced from forest-shaded hills, slowly kiln-cured, and milled bi-weekly to capture unparalleled volatile oil compounds.
          </p>
        </div>

        {/* Cardamom Cards Side-by-Side */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {cardamomProducts.map((card) => (
            <div
              key={card.id}
              onClick={() => onProductClick(card.slug)}
              className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 hover:border-saffron-400/60 rounded-2xl p-5 text-left transition-all duration-300 hover:shadow-lg group cursor-pointer flex flex-col justify-between h-44"
            >
              <div>
                <span className="text-[8.5px] font-extrabold uppercase tracking-widest bg-saffron-500/10 text-saffron-400 border border-saffron-500/20 px-2 py-0.5 rounded">
                  {card.badge}
                </span>
                <h3 className="font-serif text-base font-bold text-white group-hover:text-saffron-400 transition-colors mt-2 leading-snug">
                  {card.name}
                </h3>
                <p className="text-[10px] text-neutral-400 mt-0.5 font-sans truncate">{card.subtitle}</p>
              </div>

              <div className="flex justify-between items-end border-t border-neutral-800 pt-3 mt-3">
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-sans block">Starting Price</span>
                  <span className="font-serif font-bold text-saffron-400 text-base">₹{card.price.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-[10px] font-bold text-neutral-400 group-hover:text-saffron-400 flex items-center gap-0.5 uppercase tracking-wider font-sans">
                  Inspect <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Brand Value Propositions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {valueProps.map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div 
              key={idx} 
              className="p-6 bg-white rounded-2xl border border-saffron-100/60 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-saffron-50 flex items-center justify-center shrink-0 border border-saffron-100">
                <Icon className="h-6 w-6 text-saffron-500" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-neutral-800 leading-snug">
                  {prop.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Best Sellers (Other Spices) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-serif font-bold text-neutral-800">
            Aromas of the Subcontinent
          </h2>
          <div className="w-12 h-1 bg-saffron-500 mx-auto rounded-full"></div>
          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            Hand-ground masala blends and Curcumin-rich wellness essentials stone-milled under strict quality controls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherBestSellers.map((product) => (
            <div 
              key={product.id}
              onClick={() => onProductClick(product.slug)}
              className="group bg-white rounded-2xl border border-saffron-100 overflow-hidden hover:border-saffron-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden bg-neutral-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-saffron-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                  {product.badge}
                </span>
                <span className="absolute bottom-3 right-3 bg-neutral-900/70 text-cream-50 text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                  {product.origin}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-1 mb-1">
                    <h3 className="font-serif text-lg font-bold text-neutral-800 group-hover:text-saffron-600 transition-colors">
                      {product.name}
                    </h3>
                    <span className="font-bold text-terracotta-500 font-sans text-sm mt-0.5">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-sans tracking-wide mb-3">{product.subtitle}</p>
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center border-t border-saffron-50 mt-4 pt-4 text-xs font-semibold text-neutral-500 font-sans">
                  <span>⭐ {product.rating} ({product.reviewsCount})</span>
                  <span className="text-saffron-500 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px] uppercase tracking-wider font-bold">
                    View Details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setActivePage('shop')}
            className="px-6 py-3 border-2 border-saffron-500 text-saffron-500 hover:bg-saffron-500 hover:text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2"
          >
            Explore Full Sourcing Catalog
          </button>
        </div>
      </section>

      {/* Flavor Matcher Quiz Banner */}
      <section className="bg-saffron-50 border border-saffron-100 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-5 items-center gap-8 shadow-sm">
        <div className="lg:col-span-3 space-y-4 text-left">
          <span className="inline-block text-[10px] font-bold text-saffron-600 uppercase tracking-widest font-sans bg-saffron-100 px-3 py-1 rounded-full">
            Interactive AI Selector
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-800 leading-snug">
            Struggling to find your Signature Spice Blend?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Every culinary kitchen is different. Input your heat tolerances and favorite aroma footprints (Earthy vs Floral vs Sweet). In under a minute, match to your perfect spice profile and unlock a 15% discount.
          </p>
        </div>
        <div className="lg:col-span-2 flex justify-center lg:justify-end shrink-0">
          <button
            onClick={() => setActivePage('quiz')}
            className="px-8 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 animate-bounce"
          >
            Take the Flavor Matcher Quiz
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Sourcing Process */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-serif font-bold text-neutral-800">
            The Potency Pipeline
          </h2>
          <div className="w-12 h-1 bg-saffron-500 mx-auto rounded-full"></div>
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            Standard warehouse degradation blocks aroma. Here is how M3_spices preserves essential oil volumes from soil to pan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-2xl border border-saffron-100 shadow-sm relative overflow-hidden group hover:border-saffron-300 transition-all text-left"
            >
              <span className="absolute -top-4 -right-2 text-6xl font-serif font-bold text-cream-200 opacity-60 group-hover:text-saffron-100 transition-colors select-none">
                {step.num}
              </span>
              <div className="space-y-2 relative z-10 pt-4">
                <h3 className="font-serif text-base font-bold text-neutral-800">
                  {step.name}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Quote className="h-40 w-40 text-saffron-500" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block text-[10px] font-bold text-saffron-400 uppercase tracking-widest font-sans">
            Veda Spice Circle Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            "An aroma intensity I haven't seen in 20 years of cooking."
          </h2>
          <p className="text-sm text-neutral-300 italic max-w-2xl mx-auto leading-relaxed">
            "I used M3 Green Cardamom in my signature desserts, and then tempered their organic garam masala. The complexity is breathtaking. They have completely eliminated middlemen aggregate storage delays."
          </p>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-saffron-400 text-base">Chef Marcus Vance</h4>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans">Michelin-Starred Culinary Director, Fort Kochi Bistro</p>
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      {latestPost && (
        <section className="bg-white border border-saffron-100 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 items-stretch shadow-sm hover:border-saffron-200 transition-all">
          <div className="lg:col-span-2 overflow-hidden aspect-video lg:aspect-auto bg-neutral-100">
            <img 
              src={latestPost.image} 
              alt={latestPost.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-widest font-sans bg-saffron-100/10 px-3 py-1 rounded-full">
                Latest Sourcing Report
              </span>
              <h3 
                onClick={() => onBlogClick(latestPost.slug)}
                className="font-serif text-xl sm:text-2xl font-bold text-neutral-800 hover:text-saffron-600 cursor-pointer transition-colors leading-tight"
              >
                {latestPost.title}
              </h3>
              <p className="text-xs text-neutral-500 font-sans">{latestPost.date} • {latestPost.readTime}</p>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                {latestPost.summary}
              </p>
            </div>
            
            <div>
              <button
                onClick={() => onBlogClick(latestPost.slug)}
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
              >
                Read Sourcing Story <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;
