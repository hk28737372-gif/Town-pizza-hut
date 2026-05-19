import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useCartStore } from '../store/cart';
import { Plus } from 'lucide-react';

export default function Menu() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    async function loadData() {
      try {
        const catSnap = await getDocs(collection(db, 'categories'));
        const cats = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        
        const prodSnap = await getDocs(collection(db, 'products'));
        const prods = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        
        setCategories(cats);
        setProducts(prods);
        setLoading(false);
      } catch (error) {
        console.error("Error loading menu", error);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent border-t-primary rounded-full animate-spin"></div>
          <p className="text-primary font-medium">Loading delicious menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Menu Header */}
      <div className="bg-primary text-cream py-16 text-center shadow-inner">
        <h1 className="text-5xl font-serif font-bold mb-4 text-accent">Our Menu</h1>
        <p className="opacity-90 max-w-2xl mx-auto">Explore our wide variety of fast food. Each dish is prepared with fresh ingredients and our special town recipes.</p>
      </div>

      <div className="container mx-auto px-4 py-12">
        {categories.map(cat => {
          const categoryProducts = products.filter(p => p.categoryId === cat.id);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={cat.id} className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-serif font-bold text-primary">{cat.name}</h2>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAdd={() => {
                    // Default to first size if sizes exist, otherwise standard item
                    const price = product.sizes && product.sizes.length > 0 ? product.sizes[0].price : product.price;
                    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0].name : undefined;
                    
                    addItem({
                      id: `${product.id}${size ? '-'+size : ''}`,
                      productId: product.id,
                      name: product.name,
                      price: price,
                      quantity: 1,
                      size: size,
                      imageUrl: product.imageUrl
                    });
                    
                    // Simple toast could be added here
                    alert(`${product.name} added to cart!`);
                  }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: any, onAdd: () => void }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-serif italic border border-gray-200">
            Town Pizza-Hut
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-lg text-ink leading-tight">{product.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">
            Rs. {product.price}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-6 flex-grow">{product.description}</p>
        
        <button 
          onClick={onAdd}
          className="w-full py-3 rounded-xl bg-cream text-primary border border-primary/20 font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
        >
          <Plus size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
