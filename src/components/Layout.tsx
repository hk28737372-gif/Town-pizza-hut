import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, MapPin, MessageCircle } from 'lucide-react';
import { useCartStore } from '../store/cart';

export default function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemsCount = useCartStore(state => state.items.reduce((acc, item) => acc + item.quantity, 0));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Deals', path: '/deals' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Branches', path: '/branches' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-cream shadow-md py-3' : 'bg-transparent py-5'
        }`}
        style={{
          backgroundColor: isScrolled || location.pathname !== '/' ? 'var(--color-cream)' : 'transparent',
          color: isScrolled || location.pathname !== '/' ? 'var(--color-ink)' : 'white'
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">Town Pizza-Hut</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`font-medium transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-accent font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/checkout" className="relative p-2 text-primary hover:text-accent transition-colors">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 text-primary"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-[60] flex flex-col text-white transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-5 border-b border-white/20">
          <span className="font-serif text-2xl font-bold">Town Pizza-Hut</span>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col gap-6 p-8 text-xl">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="border-b border-white/10 pb-2">
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-ink text-cream pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-accent mb-4">Town Pizza-Hut</h3>
            <p className="opacity-80 mb-4">The Name of Quality. Serving the best pizza, burgers, and fried chicken in Swat.</p>
            <div className="flex items-center gap-2 opacity-80">
              <MapPin size={18} />
              <span>We have multiple branches in Swat.</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm opacity-60">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/menu" className="hover:text-accent transition-colors">Order Now</Link></li>
              <li><Link to="/deals" className="hover:text-accent transition-colors">Latest Deals</Link></li>
              <li><Link to="/branches" className="hover:text-accent transition-colors">Find a Branch</Link></li>
              <li><Link to="/gallery" className="hover:text-accent transition-colors">Our Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm opacity-60">Opening Hours</h4>
            <ul className="flex flex-col gap-2 opacity-80">
              <li>Monday - Sunday</li>
              <li>10:00 AM - 11:45 PM</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm opacity-60">Contact Us</h4>
            <ul className="flex flex-col gap-2 opacity-80">
              <li>Syed Abdul Hadi: 0348-5922580</li>
              <li>Syed Ihsan Ul Hadi: 0341-9097057</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center opacity-60 text-sm">
          &copy; {new Date().getFullYear()} Town Pizza-Hut. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/923189659090" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-[70] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center glow-whatsapp group"
      >
        <span className="absolute left-14 bg-white text-gray-800 px-3 py-1 rounded shadow-md text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us!
        </span>
        <MessageCircle fill="currentColor" size={28} />
      </a>
    </div>
  );
}
