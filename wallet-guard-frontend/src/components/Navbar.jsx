import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-name">WalletGuard</span>
      </div>
      <div className="navbar-right">
        <span className="user-greeting">Hey, {user.name || "User"}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <span className="brand-icon">🛡</span>
//         <span className="brand-name">WalletGuard</span>
//       </div>
//       <div className="navbar-right">
//         <span className="user-greeting">Hey, {user.name || "User"} 👋</span>
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//       </div>
//     </nav>
//   );
// }