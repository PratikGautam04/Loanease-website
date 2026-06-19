import { useContext } from "react"
import { LoanContext } from "../context/loan-context"
import { AuthContext } from "../context/auth-context"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import StatusBadge from "../components/StatusBadge"

const GRAD_CARDS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#10b981,#06b6d4)",
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#06b6d4,#6366f1)",
]

export default function AdminDashboard() {
  const { loans, updateLoanStatus } = useContext(LoanContext)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => { logout(); toast.success("Logged out!"); navigate("/login") }

  const loanUsers = [...new Set(loans.map(l => l.email))]
  const totalLoans = loans.length
  const approvedLoans = loans.filter(l => l.status === "Active" || l.status === "Closed").length
  const pendingLoans = loans.filter(l => l.status === "Pending").length
  const rejectedLoans = loans.filter(l => l.status === "Rejected").length
  const closedLoans = loans.filter(l => l.status === "Closed").length
  const totalDisbursed = loans.filter(l => l.status === "Active" || l.status === "Closed").reduce((a, l) => a + l.amount, 0)

  const groupedTypes = {}
  loans.forEach(l => { groupedTypes[l.type] = (groupedTypes[l.type] || 0) + l.amount })
  const typeData = Object.keys(groupedTypes).map(t => ({ name: t, amount: groupedTypes[t] }))
  const statusData = [
    { name:"Approved", value: approvedLoans },
    { name:"Pending",  value: pendingLoans },
    { name:"Rejected", value: rejectedLoans },
    { name:"Closed",   value: closedLoans },
  ]

  const stats = [
    { label:"Applicants",      value: loanUsers.length },
    { label:"Total",           value: totalLoans },
    { label:"Approved",        value: approvedLoans },
    { label:"Pending",         value: pendingLoans },
    { label:"Rejected",        value: rejectedLoans },
    { label:"Disbursed",       value: `₹${totalDisbursed.toLocaleString()}` },
  ]

  const tooltipStyle = { background:"#fff", border:"2px solid #e2e8f0", borderRadius:10, color:"#0f172a", fontSize:12, fontFamily:"'Outfit',sans-serif" }

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg)", fontFamily:"'Outfit',sans-serif" }}>

      {/* Sidebar */}
      <div style={{ width:220, background:"var(--white)", borderRight:"2px solid var(--border)", padding:"28px 14px", flexShrink:0, boxShadow:"2px 0 16px rgba(99,102,241,0.06)" }}>
        <div style={{ marginBottom:32, paddingLeft:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:4 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:"linear-gradient(135deg,var(--violet),var(--pink))", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:15, color:"var(--text-1)" }}>LoanEase</span>
          </div>
          <div style={{ fontSize:10, fontWeight:700, color:"var(--text-3)", letterSpacing:"0.1em", textTransform:"uppercase", paddingLeft:41 }}>Admin Panel</div>
        </div>
        {[["📊","Dashboard"],["📋","Applications"],["📈","Reports"]].map(([e,l]) => (
          <div key={l} style={{
            display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderRadius:12, marginBottom:4,
            background: l==="Dashboard" ? "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(236,72,153,0.07))" : "transparent",
            color: l==="Dashboard" ? "var(--violet)" : "var(--text-2)",
            fontSize:14, fontWeight: l==="Dashboard" ? 700 : 500, cursor:"pointer",
            border: l==="Dashboard" ? "2px solid rgba(99,102,241,0.15)" : "2px solid transparent",
          }}><span style={{ fontSize:16 }}>{e}</span>{l}</div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
        {/* Topbar */}
        <div style={{ padding:"0 28px", height:64, background:"var(--white)", borderBottom:"2px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 16px rgba(99,102,241,0.07)" }}>
          <div>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, fontWeight:800, color:"var(--text-1)" }}>Admin Dashboard</h2>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ fontSize:14, color:"var(--text-2)" }}>Welcome. <b style={{ color:"var(--text-1)" }}>{user?.name}</b></span>
            <button onClick={handleLogout} style={{ background:"linear-gradient(135deg,#fee2e2,#fecaca)", color:"#dc2626", border:"2px solid #fca5a5", borderRadius:10, padding:"7px 16px", fontSize:13, fontWeight:700, cursor:"pointer" }}>Logout</button>
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:28 }}>

          {/* Stat cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))", gap:16, marginBottom:28 }}>
            {stats.map((s, i) => (
              <div key={s.label} className="pop" style={{ background:GRAD_CARDS[i], borderRadius:18, padding:"20px 18px", color:"#fff", boxShadow:"0 6px 24px rgba(99,102,241,0.2)", animationDelay:`${i*0.06}s` }}>
                <p style={{ fontSize:11, fontWeight:700, opacity:0.8, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{s.label}</p>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:26, fontWeight:800 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
            {[
              { title:"Loan Type Distribution", data:typeData, key:"amount", color:"#6366f1" },
              { title:"Status Overview",         data:statusData, key:"value", color:"#ec4899" },
            ].map(c => (
              <div key={c.title} className="b-card">
                <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:14, fontWeight:800, color:"var(--text-1)", marginBottom:18 }}>{c.title}</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={c.data} barSize={30}>
                    <XAxis dataKey="name" tick={{ fill:"#94a3b8", fontSize:12, fontFamily:"Outfit" }} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fill:"#94a3b8", fontSize:12, fontFamily:"Outfit" }} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill:"rgba(99,102,241,0.05)" }}/>
                    <Bar dataKey={c.key} fill={c.color} radius={[6,6,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="b-card">
            <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:800, color:"var(--text-1)", marginBottom:20 }}>Loan Applications</h3>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
                <thead>
                  <tr style={{ borderBottom:"2px solid var(--border)" }}>
                    {["User","Type","Amount","Status","Payment","Action"].map(h => (
                      <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"var(--text-3)", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => {
                    const paymentStatus = loan.remaining === 0 ? "Completed" : loan.status === "Active" ? "Ongoing" : loan.status
                    return (
                      <tr key={loan.id} style={{ borderBottom:"1px solid var(--border)", transition:"background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background="#fafafb"}
                        onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"13px 14px", color:"var(--text-1)", fontWeight:500 }}>{loan.email}</td>
                        <td style={{ padding:"13px 14px", color:"var(--text-2)" }}>{loan.type}</td>
                        <td style={{ padding:"13px 14px", fontWeight:700, color:"var(--violet)" }}>₹{loan.amount.toLocaleString()}</td>
                        <td style={{ padding:"13px 14px" }}><StatusBadge status={loan.status}/></td>
                        <td style={{ padding:"13px 14px", color:"var(--text-2)" }}>{paymentStatus}</td>
                        <td style={{ padding:"13px 14px" }}>
                          {loan.status === "Pending" && (
                            <div style={{ display:"flex", gap:8 }}>
                              <button onClick={() => updateLoanStatus(loan.id,"Active")} className="b-btn-sm"
                                style={{ background:"linear-gradient(135deg,#10b981,#06b6d4)", color:"#fff" }}>Approve</button>
                              <button onClick={() => updateLoanStatus(loan.id,"Rejected")} className="b-btn-sm"
                                style={{ background:"linear-gradient(135deg,#ef4444,#ec4899)", color:"#fff" }}>Reject</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
