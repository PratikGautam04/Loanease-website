import { useContext } from "react"
import { AuthContext } from "../context/auth-context"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar({ links = [] }) {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate("/login") }

  return (
    <nav style={{
      background:"var(--white)", borderBottom:"2px solid var(--border)",
      padding:"0 28px", height:64,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      fontFamily:"'Outfit',sans-serif", position:"sticky", top:0, zIndex:100,
      boxShadow:"0 2px 16px rgba(99,102,241,0.07)"
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,var(--violet),var(--pink))", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:17, color:"var(--text-1)" }}>LoanEase</span>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:24 }}>
        {links.map(({ to, label }) => (
          <Link key={to} to={to} style={{ fontSize:14, fontWeight:600, color:"var(--text-2)", textDecoration:"none", transition:"color 0.2s" }}
            onMouseEnter={e => e.target.style.color="var(--violet)"}
            onMouseLeave={e => e.target.style.color="var(--text-2)"}
          >{label}</Link>
        ))}
        {user && <span style={{ fontSize:14, color:"var(--text-2)", fontWeight:500 }}>👤 {user.name}</span>}
        <button onClick={handleLogout} style={{
          background:"linear-gradient(135deg,#fee2e2,#fecaca)", color:"#dc2626",
          border:"2px solid #fca5a5", borderRadius:10, padding:"7px 16px",
          fontSize:13, fontWeight:700, cursor:"pointer"
        }}>Logout</button>
      </div>
    </nav>
  )
}
