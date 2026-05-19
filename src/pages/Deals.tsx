import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useCartStore } from '../store/cart';
import { Plus } from 'lucide-react';

export default function Deals() {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    async function loadDeals() {
      try {
        const snap = await getDocs(collection(db, 'deals'));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // sort by price
        data.sort((a, b) => a.price - b.price);
        setDeals(data);
      } catch (error) {
        console.error("error loading deals", error);
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, []);

  return (
    <div className="bg-cream min-h-screen pb-20">
      <div className="bg-accent text-primary py-16 text-center shadow-inner">
        <h1 className="text-5xl font-serif font-bold mb-4">Combo Deals</h1>
        <p className="opacity-90 max-w-xl font-medium mx-auto">Get the best value with our special combination deals perfect for families and hunger pangs.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20 text-primary font-medium">Loading amazing deals...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map(deal => (
              <div key={deal.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow group">
                <div className="aspect-video relative bg-ink/5 overflow-hidden">
                  {deal.imageUrl ? (
                    <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-serif text-gray-400">Deal Image</div>
                  )}
                  <div className="absolute top-4 right-4 bg-accent text-primary font-bold px-4 py-2 rounded-full shadow-lg transform rotate-3">
                    Rs. {deal.price}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h2 className="text-2xl font-serif font-bold text-primary mb-6 border-b border-gray-100 pb-4">{deal.title}</h2>
                  
                  <ul className="flex flex-col gap-3 mb-8 flex-grow">
                    {deal.items?.map((item: string, idx: number) => (
                      <li key={idx} className="text-gray-600 font-medium">{item}</li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => {
                        addItem({
                          id: deal.id,
                          productId: deal.id,
                          name: deal.title,
                          price: deal.price,
                          quantity: 1,
                          imageUrl: deal.imageUrl
                        });
                        alert(`${deal.title} added to cart!`);
                    }}
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={20} /> Add Deal to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
