import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FlavorQuiz from './pages/FlavorQuiz';

// Data
import { products } from './data/products';
import { blogPosts } from './data/blogPosts';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeProductSlug, setActiveProductSlug] = useState('');
  const [activeBlogSlug, setActiveBlogSlug] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Spices');

  // Dynamic SEO Page Meta Updater
  useEffect(() => {
    let title = "M3_spices | Premium Organic Artisanal Spices";
    let description = "Buy pure Indian spices online from M3_spices. Ethically sourced, fresh-ground masala blends.";
    
    if (activePage === 'home') {
      title = "M3_spices | Premium Organic Artisanal Spices Online";
      description = "M3_spices is a premium supplier of ethically sourced, farm-to-table organic artisanal spices. Buy pure Indian spices, hand-ground masala blends, and whole cardamom pods online.";
    } else if (activePage === 'shop') {
      title = "Shop Premium Spices | M3_spices";
      description = "Explore our selection of organic artisanal spices, single-origin cardamom, hand-ground masala blends, and saffron threads. Freshly packed and shipped.";
    } else if (activePage === 'product-detail' && activeProductSlug) {
      const prod = products.find(p => p.slug === activeProductSlug);
      if (prod) {
        title = `${prod.name} (${prod.weight}) | M3_spices`;
        description = `Buy pure, organic ${prod.name} online. Sourced directly from ${prod.origin}. ${prod.subtitle}. Free shipping on orders over ₹2,500.`;
      }
    } else if (activePage === 'blog') {
      title = "Spice Journal - Blog & Sourcing Stories | M3_spices";
      description = "Read expert spice tempering guides, farm-to-table ethical stories, and guest chef recipe collaborations from M3_spices.";
    } else if (activePage === 'blog-post' && activeBlogSlug) {
      const post = blogPosts.find(b => b.slug === activeBlogSlug);
      if (post) {
        title = `${post.title} | Spice Journal`;
        description = post.summary;
      }
    } else if (activePage === 'quiz') {
      title = "Flavor Matcher Quiz - Find Your Signature Blend | M3_spices";
      description = "Take our interactive 1-minute Flavor Matcher Quiz. Find your signature spice blend based on your cooking style and favorite aroma profiles.";
    }

    document.title = title;
    
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', description);
    }
  }, [activePage, activeProductSlug, activeBlogSlug]);

  // Cart Handlers
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      // In graded selection, the product ID is already updated to product.id-grade to keep them separate!
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleNavigateToProduct = (slug) => {
    setActiveProductSlug(slug);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBlog = (slug) => {
    setActiveBlogSlug(slug);
    setActivePage('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-100 selection:bg-saffron-200">
      
      {/* Promotional Ribbon Header Banner */}
      <div className="bg-terracotta-500 text-cream-50 text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2 px-4 text-center">
        Claim Your 15% Off Code • Free Shipping on Orders Over ₹2,500
      </div>

      {/* Main Navigation Header */}
      <Navigation 
        cartItems={cartItems}
        setCartOpen={setCartOpen}
        activePage={activePage}
        setActivePage={setActivePage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {activePage === 'home' && (
          <Home 
            setActivePage={setActivePage}
            onProductClick={handleNavigateToProduct}
            onBlogClick={handleNavigateToBlog}
          />
        )}
        {activePage === 'shop' && (
          <Shop 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onProductClick={handleNavigateToProduct}
          />
        )}
        {activePage === 'product-detail' && (
          <ProductDetail 
            slug={activeProductSlug}
            onAddToCart={addToCart}
            onProductClick={handleNavigateToProduct}
          />
        )}
        {activePage === 'blog' && (
          <Blog 
            onBlogClick={handleNavigateToBlog}
          />
        )}
        {activePage === 'blog-post' && (
          <BlogPost 
            slug={activeBlogSlug}
            setActivePage={setActivePage}
            onBlogClick={handleNavigateToBlog}
          />
        )}
        {activePage === 'quiz' && (
          <FlavorQuiz 
            onProductClick={handleNavigateToProduct}
          />
        )}
      </main>

      {/* Sliding Cart Drawer Overlay */}
      <CartDrawer 
        cartItems={cartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
        setActivePage={setActivePage}
      />

      {/* SEO-Optimized Page Footer */}
      <Footer 
        setActivePage={setActivePage}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default App;
