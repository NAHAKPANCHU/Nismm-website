
import { Award, Heart, Truck, Users } from 'lucide-react';
import CartDrawer from '../components/CartDrawer';
import Header from '../components/Header';
import { Button } from '../components/ui/button';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Passionate about bringing quality products to customers worldwide.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Expert in product curation and customer experience design.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Creative strategist focused on connecting brands with their audience.'
    },
    {
      name: 'David Kim',
      role: 'Technical Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Building seamless digital experiences for our customers.'
    }
  ];

  const stats = [
    { icon: Users, number: '50K+', label: 'Happy Customers' },
    { icon: Award, number: '500+', label: 'Products' },
    { icon: Heart, number: '99%', label: 'Satisfaction Rate' },
    { icon: Truck, number: '24h', label: 'Fast Delivery' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
            About Nismm
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're passionate about bringing you the finest selection of exquisite jewellery, elegant bracelets, and curated hampers & gifts — crafted to add sparkle and joy to every occasion.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-center text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2020, Nismm began with a simple mission:
                  to make exquisite jewellery, elegant bracelets, and thoughtful gift hampers accessible to everyone.
                  What started as a small team of artisans and jewellery enthusiasts has grown into a trusted brand,
                  bringing timeless elegance and handcrafted beauty to customers worldwide.

                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We believe that true elegance should be accessible without compromising on quality.
                  That’s why we collaborate with skilled artisans and carefully handpick every piece
                  before adding it to our collection.
                </p>
                <p className="text-lg text-gray-600">
                  Today, we’re proud to offer a diverse range of jewellery, elegant bracelets, and
                  curated hampers & gifts — all backed by our promise of exceptional craftsmanship,
                  customer care, and timely delivery.
                </p>

              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                  alt="Our team working"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-echoshop-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-poppins font-bold text-center text-gray-900 mb-12">
            Nismm by Numbers
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover-scale">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-poppins font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Nismm, dedicated to bringing you
              the best shopping experience possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group text-center hover-scale">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-echoshop-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Nismm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover-scale">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">
                Quality First
              </h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product is carefully tested and
                verified before reaching our customers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover-scale">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">
                Customer Obsessed
              </h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We're committed to
                providing exceptional service and support.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover-scale">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">
                Innovation Driven
              </h3>
              <p className="text-gray-600">
                We constantly seek new and innovative products that enhance our
                customers' lives and stay ahead of trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products and
            experience the EchoShop difference.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold"
          >
            Shop Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
