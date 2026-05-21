export default function HomePage({ setPage }) {
  return (
    <div style={{ minHeight: "calc(100vh - 60px)", background: "#e1dbd7", color: "#f8fafc" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #e1dbd7 0%, #cba49f 55%, #4d0e13 100%)",
        padding: "90px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative rings */}
        {[180, 300, 430, 570].map((s) => (
          <div key={s} style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: s, height: s, borderRadius: "50%",
            border: "1px solid rgba(141, 68, 68, 0.29)",
            pointerEvents: "none",
          }} />
        ))}

        <p style={{
          color: "#4b1d3f",
          fontFamily: "'Oswald', sans-serif",
          letterSpacing: 5, fontSize: 12,
          textTransform: "uppercase", marginBottom: 18,
        }}>
          Luxury Living Essentials 
        </p>

        <h1 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(42px, 9vw, 84px)",
          fontWeight: 700, lineHeight: 1.08,
          margin: "0 0 24px",
        }}>
          Elevate Every<br />
          <span style={{ color: "#660810" }}>Corner Of Your Home.</span>
        </h1>

        <p style={{
          maxWidth: 520, margin: "0 auto 40px",
          color: "#702934", fontSize: 17, lineHeight: 1.75,
        }}>
          Discover premium doors, elegant fixtures, modern sinks,
luxury paints, and interior finishes crafted for contemporary living.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setPage("shop")}
            style={{
              background: "#660810", color: "#f1ebeb",
              border: "none", cursor: "pointer",
              padding: "14px 38px", borderRadius: 8,
              fontFamily: "'Oswald', sans-serif", fontSize: 17,
              fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
              boxShadow: "0 4px 24px rgba(249, 22, 22, 0.45)",
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 36px rgba(249,115,22,.65)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(249,115,22,.45)";
            }}
          >
            Shop Now →
          </button>
          <button
            onClick={() => setPage("admin")}
            style={{
              background: "transparent", color: "#660810",
              border: "1px solid #f1ebeb", cursor: "pointer",
              padding: "14px 28px", borderRadius: 8,
              fontFamily: "'Oswald', sans-serif", fontSize: 17,
              letterSpacing: 1, textTransform: "uppercase",
              transition: "border-color .2s, color .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c07474";
              e.currentTarget.style.color = "#f8fafc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#f1ebeb";
              e.currentTarget.style.color = "#660810";
            }}
          >
            Manage Store
          </button>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{
        background: "#1e293b", borderTop: "1px solid #334155",
        borderBottom: "1px solid #334155",
        display: "flex", justifyContent: "center", flexWrap: "wrap",
        gap: 0,
      }}>
        {[
          { value: "500+", label: "Products" },
          { value: "12K+", label: "Happy Customers" },
          { value: "4.9★", label: "Average Rating" },
          { value: "2yr",  label: "Warranty" },
        ].map((s, i) => (
          <div key={s.label} style={{
            padding: "22px 40px", textAlign: "center",
            borderRight: i < 3 ? "1px solid #334155" : "none",
            flex: "1 1 120px",
          }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, color: "#f97316" }}>{s.value}</div>
            <div style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Feature cards ── */}
      <div style={{
        maxWidth: 960, margin: "60px auto 0",
        padding: "0 24px 60px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: 20,
      }}>
        {[
          { icon: "🔧", title: "Pro-Grade Quality",  desc: "Every tool meets or exceeds professional standards for durability and performance." },
          { icon: "🚚", title: "Fast Delivery",       desc: "Same-day dispatch on orders placed before 2 PM on business days." },
          { icon: "🛡",  title: "2-Year Warranty",    desc: "All products backed by our no-fuss, manufacturer-level warranty." },
          { icon: "💳", title: "Easy Returns",        desc: "30-day hassle-free return policy. No questions asked, no forms needed." },
        ].map((f) => (
          <div key={f.title} style={{
            background: "#1e293b", borderRadius: 14, padding: "28px 24px",
            border: "1px solid #334155", transition: "border-color .2s, transform .2s",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f97316";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#334155";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 34, marginBottom: 14 }}>{f.icon}</div>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 17, color: "#f8fafc", marginBottom: 8,
            }}>
              {f.title}
            </div>
            <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.65 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
