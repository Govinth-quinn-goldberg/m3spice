import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Leaf, Sparkles, BookOpen } from 'lucide-react';

const Navigation = ({ 
  cartItems, 
  setCartOpen, 
  activePage, 
  setActivePage, 
  searchQuery, 
  setSearchQuery,
  setSelectedCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', page: 'home', icon: Leaf },
    { name: 'Shop Spices', page: 'shop', icon: Sparkles },
    { name: 'Spice Journal', page: 'blog', icon: BookOpen },
    { name: 'Flavor Quiz', page: 'quiz', icon: Sparkles },
  ];

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    // Reset category if navigating back to shop
    if (page === 'shop' && setSelectedCategory) {
      setSelectedCategory('All Spices');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (activePage !== 'shop') {
      setActivePage('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-saffron-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand Title */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group"
          >
            <span className="flex items-center gap-1.5 font-serif text-2xl font-bold tracking-tight text-terracotta-500 group-hover:text-terracotta-600 transition-colors">
              M3_spices <span className="text-saffron-500 font-sans text-lg font-bold">🌱</span>
            </span>
            <span className="text-[9px] font-sans tracking-widest text-neutral-500 uppercase -mt-1 group-hover:text-neutral-600 transition-colors">
              Veda Spice Co. • Est. 2026
            </span>
          </button>

          {/* Search bar - Desk */}
          <div className="hidden md:flex relative flex-1 max-w-xs xl:max-w-md mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4.5 w-4.5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search M3 cardamom, organic masala, saffron..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-saffron-200 rounded-full bg-cream-50/50 text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-terracotta-500 focus:border-terracotta-500 transition-all font-sans"
            />
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-200 hover:text-terracotta-600 font-sans border-b-2 py-1 ${
                  activePage === link.page 
                    ? 'border-terracotta-500 text-terracotta-500 font-semibold' 
                    : 'border-transparent text-neutral-600'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Interactive Actions (Search-mobile, Cart, Hamburg) */}
          <div className="flex items-center gap-4">
            {/* Mobile search trigger */}
            <div className="md:hidden relative w-32 sm:w-44">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-8 pr-2 py-1.5 border border-saffron-200 rounded-full bg-cream-50/50 text-xs placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-terracotta-500 focus:border-terracotta-500 transition-all font-sans"
              />
            </div>

            {/* Shopping Cart button trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 text-neutral-700 hover:text-terracotta-500 rounded-full hover:bg-saffron-50/60 transition-all group"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-5.5 w-5.5 transition-transform group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta-500 text-[10px] font-bold text-white ring-2 ring-cream-100 animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-terracotta-500 rounded-full transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-cream-50 border-b border-saffron-100 shadow-lg animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-sans text-sm font-semibold tracking-wide uppercase transition-all ${
                    activePage === link.page
                      ? 'bg-saffron-100 text-terracotta-700'
                      : 'text-neutral-600 hover:bg-saffron-50/50 hover:text-terracotta-600'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {link.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
