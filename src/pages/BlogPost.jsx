import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Share2, Link, Sparkles } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { products } from '../data/products';

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const BlogPost = ({ slug, setActivePage, onBlogClick }) => {
  const post = blogPosts.find(b => b.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="py-20 text-center font-sans">
        <h2 className="text-xl font-serif font-bold text-terracotta-500">Story Not Found</h2>
        <p className="text-xs text-neutral-500 mt-2">The requested blog post could not be located in our archives.</p>
        <button 
          onClick={() => setActivePage('blog')}
          className="mt-6 px-6 py-2.5 bg-neutral-800 text-white rounded-full text-xs font-bold uppercase"
        >
          Back to Journal
        </button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Find related products to cross-promote based on post text keywords
  const textLower = (post.title + " " + post.content).toLowerCase();
  const relatedProduct = products.find(prod => 
    textLower.includes(prod.id) || textLower.includes(prod.name.toLowerCase())
  ) || products[0]; // fallback to first item

  // Format paragraphs for rendering
  const paragraphs = post.content.split('\n\n').filter(p => p.trim());

  // Other blog posts for bottom recommendations
  const otherPosts = blogPosts.filter(b => b.id !== post.id);

  return (
    <div className="max-w-4xl mx-auto pb-16 font-sans text-left space-y-10">
      
      {/* Back button */}
      <button 
        onClick={() => setActivePage('blog')}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-terracotta-600 transition-colors font-sans cursor-pointer"
      >
        <ArrowLeft className="h-4.5 w-4.5" /> Back to Journal
      </button>

      {/* Hero Header Article Sheet */}
      <header className="space-y-4">
        <span className="text-[10px] font-bold text-terracotta-600 uppercase tracking-widest font-sans bg-terracotta-50 px-3.5 py-1 rounded-full">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-800 tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 italic font-sans leading-relaxed">
          {post.subtitle}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 border-b border-saffron-100 pb-6 pt-2 font-sans">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-saffron-500" /> By {post.author}
          </span>
          <span className="h-3 w-px bg-saffron-200"></span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-saffron-500" /> {post.date}
          </span>
          <span className="h-3 w-px bg-saffron-200"></span>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Body Text content */}
        <div className="lg:col-span-8 space-y-6 text-sm text-neutral-700 leading-relaxed font-sans">
          
          {/* Main Cover image */}
          <div className="aspect-video bg-neutral-100 rounded-3xl overflow-hidden border border-saffron-100/50 shadow-sm mb-6">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Parsed content */}
          {paragraphs.map((p, idx) => {
            const cleanStr = p.trim();
            if (cleanStr.startsWith('###')) {
              return (
                <h3 key={idx} className="text-lg font-serif font-bold text-neutral-800 pt-4 pb-1">
                  {cleanStr.replace('###', '').trim()}
                </h3>
              );
            }
            if (cleanStr.startsWith('1.') || cleanStr.startsWith('-')) {
              // Standard lists
              return (
                <div key={idx} className="pl-4 py-1 space-y-1">
                  {cleanStr.split('\n').map((li, lidx) => (
                    <div key={lidx} className="flex gap-2 text-xs text-neutral-600">
                      <span className="text-saffron-500 select-none">•</span>
                      <span>{li.replace(/^[0-9]\.\s*|-\s*/, '').trim()}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return <p key={idx}>{cleanStr}</p>;
          })}

          {/* Social Share actions */}
          <div className="border-t border-saffron-50 pt-8 mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Share Article:</span>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-full border border-saffron-100 text-neutral-500 hover:text-terracotta-500 hover:bg-saffron-50 transition-colors">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <button 
                onClick={handleCopyLink}
                className="p-2 rounded-full border border-saffron-100 text-neutral-500 hover:text-terracotta-500 hover:bg-saffron-50 transition-colors flex items-center justify-center cursor-pointer"
                title="Copy link"
              >
                <Link className="h-4 w-4" />
              </button>
              {copied && <span className="text-[10px] text-emerald-600 font-bold font-sans">Link copied!</span>}
            </div>
            
            <button 
              onClick={() => setActivePage('blog')}
              className="text-xs font-bold text-neutral-500 hover:text-terracotta-500"
            >
              See All Articles
            </button>
          </div>

        </div>

        {/* Right Side: Inline Cross-promotion product banner for high SEO internal linking */}
        <div className="lg:col-span-4 space-y-6">
          {relatedProduct && (
            <div className="bg-white border border-saffron-100 rounded-3xl p-5 shadow-sm text-left space-y-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-terracotta-600 uppercase tracking-widest font-sans">
                <Sparkles className="h-4 w-4 text-saffron-500" />
                Featured Culinary Spice
              </div>
              
              <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100">
                <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-neutral-800">{relatedProduct.name}</h4>
                <p className="text-[10px] text-neutral-400 font-sans tracking-wide">{relatedProduct.subtitle}</p>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-sans line-clamp-3">
                  {relatedProduct.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-saffron-50">
                <span className="font-serif font-bold text-terracotta-500 text-sm">₹{relatedProduct.price.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => {
                    setActivePage('product-detail');
                    onBlogClick(relatedProduct.slug); 
                  }}
                  className="px-4 py-1.5 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full text-[9px] font-bold uppercase tracking-wider transition-all"
                >
                  Buy Fresh Online
                </button>
              </div>
            </div>
          )}

          {/* Other stories list */}
          {otherPosts.length > 0 && (
            <div className="bg-cream-50 border border-saffron-100/60 rounded-3xl p-5 space-y-4 text-left">
              <h4 className="font-serif text-sm font-bold text-neutral-800">More Sourcing Trails</h4>
              <div className="space-y-3">
                {otherPosts.map((op) => (
                  <div 
                    key={op.id}
                    onClick={() => onBlogClick(op.slug)}
                    className="group cursor-pointer space-y-0.5 border-b border-saffron-100/40 pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="text-[9px] text-neutral-400 uppercase tracking-widest block">{op.date}</span>
                    <h5 className="font-serif font-bold text-xs text-neutral-700 group-hover:text-terracotta-600 transition-colors line-clamp-2">
                      {op.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default BlogPost;
