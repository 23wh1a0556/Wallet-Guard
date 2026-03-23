import { useEffect, useState } from "react";
import { getWallets, createWallet, addMembers } from "../services/api";
import WalletCard from "../components/WalletCard";

export default function SharedWallets() {
  const [wallets, setWallets] = useState([]);
  const [newWallet, setNewWallet] = useState({ name: "", members: "" });
  const [inviteData, setInviteData] = useState({ walletId: "", members: "" });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const fetchWallets = () => {
    getWallets().then((res) => setWallets(res.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { fetchWallets(); }, []);

  const handleCreate = async () => {
    try {
      const membersArr = newWallet.members ? newWallet.members.split(",").map((m) => m.trim()) : [];
      await createWallet({ name: newWallet.name, members: membersArr });
      setMsg("✅ Wallet created!");
      setNewWallet({ name: "", members: "" });
      fetchWallets();
    } catch (err) { setMsg(err.response?.data?.message || "Failed to create wallet"); }
  };

  const handleInvite = async () => {
    try {
      const membersArr = inviteData.members.split(",").map((m) => m.trim());
      await addMembers({ walletId: inviteData.walletId, members: membersArr });
      setMsg("✅ Members added!");
      setInviteData({ walletId: "", members: "" });
      fetchWallets();
    } catch (err) { setMsg(err.response?.data?.message || "Failed to add members"); }
  };

  return (
    <div className="page">
      <h2 className="page-title"> Shared Wallets</h2>
      {msg && <p className="success-msg">{msg}</p>}
      <div className="card">
        <h3>Create New Wallet</h3>
        <div className="form-row">
          <input className="input-field" placeholder="Wallet name"
            value={newWallet.name} onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })} />
          <input className="input-field" placeholder="Member IDs (comma separated)"
            value={newWallet.members} onChange={(e) => setNewWallet({ ...newWallet, members: e.target.value })} />
          <button className="btn-primary" onClick={handleCreate}>Create</button>
        </div>
      </div>
      <div className="card">
        <h3>Invite Members</h3>
        <div className="form-row">
          <input className="input-field" placeholder="Wallet ID"
            value={inviteData.walletId} onChange={(e) => setInviteData({ ...inviteData, walletId: e.target.value })} />
          <input className="input-field" placeholder="Member IDs (comma separated)"
            value={inviteData.members} onChange={(e) => setInviteData({ ...inviteData, members: e.target.value })} />
          <button className="btn-primary" onClick={handleInvite}>Add Members</button>
        </div>
      </div>
      {loading ? <p className="loading">Loading wallets...</p>
        : wallets.length === 0 ? <p className="empty-msg">No wallets yet. Create one!</p>
        : <div className="wallets-grid">{wallets.map((w) => <WalletCard key={w._id} wallet={w} />)}</div>}
    </div>
  );
}