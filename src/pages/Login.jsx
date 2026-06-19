import { useState, useContext } from "react"
import { AuthContext } from "../context/auth-context"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    const user = login(identifier, password)
    if (!user) return alert("Invalid credentials")
    if (remember) localStorage.setItem("rememberUser", JSON.stringify(user))
    if (user.role === "admin") navigate("/admin/dashboard")
    else navigate("/dashboard")
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Outfit', sans-serif" }}>
      
      
      {/* Right form */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 24px", background:"#fafafb" }}>
        <div className="fade-up" style={{ width:"100%", maxWidth:400 }}>
          <div style={{ marginBottom:36 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#ede9fe", borderRadius:20, padding:"5px 14px", marginBottom:16 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--violet)", display:"inline-block" }}/>
              <span style={{ fontSize:12, fontWeight:700, color:"var(--violet)", letterSpacing:"0.04em" }}>WELCOME BACK</span>
            </div>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:28, fontWeight:800, color:"var(--text-1)", marginBottom:6, letterSpacing:"-0.02em" }}>Sign in to your account</h1>
            <p style={{ fontSize:15, color:"var(--text-2)" }}>Good to see you again 👋</p>
          </div>

          <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:18 }}>
            <div>
              <label className="b-label">Email or Mobile</label>
              <input type="text" placeholder="you@example.com" value={identifier}
                onChange={e => setIdentifier(e.target.value)} className="b-input" />
            </div>
            <div>
              <label className="b-label">Password</label>
              <div style={{ position:"relative" }}>
                <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} className="b-input" style={{ paddingRight:46 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
                  background:"none", border:"none", cursor:"pointer", color:"var(--text-3)", display:"flex"
                }}>
                  {showPw
                    ? <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div onClick={() => setRemember(!remember)} style={{
                width:20, height:20, borderRadius:6,
                border:`2px solid ${remember ? "var(--violet)" : "var(--border)"}`,
                background: remember ? "var(--violet)" : "transparent",
                cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all 0.2s", flexShrink:0
              }}>
                {remember && <svg width="11" height="11" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <label onClick={() => setRemember(!remember)} style={{ fontSize:14, color:"var(--text-2)", cursor:"pointer" }}>Remember me</label>
            </div>

            <button type="submit" className="b-btn" style={{ marginTop:4 }}>Sign In →</button>
          </form>

          <p style={{ textAlign:"center", marginTop:28, fontSize:14, color:"var(--text-2)" }}>
            New user?{" "}
            <Link to="/register" style={{ color:"var(--violet)", fontWeight:700, textDecoration:"none" }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
