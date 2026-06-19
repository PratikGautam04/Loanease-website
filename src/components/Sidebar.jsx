import { Link, useLocation } from "react-router-dom"

const items = [
  { label:"Dashboard", path:"/admin/dashboard" },
  { label:"Applications", path:"/admin/dashboard" },
  { label:"Reports", path:"/admin/dashboard" },
]

export default function Sidebar() {
  const location = useLocation()
  return (
    <div style={{
      width:220, minHeight:"100vh",
      background:"var(--white)", borderRight:"2px solid var(--border)",
      padding:"28px 14px", fontFamily:"'Outfit',sans-serif",
      boxShadow:"2px 0 16px rgba(99,102,241,0.06)"
    }}>
      <div style={{ marginBottom:32, paddingLeft:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:4 }}>
          <div style={{ width:32, height:32, borderRadius:9, background:"linear-gradient(135deg,var(--violet),var(--pink))", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:15, color:"var(--text-1)" }}>LoanEase</span>
        </div>
        <div style={{ fontSize:10, fontWeight:700, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", paddingLeft:41 }}>Admin Panel</div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        {items.map(item => {
          const active = location.pathname === item.path
          return (
            <Link key={item.label} to={item.path} style={{
              display:"flex", alignItems:"center", gap:10,
              padding:"10px 14px", borderRadius:12,
              background: active ? "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(236,72,153,0.07))" : "transparent",
              color: active ? "var(--violet)" : "var(--text-2)",
              textDecoration:"none", fontSize:14, fontWeight: active ? 700 : 500,
              border: active ? "2px solid rgba(99,102,241,0.15)" : "2px solid transparent",
              transition:"all 0.15s"
            }}>
              <span style={{ fontSize:16 }}>{item.emoji}</span>
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
