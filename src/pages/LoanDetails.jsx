// LoanDetails.jsx
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { LoanContext } from "../context/loan-context"
import Navbar from "../components/Navbar"
import StatusBadge from "../components/StatusBadge"

export default function LoanDetails() {
  const { id } = useParams()
  const { loans } = useContext(LoanContext)
  const loan = loans.find(l => l.id === Number(id))
  if (!loan) return <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif", color:"var(--text-2)" }}>Loan not found</div>

  return (
    <>
      <Navbar/>
      <div style={{ minHeight:"100vh", background:"var(--bg)", padding:28, fontFamily:"'Outfit',sans-serif" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div className="fade-up" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
            <div>
              <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:24, fontWeight:800, color:"var(--text-1)", letterSpacing:"-0.02em", marginBottom:4 }}>{loan.type} Loan Details</h1>
              <p style={{ fontSize:14, color:"var(--text-2)" }}>Full repayment schedule</p>
            </div>
            <StatusBadge status={loan.status}/>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
            {[["Loan Amount",`₹${loan.amount.toLocaleString()}`,"linear-gradient(135deg,#6366f1,#8b5cf6)"],
              ["Monthly EMI",`₹${loan.emi}`,"linear-gradient(135deg,#ec4899,#f43f5e)"],
              ["Tenure",`${loan.tenure} Months`,"linear-gradient(135deg,#10b981,#06b6d4)"]
            ].map(([l,v,g]) => (
              <div key={l} className="pop" style={{ background:g, borderRadius:18, padding:"20px 18px", color:"#fff", boxShadow:"0 6px 24px rgba(99,102,241,0.2)" }}>
                <p style={{ fontSize:11, opacity:0.8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{l}</p>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:800 }}>{v}</p>
              </div>
            ))}
          </div>

          <div className="b-card">
            <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:800, color:"var(--text-1)", marginBottom:18 }}>EMI Schedule</h3>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
              <thead>
                <tr style={{ borderBottom:"2px solid var(--border)" }}>
                  {["Month","EMI Amount","Status"].map(h => (
                    <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"var(--text-3)", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: loan.tenure }).map((_, i) => {
                  const isPaid = loan.remaining <= loan.emi * (loan.tenure - i - 1)
                  return (
                    <tr key={i} style={{ borderBottom:"1px solid var(--border)" }}
                      onMouseEnter={e => e.currentTarget.style.background="#fafafb"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                      <td style={{ padding:"12px 14px", color:"var(--text-2)", fontWeight:500 }}>Month {i+1}</td>
                      <td style={{ padding:"12px 14px", fontWeight:700, color:"var(--violet)" }}>₹{loan.emi}</td>
                      <td style={{ padding:"12px 14px" }}>
                        <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:700,
                          background: isPaid ? "#dcfce7" : "#fef9c3",
                          color: isPaid ? "#166534" : "#854d0e",
                          border: `1.5px solid ${isPaid ? "#86efac" : "#fde68a"}`
                        }}>
                          <span style={{ width:6, height:6, borderRadius:"50%", background: isPaid ? "#10b981" : "#f59e0b", display:"inline-block" }}/>
                          {isPaid ? "Paid" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
