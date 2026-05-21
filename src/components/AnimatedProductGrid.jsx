import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

// ─────────────────────────────────────────────────────────────────
//  ADJUST ZONE 1 — Ticker / conveyor belt settings
//  Change these to control the moving strip of products
// ─────────────────────────────────────────────────────────────────
const TICKER_SPEED        = 35;   // seconds for one full loop. Lower = faster. Try 20–60.
const TICKER_CARD_WIDTH   = 260;  // px width of each card in the ticker strip
const TICKER_CARD_GAP     = 24;   // px gap between cards in the ticker strip
const TICKER_STRIP_HEIGHT = 220;  // px height of the ticker strip
const TICKER_PAUSE_ON_HOVER = true; // true = strip pauses when mouse is over it

export default function AnimatedProductGrid({ products, onAddToCart }) {
  return (
    <div>
      {/* ── Cinematic moving ticker strip ── */}
      <TickerStrip products={products} onAddToCart={onAddToCart} />

      {/* ── Staggered grid below ── */}
      <StaggeredGrid products={products} onAddToCart={onAddToCart} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Moving ticker / conveyor belt
// ─────────────────────────────────────────────────────────────────
function TickerStrip({ products, onAddToCart }) {
  const [paused, setPaused] = useState(false);

  // Duplicate items so the loop is seamless
  const items = products.length ? [...products, ...products, ...products] : [];
  const totalWidth = items.length * (TICKER_CARD_WIDTH + TICKER_CARD_GAP);

  if (!products.length) return null;

  return (
    <div style={{ marginBottom: 48 }}>
      {/* Section label */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 18,
      }}>
        <span style={{
          fontFamily: "'Oswald', sans-serif", fontSize: 12,
          color: "#f3d6da", letterSpacing: 4, textTransform: "uppercase",
        }}>
          ▶ Live Inventory
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #f3d6da, transparent)" }} />
        <span style={{ color: "#334155", fontSize: 11 }}>
          {TICKER_PAUSE_ON_HOVER ? "Hover to pause" : ""}
        </span>
      </div>

      {/* Fade masks on left + right edges */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: "linear-gradient(to right, #0f172a, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: "linear-gradient(to left, #0f172a, transparent)",
          pointerEvents: "none",
        }} />

        {/* Scrolling strip */}
        <div
          style={{ overflow: "hidden", height: TICKER_STRIP_HEIGHT }}
          onMouseEnter={() => TICKER_PAUSE_ON_HOVER && setPaused(true)}
          onMouseLeave={() => TICKER_PAUSE_ON_HOVER && setPaused(false)}
        >
          <div style={{
            display: "flex",
            gap: TICKER_CARD_GAP,
            width: totalWidth,
            // ─────────────────────────────────────────────────────
            //  ADJUST ZONE 2 — The actual CSS animation
            //  animationDuration → speed of scroll
            //  animationTimingFunction → "linear" keeps constant speed
            // ─────────────────────────────────────────────────────
            animation: `tickerScroll ${TICKER_SPEED}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}>
            {items.map((p, i) => (
              <TickerCard key={`${p.id}-${i}`} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TickerCard({ product, onAddToCart }) {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: TICKER_CARD_WIDTH,
        minWidth: TICKER_CARD_WIDTH,
        height: TICKER_STRIP_HEIGHT - 4,
        background: "#56030a",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${hovered ? "#f3d6da" : "#7a1a24"}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "border-color .2s",
        cursor: "default",
      }}
    >
      {/* Image half */}
      <div style={{ height: 120, background: "#64748b", overflow: "hidden", flexShrink: 0 }}>
        {!imgErr && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgErr(true)}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform .4s",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36,
          }}>🔩</div>
        )}
      </div>

      {/* Info + button */}
      <div style={{ padding: "10px 14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: "#f8f4f1", lineHeight: 1.2 }}>
          {product.name}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, color: "#f8f4f1" }}>
            ${Number(product.price).toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            style={{
              background: hovered ? "#f3d6da" : "#7a1a24",
              color: hovered ? "#56030a" : "#f8f4f1",
              border: "none", cursor: "pointer",
              padding: "5px 12px", borderRadius: 6,
              fontSize: 12, fontWeight: 700,
              fontFamily: "'Oswald', sans-serif",
              transition: "background .2s, color .2s",
            }}
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Staggered entrance grid
// ─────────────────────────────────────────────────────────────────
function StaggeredGrid({ products, onAddToCart }) {
  const [visible, setVisible] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    // ─────────────────────────────────────────────────────────────
    //  ADJUST ZONE 3 — Stagger timing
    //  staggerDelay → ms between each card appearing. Try 60–200.
    //  threshold    → how much of the card must be visible to trigger (0–1)
    // ─────────────────────────────────────────────────────────────
    const staggerDelay = 80;   // ms between each card
    const threshold    = 0.1;  // 10% visible triggers the animation

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setTimeout(() => {
              setVisible((prev) => [...new Set([...prev, idx])]);
            }, idx * staggerDelay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: 24,
    }}>
      {products.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => (refs.current[i] = el)}
          data-index={i}
          style={{
            // ───────────────────────────────────────────────────
            //  ADJUST ZONE 4 — Card entrance animation style
            //  Change translateY value for slide distance
            //  Change opacity start (0 = invisible → 1 = visible)
            //  Change transition duration/easing below
            // ───────────────────────────────────────────────────
            opacity:   visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <ProductCard product={p} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}