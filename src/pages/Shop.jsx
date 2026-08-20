import React from 'react';
import { SlidersHorizontal, Search, X, Tag, ArrowRight } from 'lucide-react';
import { products, categories } from '../data/products';

const Shop = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  onProductClick 
}) => {

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Spices');
  };

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Spices' || product.category === selectedCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      product.name.toLowerCase().includes(query) ||
      product.subtitle.toLowerCase().includes(query) ||
      product.origin.toLowerCase().includes(query) ||
      product.ingredients.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16 font-sans">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 mt-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-800">
          The M3 Sourcing Room
        </h1>
        <div className="w-12 h-1 bg-saffron-500 mx-auto rounded-full"></div>
        <p className="text-xs text-neutral-500 leading-relaxed font-sans">
          Browse our organic artisanal spices and hand-ground masala blends. Stone-ground in micro-lots and shipped fresh directly from source.
        </p>
      </div>

      {/* Main Listing Controls (Category Tabs & Search Controls) */}
      <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-saffron-100/70 shadow-sm">
        
        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-saffron-50 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
            <SlidersHorizontal className="h-4 w-4 text-terracotta-500" />
            <span>Filter Categories:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All Spices' ? 'All Spices' : category)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  (category === 'All Spices' ? 'All Spices' : category) === selectedCategory
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-cream-100 text-neutral-600 hover:bg-saffron-100/50 hover:text-terracotta-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search controls + Clear */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="text-xs text-neutral-500 font-sans">
            Showing <strong className="text-neutral-800 font-bold">{filteredProducts.length}</strong> of{' '}
            <strong className="text-neutral-800 font-bold">{products.length}</strong> premium items
          </div>

          {(searchQuery || selectedCategory !== 'All Spices') && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-terracotta-600 hover:text-terracotta-700 font-sans cursor-pointer bg-saffron-50 hover:bg-saffron-100/60 px-3.5 py-1.5 rounded-full transition-all"
            >
              <X className="h-3.5 w-3.5" />
              Clear Active Filters
            </button>
          )}
        </div>

      </div>

      {/* Grid List layout */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-saffron-100 max-w-lg mx-auto p-8 shadow-sm">
          <span className="text-4xl mb-4 block">🔍</span>
          <h3 className="text-lg font-serif font-bold text-terracotta-500 mb-1">No Spices Found</h3>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto mb-6">
            We couldn't find any spices matching "{searchQuery}" in our {selectedCategory} collection. Try checking spelling or broadening your terms.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => onProductClick(product.slug)}
              className="group bg-white rounded-2xl border border-saffron-100 overflow-hidden hover:border-saffron-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col cursor-pointer"
            >
              {/* Product Cover image */}
              <div className="relative aspect-video overflow-hidden bg-neutral-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badges */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-terracotta-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
                
                <span className="absolute bottom-3 right-3 bg-neutral-900/70 text-cream-50 text-[10px] px-2 py-0.5 rounded backdrop-blur-sm font-medium">
                  {product.origin}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-1 mb-1">
                    <h3 className="font-serif text-lg font-bold text-neutral-800 group-hover:text-terracotta-600 transition-colors truncate max-w-[200px]">
                      {product.name}
                    </h3>
                    <span className="font-bold text-terracotta-500 font-sans text-sm mt-0.5 whitespace-nowrap">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-sans tracking-wide mb-3">{product.subtitle} • {product.weight}</p>
                  
                  {/* Aroma factors peek list */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {Object.entries(product.aromaNotes)
                      .filter(([_, val]) => val >= 70) // only high notes
                      .map(([key]) => (
                        <span key={key} className="inline-flex items-center gap-1 text-[9px] font-semibold text-neutral-500 bg-cream-200 border border-saffron-100/50 px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-saffron-500"></span>
                          {key}
                        </span>
                      ))
                    }
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-saffron-50 mt-4 pt-4 text-xs font-semibold text-neutral-500 font-sans">
                  <span>⭐ {product.rating} ({product.reviewsCount} reviews)</span>
                  <span className="text-terracotta-500 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px] uppercase tracking-wider font-bold">
                    Inspect Spice <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Shop;
