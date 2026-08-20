import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus, ShieldCheck, MapPin, Sparkles, Package, MessageSquare, Award } from 'lucide-react';
import { products } from '../data/products';
import AromaRadar from '../components/AromaRadar';

const ProductDetail = ({ slug, onAddToCart, onProductClick }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState('B'); // Default standard grade B
  
  // Custom reviews state to allow dynamic updates
  const [reviewsList, setReviewsList] = useState([]);
  
  // Form states
  const [reviewerName, setReviewerName] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.slug === slug);
    if (found) {
      setProduct(found);
      setQuantity(1);
      setSelectedGrade('B'); // Reset to Grade B on page switch
      setSubmitSuccess(false);
      setReviewerName('');
      setCommentText('');
      setRatingVal(5);

      setReviewsList([
        {
          id: 1,
          name: "Emily R.",
          rating: 5,
          date: "3 weeks ago",
          comment: `Absolutely wonderful. The fragrance when you open the jar of ${found.name} is incredibly intense. Sourcing quality at its absolute finest!`
        },
        {
          id: 2,
          name: "Chef Liam K.",
          rating: 5,
          date: "1 month ago",
          comment: `Outstanding volatile oil content. I ordered the Grade A pods and they are huge, uniform, and burst with citrus-herbal aroma during tempering.`
        }
      ]);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="py-20 text-center font-sans">
        <h2 className="text-xl font-serif font-bold text-terracotta-500">Spice Profile Not Found</h2>
        <p className="text-xs text-neutral-500 mt-2">The requested spice slug could not be located in our catalog.</p>
      </div>
    );
  }

  const handleQtyChange = (val) => {
    if (val >= 1 && val <= 10) {
      setQuantity(val);
    }
  };

  const handleAddToCart = () => {
    // Determine the graded price and name override
    const gradeDetails = product.grades[selectedGrade];
    const gradedProduct = {
      ...product,
      id: `${product.id}-${selectedGrade}`, // unique id in cart for different grades
      name: `${product.name} - ${selectedGrade === 'A' ? 'Grade A (Supreme)' : selectedGrade === 'B' ? 'Grade B (Premium)' : 'Grade C (Standard)'}`,
      price: gradeDetails.price,
      selectedGrade: selectedGrade
    };
    onAddToCart(gradedProduct, quantity);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName || !commentText) return;

    const newReview = {
      id: Date.now(),
      name: reviewerName,
      rating: ratingVal,
      date: "Just now",
      comment: commentText
    };

    setReviewsList([newReview, ...reviewsList]);
    setSubmitSuccess(true);
    setReviewerName('');
    setCommentText('');
    setRatingVal(5);

    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  // Get similar products
  const similarProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.rating >= 4.9))
    .slice(0, 3);

  // Get current active pricing based on selector
  const activePrice = product.grades[selectedGrade].price;

  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* Product Spec Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-4">
        
        {/* Left Column: Media & Aroma Radar */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Product Image */}
          <div className="aspect-square bg-neutral-100 rounded-3xl overflow-hidden border border-saffron-100/60 shadow-sm relative group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-saffron-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Organic certifications checklist */}
          <div className="p-4 bg-white rounded-2xl border border-saffron-100/40 shadow-sm flex items-center justify-around gap-2.5 text-center text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
            <span className="flex flex-col items-center gap-1">
              <Award className="h-5.5 w-5.5 text-saffron-500" />
              <span>USDA Organic</span>
            </span>
            <span className="h-6 w-px bg-saffron-100"></span>
            <span className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-5.5 w-5.5 text-emerald-600" />
              <span>Direct Fair Trade</span>
            </span>
            <span className="h-6 w-px bg-saffron-100"></span>
            <span className="flex flex-col items-center gap-1">
              <Package className="h-5.5 w-5.5 text-terracotta-500" />
              <span>Bi-Weekly Pack</span>
            </span>
          </div>

          {/* Aroma notes visualizer radar */}
          <AromaRadar notes={product.aromaNotes} size={280} />

        </div>

        {/* Right Column: Detailed Buy Sheet */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Sourcing badges & title */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-terracotta-600 uppercase tracking-widest font-sans bg-terracotta-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 font-sans">
                <MapPin className="h-3.5 w-3.5 text-saffron-500" />
                {product.origin}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-800 tracking-tight leading-none mt-1">
              {product.name}
            </h1>
            <p className="text-xs text-neutral-400 font-sans tracking-wide">{product.subtitle}</p>
          </div>

          {/* Rating overview */}
          <div className="flex items-center gap-1 text-sm font-semibold text-neutral-600 border-b border-saffron-50 pb-4">
            <span className="flex text-saffron-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4.5 w-4.5 fill-current ${i < Math.floor(product.rating) ? '' : 'opacity-30'}`} />
              ))}
            </span>
            <span className="ml-1 font-sans">{product.rating}</span>
            <span className="text-neutral-400 font-normal font-sans">({reviewsList.length + 120} verified reviews)</span>
          </div>

          {/* Dynamic Commodity Selector Grades */}
          <div className="space-y-3 bg-white p-4.5 rounded-2xl border border-saffron-100 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-sans flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-saffron-500" /> Choose Commodity Quality Grade
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(product.grades).map(([key, details]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedGrade(key)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedGrade === key
                      ? 'border-terracotta-500 bg-saffron-50/40 ring-1 ring-terracotta-500 shadow-sm'
                      : 'border-saffron-100 hover:border-saffron-300 bg-cream-50'
                  }`}
                >
                  <span className="text-[11px] font-bold text-neutral-800">{details.label.split(':')[0]}</span>
                  <span className="text-[9px] text-neutral-400 font-sans mt-0.5 leading-none block truncate">
                    {details.label.split(':')[1]}
                  </span>
                  <span className="text-xs font-bold text-terracotta-500 mt-2 block font-serif">
                    ₹{details.price.toLocaleString('en-IN')}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[9.5px] text-neutral-400 italic leading-snug">
              *Commodity values fluctuate slightly with seasonal crop auctions. Grade A features higher oil metrics and larger sizes.
            </p>
          </div>

          {/* Pricing display */}
          <div className="space-y-3">
            <div className="text-2xl font-serif font-bold text-terracotta-500">
              ₹{activePrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-neutral-500 font-sans font-normal">/ {product.weight}</span>
              <span className="ml-2 text-xs font-bold text-saffron-600 bg-saffron-50 px-2.5 py-0.5 rounded-full font-sans uppercase">
                {selectedGrade === 'A' ? 'Grade A Supreme' : selectedGrade === 'B' ? 'Grade B Premium' : 'Grade C Standard'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector + Add to Cart CTA */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-saffron-100/60 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">Quantity</span>
              <div className="flex items-center gap-3 border border-saffron-200 rounded-full px-3.5 py-1.5 bg-cream-50">
                <button 
                  onClick={() => handleQtyChange(quantity - 1)}
                  className="p-1 text-neutral-500 hover:text-terracotta-500 rounded-full transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-sm font-bold text-neutral-700 min-w-4 text-center select-none font-sans">
                  {quantity}
                </span>
                <button 
                  onClick={() => handleQtyChange(quantity + 1)}
                  className="p-1 text-neutral-500 hover:text-terracotta-500 rounded-full transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-[200px] flex flex-col justify-end pt-5">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                Add Graded Spice • ₹{(activePrice * quantity).toLocaleString('en-IN')}
              </button>
            </div>
          </div>

          {/* Sourcing story card */}
          <div className="bg-saffron-50/50 p-5 rounded-2xl border border-saffron-100 flex gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-saffron-100 flex items-center justify-center shrink-0 border border-saffron-200">
              <Sparkles className="h-5 w-5 text-terracotta-500" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-sm font-bold text-neutral-800">
                Ethical Sourcing Story
              </h3>
              <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
                {product.story}
              </p>
            </div>
          </div>

          {/* Spec details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="border border-saffron-100 rounded-xl p-4 bg-white shadow-sm space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-sans">Ingredients</h4>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans font-medium">{product.ingredients}</p>
            </div>
            <div className="border border-saffron-100 rounded-xl p-4 bg-white shadow-sm space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-sans">Aroma Notes</h4>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans font-medium">{product.aromaDescription}</p>
            </div>
          </div>

        </div>

      </section>

      {/* Review block */}
      <section className="border-t border-saffron-100 pt-12 text-left space-y-8">
        <h2 className="text-2xl font-serif font-bold text-neutral-800 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-terracotta-500" /> Community Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Review List */}
          <div className="lg:col-span-7 space-y-4">
            {reviewsList.map((rev) => (
              <div 
                key={rev.id}
                className="p-4 bg-white rounded-xl border border-saffron-100 shadow-sm space-y-2 animate-fade-in"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-neutral-800 font-sans">{rev.name}</span>
                  <span className="text-neutral-400 font-sans">{rev.date}</span>
                </div>
                <div className="flex text-saffron-500 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 fill-current ${i < rev.rating ? '' : 'opacity-30'}`} />
                  ))}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-saffron-100 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-neutral-800">
              Share Your Aromas
            </h3>
            <p className="text-[10px] text-neutral-500 leading-relaxed font-sans -mt-2">
              Have you cooked with this spice? Share your feedback on aroma strength, freshness, and notes.
            </p>

            {submitSuccess ? (
              <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-semibold animate-fade-in text-center">
                ✨ Thank you! Your review has been added to the community board.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3.5 text-xs">
                
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-500 font-sans uppercase text-[10px]">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-saffron-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-500 font-sans uppercase text-[10px] block">Rating</label>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingVal(star)}
                        className="text-saffron-500 hover:scale-110 transition-transform"
                      >
                        <Star className={`h-5.5 w-5.5 ${star <= ratingVal ? 'fill-current' : 'text-neutral-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-500 font-sans uppercase text-[10px]">Review Comment</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="How was the aroma intensity? What dish did you cook?"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-saffron-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500 font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  Submit Spice Review
                </button>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* Recommended pairings */}
      <section className="border-t border-saffron-100 pt-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-serif font-bold text-neutral-800">
            Aromatic Pairings
          </h2>
          <div className="w-12 h-1 bg-saffron-500 mx-auto rounded-full"></div>
          <p className="text-xs text-neutral-500 font-sans">
            Gourmet chefs recommend pairing these fresh selections together to capture a broader flavor envelope.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {similarProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => onProductClick(p.slug)}
              className="group bg-white rounded-xl border border-saffron-100 overflow-hidden hover:border-saffron-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer text-left"
            >
              <div className="relative aspect-video overflow-hidden bg-neutral-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <span className="absolute bottom-2 right-2 bg-neutral-900/70 text-cream-50 text-[9px] px-1.5 py-0.5 rounded">
                  {p.origin}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm text-neutral-800 truncate group-hover:text-saffron-600">
                    {p.name}
                  </h3>
                  <p className="text-[9px] text-neutral-400 font-sans tracking-wide mb-2 truncate">{p.subtitle}</p>
                  <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed font-sans">{p.description}</p>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-saffron-50 text-[10px] font-bold text-neutral-500 font-sans">
                  <span>₹{p.price.toLocaleString('en-IN')}</span>
                  <span className="text-saffron-500 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View <Plus className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProductDetail;
