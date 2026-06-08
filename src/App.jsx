import { useState, useRef } from "react";

const STORAGE_KEY = "certifyedge_leads";

const C = {
  bg: "#f7f6f2", ink: "#0f1117", card: "#ffffff", border: "#e4e1d8",
  gold: "#c9a84c", goldLight: "#f5edd6", teal: "#0d7377", tealLight: "#e6f4f4",
  muted: "#7a7671", danger: "#c0392b", success: "#1a7a4a",
};

const ISO_OPTIONS = [
  { value: "ISO 9001", label: "ISO 9001 — Quality Management" },
  { value: "ISO 14001", label: "ISO 14001 — Environmental Management" },
  { value: "ISO 27001", label: "ISO 27001 — Information Security" },
  { value: "ISO 45001", label: "ISO 45001 — Occupational Health & Safety" },
  { value: "ISO 22000", label: "ISO 22000 — Food Safety Management" },
  { value: "ISO 13485", label: "ISO 13485 — Medical Devices" },
  { value: "ISO 50001", label: "ISO 50001 — Energy Management" },
];

const ISO_INFO = {
  "ISO 9001": "Quality Management System. Most widely adopted globally. Suitable for any industry.",
  "ISO 27001": "Information Security Management. Critical for IT, fintech, and data-driven businesses.",
  "ISO 14001": "Environmental Management System. Required for manufacturing and sustainability-focused businesses.",
  "ISO 45001": "Occupational Health & Safety. Mandated in construction, heavy industry, and logistics.",
  "ISO 22000": "Food Safety Management. Essential for food manufacturers, processors, and distributors.",
  "ISO 13485": "Medical Devices QMS. Required for medical device manufacturers and suppliers.",
  "ISO 50001": "Energy Management System. Helps organizations reduce energy costs and improve performance.",
};

const INDUSTRIES = ["Manufacturing", "IT & Software", "Healthcare & Pharma", "Food & Beverage", "Construction", "Logistics & Supply Chain", "Financial Services", "Education", "Consulting", "Other"];
const COUNTRIES = ["Philippines", "Singapore", "UAE", "Saudi Arabia", "India", "Indonesia", "Malaysia", "Vietnam", "Thailand", "Bangladesh", "Kenya", "Nigeria", "Ghana", "South Africa", "UK", "Germany", "Other"];

const iStyle = {
  width: "100%", padding: "11px 14px", fontSize: 14, background: C.bg,
  border: `1.5px solid ${C.border}`, borderRadius: 8, color: C.ink,
  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
};

function FInput({ value, onChange, placeholder, type = "text" }) {
  const [focus, setFocus] = useState(false);
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder}
    style={{ ...iStyle, borderColor: focus ? C.teal : C.border }}
    onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />;
}

function FSelect({ value, onChange, children }) {
  const [focus, setFocus] = useState(false);
  return <select value={value} onChange={onChange}
    style={{ ...iStyle, borderColor: focus ? C.teal : C.border, cursor: "pointer" }}
    onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>{children}</select>;
}

function Label({ text, hint, children, error }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: C.muted, marginBottom: 5 }}>{text}</div>
      {children}
      {hint && <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{hint}</div>}
      {error && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>⚠ {error}</div>}
    </div>
  );
}

function Steps({ current }) {
  const labels = ["Profile", "Requirement", "Volume"];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
      {labels.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: i < current ? C.teal : i === current ? C.gold : C.border,
              color: i <= current ? "#fff" : C.muted,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 12,
              boxShadow: i === current ? `0 0 0 4px ${C.goldLight}` : "none",
            }}>
              {i < current ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: i === current ? C.teal : C.muted }}>{s}</span>
          </div>
          {i < labels.length - 1 && (
            <div style={{ width: 60, height: 1.5, margin: "0 8px 16px", background: i < current ? C.teal : C.border }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ────────── LANDING ────────── */
function Landing({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing:border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .cta:hover { transform:translateY(-2px); box-shadow:0 8px 28px ${C.teal}40 !important; }
        .fcard:hover { border-color:${C.gold} !important; transform:translateY(-2px); }
      `}</style>

      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 44px", background: C.card, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: `linear-gradient(135deg,${C.teal},${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 16, fontFamily: "'Playfair Display',serif" }}>✦</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 17, color: C.ink }}>CertifyEdge</div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1.5, textTransform: "uppercase" }}>ISO Certification Portal</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: C.muted }}>🌐 40+ Countries</span>
          <button onClick={onStart} className="cta" style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.25s" }}>Get Started →</button>
        </div>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "80px 44px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 380, height: 380, borderRadius: "50%", border: `80px solid ${C.goldLight}`, opacity: 0.5, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -40, width: 260, height: 260, borderRadius: "50%", background: C.tealLight, opacity: 0.4, pointerEvents: "none" }} />

        <div style={{ background: C.goldLight, border: `1px solid ${C.gold}40`, borderRadius: 20, padding: "6px 16px", marginBottom: 22, fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 1.2, textTransform: "uppercase", animation: "fadeUp 0.5s ease both" }}>🏆 Trusted by 600+ ISO Consultants Worldwide</div>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5vw,56px)", fontWeight: 900, color: C.ink, lineHeight: 1.1, margin: "0 0 18px", maxWidth: 700, animation: "fadeUp 0.5s 0.1s ease both", opacity: 0 }}>
          ISO Certification Support —<br /><span style={{ color: C.teal, fontStyle: "italic" }}>Faster, Cheaper,</span> Digital.
        </h1>

        <p style={{ fontSize: 16, color: C.muted, maxWidth: 500, lineHeight: 1.7, margin: "0 0 32px", animation: "fadeUp 0.5s 0.2s ease both", opacity: 0 }}>
          Built for independent consultants worldwide. Get your clients certified in 30 days at 40% less than traditional bodies.
        </p>

        <div style={{ animation: "fadeUp 0.5s 0.3s ease both", opacity: 0 }}>
          <button onClick={onStart} className="cta" style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 10, padding: "14px 30px", cursor: "pointer", fontWeight: 700, fontSize: 15, transition: "all 0.25s", boxShadow: `0 4px 18px ${C.teal}30` }}>
            Register Your Portal Access →
          </button>
        </div>

        <div style={{ display: "flex", gap: 28, marginTop: 48, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.5s 0.4s ease both", opacity: 0 }}>
          {[["🇵🇭", "Philippines"], ["🇸🇬", "Singapore"], ["🇦🇪", "UAE"], ["🇮🇳", "India"], ["🇩🇪", "Germany"], ["🇳🇬", "Nigeria"]].map(([f, n]) => (
            <div key={n} style={{ fontSize: 13, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 18 }}>{f}</span>{n}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "52px 44px", background: C.card, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 18, maxWidth: 860, margin: "0 auto" }}>
          {[["⚡", "30-Day Certification", "Fastest turnaround guaranteed."], ["💰", "40% Cost Reduction", "Partner pricing that undercuts traditional bodies."], ["🌐", "40+ Countries", "Local experts assigned to your region."], ["📄", "7 ISO Standards", "9001, 27001, 14001, 45001, 22000, 13485, 50001."]].map(([icon, title, desc]) => (
            <div key={title} className="fcard" style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: 20, transition: "all 0.25s", cursor: "default" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, color: C.ink, marginBottom: 5 }}>{title}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────── FORM ────────── */
function Form({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({ name: "", company: "", country: "Philippines", email: "", whatsapp: "", iso: "ISO 9001", industry: "", notes: "", volume: "single", scale: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const upd = (k, v) => setD(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!d.name.trim()) e.name = "Required";
      if (!d.company.trim()) e.company = "Required";
      if (!d.email.trim() || !d.email.includes("@")) e.email = "Valid email required";
    }
    if (step === 1 && !d.industry) e.industry = "Please select an industry";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const submit = async () => {
    setSaving(true);
    const lead = {
      lead_id: `CE-${Date.now().toString().slice(-6)}`,
      submitted_at: new Date().toLocaleString("en-IN"),
      name: d.name, company: d.company, country: d.country,
      email: d.email, whatsapp: d.whatsapp,
      iso: d.iso, industry: d.industry, notes: d.notes || "—",
      volume: d.volume, partnerScale: d.scale || "N/A",
      status: "New — Uncontacted",
      priority: d.volume !== "single" ? "HIGH" : "NORMAL",
    };
    try {
      let existing = [];
      try { const r = await window.storage.get(STORAGE_KEY); if (r) existing = JSON.parse(r.value); } catch (e) { }
      await window.storage.set(STORAGE_KEY, JSON.stringify([lead, ...existing]));
    } catch (e) { }
    setSaving(false);
    onSubmit(lead);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap'); *{box-sizing:border-box;} select option{background:#fff;}`}</style>
      <div style={{ width: "100%", maxWidth: 540 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-block", background: C.goldLight, border: `1px solid ${C.gold}40`, borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 }}>✦ Consultant Onboarding</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 900, color: C.ink, margin: "0 0 6px" }}>Register Your Portal Access</h2>
          <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>Under 2 minutes. No credit card required.</p>
        </div>

        <Steps current={step} />

        <div style={{ background: C.card, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: 28, boxShadow: "0 4px 32px #0f11170a" }}>

          {/* Step 0 */}
          {step === 0 && (
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: C.ink, marginBottom: 4 }}>Your Profile</div>
              <div style={{ color: C.muted, fontSize: 12, marginBottom: 18 }}>Tell us who you are and how to reach you</div>
              <Label text="Full Name" error={errors.name}><FInput value={d.name} onChange={e => upd("name", e.target.value)} placeholder="e.g. Maria Santos" /></Label>
              <Label text="Company / Firm Name" error={errors.company}><FInput value={d.company} onChange={e => upd("company", e.target.value)} placeholder="e.g. Santos Compliance Consulting" /></Label>
              <Label text="Country"><FSelect value={d.country} onChange={e => upd("country", e.target.value)}>{COUNTRIES.map(c => <option key={c}>{c}</option>)}</FSelect></Label>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ flex: 1 }}><Label text="Work Email" error={errors.email}><FInput type="email" value={d.email} onChange={e => upd("email", e.target.value)} placeholder="you@company.com" /></Label></div>
                <div style={{ flex: 1 }}><Label text="WhatsApp / Phone" hint="Include country code"><FInput value={d.whatsapp} onChange={e => upd("whatsapp", e.target.value)} placeholder="+63 917 123 4567" /></Label></div>
              </div>
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: C.ink, marginBottom: 4 }}>ISO Requirement</div>
              <div style={{ color: C.muted, fontSize: 12, marginBottom: 18 }}>Which standard does your client need?</div>
              <Label text="Required ISO Standard"><FSelect value={d.iso} onChange={e => upd("iso", e.target.value)}>{ISO_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</FSelect></Label>
              <div style={{ background: C.tealLight, border: `1px solid ${C.teal}30`, borderRadius: 10, padding: "12px 14px", fontSize: 12, color: C.teal, lineHeight: 1.6, marginBottom: 18 }}>
                <strong>{d.iso}:</strong> {ISO_INFO[d.iso]}
              </div>
              <Label text="Client Industry" error={errors.industry}><FSelect value={d.industry} onChange={e => upd("industry", e.target.value)}><option value="">— Select industry —</option>{INDUSTRIES.map(i => <option key={i}>{i}</option>)}</FSelect></Label>
              <Label text="Additional Notes" hint="Optional — timelines, requirements">
                <textarea value={d.notes} onChange={e => upd("notes", e.target.value)} placeholder="e.g. Client has audit in 90 days..." style={{ ...iStyle, height: 72, resize: "vertical" }} />
              </Label>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: C.ink, marginBottom: 4 }}>Client Volume & Partnership</div>
              <div style={{ color: C.muted, fontSize: 12, marginBottom: 18 }}>Helps us assign the right support tier</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                {[["single", "🎯 Single Client", "One specific client right now."], ["multiple", "🤝 Multiple Clients", "Ongoing access with partner pricing."], ["both", "🚀 Both — Start & Scale", "Start with one, grow into partnership."]].map(([val, label, desc]) => (
                  <div key={val} onClick={() => upd("volume", val)} style={{ border: `2px solid ${d.volume === val ? C.teal : C.border}`, background: d.volume === val ? C.tealLight : C.bg, borderRadius: 10, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, transition: "all 0.2s" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${d.volume === val ? C.teal : C.border}`, background: d.volume === val ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      {d.volume === val && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    <div><div style={{ fontWeight: 700, fontSize: 13, color: C.ink }}>{label}</div><div style={{ fontSize: 12, color: C.muted }}>{desc}</div></div>
                  </div>
                ))}
              </div>
              {d.volume !== "single" && (
                <Label text="Estimated Clients per Month"><FSelect value={d.scale} onChange={e => upd("scale", e.target.value)}><option value="">— Select range —</option>{["1–3", "4–10", "11–25", "25+"].map(r => <option key={r}>{r}</option>)}</FSelect></Label>
              )}
              <div style={{ background: C.goldLight, border: `1px solid ${C.gold}40`, borderRadius: 10, padding: "13px 14px", fontSize: 12, color: C.ink, lineHeight: 1.8 }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: C.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>📋 Summary</div>
                <div>👤 <b>{d.name || "—"}</b>, {d.company || "—"}</div>
                <div>🌍 {d.country} · ✉ {d.email || "—"}</div>
                <div>📋 <b>{d.iso}</b> · 🏭 {d.industry || "—"}</div>
                <div>📊 {d.volume === "single" ? "Single client" : `Partner — ${d.scale || "?"} clients/month`}</div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12 }}>
            {step > 0
              ? <button onClick={back} style={{ background: "transparent", color: C.muted, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>← Back</button>
              : <div />
            }
            {step < 2
              ? <button onClick={next} style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontSize: 13, marginLeft: "auto" }}>Continue →</button>
              : <button onClick={submit} disabled={saving} style={{ background: saving ? "#aaa" : `linear-gradient(135deg,${C.teal},#0a5a5d)`, color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", cursor: saving ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14, marginLeft: "auto", boxShadow: `0 4px 18px ${C.teal}40` }}>
                {saving ? "⟳ Saving..." : "✦ Submit & Get Portal Access"}
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────── DASHBOARD ────────── */
function Dashboard({ data, onReset }) {
  const [tab, setTab] = useState("status");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [msgs, setMsgs] = useState([{ from: "agent", text: `Hi ${data.name.split(" ")[0]} 👋 Your ${data.iso} request is confirmed. Ref: ${data.lead_id}. Our ${data.country} ISO expert is reviewing it now.` }]);
  const [copied, setCopied] = useState(false);
  const chatEnd = useRef(null);

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    const m = chatMsg; setChatMsg("");
    setMsgs(p => [...p, { from: "user", text: m }]);
    setTimeout(() => setMsgs(p => [...p, { from: "agent", text: `Thanks! Our ${data.country} ISO team will respond within 2 hrs. Ref: ${data.lead_id}` }]), 800);
  };

  const crmText = Object.entries(data).map(([k, v]) => `${k.replace(/_/g, " ").toUpperCase()}: ${v}`).join("\n");
  const STAGES = [{ l: "Details Received", icon: "✓", done: true }, { l: "Expert Assigned", icon: "👤", done: true }, { l: "Gap Analysis", icon: "📋", done: false }, { l: "Certification Audit", icon: "🏆", done: false }];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap'); *{box-sizing:border-box;} @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: `linear-gradient(135deg,${C.teal},${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15 }}>✦</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: C.ink }}>CertifyEdge Portal</div>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1.2, textTransform: "uppercase" }}>Consultant Dashboard</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{data.name}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{data.company} · {data.country}</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${C.teal},${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>{data.name[0]}</div>
        </div>
      </div>

      {/* Banner */}
      <div style={{ background: `linear-gradient(135deg,${C.teal},#0a5a5d)`, padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'Playfair Display',serif" }}>✦ Welcome, {data.name.split(" ")[0]}! Registration confirmed.</div>
          <div style={{ color: "#ffffff90", fontSize: 12, marginTop: 2 }}>Expert for {data.country} is reviewing your {data.iso} request · Ref: {data.lead_id}</div>
        </div>
        <div style={{ background: "#ffffff20", border: "1px solid #ffffff30", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#fff", fontWeight: 700 }}>🟢 Active</div>
      </div>

      <div style={{ padding: "24px 28px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 22, background: C.card, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, width: "fit-content" }}>
          {[["status", "📊 My Status"], ["resources", "📄 Starter Kit"], ["data", "🗂 My Data"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ background: tab === k ? C.teal : "transparent", color: tab === k ? "#fff" : C.muted, border: "none", borderRadius: 7, padding: "7px 16px", cursor: "pointer", fontWeight: 600, fontSize: 12, transition: "all 0.2s", fontFamily: "inherit" }}>{l}</button>
          ))}
        </div>

        {/* STATUS */}
        {tab === "status" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, animation: "slideUp 0.3s ease" }}>
            <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: C.ink, marginBottom: 18 }}>Certification Progress</div>
              {STAGES.map((s, i) => (
                <div key={s.l} style={{ display: "flex", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: s.done ? C.teal : C.border, color: s.done ? "#fff" : C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{s.done ? s.icon : i + 1}</div>
                    {i < STAGES.length - 1 && <div style={{ width: 2, height: 28, margin: "4px 0", background: s.done ? `linear-gradient(${C.teal},${C.border})` : C.border }} />}
                  </div>
                  <div style={{ paddingTop: 7, paddingBottom: i < STAGES.length - 1 ? 20 : 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: s.done ? C.ink : C.muted }}>{s.l}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{s.done ? (i === 0 ? "Just now" : "In progress") : "Upcoming"}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 12 }}>Request Details</div>
                {[["ISO Standard", data.iso], ["Industry", data.industry], ["Country", data.country], ["Engagement", data.volume === "single" ? "Single Client" : "Partnership"], ["Priority", data.priority], ["Timeline", "25–35 business days"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                    <span style={{ color: C.muted }}>{k}</span>
                    <span style={{ fontWeight: 600, color: C.ink }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#25D36612", border: "1.5px solid #25D36635", borderRadius: 14, padding: 18 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <div style={{ fontSize: 26 }}>💬</div>
                  <div><div style={{ fontWeight: 700, fontSize: 13, color: C.ink }}>Connect on WhatsApp</div><div style={{ fontSize: 12, color: C.muted }}>Our {data.country} expert is online</div></div>
                </div>
                <a href={`https://wa.me/?text=Hi, registered on CertifyEdge for ${data.iso}. Name: ${encodeURIComponent(data.name)}, Ref: ${data.lead_id}`} target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", background: "#25D366", color: "#fff", borderRadius: 8, padding: "9px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                  📲 Open WhatsApp →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {tab === "resources" && (
          <div style={{ animation: "slideUp 0.3s ease", maxWidth: 580 }}>
            <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 26 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 17, color: C.ink, marginBottom: 4 }}>📄 {data.iso} Starter Kit</div>
              <div style={{ color: C.muted, fontSize: 13, marginBottom: 22 }}>Customised for <b>{data.industry}</b> in <b>{data.country}</b>.</div>
              {[["ISO Readiness Checklist", `Critical ${data.iso} requirements`, "PDF · 12 pages"], ["Document Templates Pack", "Gap analysis, policy templates, SOPs", "ZIP · 8 files"], ["Audit Preparation Guide", "Step-by-step client prep roadmap", "PDF · 18 pages"], ["Cost Estimation Calculator", "Estimate total certification cost", "Excel · Interactive"]].map(([title, desc, meta]) => (
                <div key={title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 14px", background: C.bg, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 10 }}>
                  <div><div style={{ fontWeight: 600, fontSize: 13, color: C.ink }}>{title}</div><div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{desc}</div></div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ fontSize: 10, color: C.muted }}>{meta}</div>
                    <button style={{ background: C.tealLight, color: C.teal, border: `1px solid ${C.teal}40`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>↓ Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DATA */}
        {tab === "data" && (
          <div style={{ animation: "slideUp 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: C.ink }}>Your Submission Data</div>
                <div style={{ color: C.muted, fontSize: 12 }}>Stored in CertifyEdge · Syncs to Admin Dashboard</div>
              </div>
              <button onClick={() => { navigator.clipboard?.writeText(crmText); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                style={{ background: copied ? `${C.success}20` : C.tealLight, color: copied ? C.success : C.teal, border: `1px solid ${copied ? C.success : C.teal}40`, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
                {copied ? "✓ Copied!" : "⎘ Copy Text"}
              </button>
            </div>
            <div style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              {Object.entries(data).map(([k, v], i) => (
                <div key={k} style={{ display: "flex", padding: "9px 18px", background: i % 2 === 0 ? C.bg : C.card, borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: 180, flexShrink: 0, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: C.muted }}>{k.replace(/_/g, " ")}</div>
                  <div style={{ fontSize: 13, color: k === "priority" && v === "HIGH" ? "#b45309" : C.ink, fontWeight: k === "priority" ? 700 : 400 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat FAB */}
      <button onClick={() => setChatOpen(o => !o)} style={{ position: "fixed", bottom: 24, right: 24, width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg,${C.teal},${C.gold})`, border: "none", color: "#fff", fontSize: 20, cursor: "pointer", boxShadow: `0 4px 18px ${C.teal}50`, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>💬</button>

      {chatOpen && (
        <div style={{ position: "fixed", bottom: 84, right: 24, width: 310, background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 16, boxShadow: "0 8px 36px #0f111720", display: "flex", flexDirection: "column", zIndex: 100, animation: "slideUp 0.2s ease" }}>
          <div style={{ padding: "13px 15px", background: C.teal, borderRadius: "14px 14px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>ISO Expert · {data.country}</div><div style={{ color: "#ffffff80", fontSize: 11 }}>🟢 Online</div></div>
            <button onClick={() => setChatOpen(false)} style={{ background: "#ffffff20", border: "none", color: "#fff", borderRadius: 6, padding: "2px 8px", cursor: "pointer", fontSize: 12 }}>✕</button>
          </div>
          <div style={{ overflowY: "auto", padding: 12, maxHeight: 220, display: "flex", flexDirection: "column", gap: 8 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", background: m.from === "user" ? C.teal : C.bg, color: m.from === "user" ? "#fff" : C.ink, borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "8px 12px", fontSize: 12, maxWidth: "84%", lineHeight: 1.5, border: m.from === "agent" ? `1px solid ${C.border}` : "none" }}>
                {m.text}
              </div>
            ))}
            <div ref={chatEnd} />
          </div>
          <div style={{ padding: "9px 11px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Type a message..." style={{ ...iStyle, padding: "7px 11px", fontSize: 12, flex: 1 }} />
            <button onClick={sendMsg} style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 7, padding: "7px 11px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>→</button>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", padding: "0 0 28px" }}>
        <button onClick={onReset} style={{ background: "transparent", color: C.muted, border: "none", cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>← Start over / Demo again</button>
      </div>
    </div>
  );
}

/* ────────── ROOT ────────── */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [lead, setLead] = useState(null);
  if (screen === "landing") return <Landing onStart={() => setScreen("form")} />;
  if (screen === "form") return <Form onSubmit={d => { setLead(d); setScreen("dashboard"); }} />;
  return <Dashboard data={lead} onReset={() => setScreen("landing")} />;
}
