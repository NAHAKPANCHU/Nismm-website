

import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    getTotalItems,
    clearCart
  } = useCartStore();

  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    whatsappNumber: '',
    address: ''
  });
  const [showOrderForm, setShowOrderForm] = useState(false);

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

  // WhatsApp configuration
  // const whatsappNumber = "918160718580";
  // const businessName = "Nismm";
  // const adminWhatsApp = "918160718580"; // Admin WhatsApp for notifications

  // Create order in database and send WhatsApp message
  const handleWhatsAppOrder = async () => {
    if (!customerInfo.name || !customerInfo.whatsappNumber || !customerInfo.address) {
      setShowOrderForm(true);
      return;
    }

    setIsLoading(true);

    try {
      // Prepare order data
      const orderData = {
        customerName: customerInfo.name,
        whatsappNumber: customerInfo.whatsappNumber,
        address: customerInfo.address,
        products: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getTotalPrice()
      };

      // Create order in database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        const order = result.data;
        const whatsappUrl = result.whatsappUrl; // ✅ from backend

        // Open WhatsApp link (admin message)
        if (whatsappUrl) {
          window.open(whatsappUrl, "_blank");
        }

        // Clear cart and close drawer
        clearCart();
        setCartOpen(false);
        setShowOrderForm(false);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // const sendCustomerWhatsAppMessage = async (order) => {
  //   // Create customer order summary
  //   let orderDetails = `🎉 Thank you for your order from ${businessName}!\n\n`;
  //   orderDetails += `📋 Order Details:\n`;
  //   orderDetails += `🆔 Order ID: ${order._id}\n`;
  //   orderDetails += `📅 Date: ${new Date(order.orderDate).toLocaleDateString()}\n\n`;

  //   orderDetails += `📦 Items:\n`;
  //   order.products.forEach((item, index) => {
  //     orderDetails += `${index + 1}. ${item.name}\n`;
  //     orderDetails += `   Quantity: ${item.quantity}\n`;
  //     orderDetails += `   Price: ₹${item.price}\n`;
  //     orderDetails += `   Subtotal: ₹${(item.price * item.quantity).toFixed(2)}\n\n`;
  //   });

  //   orderDetails += `💰 Total Amount: ₹${order.totalAmount.toFixed(2)}\n\n`;
  //   orderDetails += `⏰ Status: ${order.status.toUpperCase()}\n\n`;
  //   orderDetails += `We'll contact you soon for payment and delivery details.\n`;
  //   orderDetails += `Thank you for choosing ${businessName}! 🙏`;

  //   const encodedMessage = encodeURIComponent(orderDetails);
  //   const whatsappUrl = `https://wa.me/${customerInfo.whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;

  //   // Open WhatsApp to send message to customer
  //   window.open(whatsappUrl, '_blank');
  // };


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
              Add <span className="font-semibold text-primary">₹{remainingForFreeShipping.toFixed(2)}</span> more for free shipping!
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Customer Info Form */}
        {showOrderForm && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <h3 className="font-medium text-blue-900 mb-3">Order Information</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Full Name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="WhatsApp Number (e.g., +919876543210)"
                value={customerInfo.whatsappNumber}
                onChange={(e) => setCustomerInfo({ ...customerInfo, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Shipping Address"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowOrderForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleWhatsAppOrder}
                  disabled={!customerInfo.name || !customerInfo.whatsappNumber || !customerInfo.address || isLoading}
                  className="flex-1 btn-primary"
                >
                  {isLoading ? 'Creating Order...' : 'Place Order'}
                </Button>
              </div>
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
                        ₹{item.price}
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
              <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
            </div>

            {/* Order Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppOrder}
                disabled={isLoading}
                className="w-full btn-primary text-lg py-3 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Creating Order...' : '📱 Place Order via WhatsApp'}
              </Button>



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
                <span>✓ Order Tracking</span>
                <span>✓ WhatsApp Support</span>
                <span>✓ Quick Response</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;