import { useEffect, useState } from "react";
import { addExpense, getWallets } from "../services/api";
import ReceiptUpload from "../components/ReceiptUpload";

export default function AddExpense() {
  const [wallets, setWallets] = useState([]);
  const [form, setForm] = useState({ walletId: "", description: "", amount: "", category: "", splitBetween: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { getWallets().then((res) => setWallets(res.data)).catch(console.error); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true); setMsg(""); setError("");
    try {
      const splitArr = form.splitBetween ? form.splitBetween.split(",").map((s) => s.trim()) : [];
      await addExpense({ walletId: form.walletId, description: form.description,
        amount: parseFloat(form.amount), category: form.category, splitBetween: splitArr });
      setMsg("✅ Expense added successfully!");
      setForm({ walletId: "", description: "", amount: "", category: "", splitBetween: "" });
    } catch (err) { setError(err.response?.data?.message || "Failed to add expense"); }
    finally { setLoading(false); }
  };

  return (
    <div className="page">
      <h2 className="page-title"> Add Expense</h2>
      <div className="card">
        <h3>Manual Expense</h3>
        {msg && <p className="success-msg">{msg}</p>}
        {error && <p className="error-msg">{error}</p>}
        <div className="form-group">
          <label>Wallet</label>
          <select name="walletId" value={form.walletId} onChange={handleChange} className="input-field">
            <option value="">Select Wallet</option>
            {wallets.map((w) => <option key={w._id} value={w._id}>{w.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input name="description" className="input-field" placeholder="e.g. Lunch at Dominos"
            value={form.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Amount (₹)</label>
          <input name="amount" type="number" className="input-field" placeholder="0.00"
            value={form.amount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="input-field">
            <option value="">Select Category</option>
            {["Food","Travel","Shopping","Bills","Entertainment","Health","Education","Other"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Split Between (User IDs, comma separated)</label>
          <input name="splitBetween" className="input-field" placeholder="Leave empty for personal"
            value={form.splitBetween} onChange={handleChange} />
        </div>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </div>
      {form.walletId && (
        <div className="card">
          <ReceiptUpload walletId={form.walletId}
            onSuccess={(r) => setMsg(`✅ Receipt scanned: ${r.merchant} - ₹${r.amount}`)} />
        </div>
      )}
    </div>
  );
}