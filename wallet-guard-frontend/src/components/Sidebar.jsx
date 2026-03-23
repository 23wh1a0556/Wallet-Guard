import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/wallets", label: "Shared Wallets" },
  { to: "/add-expense", label: "Add Expense" },
  { to: "/fraud-alerts", label: "Fraud Alerts" },
  { to: "/ai-insights", label: "AI Insights" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        <span className={`hb-line ${open ? "open1" : ""}`}></span>
        <span className={`hb-line ${open ? "open2" : ""}`}></span>
        <span className={`hb-line ${open ? "open3" : ""}`}></span>
      </button>

      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-name">WalletGuard</div>
          <div className="sidebar-logo-tag">Private Finance</div>
        </div>
        <ul className="sidebar-links">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " active" : "")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="sidebar-user">
          <div className="sidebar-user-name">
            {JSON.parse(localStorage.getItem("user") || "{}").name || "User"}
          </div>
          <div className="sidebar-user-role">Premium Account</div>
        </div>
      </aside>
    </>
  );
}



// import { NavLink } from "react-router-dom";

// // const links = [
// //   { to: "/dashboard", icon: "📊", label: "Dashboard" },
// //   { to: "/wallets", icon: "👛", label: "Shared Wallets" },
// //   { to: "/add-expense", icon: "➕", label: "Add Expense" },
// //   { to: "/fraud-alerts", icon: "🚨", label: "Fraud Alerts" },
// //   { to: "/ai-insights", icon: "🤖", label: "AI Insights" },
// // ];

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