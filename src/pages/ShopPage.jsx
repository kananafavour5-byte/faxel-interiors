import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ShopPage({ products, onAddToCart }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", background: "#0f172a", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 34, color: "#f8fafc", marginBottom: 8 }}>
          All Products
        </h2>
        <p style={{ color: "#64748b", marginBottom: 28 }}>
          {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
        </p>

        <input
          placeholder="🔍  Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: 400, padding: "10px 16px",
            background: "#1e293b", border: "1px solid #334155",
            borderRadius: 8, color: "#f8fafc", fontSize: 15,
            marginBottom: 32, outline: "none", boxSizing: "border-box",
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = "#f97316"}
          onBlur={(e)  => e.currentTarget.style.borderColor = "#334155"}
        />

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "60px 0", fontSize: 18 }}>
            No products found.
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: 24,
          }}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}