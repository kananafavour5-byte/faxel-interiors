import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div style={{
      background: "#660810", borderRadius: 14, overflow: "hidden",
      border: "1px solid #334155", display: "flex", flexDirection: "column",
      transition: "transform .2s, border-color .2s, box-shadow .2s",
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#d77a7d";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(94, 8, 21, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#c5a2ac";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ height: 180, overflow: "hidden", background: "#c5a2ac" }}>
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
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#cba49f" }}>
          {product.name}
        </div>
        <div style={{ color: "#a48381", fontSize: 13, lineHeight: 1.6, flex: 1 }}>
          {product.description}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, color: "#c5a2ac" }}>
            ${Number(product.price).toFixed(2)}
          </span>
          <button onClick={() => onAddToCart(product)} style={{
            background: "#c5a2ac", color: "#000", border: "none",
            cursor: "pointer", padding: "8px 16px", borderRadius: 7,
            fontWeight: 700, fontSize: 13,
            fontFamily: "'Oswald', sans-serif", letterSpacing: .5,
            transition: "background .15s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#4b1d3f"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#c5a2ac"}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}