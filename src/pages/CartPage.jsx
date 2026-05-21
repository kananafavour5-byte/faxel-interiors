import { save } from "../utils/storage";

const LS_CART = "hw_cart";

const qtyBtn = {
  background: "#334155", color: "#f8fafc", border: "none",
  cursor: "pointer", width: 30, height: 30, borderRadius: 6,
  fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
};

export default function CartPage({ cart, setCart, setPage }) {

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const next = prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
      save(LS_CART, next);
      return next;
    });
  };

  const remove = (id) => {
    setCart((prev) => {
      const next = prev.filter((i) => i.id !== id);
      save(LS_CART, next);
      return next;
    });
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  if (!cart.length) return (
    <div style={{
      minHeight: "calc(100vh - 60px)", background: "#0f172a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 20,
    }}>
      <div style={{ fontSize: 64 }}>🛒</div>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 26, color: "#f8fafc" }}>
        Your cart is empty
      </div>
      <button onClick={() => setPage("shop")} style={{
        background: "#f97316", color: "#0f172a", border: "none",
        cursor: "pointer", padding: "12px 28px", borderRadius: 8,
        fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700,
      }}>
        Browse Shop
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", background: "#0f172a", padding: "40px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 34, color: "#f8fafc", marginBottom: 28 }}>
          Your Cart
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {cart.map((item) => (
            <div key={item.id} style={{
              background: "#1e293b", borderRadius: 12, padding: 18,
              border: "1px solid #334155",
              display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
            }}>
              {/* Thumbnail */}
              <div style={{ width: 64, height: 64, borderRadius: 8, overflow: "hidden", background: "#0f172a", flexShrink: 0 }}>
                {item.image
                  ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🔩</div>
                }
              </div>

              {/* Name + price */}
              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, color: "#f8fafc" }}>{item.name}</div>
                <div style={{ color: "#f97316", fontSize: 15, fontWeight: 600 }}>${Number(item.price).toFixed(2)}</div>
              </div>

              {/* Qty controls */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => updateQty(item.id, -1)} style={qtyBtn}>−</button>
                <span style={{ color: "#f8fafc", minWidth: 24, textAlign: "center", fontWeight: 700 }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id,  1)} style={qtyBtn}>+</button>
              </div>

              {/* Line total */}
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, color: "#f8fafc", minWidth: 72, textAlign: "right" }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>

              {/* Remove */}
              <button onClick={() => remove(item.id)} style={{
                background: "#ef4444", color: "#fff", border: "none",
                cursor: "pointer", padding: "6px 12px", borderRadius: 6, fontSize: 13,
              }}>✕</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{
          background: "#1e293b", borderRadius: 12, padding: 24,
          marginTop: 24, border: "1px solid #334155",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ color: "#94a3b8", fontSize: 16 }}>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, color: "#f97316" }}>
              ${total.toFixed(2)}
            </span>
          </div>
          <button style={{
            width: "100%", background: "#f97316", color: "#0f172a",
            border: "none", cursor: "pointer", padding: 14, borderRadius: 8,
            fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: 1,
          }}>
            Proceed to Checkout
          </button>
          <p style={{ textAlign: "center", color: "#475569", fontSize: 12, marginTop: 10 }}>
            Payment integration coming soon.
          </p>
        </div>

      </div>
    </div>
  );
}