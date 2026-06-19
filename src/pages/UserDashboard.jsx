import { useContext } from "react"
import { LoanContext } from "../context/loan-context"
import { AuthContext } from "../context/auth-context"
import { useNavigate, Link } from "react-router-dom"
import StatusBadge from "../components/StatusBadge"

export default function UserDashboard() {
  const { loans, makeRepayment } = useContext(LoanContext)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  if (!user) return null

  const myLoans = loans.filter(l => l.email === user.email)
  const totalLoans = myLoans.length
  const activeLoans = myLoans.filter(l => l.status === "Active").length
  const pendingLoans = myLoans.filter(l => l.status === "Pending").length
  const totalOutstanding = myLoans.reduce((acc, l) => acc + (l.remaining || 0), 0)

  const handleLogout = () => { logout(); navigate("/login") }

  const stats = [
    { label:"Total Loans",  value:totalLoans,    grad:"linear-gradient(135deg,#6366f1,#8b5cf6)", emoji:"📄" },
    { label:"Active",       value:activeLoans,   grad:"linear-gradient(135deg,#10b981,#06b6d4)", emoji:"✅" },
    { label:"Pending",      value:pendingLoans,  grad:"linear-gradient(135deg,#f59e0b,#ef4444)", emoji:"⏳" },
    { label:"Outstanding",  value:`₹${totalOutstanding.toLocaleString()}`, grad:"linear-gradient(135deg,#ec4899,#f43f5e)", emoji:"💰" },
  ]

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", fontFamily:"'Outfit',sans-serif" }}>

      {/* Navbar */}
      <nav style={{ background:"var(--white)", borderBottom:"2px solid var(--border)", padding:"0 28px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 16px rgba(99,102,241,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,var(--violet),var(--pink))", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:17, color:"var(--text-1)" }}>LoanEase</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:22 }}>
          <Link to="/profile" style={{ fontSize:14, fontWeight:600, color:"var(--text-2)", textDecoration:"none" }}>Profile</Link>
          <Link to="/loan-history" style={{ fontSize:14, fontWeight:600, color:"var(--text-2)", textDecoration:"none" }}>History</Link>
          <span style={{ fontSize:14, color:"var(--text-2)" }}>👤 <b style={{ color:"var(--text-1)" }}>{user.name}</b></span>
          <button onClick={handleLogout} style={{ background:"linear-gradient(135deg,#fee2e2,#fecaca)", color:"#dc2626", border:"2px solid #fca5a5", borderRadius:10, padding:"7px 16px", fontSize:13, fontWeight:700, cursor:"pointer" }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding:"28px 28px", maxWidth:1200 }}>
        {/* Page header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
          <div>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:26, fontWeight:800, color:"var(--text-1)", letterSpacing:"-0.02em", marginBottom:4 }}>
              My Dashboard 👋
            </h1>
            <p style={{ fontSize:15, color:"var(--text-2)" }}>Here's your loan portfolio at a glance</p>
          </div>
          <Link to="/apply-loan" style={{
            background:"linear-gradient(135deg,var(--violet),var(--pink))", color:"#fff",
            padding:"12px 24px", borderRadius:14, textDecoration:"none",
            fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:700,
            boxShadow:"0 4px 20px rgba(99,102,241,0.35)", display:"flex", alignItems:"center", gap:8
          }}>+ Apply for Loan</Link>
        </div>

        {/* Stat cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, marginBottom:32 }}>
          {stats.map((s, i) => (
            <div key={s.label} className="pop" style={{ background:s.grad, borderRadius:18, padding:"22px 20px", color:"#fff", boxShadow:"0 6px 24px rgba(99,102,241,0.2)", animationDelay:`${i*0.07}s` }}>
              <div style={{ fontSize:24, marginBottom:10 }}>{s.emoji}</div>
              <p style={{ fontSize:11, fontWeight:700, opacity:0.8, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{s.label}</p>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:28, fontWeight:800 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Loan cards */}
        {myLoans.length === 0 ? (
          <div className="b-card" style={{ textAlign:"center", padding:"72px 24px" }}>
            <div style={{ fontSize:52, marginBottom:16 }}>🚀</div>
            <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:20, fontWeight:800, color:"var(--text-1)", marginBottom:8 }}>No loans yet!</h3>
            <p style={{ fontSize:15, color:"var(--text-2)" }}>Apply for your first loan to get started</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }}>
            {myLoans.map((loan, i) => {
              const total = loan.totalPayable || loan.amount
              const paid = total - (loan.remaining || 0)
              const progress = total ? Math.round((paid / total) * 100) : 0

              return (
                <div key={loan.id} className="b-card pop" style={{ animationDelay:`${i*0.07}s`, display:"flex", flexDirection:"column", gap:16, transition:"transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(99,102,241,0.18)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="" }}>

                  {/* Header accent bar */}
                  <div style={{ height:4, borderRadius:4, background:"linear-gradient(90deg,var(--violet),var(--pink))", margin:"-24px -24px 0" }}/>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:16, fontWeight:800, color:"var(--text-1)" }}>{loan.type} Loan</h3>
                    <StatusBadge status={loan.status}/>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[["Amount",`₹${loan.amount.toLocaleString()}`],["EMI",`₹${loan.emi?.toFixed(2)}`],["Remaining",`₹${(loan.remaining||0).toLocaleString()}`],["Tenure",`${loan.tenure} mo`]].map(([l,v]) => (
                      <div key={l} style={{ background:"var(--bg)", borderRadius:10, padding:"10px 12px", border:"1.5px solid var(--border)" }}>
                        <div style={{ fontSize:10, color:"var(--text-3)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>{l}</div>
                        <div style={{ fontSize:15, fontWeight:700, color:"var(--text-1)" }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:12, color:"var(--text-3)", fontWeight:600 }}>Repayment</span>
                      <span style={{ fontSize:12, fontWeight:800, color:"var(--violet)" }}>{progress}%</span>
                    </div>
                    <div style={{ background:"var(--bg-2)", borderRadius:6, height:8, overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:6, background:"linear-gradient(90deg,var(--violet),var(--pink))", width:`${progress}%`, transition:"width 0.6s" }}/>
                    </div>
                  </div>

                  {loan.status === "Active" && (
                    <button onClick={() => makeRepayment(loan.id)} style={{ background:"linear-gradient(135deg,#10b981,#06b6d4)", color:"#fff", border:"none", borderRadius:12, padding:"11px", fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(16,185,129,0.3)" }}>
                      Pay EMI 💳
                    </button>
                  )}
                  {loan.status === "Closed" && <div style={{ textAlign:"center", fontSize:14, fontWeight:700, color:"var(--green)" }}>🎉 Loan Completed!</div>}
                  {loan.status === "Pending" && <div style={{ textAlign:"center", fontSize:14, fontWeight:700, color:"var(--orange)" }}>⏳ Awaiting Approval</div>}
                  {loan.status === "Rejected" && <div style={{ textAlign:"center", fontSize:14, fontWeight:700, color:"var(--red)" }}>❌ Loan Rejected</div>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
