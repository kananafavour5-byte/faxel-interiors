import { useEffect, useState } from "react";

export default function HomePage({ setPage }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

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

        {/* ── Animated Decorative Rings ── */}
        {[
          { size: 180, duration: "6s",  delay: "0s",   dir: 1 },
          { size: 300, duration: "10s", delay: "0.5s", dir: -1 },
          { size: 430, duration: "14s", delay: "1s",   dir: 1 },
          { size: 570, duration: "18s", delay: "1.5s", dir: -1 },
        ].map((r) => (
          <div
            key={r.size}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: r.size,
              height: r.size,
              marginTop: -r.size / 2,
              marginLeft: -r.size / 2,
              borderRadius: "50%",
              border: "1px solid rgba(141, 68, 68, 0.29)",
              pointerEvents: "none",

              animation: `
                ringPulse ${r.duration} ease-in-out infinite alternate,
                ringRotate ${parseFloat(r.duration) * 5}s linear infinite
              `,
              animationDelay: r.delay,
              animationDirection:
                r.dir === -1
                  ? "reverse, reverse"
                  : "alternate, normal",
            }}
          />
        ))}

        {/* ── Orbit Dots ── */}
        {[
          { orbit: 90,  duration: "4s",  color: "#660810" },
          { orbit: 150, duration: "7s",  color: "#c07474" },
          { orbit: 215, duration: "11s", color: "#660810" },
          { orbit: 285, duration: "16s", color: "#c07474" },
        ].map((d) => (
          <OrbitDot key={d.orbit} {...d} />
        ))}

        {/* Eyebrow */}
        <p
          style={{
            color: "#4b1d3f",
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: 5,
            fontSize: 12,
            textTransform: "uppercase",
            marginBottom: 18,
            position: "relative",
            zIndex: 2,

            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transitionDelay: "0.1s",
          }}
        >
          Luxury Living Essentials
        </p>

        {/* Headline line 1 */}
        <div
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(42px, 9vw, 84px)",
            fontWeight: 700,
            lineHeight: 1.08,
            marginBottom: 8,
            color: "#f9ebebed",
            position: "relative",
            zIndex: 2,

            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(-60px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            transitionDelay: "0.25s",
          }}
        >
          Elevate Every
        </div>

        {/* Headline line 2 */}
        <div
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(42px, 9vw, 84px)",
            fontWeight: 700,
            lineHeight: 1.08,
            color: "#660810",
            marginBottom: 28,
            position: "relative",
            zIndex: 2,

            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(60px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            transitionDelay: "0.4s",
          }}
        >
          Corner Of Your Home.
        </div>

        {/* Subtitle */}
        <p
          style={{
            maxWidth: 520,
            margin: "0 auto 40px",
            color: "#702934",
            fontSize: 17,
            lineHeight: 1.75,
            position: "relative",
            zIndex: 2,

            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            transitionDelay: "0.55s",
          }}
        >
          Discover premium doors, elegant fixtures, modern sinks,
          luxury paints, and interior finishes crafted for contemporary living.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 2,

            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transitionDelay: "0.7s",
          }}
        >
          <button
            onClick={() => setPage("shop")}
            style={{
              background: "#660810",
              color: "#f1ebeb",
              border: "none",
              cursor: "pointer",
              padding: "14px 38px",
              borderRadius: 8,
              fontFamily: "'Oswald', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              boxShadow: "0 4px 24px rgba(102,8,16,.35)",
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 6px 36px rgba(102,8,16,.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 24px rgba(102,8,16,.35)";
            }}
          >
            Shop Now →
          </button>

          <button
            onClick={() => setPage("admin")}
            style={{
              background: "transparent",
              color: "#660810",
              border: "1px solid #f1ebeb",
              cursor: "pointer",
              padding: "14px 28px",
              borderRadius: 8,
              fontFamily: "'Oswald', sans-serif",
              fontSize: 17,
              letterSpacing: 1,
              textTransform: "uppercase",
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
      <div
        style={{
          background: "#660810",
          borderTop: "1px solid #f1ebeb",
          borderBottom: "1px solid #f1ebeb",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 0,
        }}
      >
        {[
          { value: "500+", label: "Premium Designs" },
          { value: "12K+", label: "Happy Homeowners" },
          { value: "4.9★", label: "Client Satisfaction" },
          { value: "5yr", label: "Craftsmanship Guarantee" },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "22px 40px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid #4b1d35" : "none",
              flex: "1 1 120px",

              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              transitionDelay: `${0.85 + i * 0.12}s`,
            }}
          >
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 26,
                color: "#d6c0b1",
              }}
            >
              {s.value}
            </div>

            <div
              style={{
                color: "#cabcbb",
                fontSize: 13,
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Feature cards ── */}
      <div
        style={{
          maxWidth: 960,
          margin: "60px auto 0",
          padding: "0 24px 60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 20,
        }}
      >
        {[
          {
            icon: "🔧",
            title: "Pro-Grade Quality",
            desc: "Every tool meets or exceeds professional standards for durability and performance.",
          },
          {
            icon: "🚚",
            title: "Fast Delivery",
            desc: "Same-day dispatch on orders placed before 2 PM on business days.",
          },
          {
            icon: "🛡",
            title: "2-Year Warranty",
            desc: "All products backed by our no-fuss, manufacturer-level warranty.",
          },
          {
            icon: "💳",
            title: "Easy Returns",
            desc: "30-day hassle-free return policy. No questions asked, no forms needed.",
          },
        ].map((f, i) => (
          <div
            key={f.title}
            style={{
              background: "#660810",
              borderRadius: 14,
              padding: "28px 24px",
              border: "1px solid #f1ebeb",

              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition:
                "border-color .2s, transform .2s, opacity .55s ease",
              transitionDelay: `${1.1 + i * 0.13}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c07474";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#f1ebeb";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 34, marginBottom: 14 }}>{f.icon}</div>

            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 17,
                color: "#d6c0b1",
                marginBottom: 8,
              }}
            >
              {f.title}
            </div>

            <div
              style={{
                color: "#cabcbb",
                fontSize: 13,
                lineHeight: 1.65,
              }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes ringPulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.06);
            opacity: 1;
          }
        }

        @keyframes ringRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitSpin {
          from {
            transform:
              rotate(0deg)
              translateX(var(--orbit-r))
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg)
              translateX(var(--orbit-r))
              rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}

/* ── Orbit Dot ── */
function OrbitDot({ orbit, duration, color }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 8,
        height: 8,
        marginTop: -4,
        marginLeft: -4,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 8px 2px ${color}`,
        pointerEvents: "none",

        "--orbit-r": `${orbit}px`,
        animation: `orbitSpin ${duration} linear infinite`,
      }}
    />
  );
}