import { useContext } from "react"
import { LoanContext } from "../context/loan-context"
import { AuthContext } from "../context/auth-context"
import { useNavigate } from "react-router-dom"
import StatusBadge from "../components/StatusBadge"

export default function LoanHistory() {
  const { loans } = useContext(LoanContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  if (!user) return null
  const myLoans = loans.filter(l => l.email === user.email)

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

      <div style={{ padding:"28px", maxWidth:800, margin:"0 auto" }}>
        <div className="fade-up" style={{ marginBottom:28 }}>
          <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:26, fontWeight:800, color:"var(--text-1)", letterSpacing:"-0.02em", marginBottom:4 }}>Loan History 📋</h1>
          <p style={{ fontSize:15, color:"var(--text-2)" }}>All your past and current loan records</p>
        </div>

        {myLoans.length === 0 ? (
          <div className="b-card" style={{ textAlign:"center", padding:"72px 24px" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📋</div>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, fontWeight:700, color:"var(--text-2)" }}>No loan records found</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {myLoans.map((loan, i) => {
              const total = loan.totalPayable || loan.amount
              const paid = total - (loan.remaining || 0)
              const progress = total ? Math.round((paid / total) * 100) : 0
              return (
                <div key={loan.id} className="b-card pop" style={{ animationDelay:`${i*0.07}s`, transition:"transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(99,102,241,0.15)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="" }}>
                  <div style={{ height:4, borderRadius:4, background:"linear-gradient(90deg,var(--violet),var(--pink))", margin:"-24px -24px 20px" }}/>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                    <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:16, fontWeight:800, color:"var(--text-1)" }}>{loan.type} Loan</h3>
                    <StatusBadge status={loan.status}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
                    {[["Loan Amount",`₹${loan.amount.toLocaleString()}`],["Total Payable",`₹${total.toLocaleString()}`],["Monthly EMI",`₹${loan.emi?.toFixed(2)}`],
                      ["Remaining",`₹${(loan.remaining||0).toLocaleString()}`],["Tenure Left",`${loan.tenure} months`],["Total Paid",`₹${paid.toLocaleString()}`]
                    ].map(([l,v]) => (
                      <div key={l} style={{ background:"var(--bg)", borderRadius:10, padding:"10px 12px", border:"1.5px solid var(--border)" }}>
                        <div style={{ fontSize:10, color:"var(--text-3)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>{l}</div>
                        <div style={{ fontSize:14, fontWeight:700, color:"var(--text-1)" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:12, color:"var(--text-3)", fontWeight:600 }}>Repayment Progress</span>
                      <span style={{ fontSize:12, fontWeight:800, color:"var(--violet)" }}>{progress}%</span>
                    </div>
                    <div style={{ background:"var(--bg-2)", borderRadius:6, height:8, overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:6, background:"linear-gradient(90deg,var(--violet),var(--pink))", width:`${progress}%`, transition:"width 0.6s" }}/>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
