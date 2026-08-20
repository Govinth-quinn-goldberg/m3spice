import React from 'react';
import { BookOpen, ArrowRight, Mail, Sparkles, Send } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const Blog = ({ onBlogClick }) => {
  return (
    <div className="space-y-12 pb-16 font-sans">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 mt-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-800">
          The Spice Journal
        </h1>
        <div className="w-12 h-1 bg-saffron-500 mx-auto rounded-full"></div>
        <p className="text-xs text-neutral-500 leading-relaxed font-sans">
          Exploring ancient soil traditions, direct sourcing reports, culinary techniques, and collaborative recipe developments.
        </p>
      </div>

      {/* Main Grid: Blog post list + Backlink/Collaboration Callout sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Post list */}
        <div className="lg:col-span-8 space-y-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-saffron-100 shadow-sm hover:shadow-md hover:border-saffron-200 transition-all grid grid-cols-1 md:grid-cols-5 text-left"
            >
              <div className="md:col-span-2 overflow-hidden aspect-video md:aspect-auto bg-neutral-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-terracotta-600 uppercase tracking-widest font-sans bg-terracotta-50 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-sans">{post.date}</span>
                  </div>
                  <h2 
                    onClick={() => onBlogClick(post.slug)}
                    className="font-serif text-lg sm:text-xl font-bold text-neutral-800 hover:text-terracotta-600 transition-colors cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h2>
                  <p className="text-[10px] text-neutral-400 font-sans -mt-0.5">By {post.author} • {post.readTime}</p>
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
                
                <div>
                  <button
                    onClick={() => onBlogClick(post.slug)}
                    className="px-4.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
                  >
                    Read Article <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right Column: Built-in Outreach Collaboration Box for Backlink generation */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Guest Posting Card */}
          <div className="bg-saffron-50 border border-saffron-100 rounded-3xl p-6 shadow-sm text-left space-y-4">
            <div className="w-10 h-10 rounded-full bg-saffron-100 flex items-center justify-center border border-saffron-200">
              <BookOpen className="h-5 w-5 text-terracotta-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-base font-bold text-neutral-800">
                Recipe Collaborations & Guest Posting
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Are you a food blogger, dietitian, or professional chef? Saffron & Sage loves hosting culinary guest authors!
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                By writing or co-authoring recipes with us, you join our **Veda Spice Circle**, get access to **free premium micro-lot spice sample kits**, and gain high-authority, contextual backlinks to boost your domain authority.
              </p>
            </div>
            
            <div className="pt-2 border-t border-saffron-100/60">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-sans mb-2">Outreach Contact</h4>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Mail className="h-4 w-4 text-terracotta-500 shrink-0" />
                <span className="font-sans font-medium">collaborations@veda-spice.com</span>
              </div>
            </div>
          </div>

          {/* Social Proof Quote */}
          <div className="bg-white border border-saffron-100 rounded-2xl p-5 shadow-sm text-left relative overflow-hidden">
            <span className="text-xs text-saffron-500 font-serif block mb-2">⭐ ⭐ ⭐ ⭐ ⭐</span>
            <p className="text-[11px] text-neutral-600 italic leading-relaxed font-sans">
              "Collaborating with the Veda Spice sourcing team was a dream. Their farm-level insights on turmeric curcumin added massive depth to my health blog, and the link exchange drove solid traffic."
            </p>
            <div className="mt-3 text-[10px] font-sans">
              <span className="font-bold text-neutral-800">Elena Rostova</span>, HealthyPalettes.com
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Blog;
