import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react';

const CartDrawer = ({ 
  cartItems, 
  cartOpen, 
  setCartOpen, 
  updateQuantity, 
  removeItem, 
  clearCart,
  setActivePage 
}) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeShippingThreshold = 2500; // Free shipping above ₹2,500
  const shipping = subtotal === 0 ? 0 : (subtotal >= freeShippingThreshold ? 0 : 150);
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        clearCart();
        setCheckoutSuccess(false);
        setCartOpen(false);
      }, 3500);
    }, 1800);
  };

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity" 
        onClick={() => !checkoutLoading && setCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-100 shadow-2xl flex flex-col animate-scale-in border-l border-saffron-100">
          
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-saffron-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-terracotta-500 font-serif flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-saffron-500" /> Your Spice Cart
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-terracotta-500 hover:bg-saffron-50 transition-colors"
              disabled={checkoutLoading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Checkout success overlay */}
          {checkoutSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream-50 animate-fade-in">
              <span className="text-5xl mb-4">🎉</span>
              <h3 className="text-xl font-serif font-bold text-terracotta-500 mb-2">Order Confirmed!</h3>
              <p className="text-sm text-neutral-600 max-w-xs mb-6">
                Thank you for supporting ethical sourcing. Your fresh, graded spices are being prepared in our blending room and will ship within 24 hours.
              </p>
              <div className="w-16 h-1 bg-saffron-500 rounded-full animate-pulse"></div>
            </div>
          ) : checkoutLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream-50/50">
              <div className="w-12 h-12 border-4 border-saffron-200 border-t-terracotta-500 rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-neutral-600 font-medium">Securing connection to spice trading gateway...</p>
            </div>
          ) : (
            <>
              {/* Cart Content list */}
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-20 h-20 rounded-full bg-saffron-50 flex items-center justify-center mb-4">
                      <ShoppingBag className="h-10 w-10 text-saffron-400" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-terracotta-500 mb-1">Your cart is empty</h3>
                    <p className="text-sm text-neutral-500 max-w-xs mb-6">
                      Looks like you haven't added any premium spices yet. Let's find your signature flavor profile!
                    </p>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        setActivePage('shop');
                      }}
                      className="px-6 py-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                    >
                      Browse Spice Catalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Free shipping promo banner */}
                    {subtotal < freeShippingThreshold ? (
                      <div className="p-3 bg-saffron-50 rounded-xl border border-saffron-100 flex items-center gap-2.5 text-xs text-terracotta-800">
                        <Truck className="h-4 w-4 text-saffron-500 shrink-0" />
                        <span>
                          Add <strong>₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')}</strong> more for <strong>FREE shipping</strong>!
                        </span>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
                        <Truck className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Congratulations! Your order qualifies for <strong>FREE shipping</strong>.</span>
                      </div>
                    )}

                    {cartItems.map((item) => (
                      <div 
                        key={item.id}
                        className="flex gap-4 p-3 bg-white rounded-xl border border-saffron-100 hover:border-saffron-200 transition-all shadow-sm"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg bg-neutral-100 border border-neutral-100"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="text-xs font-bold text-neutral-800 truncate font-sans">
                                {item.name}
                              </h4>
                              <span className="text-xs font-bold text-terracotta-500 whitespace-nowrap">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-500 -mt-0.5">{item.weight}</p>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2 border border-saffron-200 rounded-full px-2 py-0.5 bg-cream-50">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-0.5 text-neutral-500 hover:text-terracotta-500 rounded-full"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-bold text-neutral-700 min-w-4 text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-0.5 text-neutral-500 hover:text-terracotta-500 rounded-full"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary Footer */}
              {cartItems.length > 0 && (
                <div className="bg-white border-t border-saffron-100 p-6 space-y-4">
                  <div className="space-y-1.5 text-sm text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-neutral-800">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">Shipping</span>
                      <span className="font-medium text-neutral-800">
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>GST (Est. 5%)</span>
                      <span>₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-dashed border-saffron-200 my-2 pt-2 flex justify-between text-base font-bold text-neutral-800">
                      <span className="font-serif">Order Total</span>
                      <span className="text-terracotta-500">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all group"
                  >
                    <CreditCard className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    Place Graded Spice Order
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
