import { useState, useEffect } from 'react';
import { useCartStore } from '../store/cart';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, total, addItem, removeItem, updateQuantity } = useCartStore(state => ({
    items: state.items,
    total: state.getTotal(),
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity
  }));

  const [branches, setBranches] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branchId: '',
    address: '',
    notes: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBranches() {
      const snap = await getDocs(collection(db, 'branches'));
      setBranches(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    loadBranches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return alert("Your cart is empty");
    
    const branch = branches.find(b => b.id === formData.branchId);
    if (!branch) return alert("Please select a valid branch");

    try {
      // 1. Send purely to firebase for admin to see
      await addDoc(collection(db, "orders"), {
        customerName: formData.name,
        phone: formData.phone,
        branchId: branch.id,
        branchName: branch.name,
        deliveryAddress: formData.address,
        additionalNotes: formData.notes,
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size || null
        })),
        totalBill: total,
        status: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      // 2. Open WhatsApp
      // Primary number mapping based on specs
      let targetNumber = "923189659090"; // Branch 1 default
      if (branch.id === "branch-3") targetNumber = "923199629090";
      if (branch.id === "branch-5") targetNumber = "923409659090";

      let msg = `*New Order - Town Pizza-Hut*\n\n`;
      msg += `*Customer Name:* ${formData.name}\n`;
      msg += `*Phone Number:* ${formData.phone}\n`;
      msg += `*Selected Branch:* ${branch.name}\n`;
      msg += `*Delivery Address:* ${formData.address}\n\n`;
      msg += `*Ordered Items:*\n`;
      
      items.forEach(item => {
        msg += `- ${item.name} ${item.size ? `(${item.size})` : ''} ×${item.quantity} (Rs. ${item.price * item.quantity})\n`;
      });

      msg += `\n*Total Bill:* Rs. ${total}\n`;
      if (formData.notes) {
        msg += `\n*Notes:* ${formData.notes}\n`;
      }

      const encodedMsg = encodeURIComponent(msg);
      window.open(`https://wa.me/${targetNumber}?text=${encodedMsg}`, "_blank");
      
      useCartStore.getState().clearCart();
      alert("Order placed! Please send the WhatsApp message to confirm.");
      navigate("/");

    } catch (error) {
      console.error("Error creating order", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🛒</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our delicious menu!</p>
        <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link to="/menu" className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium mb-8">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cart Items */}
          <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100 h-fit">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-cream rounded-xl overflow-hidden shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">Image</div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-ink">{item.name}</h3>
                    {item.size && <p className="text-xs text-gray-500 uppercase">{item.size}</p>}
                    <p className="text-primary font-bold mt-1">Rs. {item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-3 bg-cream rounded-full px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-primary">
                        <Minus size={12} />
                      </button>
                      <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-primary">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center text-xl font-bold text-ink">
                <span>Total</span>
                <span className="text-primary">Rs. {total}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6 border-b border-gray-100 pb-4">Delivery Details</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 bg-cream focus:bg-white transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp / Phone Number *</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 bg-cream focus:bg-white transition-colors"
                  placeholder="03XXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Branch *</label>
                <select 
                  required
                  value={formData.branchId}
                  onChange={e => setFormData({...formData, branchId: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 bg-cream focus:bg-white transition-colors"
                >
                  <option value="" disabled>Choose nearest branch</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name} - {b.location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address *</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 bg-cream focus:bg-white transition-colors resize-none"
                  placeholder="House #, Street, Block, Area..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea 
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 bg-cream focus:bg-white transition-colors resize-none"
                  placeholder="Less spicy, extra ketchup..."
                />
              </div>

              <button 
                type="submit"
                className="mt-4 w-full bg-primary text-white font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Place Order via WhatsApp
              </button>
              <p className="text-center text-xs text-gray-500 mt-2">
                You will be redirected to WhatsApp to confirm your order.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
