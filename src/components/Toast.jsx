export default function Toast({ toasts }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      zIndex: 9999, display: "flex", flexDirection: "column", gap: 8,
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: t.type === "error" ? "#ef4444" : "#16a34a",
          color: "#fff", padding: "10px 18px", borderRadius: 10,
          fontSize: 14, fontWeight: 600,
          boxShadow: "0 4px 20px rgba(0,0,0,.18)",
          animation: "slideIn .25s ease", maxWidth: 280,
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}