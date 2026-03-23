import { useNavigate } from "react-router-dom";

export default function WalletCard({ wallet }) {
  const navigate = useNavigate();
  return (
    <div className="wallet-card" onClick={() => navigate(`/wallets/${wallet._id}`)}>
      <div className="wallet-card-header">
       
        <span className="wallet-name">{wallet.name}</span>
      </div>
      <div className="wallet-balance">
        ₹{wallet.balance?.toFixed(2) || "0.00"}
      </div>
      <div className="wallet-members">
         {wallet.members?.length || 0} members
      </div>
    </div>
  );
}


// import { NavLink } from "react-router-dom";

// const links = [
//   { to: "/dashboard",  label: "Dashboard" },
//   { to: "/wallets",  label: "Shared Wallets" },
//   { to: "/add-expense",  label: "Add Expense" },
//   { to: "/fraud-alerts",  label: "Fraud Alerts" },
//   { to: "/ai-insights",  label: "AI Insights" },
// ];

// export default function Sidebar() {
//   return (
//     <aside className="sidebar">
//       <ul className="sidebar-links">
//         {links.map((link) => (
//           <li key={link.to}>
//             <NavLink
//               to={link.to}
//               className={({ isActive }) =>
//                 "sidebar-link" + (isActive ? " active" : "")
//               }
//             >
//               <span className="sidebar-icon">{link.icon}</span>
//               <span className="sidebar-label">{link.label}</span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }