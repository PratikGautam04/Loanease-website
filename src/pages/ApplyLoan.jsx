import { useState, useContext } from "react"
import { LoanContext } from "../context/loan-context"
import { AuthContext } from "../context/auth-context"
import { calculateEMI } from "../utils/emiCalculator"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function ApplyLoan() {
  const { addLoan } = useContext(LoanContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ type:"Personal", amount:"", tenure:"", rate:10 })
  const [preview, setPreview] = useState(null)

  const calculatePreview = () => {
    if (!form.amount || !form.tenure) return toast.error("Enter amount and tenure")
    setPreview(calculateEMI(Number(form.amount), Number(form.rate), Number(form.tenure)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!preview) return toast.error("Please calculate EMI first")
    addLoan({ type:form.type, amount:Number(form.amount), tenure:Number(form.tenure), emi:preview.emi, totalPayable:preview.totalPayable, remaining:preview.totalPayable, status:"Pending", email:user.email })
    toast.success("Application submitted! 🎉")
    navigate("/dashboard")
  }

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", fontFamily:"'Outfit',sans-serif" }}>
      {/* Navbar */}
      <nav style={{ background:"var(--white)", borderBottom:"2px solid var(--border)", padding:"0 28px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 16px rgba(99,102,241,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,var(--violet),var(--pink))", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:17, color:"var(--text-1)" }}>LoanEase</span>
        </div>
        <button onClick={() => navigate("/dashboard")} className="b-btn-ghost">← Back</button>
      </nav>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"48px 24px" }}>
        <div className="fade-up" style={{ width:"100%", maxWidth:540 }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#ede9fe", borderRadius:20, padding:"5px 14px", marginBottom:14 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"var(--violet)" }}>LOAN APPLICATION</span>
            </div>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:26, fontWeight:800, color:"var(--text-1)", letterSpacing:"-0.02em", marginBottom:6 }}>Apply for a Loan 💸</h1>
            <p style={{ fontSize:15, color:"var(--text-2)" }}>Fill in the details and we'll process it instantly</p>
          </div>

          <div className="b-card" style={{ padding:"32px 28px" }}>
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div>
                <label className="b-label">Loan Type</label>
                <select className="b-select" value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
                  <option>Personal</option>
                  <option>Home</option>
                  <option>Education</option>
                </select>
              </div>
              <div>
                <label className="b-label">Loan Amount (₹)</label>
                <input type="number" placeholder="e.g. 500000" className="b-input" value={form.amount} onChange={e => setForm({...form, amount:e.target.value})}/>
              </div>
              <div>
                <label className="b-label">Tenure (Months)</label>
                <input type="number" placeholder="e.g. 24" className="b-input" value={form.tenure} onChange={e => setForm({...form, tenure:e.target.value})}/>
              </div>

              <div style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.06),rgba(236,72,153,0.06))", border:"2px solid rgba(99,102,241,0.15)", borderRadius:14, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:14, color:"var(--text-2)", fontWeight:500 }}>Interest Rate</span>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, fontWeight:800, color:"var(--violet)" }}>{form.rate}% p.a.</span>
              </div>

              <button type="button" onClick={calculatePreview} style={{ background:"var(--bg-2)", border:"2px solid var(--border)", color:"var(--text-1)", borderRadius:14, padding:"12px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Calculate EMI
              </button>

              {preview && (
                <div className="pop" style={{ background:"linear-gradient(135deg,#6366f1,#ec4899)", borderRadius:16, padding:"20px 22px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  {[["Monthly EMI", `₹${preview.emi}`],["Total Payable", `₹${preview.totalPayable}`]].map(([l,v]) => (
                    <div key={l}>
                      <p style={{ fontSize:11, color:"rgba(255,255,255,0.75)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{l}</p>
                      <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:22, fontWeight:800, color:"#fff" }}>{v}</p>
                    </div>
                  ))}
                </div>
              )}

              <button type="submit" className="b-btn">Submit Application →</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
