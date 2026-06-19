export default function StatusBadge({ status }) {
  const cfg = {
    Pending:  { cls: "badge-pending",  dot: "#f59e0b" },
    Active:   { cls: "badge-active",   dot: "#10b981" },
    Rejected: { cls: "badge-rejected", dot: "#ef4444" },
    Closed:   { cls: "badge-closed",   dot: "#0ea5e9" },
  }
  const { cls, dot } = cfg[status] || { cls:"badge-closed", dot:"#94a3b8" }
  return (
    <span className={`badge ${cls}`}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:dot, display:"inline-block" }}/>
      {status}
    </span>
  )
}
