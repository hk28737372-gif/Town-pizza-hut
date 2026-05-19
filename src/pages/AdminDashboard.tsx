import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        try {
          const docRef = doc(db, 'adminUsers', u.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().role === 'admin') {
            setIsAdmin(true);
            
            // fetch live orders
            const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
            onSnapshot(q, (snapshot) => {
              setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
            });
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Admin check failed", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-cream">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-cream">
        <div className="bg-white p-10 rounded-3xl shadow-md text-center border border-gray-100 max-w-md w-full">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">Admin Login</h2>
          <p className="text-gray-500 mb-8">Access restricted to authorized personnel.</p>
          <button 
            onClick={login}
            className="w-full bg-ink text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-ink/80 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-cream text-center px-4">
        <h2 className="text-3xl font-serif font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-8 max-w-md">Your account ({user.email}) does not have administrator privileges. Please contact the management if you believe this is an error.</p>
        <button 
          onClick={() => signOut(auth)}
          className="bg-white text-ink px-6 py-2 rounded-lg border border-gray-200"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink">Town Pizza-Hut Admin</h1>
          <p className="text-sm text-gray-500">Logged in as {user.email}</p>
        </div>
        <button 
          onClick={() => signOut(auth)}
          className="text-red-500 font-medium hover:underline"
        >
          Sign Out
        </button>
      </header>

      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Live Orders</h2>
          
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-10 text-center text-gray-500">No orders yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">ID / Date</th>
                      <th className="p-4 font-semibold text-gray-600">Customer</th>
                      <th className="p-4 font-semibold text-gray-600">Branch</th>
                      <th className="p-4 font-semibold text-gray-600">Items</th>
                      <th className="p-4 font-semibold text-gray-600">Total</th>
                      <th className="p-4 font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <span className="block text-xs font-mono text-gray-400 mb-1">{order.id}</span>
                          <span className="text-sm">{new Date(order.createdAt).toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium block">{order.customerName}</span>
                          <span className="text-sm text-gray-500">{order.phone}</span>
                        </td>
                        <td className="p-4 text-sm">{order.branchName}</td>
                        <td className="p-4">
                          <ul className="text-sm text-gray-600 list-disc pl-4">
                            {order.items.map((item: any, i: number) => (
                              <li key={i}>{item.quantity}x {item.name} {item.size && `(${item.size})`}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-4 font-bold">Rs. {order.totalBill}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'dispatched' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
