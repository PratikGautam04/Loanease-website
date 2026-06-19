import { useContext } from "react"
import { AuthContext } from "../context/auth-context"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  if (!user) return null

  const fields = [
    { label:"Full Name",      value:user.name,   emoji:"👤" },
    { label:"Email Address",  value:user.email,  emoji:"✉️" },
    { label:"Mobile Number",  value:user.mobile, emoji:"📱" },
    { label:"Account Role",   value:user.role?.charAt(0).toUpperCase()+user.role?.slice(1), emoji:"🔐" },
  ]

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", fontFamily:"'Outfit',sans-serif" }}>
      <nav style={{ background:"var(--white)", borderBottom:"2px solid var(--border)", padding:"0 28px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 16px rgba(99,102,241,0.07)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,var(--violet),var(--pink))", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:17, color:"var(--text-1)" }}>LoanEase</span>
        </div>
        <button onClick={() => navigate("/dashboard")} className="b-btn-ghost">← Back to Dashboard</button>
      </nav>

      <div style={{ padding:"48px 24px", maxWidth:560, margin:"0 auto" }}>
        {/* Avatar card */}
        <div className="b-card pop" style={{ textAlign:"center", padding:"40px 28px", marginBottom:20, overflow:"hidden", position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:80, background:"linear-gradient(135deg,var(--violet),var(--pink))" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{
              width:80, height:80, borderRadius:"50%",
              background:"linear-gradient(135deg,var(--violet),var(--pink))",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 16px", fontSize:32, fontWeight:800, color:"#fff",
              border:"4px solid var(--white)", boxShadow:"0 4px 20px rgba(99,102,241,0.3)",
              fontFamily:"'Plus Jakarta Sans',sans-serif"
            }}>
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:800, color:"var(--text-1)", marginBottom:6 }}>{user.name}</h2>
            <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"linear-gradient(135deg,rgba(99,102,241,0.1),rgba(236,72,153,0.1))", border:"2px solid rgba(99,102,241,0.15)", borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:700, color:"var(--violet)" }}>
              {user.role?.charAt(0).toUpperCase()+user.role?.slice(1)}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="b-card fade-up">
          <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, fontWeight:800, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:18 }}>Personal Information</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {fields.map(({ label, value, emoji }, i) => (
              <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", borderRadius:12, background: i%2===0 ? "var(--bg)" : "transparent", border: i%2===0 ? "1.5px solid var(--border)" : "none" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:18 }}>{emoji}</span>
                  <span style={{ fontSize:14, color:"var(--text-2)", fontWeight:500 }}>{label}</span>
                </div>
                <span style={{ fontSize:14, fontWeight:700, color:"var(--text-1)" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
