import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName:"", middleName:"", lastName:"", email:"", mobile:"", role:"", password:"", confirmPassword:"" })
  const [errors, setErrors] = useState({})

  const validate = (name, value) => {
    let message = ""
    if (name === "firstName" && !value) message = "First name is required"
    if (name === "lastName" && !value) message = "Last name is required"
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Enter valid email format"
    if (name === "mobile" && !/^[0-9]{10}$/.test(value)) message = "Mobile must be 10 digits"
    if (name === "password" && value.length < 8) message = "Password must be at least 8 characters"
    if (name === "confirmPassword" && value !== form.password) message = "Passwords do not match"
    setErrors(prev => ({ ...prev, [name]: message }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    validate(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const hasError = Object.values(errors).some(msg => msg)
    if (hasError || !form.role) return alert("Please fix errors before submitting")
    const users = JSON.parse(localStorage.getItem("users")) || []
    const userExists = users.find(u => u.email === form.email || u.mobile === form.mobile)
    if (userExists) return alert("User already registered with this Email or Mobile")
    const newUser = { ...form, name: `${form.firstName} ${form.middleName} ${form.lastName}`.trim() }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    alert("Registration Successful")
    navigate("/login")
  }

  const fields = [
    { label:"First Name", name:"firstName" },
    { label:"Middle Name", name:"middleName" },
    { label:"Last Name", name:"lastName" },
    { label:"Email Address", name:"email", type:"email" },
    { label:"Mobile Number", name:"mobile" },
    { label:"Password", name:"password", type:"password" },
    { label:"Confirm Password", name:"confirmPassword", type:"password" },
  ]

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>
      <div className="fade-up" style={{ width:"100%", maxWidth:500 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:20 }}>
            <div style={{ width:38, height:38, borderRadius:11, background:"linear-gradient(135deg,var(--violet),var(--pink))", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:20, color:"var(--text-1)" }}>LoanEase</span>
          </div>
          <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:26, fontWeight:800, color:"var(--text-1)", letterSpacing:"-0.02em", marginBottom:6 }}>Create your account</h1>
          <p style={{ fontSize:15, color:"var(--text-2)" }}>Join thousands of happy borrowers </p>
        </div>

        <div className="b-card" style={{ padding:"32px 28px" }}>
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {fields.map(({ label, name, type="text" }) => (
              <div key={name}>
                <label className="b-label">{label}</label>
                <input type={type} name={name} placeholder={label} value={form[name]} onChange={handleChange} className="b-input" />
                {errors[name] && <p className="field-error">{errors[name]}</p>}
              </div>
            ))}
            <div>
              <label className="b-label">Account Role</label>
              <select name="role" value={form.role} onChange={handleChange} className="b-select" required>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="b-btn" style={{ marginTop:8 }}>Create Account </button>
          </form>
          <p style={{ textAlign:"center", marginTop:20, fontSize:14, color:"var(--text-2)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color:"var(--violet)", fontWeight:700, textDecoration:"none" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
