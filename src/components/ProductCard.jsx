import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div style={{
      background: "#1e293b", borderRadius: 14, overflow: "hidden",
      border: "1px solid #334155", display: "flex", flexDirection: "column",
      transition: "transform .2s, border-color .2s, box-shadow .2s",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#f97316";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(249,115,22,.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#334155";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ height: 180, overflow: "hidden", background: "#0f172a" }}>
        {!imgErr && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 48,
          }}>
            🔩
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{
        padding: "16px 18px 20px", flex: 1,
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#f8fafc" }}>
          {product.name}
        </div>
        <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, flex: 1 }}>
          {product.description}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, color: "#f97316" }}>
            ${Number(product.price).toFixed(2)}
          </span>
          <button onClick={() => onAddToCart(product)} style={{
            background: "#f97316", color: "#0f172a", border: "none",
            cursor: "pointer", padding: "8px 16px", borderRadius: 7,
            fontWeight: 700, fontSize: 13,
            fontFamily: "'Oswald', sans-serif", letterSpacing: .5,
            transition: "background .15s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#ea6c0a"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#f97316"}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}