
import { Heart, Search, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from '../components/CartDrawer';
import Header from '../components/Header';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useCartStore } from '../store/cartStore';

const Wishlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { wishlist, removeFromWishlist, moveToCart, addToCart } = useCartStore();

  const filteredWishlist = wishlist.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMoveToCart = (productId: number) => {
    moveToCart(productId);
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CartDrawer />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
            My Wishlist
          </h1>
          <p className="text-lg text-gray-600">
            Your saved jewelry and accessories
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-poppins font-semibold text-gray-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding items to your wishlist by clicking the heart icon on products you love.
            </p>
            <Button asChild className="btn-primary">
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        ) : (
          <>
            {/* Search and Stats */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search your wishlist..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {filteredWishlist.length} of {wishlist.length} items
                  </span>
                  {wishlist.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        wishlist.forEach(item => addToCart(item));
                        wishlist.forEach(item => removeFromWishlist(item.id));
                      }}
                      className="hidden sm:flex"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Move All to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Wishlist Items */}
            {filteredWishlist.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No items match your search
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredWishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Remove from Wishlist Button */}
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Stock indicator */}
                      {item.stock < 10 && item.stock > 0 && (
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                            Only {item.stock} left
                          </Badge>
                        </div>
                      )}

                      {item.stock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Badge className="bg-red-500 text-white">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      {/* Category and Gender */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          {item.category}
                        </div>
                        {item.gender && (
                          <Badge variant="outline" className="text-xs">
                            {item.gender}
                          </Badge>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3 className="font-poppins font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Heart
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(item.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({item.rating})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-bold text-primary">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleMoveToCart(item.id)}
                          disabled={item.stock === 0}
                          className="flex-1 btn-primary"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="px-3"
                        >
                          <a href={`/product/${item.id}`}>
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            {wishlist.length > 0 && (
              <div className="mt-12 text-center">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => {
                        wishlist.forEach(item => addToCart(item));
                        wishlist.forEach(item => removeFromWishlist(item.id));
                      }}
                      className="btn-primary"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Move All to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        wishlist.forEach(item => removeFromWishlist(item.id));
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
