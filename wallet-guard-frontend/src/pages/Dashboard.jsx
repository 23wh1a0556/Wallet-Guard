import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import TransactionList from "../components/TransactionList";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Area, AreaChart
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!data) return <div className="empty-msg">No data found.</div>;

  const categoryData = Object.entries(data.categorySpending || {}).map(
    ([name, value]) => ({ name, value })
  );

  const topCategory = categoryData.reduce(
    (max, c) => (c.value > (max?.value || 0) ? c : max), null
  );

  return (
    <div className="lux-page">
      <div className="lux-orb lux-orb1"></div>
      <div className="lux-orb lux-orb2"></div>
      <div className="lux-orb lux-orb3"></div>

      <div className="lux-top">
        <div>
          <div className="lux-title">Overview</div>
          <div className="lux-sub">All Wallets</div>
        </div>
        <div className="lux-live-badge">
          <span className="lux-live-dot"></span>LIVE
        </div>
      </div>

      <div className="lux-stats">
        <div className="lux-stat">
          <div className="lux-stat-orb" style={{ background: "#c9a84c" }}></div>
          <div className="lux-stat-label">Total Wallets</div>
          <div className="lux-stat-val gold">{data.totalWallets}</div>
          <div className="lux-stat-change">Active wallets</div>
        </div>
        <div className="lux-stat">
          <div className="lux-stat-orb" style={{ background: "#10b981" }}></div>
          <div className="lux-stat-label">Total Balance</div>
          <div className="lux-stat-val green">₹{data.totalBalance?.toFixed(2)}</div>
          <div className="lux-stat-change">Across all wallets</div>
        </div>
        <div className="lux-stat">
          <div className="lux-stat-orb" style={{ background: "#ef4444" }}></div>
          <div className="lux-stat-label">Total Spent</div>
          <div className="lux-stat-val red">₹{data.totalSpent?.toFixed(2)}</div>
          <div className="lux-stat-change">This period</div>
        </div>
      </div>

      <div className="lux-mid">
        <div className="lux-card">
          <div className="lux-card-hd">
            <div className="lux-card-title">Spending Trend</div>
          </div>
          {categoryData.length === 0 ? (
            <p className="empty-msg">No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={categoryData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity={0.35} />
                    <stop offset="60%" stopColor="#c9a84c" stopOpacity={0.08} />
                    <stop offset="100%" stopColor="#c9a84c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#c9a84c08" />
                <XAxis dataKey="name" tick={{ fill: "#3a3a5a", fontSize: 10 }} />
                <YAxis tick={{ fill: "#3a3a5a", fontSize: 10 }} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(v) => `₹${v}`}
                  contentStyle={{ background: "#0d0d1a", border: "1px solid #c9a84c22", borderRadius: 8, fontSize: 12 }}
                />
                <Area
                  type="monotone" dataKey="value"
                  stroke="#c9a84c" strokeWidth={2}
                  fill="url(#goldGrad)"
                  dot={{ fill: "#c9a84c", r: 4, strokeWidth: 2, stroke: "#07070f" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="lux-card">
          <div className="lux-card-hd">
            <div className="lux-card-title">By Category</div>
          </div>
          {categoryData.map((c, i) => {
            const max = Math.max(...categoryData.map((x) => x.value));
            const pct = Math.round((c.value / max) * 100);
            const colors = ["#c9a84c","#10b981","#9b7eea","#ef4444","#3b82f6","#f59e0b","#06b6d4"];
            return (
              <div className="lux-bar-row" key={i}>
                <div className="lux-bar-label">{c.name}</div>
                <div className="lux-bar-bg">
                  <div className="lux-bar-fill" style={{ width: `${pct}%`, background: colors[i % colors.length] }}></div>
                </div>
                <div className="lux-bar-val">₹{c.value}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lux-bottom">
        <div className="lux-card">
          <div className="lux-card-hd">
            <div className="lux-card-title">Recent Transactions</div>
          </div>
          <TransactionList transactions={data.recentTransactions} />
        </div>

        <div className="lux-card">
          <div className="lux-card-hd">
            <div className="lux-card-title">AI Insight</div>
          </div>
          <div className="lux-insight-line"></div>
          {topCategory ? (
            <div className="lux-insight-text">
              <div className="lux-insight-highlight">
                {topCategory.name} is your top spend
              </div>
              You spent ₹{topCategory.value} on {topCategory.name}. Consider setting a category limit.
            </div>
          ) : (
            <p className="empty-msg">No insights yet.</p>
          )}
          {data.suggestions?.length > 0 && (
            <div className="lux-insight-text" style={{ marginTop: 12 }}>
              <div className="lux-insight-highlight green">Suggestion</div>
              {data.suggestions[0]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { getDashboard } from "../services/api";
// import TransactionList from "../components/TransactionList";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// const COLORS = ["#6366f1","#f59e0b","#10b981","#ef4444","#3b82f6","#8b5cf6","#f97316"];

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getDashboard().then((res) => setData(res.data)).catch(console.error).finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div className="loading">Loading dashboard...</div>;
//   if (!data) return <div className="empty-msg">No data found.</div>;

//   const chartData = Object.entries(data.categorySpending || {}).map(([name, value]) => ({ name, value }));

//   return (
//     <div className="page">
//       <h2 className="page-title"> Dashboard</h2>
//       <div className="stats-grid">
//         <div className="stat-card">
//           <span className="stat-label">Total Wallets</span>
//           <span className="stat-value">{data.totalWallets}</span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-label">Total Balance</span>
//           <span className="stat-value">₹{data.totalBalance?.toFixed(2)}</span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-label">Total Spent</span>
//           <span className="stat-value">₹{data.totalSpent?.toFixed(2)}</span>
//         </div>
//       </div>
//       {chartData.length > 0 && (
//         <div className="card">
//           <h3>Spending by Category</h3>
//           <ResponsiveContainer width="100%" height={280}>
//             <PieChart>
//               <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
//                 {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//               </Pie>
//               <Tooltip formatter={(v) => `₹${v}`} />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//       <div className="card">
//         <h3>Recent Transactions</h3>
//         <TransactionList transactions={data.recentTransactions} />
//       </div>
//     </div>
//   );
// }