
import { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/button';

const CartDrawer = () => {
  const { 
    items, 
    isCartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    getTotalItems 
  } = useCartStore();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const freeShippingThreshold = 100;
  const totalPrice = getTotalPrice();
  const remainingForFreeShipping = freeShippingThreshold - totalPrice;
  const freeShippingProgress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-poppins font-bold text-gray-900">
            Shopping Cart ({getTotalItems()})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Free Shipping Progress */}
        {remainingForFreeShipping > 0 && (
          <div className="p-4 bg-echoshop-gray border-b border-gray-200">
            <div className="text-sm text-gray-600 mb-2">
              Add <span className="font-semibold text-primary">${remainingForFreeShipping.toFixed(2)}</span> more for free shipping!
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-sm text-center px-4">
                Add some products to get started!
              </p>
              <Button
                onClick={() => setCartOpen(false)}
                className="mt-4 btn-primary"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-white border border-gray-100 rounded-lg p-3 hover-scale-sm">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-lg font-bold text-primary">
                        ${item.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {item.stock}
                      </span>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 hover-scale-sm"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-8 h-8 p-0 hover-scale-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Subtotal:</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Checkout Buttons */}
            <div className="space-y-3">
              <Link to="/checkout" onClick={() => setCartOpen(false)}>
                <Button className="w-full btn-primary text-lg py-3">
                  Checkout Now
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setCartOpen(false)}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="text-center text-xs text-gray-500 mt-4">
              <div className="flex justify-center space-x-4">
                <span>✓ Secure Checkout</span>
                <span>✓ Free Returns</span>
                <span>✓ 24/7 Support</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
