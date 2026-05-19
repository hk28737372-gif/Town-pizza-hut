import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  return (
    <div className="bg-cream min-h-screen pb-20">
      <div className="bg-primary text-white py-16 text-center shadow-inner">
        <h1 className="text-5xl font-serif font-bold mb-4 text-accent">Contact Us</h1>
        <p className="opacity-90 max-w-xl mx-auto">We'd love to hear from you. Get in touch with us for complaints, suggestions, or events.</p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-ink mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">For direct orders, please visit our Branches or Menu pages. For general inquiries, feedback, or booking our Birthday Halls, use the contact information below.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactCard 
                icon={<Clock />} 
                title="Operational Hours" 
                detail="10:00 AM → 11:45 PM" 
                subtext="Open Monday to Sunday"
              />
              <ContactCard 
                icon={<Mail />} 
                title="Management" 
                detail="Syed Abdul Hadi" 
                subtext="0348-5922580"
              />
              <ContactCard 
                icon={<Phone />} 
                title="Support" 
                detail="Syed Ihsan Ul Hadi" 
                subtext="0341-9097057"
              />
              <ContactCard 
                icon={<MapPin />} 
                title="Head Office" 
                detail="Township Chowk" 
                subtext="Kabal Road, Swat"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Send us a Message</h3>
            <form className="flex flex-col gap-5" onSubmit={e => { e.preventDefault(); alert('Message sent successfully!'); setFormData({name: '', phone: '', message: ''})}}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 bg-cream focus:bg-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 bg-cream focus:bg-white"
                  placeholder="03XXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message or Suggestion</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 bg-cream focus:bg-white resize-none"
                  placeholder="How can we improve?"
                />
              </div>
              <button 
                type="submit"
                className="mt-2 w-full bg-accent text-primary font-bold text-lg py-4 rounded-xl hover:bg-accent/90 transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, detail, subtext }: { icon: React.ReactNode, title: string, detail: string, subtext: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
      <div className="text-accent mb-4 bg-cream p-3 rounded-full">
        {icon}
      </div>
      <h4 className="font-bold text-ink mb-1">{title}</h4>
      <p className="text-primary font-medium">{detail}</p>
      <p className="text-gray-500 text-sm mt-1">{subtext}</p>
    </div>
  );
}
