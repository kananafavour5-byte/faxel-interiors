import { useState } from "react";

export default function Navbar({ page, setPage, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["home", "shop", "cart", "admin"];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#660810", borderBottom: "1px solid #d6c0b1",
      padding: "0 30px", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 80,
    }}>
      <button onClick={() => setPage("home")} style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "'Oswald', sans-serif", fontSize: 28,
        color: "#d6c0b1", letterSpacing: 1, textTransform: "uppercase",
      }}>
        ⚙ Faxel Interiors
      </button>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 8 }} className="nav-desktop">
        {links.map((l) => (
          <button key={l} onClick={() => setPage(l)} style={{
            background: page === l ? "#d6c0b1" : "transparent",
            color: page === l ? "#0f172a" : "#cbd5e1",
            border: "none", cursor: "pointer", padding: "6px 16px",
            borderRadius: 6, fontFamily: "'Oswald', sans-serif",
            fontSize: 15, letterSpacing: 1,
            transition: "all .2s",
          }}>
            {l === "cart" ? `Cart${cartCount > 0 ? ` (${cartCount})` : ""}` : l}
          </button>
        ))}
      </div>

      {/* Hamburger */}
      <button onClick={() => setMenuOpen((p) => !p)} style={{
        display: "none", background: "none", border: "none",
        cursor: "pointer", color: "#d6c0b1", fontSize: 22,
      }} className="nav-hamburger">
        ☰
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: 80, left: 0, right: 0,
          background: "#660810", borderBottom: "1px solid #d6c0b1",
          display: "flex", flexDirection: "column", padding: "8px 0",
        }}>
          {links.map((l) => (
            <button key={l} onClick={() => { setPage(l); setMenuOpen(false); }} style={{
              background: page === l ? "#d6c0b1" : "transparent",
              color: page === l ? "#0f172a" : "#cbd5e1",
              border: "none", cursor: "pointer", padding: "12px 24px",
              textAlign: "left", fontFamily: "'Oswald', sans-serif",
              fontSize: 15, letterSpacing: 1, textTransform: "uppercase",
            }}>
              {l === "cart" ? `Cart${cartCount > 0 ? ` (${cartCount})` : ""}` : l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}