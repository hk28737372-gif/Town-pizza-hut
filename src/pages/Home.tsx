import { Link } from 'react-router-dom';
import { ShoppingBag, Tag, MapPin, Clock, PhoneCall, Star } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden -mt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920")',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="bg-white/90 p-8 rounded-full mb-8 shadow-2xl backdrop-blur-sm border-4 border-accent">
             <img src="https://images.gemini.googleusercontent.com/blob/AOvVaw2mR_u8D8y1pG8uE-W4RCHG_9bU5K6Z4PjNxR4Ld3BvM1T7P2Q" alt="Town Pizza Hut Logo" className="w-64 md:w-80 h-auto object-contain" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2">
              <ShoppingBag size={20} /> Order Now
            </Link>
            <Link to="/deals" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2">
              <Tag size={20} /> View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Top Features */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Clock size={40} className="text-accent" />}
              title="Fast Delivery"
              description="Hot and fresh food delivered right to your doorstep."
            />
            <FeatureCard 
              icon={<Star size={40} className="text-accent" />}
              title="Fresh Food"
              description="Made with the finest ingredients and special town recipe."
            />
            <FeatureCard 
              icon={<MapPin size={40} className="text-accent" />}
              title="Family Restaurant"
              description="Great ambiance with birthday halls available for events."
            />
            <FeatureCard 
              icon={<PhoneCall size={40} className="text-accent" />}
              title="Live Order Support"
              description="Dedicated staff available for your queries anytime."
            />
          </div>
        </div>
      </section>

      {/* Featured Categories (Preview) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">Our Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">Discover our wide variety of premium fast-food options, from our signature pizzas to our crispy zinger burgers.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu" className="text-primary hover:text-accent font-semibold border-b-2 border-primary hover:border-accent pb-1 transition-colors">View Full Menu</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="mb-6 p-4 bg-cream rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-serif text-primary mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
