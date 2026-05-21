import { save } from "../utils/storage";

const LS_CART = "hw_cart";

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

  const clearCart = () => {
    setCart([]);
    save(LS_CART, []);
  };

  const total      = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  // ── Empty state ──
  if (!cart.length) return (
    <div style={{
      minHeight: "calc(100vh - 60px)", background: "linear-gradient(135deg, #e1dbd7 0%, #cba49f 55%, #4d0e13 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 20,
    }}>
      <div style={{ fontSize: 72 }}>🛒</div>
      <div style={{
        fontFamily: "'Oswald', sans-serif",
        fontSize: 28, color: "#4d0e13",
      }}>
        Your cart is empty
      </div>
      <p style={{ color: "#4d0e13", fontSize: 15 }}>
        Add some tools and come back!
      </p>
      <button
        onClick={() => setPage("shop")}
        style={{
          background: "#8c5d5d", color: "#f3d7d4",
          border: "none", cursor: "pointer",
          padding: "12px 30px", borderRadius: 8,
          fontFamily: "'Oswald', sans-serif",
          fontSize: 16, fontWeight: 700, letterSpacing: 1,
        }}
      >
        Browse Shop
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", background: "linear-gradient(135deg, #e1dbd7 0%, #cba49f 55%, #4d0e13 100%)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 34, color: "#f8fafc" }}>
            Your Cart
          </h2>
          <button onClick={clearCart} style={{
            background: "transparent", color: "#ef4444",
            border: "1px solid #ef4444", cursor: "pointer",
            padding: "6px 16px", borderRadius: 6, fontSize: 13,
            transition: "background .15s, color .15s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ef4444"; }}
          >
            Clear All
          </button>
        </div>

        {/* Cart items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cart.map((item) => (
            <div key={item.id} style={{
              background: "#660810", borderRadius: 12,
              padding: "16px 20px",
              border: "1px solid #d6b7b1",
              display: "flex", alignItems: "center",
              gap: 16, flexWrap: "wrap",
            }}>
              {/* Thumbnail */}
              <div style={{
                width: 68, height: 68, borderRadius: 10,
                overflow: "hidden", background: "#ead7d3", flexShrink: 0,
              }}>
                {item.image ? (
                  <img src={item.image} alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 28,
                  }}>🔩</div>
                )}
              </div>

              {/* Name + unit price */}
              <div style={{ flex: 1, minWidth: 130 }}>
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 17, color: "#f8fafc", marginBottom: 3,
                }}>
                  {item.name}
                </div>
                <div style={{ color: "#c4a9a9", fontSize: 13 }}>
                  ${Number(item.price).toFixed(2)} each
                </div>
              </div>

              {/* Qty controls */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() => updateQty(item.id, -1)}
                  style={qtyBtnStyle}
                >−</button>
                <span style={{
                  color: "#f8fafc", fontFamily: "'Oswald', sans-serif",
                  fontSize: 17, minWidth: 26, textAlign: "center",
                }}>
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  style={qtyBtnStyle}
                >+</button>
              </div>

              {/* Line total */}
              <div style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 19, color: "#c4a9a9",
                minWidth: 76, textAlign: "right",
              }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>

              {/* Remove */}
              <button onClick={() => remove(item.id)} style={{
                background: "#713036", color: "#ef4444",
                border: "1px solid #ef4444", cursor: "pointer",
                width: 32, height: 32, borderRadius: 6,
                fontSize: 14, display: "flex",
                alignItems: "center", justifyContent: "center",
                transition: "background .15s",
                flexShrink: 0,
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#ef4444"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#713036"}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={{
          background: "#660810", borderRadius: 14,
          padding: "24px 28px", marginTop: 24,
          border: "1px solid #d6b7b1",
        }}>
          <h3 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 18, color: "#d3c2c2", marginBottom: 16,
          }}>
            Order Summary
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            <Row label={`Items (${totalItems})`}    value={`$${total.toFixed(2)}`} />
            <Row label="Shipping"                   value="Free" accent />
            <Row label="Tax (estimated)"            value={`$${(total * 0.08).toFixed(2)}`} />
            <div style={{ borderTop: "1px solid #d6b7b1", paddingTop: 12, marginTop: 4 }} />
            <Row label="Total" value={`$${(total * 1.08).toFixed(2)}`} bold />
          </div>

          <button style={{
            width: "100%", background: "#af776e", color: "#f8fafc",
            border: "none", cursor: "pointer", padding: "15px",
            borderRadius: 9, fontFamily: "'Oswald', sans-serif",
            fontSize: 18, fontWeight: 700, letterSpacing: 1,
            textTransform: "uppercase",
            transition: "background .15s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#4b1d3f"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#af776e"}
          >
            Proceed to Checkout
          </button>
          <p style={{
            textAlign: "center", color: "#f8fafc",
            fontSize: 12, marginTop: 10,
          }}>
            🔒 Secure checkout — payment integration coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  background: "#713036", color: "#f8fafc",
  border: "none", cursor: "pointer",
  width: 32, height: 32, borderRadius: 7,
  fontSize: 18, display: "flex",
  alignItems: "center", justifyContent: "center",
  transition: "background .15s",
};

function Row({ label, value, accent, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "#c4a9a9", fontSize: 14 }}>{label}</span>
      <span style={{
        color: accent ? "#16a34a" : bold ? "#f8fafc" : "#c4a9a9",
        fontFamily: bold ? "'Oswald', sans-serif" : "inherit",
        fontSize: bold ? 20 : 14,
        fontWeight: bold ? 700 : 400,
      }}>
        {value}
      </span>
    </div>
  );
}