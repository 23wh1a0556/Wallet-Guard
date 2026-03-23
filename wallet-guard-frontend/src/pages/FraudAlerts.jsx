import { useEffect, useState } from "react";
import { getFraudAlerts } from "../services/api";

export default function FraudAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFraudAlerts().then((res) => setAlerts(res.data.alerts || [])).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading fraud alerts...</div>;

  return (
    <div className="page">
      <h2 className="page-title"> Fraud Alerts</h2>
      {alerts.length === 0 ? (
        <div className="card"><p className="empty-msg">✅ No fraud alerts! Your spending looks normal.</p></div>
      ) : (
        <div className="alerts-list">
          {alerts.map((alert) => (
            <div key={alert._id} className="alert-card fraud">
              <div className="alert-header">
                <span className="alert-icon">⚠️</span>
                <span className="alert-category">{alert.category}</span>
                <span className="alert-amount">₹{alert.amount}</span>
              </div>
              <p className="alert-message">{alert.message}</p>
              <span className="alert-date">{new Date(alert.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}