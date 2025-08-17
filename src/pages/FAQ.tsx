
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from '../components/CartDrawer';
import Header from '../components/Header';
import { Input } from '../components/ui/input';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Shipping & Delivery",
      faqs: [
        {
          question: "What are your shipping options and costs?",
          answer: "We offer several shipping options: Free Standard Shipping (3-5 business days) on orders over $100, Standard Shipping $6.99 (3-5 business days), Express Shipping $9.99 (1-2 business days), and Overnight Shipping $19.99 (next business day)."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 50 countries worldwide. International shipping costs vary by destination and are calculated at checkout. Delivery times range from 7-21 business days depending on the destination."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can track your package by clicking the tracking link in the email or by logging into your account and viewing your order history."
        },
        {
          question: "What if my package is damaged or lost?",
          answer: "If your package arrives damaged, please contact us within 48 hours with photos of the damage. For lost packages, please wait until the expected delivery date has passed, then contact us and we'll file a claim with the carrier."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for all items in their original condition with original packaging and tags. Items must be returned within 30 days of delivery date. Some restrictions apply to electronics and personal care items."
        },
        {
          question: "How do I initiate a return?",
          answer: "To start a return, log into your account and go to 'Order History'. Select the order and click 'Return Items'. You can also contact our customer service team at support@echoshop.com for assistance."
        },
        {
          question: "Do I have to pay for return shipping?",
          answer: "Return shipping is free for defective items or if we made an error. For other returns, you'll be responsible for return shipping costs unless you have a prepaid return label from a previous purchase."
        },
        {
          question: "How long does it take to process a refund?",
          answer: "Once we receive your returned item, we'll inspect it and process your refund within 3-5 business days. Refunds are issued to the original payment method and may take an additional 3-7 business days to appear in your account."
        }
      ]
    },
    {
      title: "Orders & Payment",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely through our encrypted payment system."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After this time, your order may have already entered our fulfillment process and cannot be changed."
        },
        {
          question: "Why was my payment declined?",
          answer: "Payment declines can happen for several reasons: insufficient funds, incorrect billing information, or your bank flagging the transaction. Please verify your payment details and try again, or contact your bank if the problem persists."
        },
        {
          question: "Do you offer price matching?",
          answer: "Yes, we offer price matching on identical items from authorized retailers. The item must be in stock and the price must be verifiable. Contact us with the competitor's price and we'll match it if it qualifies."
        }
      ]
    },
    {
      title: "Products & Inventory",
      faqs: [
        {
          question: "How do I know if an item is in stock?",
          answer: "Stock levels are displayed on each product page. If an item is out of stock, you'll see 'Out of Stock' instead of the 'Add to Cart' button. You can sign up for restock notifications to be notified when the item becomes available again."
        },
        {
          question: "Are your products authentic?",
          answer: "Yes, all our products are 100% authentic. We work directly with manufacturers and authorized distributors. Every product comes with manufacturer warranties and authenticity guarantees."
        },
        {
          question: "Do you offer product warranties?",
          answer: "Yes, all our products come with manufacturer warranties. Warranty periods vary by product and manufacturer. You can find warranty information on each product page or contact us for specific warranty details."
        },
        {
          question: "Can I get product recommendations?",
          answer: "Absolutely! Our customer service team is knowledgeable about all our products and can help you find the perfect item for your needs. You can also check out our curated collections and customer reviews for guidance."
        }
      ]
    },
    {
      title: "Account & Technical",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' in the top right corner of our website. You'll need to provide your email address and create a password. You can also sign up during checkout when placing your first order."
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer: "Click 'Sign In' and then 'Forgot Password'. Enter your email address and we'll send you a link to reset your password. Check your spam folder if you don't see the email within a few minutes."
        },
        {
          question: "How do I update my account information?",
          answer: "Log into your account and go to 'Account Settings'. Here you can update your personal information, addresses, payment methods, and communication preferences."
        },
        {
          question: "Why can't I access the website?",
          answer: "If you're having trouble accessing our website, try clearing your browser cache and cookies, or try a different browser. If the problem persists, it may be a temporary server issue and we recommend trying again later."
        }
      ]
    }
  ];

  // Filter FAQs based on search term
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Find answers to common questions about shopping, shipping, returns,
            and more. Can't find what you're looking for? Contact our support team.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-4">
                Try searching with different keywords or browse our categories below.
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
                    {category.title}
                  </h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isOpen = openItems.includes(globalIndex);

                      return (
                        <div
                          key={faqIndex}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-echoshop-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our friendly customer support team is here to help. Get in touch and
            we'll respond as quickly as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-semibold"
            >
              Contact Support
            </a>
            <a
              href="mailto:nismm98@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
