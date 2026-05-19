import { useState } from 'react';

const STATIC_GALLERY = [
  { id: 1, title: 'Zinger Burger', category: 'burger', url: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Town Pizza', category: 'pizza', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Interior Ambience', category: 'interior', url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Family Environment', category: 'environment', url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Crispy Broast', category: 'food', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Juicy Beef Burger', category: 'burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  
  const filters = [
    { id: 'all', name: 'All Photos' },
    { id: 'food', name: 'Food' },
    { id: 'burger', name: 'Burgers' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'interior', name: 'Interior' },
    { id: 'environment', name: 'Environment' }
  ];

  const filtered = filter === 'all' ? STATIC_GALLERY : STATIC_GALLERY.filter(img => img.category === filter || (filter === 'food' && ['burger', 'pizza'].includes(img.category)));

  return (
    <div className="bg-cream min-h-screen pb-20">
      <div className="bg-primary py-16 text-center shadow-inner">
        <h1 className="text-5xl font-bold mb-4 text-white">
          <span className="font-logo-main tracking-wide">TOWN</span>
          <span className="font-logo-sub text-accent ml-2">Gallery</span>
        </h1>
        <p className="opacity-90 max-w-xl mx-auto text-white">Take a glimpse into the delicious world of Town Pizza-Hut.</p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                filter === f.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-gray-500 hover:bg-cream border border-gray-200'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
          {filtered.map((img) => (
            <div key={img.id} className="relative group overflow-hidden rounded-2xl cursor-pointer">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white font-serif font-bold text-xl">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
