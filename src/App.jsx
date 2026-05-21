import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import Toast from "./components/Toast";
import { load, save, uid } from "./utils/storage";
import { defaultProducts } from "./data/defaultProducts";

const LS_PRODUCTS = "hw_products";
const LS_CART = "hw_cart";

export default function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(() => load(LS_PRODUCTS, defaultProducts));
  const [cart, setCart] = useState(() => load(LS_CART, []));
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg, type = "success") => {
    const id = uid();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);

  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        const next = existing
          ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
          : [...prev, { ...product, qty: 1 }];
        save(LS_CART, next);
        return next;
      });
      addToast(`${product.name} added to cart!`);
    },
    [addToast]
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #0f172a; }
        @keyframes slideIn {
          from { transform: translateX(60px); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        @media (max-width: 640px) {
          .nav-desktop  { display: none !important; }
          .nav-hamburger{ display: block !important; }
        }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>

      <Navbar page={page} setPage={setPage} cartCount={cartCount} />

      {page === "home"  && <HomePage setPage={setPage} />}
      {page === "shop"  && <ShopPage products={products} onAddToCart={addToCart} />}
      {page === "cart"  && <CartPage cart={cart} setCart={setCart} setPage={setPage} />}
      {page === "admin" && <AdminPage products={products} setProducts={setProducts} />}

      <Toast toasts={toasts} />
    </>
  );
}