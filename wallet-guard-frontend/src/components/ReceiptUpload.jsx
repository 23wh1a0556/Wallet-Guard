import { useState } from "react";
import { scanReceipt } from "../services/api";

export default function ReceiptUpload({ walletId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return setError("Please select a receipt image");
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("receipt", file);
      formData.append("walletId", walletId);
      const res = await scanReceipt(formData);
      setResult(res.data);
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Receipt scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="receipt-upload">
      <h3>📷 Scan Receipt</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input"
      />
      <button onClick={handleUpload} disabled={loading} className="btn-primary">
        {loading ? "Scanning..." : "Upload & Scan"}
      </button>
      {error && <p className="error-msg">{error}</p>}
      {result && (
        <div className="scan-result">
          <p> Merchant: <strong>{result.merchant}</strong></p>
          <p> Amount: <strong>₹{result.amount}</strong></p>
          <p>🏷 Category: <strong>{result.category}</strong></p>
        </div>
      )}
    </div>
  );
}