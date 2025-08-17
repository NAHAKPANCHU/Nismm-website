
import { Award, Heart, RefreshCw, Shield, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartDrawer from '../components/CartDrawer';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { products } from '../data/products';

const Index = () => {
  const featuredProducts = products.slice(0, 8);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="bg-gray-50">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-accent text-white mb-4">Best Sellers</Badge>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the finest jewelry pieces that have captured the hearts of our customers.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                variant="grid"
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Why Choose Nismm?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the difference with our premium jewelry and exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Each piece is crafted with the finest materials and attention to detail, ensuring lasting beauty and durability.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Enjoy complimentary shipping on all orders over $100. Fast and secure delivery worldwide.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Lifetime Warranty</h3>
              <p className="text-gray-600">
                We stand behind our quality with a comprehensive lifetime warranty on all jewelry pieces.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">30-Day Returns</h3>
              <p className="text-gray-600">
                Not completely satisfied? Return any item within 30 days for a full refund, no questions asked.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Handcrafted</h3>
              <p className="text-gray-600">
                Every piece is carefully handcrafted by skilled artisans, making each item unique and special.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">5-Star Reviews</h3>
              <p className="text-gray-600">
                Join thousands of satisfied customers who have rated us 5 stars for quality and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from real customers who love their Ulochan jewelry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover-scale">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900" >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and jewelry care tips.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
            />

          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
