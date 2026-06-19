import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif", textAlign:"center", padding:24 }}>
      <div className="fade-up">
        <div style={{ fontSize:100, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, background:"linear-gradient(135deg,var(--violet),var(--pink))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:8 }}>404</div>
        <div style={{ fontSize:48, marginBottom:16 }}>🤔</div>
        <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:24, fontWeight:800, color:"var(--text-1)", marginBottom:10 }}>Page Not Found</h2>
        <p style={{ fontSize:15, color:"var(--text-2)", maxWidth:380, lineHeight:1.7, marginBottom:36 }}>The page you're looking for may have been removed or doesn't exist.</p>
        <button onClick={() => navigate("/login")} className="b-btn" style={{ width:"auto", padding:"12px 32px" }}>Return Home →</button>
      </div>
    </div>
  )
}
