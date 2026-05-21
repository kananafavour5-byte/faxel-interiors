import { useState } from "react";
import { save, uid } from "../utils/storage";

const LS_PRODUCTS = "hw_products";
const emptyForm = { name: "", price: "", description: "", image: "" };

const inputStyle = (hasError) => ({
  padding: "10px 14px", background: "#0f172a",
  border: `1px solid ${hasError ? "#ef4444" : "#334155"}`,
  borderRadius: 7, color: "#f8fafc", fontSize: 14, outline: "none", width: "100%",
});

export default function AdminPage({ products, setProducts }) {
  const [form, setForm]     = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Valid price required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setProducts((prev) => {
      const next = editId !== null
        ? prev.map((p) => p.id === editId ? { ...form, id: editId, price: Number(form.price) } : p)
        : [...prev, { ...form, id: uid(), price: Number(form.price) }];
      save(LS_PRODUCTS, next);
      return next;
    });
    setForm(emptyForm);
    setEditId(null);
  };

  const startEdit = (p) => {
    setForm({ name: p.name, price: String(p.price), description: p.description, image: p.image || "" });
    setEditId(p.id);
    setErrors({});
  };

  const cancelEdit = () => { setForm(emptyForm); setEditId(null); setErrors({}); };

  const deleteProduct = (id) => {
    setProducts((prev) => { const n = prev.filter((p) => p.id !== id); save(LS_PRODUCTS, n); return n; });
    if (editId === id) cancelEdit();
  };

  const Field = ({ field, placeholder, type = "text" }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <input
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
        style={inputStyle(errors[field])}
        onFocus={(e) => e.currentTarget.style.borderColor = "#f97316"}
        onBlur={(e)  => e.currentTarget.style.borderColor = errors[field] ? "#ef4444" : "#334155"}
      />
      {errors[field] && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors[field]}</span>}
    </div>
  );

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", background: "#0f172a", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 34, color: "#f8fafc", marginBottom: 28 }}>
          Admin Panel
        </h2>

        {/* Form */}
        <div style={{
          background: "#1e293b", borderRadius: 14, padding: 28,
          border: "1px solid #334155", marginBottom: 36,
        }}>
          <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, color: "#f97316", marginBottom: 20 }}>
            {editId !== null ? "✏️ Edit Product" : "➕ Add New Product"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 14 }}>
            <Field field="name"  placeholder="Product Name" />
            <Field field="price" placeholder="Price (e.g. 29.99)" type="number" />
            <Field field="image" placeholder="Image URL (optional)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
            <textarea
              placeholder="Product description…"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              style={{
                ...inputStyle(errors.description),
                resize: "vertical", fontFamily: "inherit",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "#f97316"}
              onBlur={(e)  => e.currentTarget.style.borderColor = errors.description ? "#ef4444" : "#334155"}
            />
            {errors.description && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.description}</span>}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleSubmit} style={{
              background: "#f97316", color: "#0f172a", border: "none", cursor: "pointer",
              padding: "10px 24px", borderRadius: 7,
              fontFamily: "'Oswald',sans-serif", fontSize: 15, fontWeight: 700,
            }}>
              {editId !== null ? "Save Changes" : "Add Product"}
            </button>
            {editId !== null && (
              <button onClick={cancelEdit} style={{
                background: "#334155", color: "#f8fafc", border: "none",
                cursor: "pointer", padding: "10px 20px", borderRadius: 7, fontSize: 14,
              }}>
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Product list */}
        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, color: "#f8fafc", marginBottom: 16 }}>
          All Products ({products.length})
        </h3>

        {products.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "40px 0" }}>No products yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {products.map((p) => (
              <div key={p.id} style={{
                background: "#1e293b", borderRadius: 12, padding: "14px 18px",
                border: "1px solid #334155",
                display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 8, overflow: "hidden", background: "#0f172a", flexShrink: 0 }}>
                  {p.image
                    ? <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🔩</div>
                  }
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontFamily: "'Oswald',sans-serif", color: "#f8fafc", fontSize: 16 }}>{p.name}</div>
                  <div style={{ color: "#f97316", fontSize: 14 }}>${Number(p.price).toFixed(2)}</div>
                </div>
                <div style={{ color: "#64748b", fontSize: 13, flex: 2, minWidth: 120 }}>
                  {p.description.slice(0, 80)}{p.description.length > 80 ? "…" : ""}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => startEdit(p)} style={{
                    background: "#1d4ed8", color: "#fff", border: "none",
                    cursor: "pointer", padding: "6px 14px", borderRadius: 6, fontSize: 13,
                  }}>Edit</button>
                  <button onClick={() => deleteProduct(p.id)} style={{
                    background: "#ef4444", color: "#fff", border: "none",
                    cursor: "pointer", padding: "6px 14px", borderRadius: 6, fontSize: 13,
                  }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}