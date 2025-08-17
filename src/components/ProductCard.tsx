
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
  index: number;
  variant?: 'grid' | 'list';
}

const ProductCard = ({ product, index = 0, variant = 'grid' }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCartStore();

  const isInWishlistState = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);

    // Trigger cart bounce animation
    const cartButton = e.currentTarget;
    cartButton.classList.add('animate-cart-bounce');
    setTimeout(() => {
      cartButton.classList.remove('animate-cart-bounce');
    }, 800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlistState) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  if (variant === 'list') {
    return (
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden">
          <div className="flex">
            <div className="w-48 h-32 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-6 flex justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
                <Badge className="bg-gray-100 text-gray-800 text-xs">
                  {product.category}
                </Badge>
              </div>
              <div className="flex flex-col items-end justify-between ml-6">
                <div className="text-right mb-4">
                  <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                  <p className="text-sm text-gray-500">In stock: {product.stock}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWishlistToggle}
                    className={`p-2 ${isInWishlistState ? 'text-red-500 border-red-500' : ''}`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlistState ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    size="sm"
                    className="btn-primary min-w-[120px]"
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="block group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-1">

          {product.tags?.includes('new') && (
            <Badge className="bg-accent text-white text-xs">
              New
            </Badge>
          )}
          {product.originalPrice && (
            <Badge className="  text-secondary-foreground text-xs">
              Sale
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition-all duration-200 hover:scale-105 ${isInWishlistState
            ? 'text-red-500'
            : 'text-gray-400 hover:text-red-500'
            }`}
        >
          <Heart
            className={`w-4 h-4 ${isInWishlistState ? 'fill-current' : ''}`}
          />
        </button>

        {/* Quick View Overlay */}
        {showQuickView && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="flex space-x-2">
              <Button
                size="sm"
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Quick view modal would open here
                }}
              >
                <Eye className="w-4 h-4 mr-1" />
                Quick View
              </Button>
            </div>
          </div>
        )}

        {/* Stock indicator */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
              Only {product.stock} left
            </Badge>
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge className="bg-red-500 text-white">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </div>

        {/* Product Name */}
        <h3 className="font-poppins font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
