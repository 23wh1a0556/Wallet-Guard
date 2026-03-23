import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransactions, getSettlement } from "../services/api";
import TransactionList from "../components/TransactionList";

export default function WalletDetails() {
  const { walletId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTransactions(walletId), getSettlement(walletId)])
      .then(([txRes, settleRes]) => {
        setTransactions(txRes.data);
        setSettlements(settleRes.data.settlements || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [walletId]);

  if (loading) return <div className="loading">Loading wallet details...</div>;

  return (
    <div className="page">
      <h2 className="page-title"> Wallet Details</h2>
      <div className="card">
        <h3>Settlement Summary</h3>
        {settlements.length === 0 ? <p className="empty-msg">All settled up! 🎉</p> : (
          <ul className="settlement-list">
            {settlements.map((s, i) => (
              <li key={i} className="settlement-item">
                <span> {s.from}</span>
                <span className="arrow">→</span>
                <span> {s.to}</span>
                <span className="settlement-amount">₹{s.amount?.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card">
        <h3>Expense History</h3>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}