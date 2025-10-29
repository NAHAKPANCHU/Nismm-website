import { authApi } from '@/services/Apis';
import { Heart, LogOut, Menu, Package, Search, ShoppingCart, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { items, setCartOpen } = useCartStore();
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  // Mock user data - replace with actual auth state


  const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isLoggedIn = !!user;


  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
  ];

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="Nismm Logo"
                className="w-8 h-8 object-contain rounded-lg"
              />
            </div>
            <span className="text-xl font-poppins font-bold text-gradient">Nismm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`story-link font-medium transition-colors duration-200 ${isActivePage(link.to)
                  ? 'text-primary'
                  : 'text-gray-700 hover:text-primary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search jewelry..."
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Icon (Mobile) */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative hover-scale">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover-scale"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0 animate-pulse-custom">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            <div
              className="relative"
              ref={userMenuRef}
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hover-scale p-2 hover:bg-muted"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} // optional: keep click toggle
              >
                <User className="w-5 h-5" />
              </Button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in z-50">
                  {isLoggedIn ? (
                    <>
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.fullName || user?.username || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>

                      </div>

                      {/* My Orders */}
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">My Orders</span>
                      </Link>

                      {/* Logout */}
                      <button
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                        onClick={async () => {
                          try {
                            console.log("Stored token:", sessionStorage.getItem("accessToken"));
                            await authApi.logout();
                            setIsUserMenuOpen(false);
                            navigate('/login');

                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                        <LogOut className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Login */}
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Login</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search jewelry..."
                className="pl-10 pr-4 py-2 w-full bg-slate-50 border  border-slate-200 rounded-xl focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 "
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-medium transition-colors duration-200 ${isActivePage(link.to)
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;