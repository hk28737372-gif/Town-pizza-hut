import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { MapPin, Phone, MessageSquare } from 'lucide-react';

export default function Branches() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBranches() {
      try {
        const snap = await getDocs(collection(db, 'branches'));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => a.name.localeCompare(b.name));
        setBranches(data);
      } catch (error) {
        console.error("error loading branches", error);
      } finally {
        setLoading(false);
      }
    }
    loadBranches();
  }, []);

  return (
    <div className="bg-cream min-h-screen pb-20">
      <div className="bg-ink text-cream py-16 text-center">
        <h1 className="text-5xl font-serif font-bold mb-4 text-accent">Our Branches</h1>
        <p className="opacity-80 max-w-xl mx-auto">Find a Town Pizza-Hut near you in Swat. We are expanding to serve you better.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20 text-primary">Loading branches...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <div key={branch.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cream rounded-bl-full -z-10 opacity-50 border-b border-l border-primary/5"></div>
                
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">{branch.name}</h2>
                
                <div className="flex gap-3 items-start mb-6 text-gray-600">
                  <MapPin className="shrink-0 text-accent mt-1" size={20} />
                  <p className="leading-relaxed">{branch.location}</p>
                </div>

                <div className="flex gap-3 items-start mb-8 text-gray-600">
                  <Phone className="shrink-0 text-accent mt-1" size={20} />
                  <div className="flex flex-col gap-1">
                    {branch.numbers?.map((num: string, idx: number) => (
                      <a key={idx} href={`tel:${num.replace(/-/g, '')}`} className="hover:text-primary transition-colors">
                        {num}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto pt-6 border-t border-gray-100">
                  <a 
                    href={`tel:${branch.numbers?.[0]?.replace(/-/g, '')}`}
                    className="flex-1 bg-cream text-primary font-bold py-3 text-center rounded-xl hover:bg-primary hover:text-white transition-colors"
                  >
                    Call Now
                  </a>
                  <a 
                    href={`https://wa.me/92${branch.numbers?.[0]?.replace(/-/g, '').substring(1)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-[#25D366] text-white font-bold py-3 text-center rounded-xl flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
                  >
                    <MessageSquare size={18} /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
