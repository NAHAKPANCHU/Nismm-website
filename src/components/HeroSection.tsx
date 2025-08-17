
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { Badge } from './ui/badge';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCartStore();

  // Featured products for the hero carousel
  const featuredProducts = products.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const currentProduct = featuredProducts[currentSlide];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (rating % 1 !== 0) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    return stars;
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-echoshop-gray via-white to-echoshop-gray md:overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Content Side */}
            <div className="space-y-8 animate-slide-in-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2">
                <Badge className="bg-accent text-white px-4 py-2 text-sm">
                  ✨ New Collection
                </Badge>
                <Badge variant="outline" className="border-primary text-primary">
                  Free Shipping
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold leading-tight">
                  <span className="text-gradient">Exquisite</span>
                  <br />
                  <span className="text-gray-900">Jewelry</span>
                  <br />
                  <span className="text-primary">Collection</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Discover handcrafted jewelry and bracelets for men and women. Each piece tells a story of elegance and timeless beauty.
                </p>
              </div>

              {/* Featured Product Info */}
              {/* <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-sm font-medium text-gray-600">Featured Product:</span>
                  <div className="flex items-center">
                    {renderStars(currentProduct.rating)}
                    <span className="ml-2 text-sm text-gray-500">({currentProduct.reviews})</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                  {currentProduct.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {currentProduct.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      ${currentProduct.price}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${currentProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => addToCart(currentProduct)}
                    className="btn-primary"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div> */}

              {/* CTA Buttons */}
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                    Shop Collection
                  </Button>
                </Link>
                <Link to={`/product/${currentProduct.id}`}>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 w-full sm:w-auto hover-scale">
                    View Details
                  </Button>
                </Link>
              </div> */}

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-gray-600">Secure Payments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Best</div>
                  <div className="text-sm text-gray-600">Price Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Premium</div>
                  <div className="text-sm text-gray-600">Quality</div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative animate-slide-in-right">
              {/* Main Product Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-96 object-cover rounded-2xl"
                  />

                  {/* Product Navigation Dots */}
                  <div className="flex justify-center space-x-2 mt-6">
                    {featuredProducts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                          ? 'bg-primary scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover-scale"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover-scale"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
