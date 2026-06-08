import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// ─── CONFIG ──────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyBPwC97dLxm5EtacOuDtLXb4QWJrWNLHWc",
  authDomain: "redbond-49a20.firebaseapp.com",
  projectId: "redbond-49a20",
  storageBucket: "redbond-49a20.firebasestorage.app",
  messagingSenderId: "104664264414",
  appId: "1:104664264414:web:e58a4c51a467d6831a5c4f",
  measurementId: "G-DRDJZTKPLY"
};
const SHEETDB_API = "https://sheetdb.io/api/v1/gpnilm0xtb1dp";
const GOOGLE_FORM_URL = "https://forms.gle/ikrADWcgPzSmgze69";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const norm = (v) => (v || "").toString().toUpperCase().replace(/\s/g, "");
const VIEWS = { HOME: "home", LOGIN: "login", SIGNUP: "signup", REGISTER: "register", PROFILE: "profile", CLUB: "club" };
const BLOOD_GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

const toWaNumber = (phone) => {
  let n = (phone || "").replace(/\D/g, "");
  if (n.startsWith("0")) n = "880" + n.slice(1);
  return n;
};

// ─── ANIMATED CALL ME BUTTON ──────────────────────────────────
// Opens WhatsApp chat with the donor's number directly
function CallMeButton({ phone, style = {} }) {
  const waNumber = toWaNumber(phone);
  const waUrl = `https://wa.me/${waNumber}`;

  return (
    <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <button className="rb-call-btn" style={style}>
        {/* Animated ripple rings */}
        <span className="rb-call-rings">
          <span className="rb-call-ring rb-call-ring--1" />
          <span className="rb-call-ring rb-call-ring--2" />
          <span className="rb-call-ring rb-call-ring--3" />
        </span>
        {/* Phone icon */}
        <span className="rb-call-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </span>
        <span className="rb-call-label">Call Me</span>
      </button>
    </a>
  );
}

// ─── ANIMATED CANVAS BACKGROUND ──────────────────────────────
function AnimatedBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, particles, animId, t = 0;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const mkP = () => ({ x: Math.random() * (w || 800), y: Math.random() * (h || 600), r: Math.random() * 1.4 + 0.3, dx: (Math.random() - 0.5) * 0.28, dy: (Math.random() - 0.5) * 0.28, a: Math.random() * 0.3 + 0.05 });
    const draw = () => {
      t += 0.0025;
      const cx = w * (0.5 + 0.25 * Math.sin(t));
      const cy = h * (0.42 + 0.18 * Math.cos(t * 0.75));
      const g = ctx.createRadialGradient(cx, cy, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.9);
      g.addColorStop(0, `hsla(${342 + 12 * Math.sin(t)},80%,11%,1)`);
      g.addColorStop(0.45, `hsla(${255 + 14 * Math.cos(t * 0.8)},65%,6%,1)`);
      g.addColorStop(1, "hsl(228,38%,3%)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      const g2 = ctx.createRadialGradient(w * (0.15 + 0.12 * Math.cos(t * 1.2)), h * (0.72 + 0.12 * Math.sin(t * 0.85)), 0, w * 0.15, h * 0.72, w * 0.42);
      g2.addColorStop(0, "rgba(130,0,28,0.16)"); g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.strokeStyle = `rgba(210,18,48,${0.025 + i * 0.01})`; ctx.lineWidth = 0.8;
        for (let x = 0; x <= w; x += 3) {
          const y = h * (0.28 + i * 0.11) + Math.sin((x / w) * Math.PI * 3 + t * (0.9 + i * 0.28)) * (28 + i * 10) + Math.sin((x / w) * Math.PI * 6 + t * 0.65) * 12;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,70,90,${p.a})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    resize(); particles = Array.from({ length: 100 }, mkP); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", display: "block" }} />;
}

// ─── STYLES ───────────────────────────────────────────────────
const S = {
  wrap: { minHeight: "100vh", background: "hsl(228,38%,3%)", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" },
  inner: { position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "24px 20px", flex: 1, width: "100%" },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "10px 16px", marginBottom: "28px", backdropFilter: "blur(14px)" },
  navLeft: { display: "flex", alignItems: "center", gap: "10px" },
  navRight: { display: "flex", alignItems: "center", gap: "8px" },
  logoBadge: { width: "34px", height: "34px", borderRadius: "8px", background: "linear-gradient(135deg,#b91c1c,#7f1d1d)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px", color: "#fff", flexShrink: 0 },
  dot: { width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", animation: "rbPulse 2s infinite" },
  avatar: { width: "30px", height: "30px", borderRadius: "50%", border: "1.5px solid rgba(239,68,68,0.5)", objectFit: "cover" },
  avatarFB: { width: "30px", height: "30px", borderRadius: "50%", background: "rgba(220,38,38,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#fca5a5", border: "1.5px solid rgba(239,68,68,0.3)" },
  btn: (v = "default") => ({
    background: v === "red" ? "linear-gradient(135deg,#b91c1c,#dc2626)" : v === "green" ? "linear-gradient(135deg,#15803d,#16a34a)" : v === "ghost" ? "rgba(255,255,255,0.06)" : v === "danger" ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.08)",
    border: v === "red" || v === "green" ? "none" : v === "danger" ? "0.5px solid rgba(220,38,38,0.35)" : "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: "9px", padding: "9px 16px", color: v === "danger" ? "#fca5a5" : "#fff", fontSize: "13px", cursor: "pointer", fontWeight: 500, transition: "opacity 0.15s", fontFamily: "inherit",
  }),
  hero: { textAlign: "center", marginBottom: "32px" },
  tag: { display: "inline-block", background: "rgba(220,38,38,0.15)", border: "0.5px solid rgba(220,38,38,0.35)", color: "#fca5a5", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", marginBottom: "14px" },
  h1: { fontSize: "28px", fontWeight: 500, lineHeight: 1.3, marginBottom: "8px" },
  sub: { color: "rgba(255,255,255,0.45)", fontSize: "14px" },
  searchRow: { display: "flex", gap: "8px", marginBottom: "24px", maxWidth: "500px", margin: "0 auto 24px" },
  input: { flex: 1, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "11px 14px", color: "#fff", fontSize: "14px", outline: "none", fontFamily: "inherit" },
  card: { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: "14px", padding: "18px 20px", marginBottom: "12px", backdropFilter: "blur(10px)" },
  menuCard: { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", backdropFilter: "blur(10px)" },
  menuBtn: { background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px 16px", color: "#fff", fontSize: "14px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "12px", fontFamily: "inherit", transition: "background 0.15s" },
  loginCard: { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: "16px", padding: "40px 32px", textAlign: "center", maxWidth: "380px", margin: "0 auto", backdropFilter: "blur(14px)" },
  formCard: { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: "16px", padding: "32px", backdropFilter: "blur(14px)" },
  formInput: { padding: "10px 14px", borderRadius: "9px", border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "14px", outline: "none", fontFamily: "inherit", width: "100%" },
  formLabel: { display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "5px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px" },
  status: (type) => ({ padding: "12px 16px", borderRadius: "9px", fontSize: "13px", marginBottom: "12px", background: type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `0.5px solid ${type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, color: type === "success" ? "#86efac" : "#fca5a5" }),
  empty: { textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.35)", fontSize: "14px" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", padding: "0 0 16px", fontFamily: "inherit" },
};

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [bloodInput, setBloodInput] = useState("");
  const [donors, setDonors] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [regForm, setRegForm] = useState({ "Email": "", "Full Name": "", "Student ID": "", "University Name": "", "Department": "", "Blood Group": "", "present address": "", "Phone Number": "", "Did you donate before ?": "", "Last Blood Donation Date": "", "Emergency Donation Availability": "" });
  const [myProfile, setMyProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setRegForm(f => ({ ...f, "Email": u.email }));
        try {
          const res = await fetch(SHEETDB_API);
          const data = await res.json();
          if (Array.isArray(data)) {
            const email = (u.email || "").toLowerCase().trim();
            const found = data.find(row => {
              const rowUid = (row["uid"] || "").trim();
              const rowEmail = (row["Email Address"] || row["Email"] || row["email"] || "").toLowerCase().trim();
              return (rowUid && rowUid === u.uid) || (rowEmail && rowEmail === email);
            });
            setMyProfile(found || null);
          }
        } catch {}
      }
      setAuthLoading(false);
    });
  }, []);

  const goTo = (v) => { setView(v); setMsg(null); };

  const login = async () => {
    if (!loginEmail || !loginPassword) { setMsg({ text: "Email and password required", type: "error" }); return; }
    setAuthSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setMsg({ text: "Welcome back!", type: "success" });
      setTimeout(() => { goTo(VIEWS.HOME); setLoginEmail(""); setLoginPassword(""); }, 1200);
    } catch { setMsg({ text: "Invalid email or password", type: "error" }); }
    setAuthSubmitting(false);
  };

  const signup = async () => {
    if (!signupEmail || !signupPassword) { setMsg({ text: "Email and password required", type: "error" }); return; }
    setAuthSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      setMsg({ text: "Account created! Now fill your profile.", type: "success" });
      setTimeout(() => { goTo(VIEWS.REGISTER); setSignupEmail(""); setSignupPassword(""); }, 1200);
    } catch (e) { setMsg({ text: e.message.includes("already-in-use") ? "Email already exists" : "Signup failed", type: "error" }); }
    setAuthSubmitting(false);
  };

  const googleSignIn = async () => {
    setAuthSubmitting(true);
    try { await signInWithPopup(auth, provider); goTo(VIEWS.HOME); }
    catch { setMsg({ text: "Google sign-in failed", type: "error" }); }
    setAuthSubmitting(false);
  };

  const logout = async () => { await signOut(auth); setUser(null); setMyProfile(null); goTo(VIEWS.HOME); };

  const loadProfile = async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      const res = await fetch(SHEETDB_API);
      const data = await res.json();
      if (!Array.isArray(data)) { setMyProfile(null); setProfileLoading(false); return; }
      const userEmail = (user.email || "").toLowerCase().trim();
      const found = data.find(row => {
        const rowUid = (row["uid"] || "").trim();
        const rowEmail = (row["Email Address"] || row["Email"] || row["email"] || "").toLowerCase().trim();
        return (rowUid && rowUid === user.uid) || (rowEmail && rowEmail === userEmail);
      });
      setMyProfile(found || null);
    } catch { setMyProfile(null); }
    setProfileLoading(false);
  };

  const searchDonors = async () => {
    const q = norm(bloodInput);
    if (!q) return;
    setSearching(true); setSearched(true); setDonors([]);
    try {
      const res = await fetch(SHEETDB_API);
      const data = await res.json();
      setDonors(data.filter(d => norm(d["Blood Group"]) === q));
    } catch { setDonors([]); }
    setSearching(false);
  };

  const submitRegister = async () => {
    const required = ["Full Name", "Student ID", "University Name", "Department", "Blood Group", "Phone Number", "present address"];
    for (const f of required) { if (!regForm[f].trim()) { setMsg({ text: `${f} is required`, type: "error" }); return; } }
    setAuthSubmitting(true);
    try {
      const res = await fetch(SHEETDB_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: { ...regForm, uid: user.uid } }) });
      if (res.ok) { setMsg({ text: "Registration successful! You are now a donor.", type: "success" }); setTimeout(() => goTo(VIEWS.HOME), 1500); }
      else setMsg({ text: "Registration failed", type: "error" });
    } catch { setMsg({ text: "Network error", type: "error" }); }
    setAuthSubmitting(false);
  };

  if (authLoading) return (
    <div style={{ ...S.wrap, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AnimatedBg />
      <span style={{ position: "relative", zIndex: 1, color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Loading...</span>
    </div>
  );

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }

        @keyframes rbPulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        @keyframes rbFadeIn   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rbTicker   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes rbCardIn   { from{opacity:0;transform:translateY(16px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes rbGlow     { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0)} 50%{box-shadow:0 0 18px 2px rgba(220,38,38,0.18)} }

        /* ── Call Me Button ───────────────────────────── */
        @keyframes rbRing1 { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.4);opacity:0} }
        @keyframes rbRing2 { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(2.0);opacity:0} }
        @keyframes rbRing3 { 0%{transform:scale(1);opacity:0.25} 100%{transform:scale(1.7);opacity:0} }
        @keyframes rbCallShake {
          0%,100%{transform:rotate(0deg)}
          10%{transform:rotate(-12deg)}
          20%{transform:rotate(12deg)}
          30%{transform:rotate(-8deg)}
          40%{transform:rotate(8deg)}
          50%{transform:rotate(-4deg)}
          60%{transform:rotate(4deg)}
          70%,90%{transform:rotate(0deg)}
        }
        @keyframes rbCallGlow {
          0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0),0 4px 20px rgba(21,128,61,0.35)}
          50%{box-shadow:0 0 0 8px rgba(34,197,94,0.08),0 6px 28px rgba(21,128,61,0.55)}
        }
        @keyframes rbCallSlide {
          0%,100%{background-position:200% center}
          50%{background-position:0% center}
        }

        .rb-call-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 11px 18px;
          background: linear-gradient(135deg,#15803d,#16a34a,#15803d);
          background-size: 200% 100%;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          letter-spacing: 0.4px;
          overflow: visible;
          animation: rbCallGlow 2.5s ease-in-out infinite, rbCallSlide 4s ease-in-out infinite;
          transition: transform 0.15s ease, opacity 0.15s;
        }
        .rb-call-btn:hover {
          transform: translateY(-2px) scale(1.02);
          opacity: 1;
        }
        .rb-call-btn:active { transform: scale(0.96); }

        .rb-call-rings {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          pointer-events: none;
        }
        .rb-call-ring {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          border: 1.5px solid rgba(34,197,94,0.55);
        }
        .rb-call-ring--1 { animation: rbRing1 2s ease-out infinite 0s; }
        .rb-call-ring--2 { animation: rbRing1 2s ease-out infinite 0.4s; }
        .rb-call-ring--3 { animation: rbRing1 2s ease-out infinite 0.8s; }

        .rb-call-icon {
          display: flex;
          align-items: center;
          animation: rbCallShake 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .rb-call-label { position: relative; z-index: 1; }

        /* ── Profile Call Me (larger) ─── */
        .rb-call-btn--profile {
          padding: 13px 22px;
          font-size: 14px;
          border-radius: 12px;
          gap: 10px;
        }
        .rb-call-btn--profile .rb-call-ring {
          border-radius: 12px;
        }

        .rb-page { animation: rbFadeIn 0.25s ease; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, select:focus { border-color: rgba(239,68,68,0.5) !important; outline: none; }
        button:hover:not(.rb-call-btn) { opacity: 0.82; }
        .rb-menu-btn:hover { background: rgba(255,255,255,0.09) !important; }
        a { color: #fca5a5; text-decoration: none; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        @media (max-width: 480px) {
          .rb-form-row { grid-template-columns: 1fr !important; }
          .rb-search { flex-direction: column; }
        }

        /* ── Club Logo Animations ─────────────────────── */
        @keyframes rbLogoFloat {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-5px) rotate(1deg); }
          66%      { transform: translateY(-2px) rotate(-1deg); }
        }
        @keyframes rbLogoRing {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes rbLogoRingLg {
          0%   { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes rbShimmerSweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }

        /* Logo wrapper — small (footer) */
        .rb-club-logo-wrap {
          position: relative;
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rb-club-logo-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(239,68,68,0.45);
        }
        .rb-club-logo-ring--1 { animation: rbLogoRing 2.4s ease-out infinite 0s; }
        .rb-club-logo-ring--2 { animation: rbLogoRing 2.4s ease-out infinite 0.5s; }
        .rb-club-logo-ring--3 { animation: rbLogoRing 2.4s ease-out infinite 1s; }
        .rb-club-logo-img {
          width: 42px; height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(220,38,38,0.4);
          position: relative; z-index: 1;
          animation: rbLogoFloat 4s ease-in-out infinite;
        }
        .rb-club-logo-fallback {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(220,38,38,0.15);
          border: 2px solid rgba(220,38,38,0.35);
          align-items: center; justify-content: center;
          font-size: 20px;
          position: relative; z-index: 1;
          animation: rbLogoFloat 4s ease-in-out infinite;
        }

        /* Logo wrapper — large (club page) */
        .rb-club-logo-wrap--lg {
          width: 90px; height: 90px;
        }
        .rb-club-logo-img--lg {
          width: 80px; height: 80px;
        }
        .rb-club-logo-fallback--lg {
          width: 80px; height: 80px;
          font-size: 36px;
        }

        /* Shimmer sweep on banner */
        .rb-club-banner { position: relative; }
        .rb-club-shimmer {
          position: absolute; top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          animation: rbShimmerSweep 3.5s ease-in-out infinite;
          pointer-events: none; z-index: 0;
        }
        .rb-club-banner:hover {
          background: linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(255,255,255,0.04) 100%) !important;
        }

        /* Club contact cards */
        .rb-club-card {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.09);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .rb-club-card:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .rb-club-card--blue:hover { border-color: rgba(59,130,246,0.35); box-shadow: 0 8px 32px rgba(59,130,246,0.12); }
        .rb-club-card--red:hover  { border-color: rgba(239,68,68,0.35);  box-shadow: 0 8px 32px rgba(239,68,68,0.12); }
        .rb-club-card--green:hover{ border-color: rgba(34,197,94,0.35);  box-shadow: 0 8px 32px rgba(34,197,94,0.12); }

        .rb-club-card-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      <div style={S.wrap}>
        <AnimatedBg />
        <div style={S.inner}>

          {/* ── NAV ── */}
          <nav style={S.nav}>
            <div style={S.navLeft}>
              <div style={S.logoBadge}>🩸</div>
              <span style={{ fontSize: "15px", fontWeight: 500 }}>RedBond</span>
              <div style={S.dot} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Live</span>
            </div>
            <div style={S.navRight}>
              {user ? (
                <>
                  {user.photoURL
                    ? <img src={user.photoURL} style={S.avatar} alt="avatar" />
                    : <div style={S.avatarFB}>{(user.displayName || user.email || "U")[0].toUpperCase()}</div>
                  }
                  <button style={S.btn("ghost")} onClick={() => { goTo(VIEWS.PROFILE); if (!myProfile) loadProfile(); }}>Profile</button>
                  <button style={S.btn("ghost")} onClick={logout}>Sign out</button>
                </>
              ) : (
                <>
                  <button style={S.btn("ghost")} onClick={() => goTo(VIEWS.LOGIN)}>Sign in</button>
                  <button style={S.btn("red")} onClick={() => goTo(VIEWS.SIGNUP)}>Register</button>
                </>
              )}
            </div>
          </nav>

          {view !== VIEWS.HOME && (
            <button style={S.backBtn} onClick={() => goTo(VIEWS.HOME)}>← Back</button>
          )}
          {msg && <div style={S.status(msg.type)}>{msg.text}</div>}

          {/* ── HOME ── */}
          {view === VIEWS.HOME && (
            <div className="rb-page">
              {!donors.length && (
                <div style={S.hero}>
                  <div style={S.tag}>Emergency Network</div>
                  <h1 style={S.h1}>
                    Find a <span style={{ color: "#ef4444" }}>blood donor</span><br />in seconds
                  </h1>
                  <p style={{ ...S.sub, marginBottom: "24px" }}>Verified donors · Real-time availability</p>
                  <div className="rb-search" style={S.searchRow}>
                    <input style={S.input} placeholder="Blood group — A+, O−, B+" value={bloodInput}
                      onChange={e => setBloodInput(e.target.value)} onKeyDown={e => e.key === "Enter" && searchDonors()} />
                    <button style={{ ...S.btn("red"), whiteSpace: "nowrap" }} onClick={searchDonors} disabled={searching}>
                      {searching ? "Searching…" : "Search"}
                    </button>
                  </div>
                </div>
              )}

              {donors.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <button onClick={() => { setDonors([]); setSearched(false); setBloodInput(""); }}
                    style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", padding: "0 0 14px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    Back to home
                  </button>
                  <div className="rb-search" style={{ display: "flex", gap: "8px" }}>
                    <input style={{ ...S.input }} placeholder="Search another blood group…" value={bloodInput}
                      onChange={e => setBloodInput(e.target.value)} onKeyDown={e => e.key === "Enter" && searchDonors()} />
                    <button style={{ ...S.btn("red"), whiteSpace: "nowrap" }} onClick={searchDonors} disabled={searching}>
                      {searching ? "Searching…" : "Search"}
                    </button>
                  </div>
                </div>
              )}

              {searching && <div style={S.empty}>Searching donors...</div>}
              {searched && !searching && donors.length === 0 && (
                <div style={S.empty}>No donors found for "{bloodInput}".</div>
              )}

              {/* ── DONOR RESULTS GRID ── */}
              {donors.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(220,38,38,0.12)", border: "0.5px solid rgba(220,38,38,0.3)", borderRadius: "20px", padding: "5px 14px" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "rbPulse 2s infinite" }} />
                      <span style={{ fontSize: "12px", color: "#fca5a5", letterSpacing: "0.5px" }}>
                        {donors.length} donor{donors.length !== 1 ? "s" : ""} · {bloodInput.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.08)" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
                    {donors.map((d, i) => (
                      <div key={i} style={{
                        background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
                        border: "0.5px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px", overflow: "hidden",
                        animation: `rbCardIn 0.35s ease ${i * 0.07}s both`,
                      }}>
                        {/* Animated red top stripe */}
                        <div style={{ height: "3px", background: "linear-gradient(90deg, #b91c1c, #ef4444, #b91c1c)", backgroundSize: "200% 100%", animation: "rbTicker 3s linear infinite" }} />

                        <div style={{ padding: "18px 20px" }}>
                          {/* Donor header */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(220,38,38,0.18)", border: "1.5px solid rgba(220,38,38,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 600, color: "#fca5a5", flexShrink: 0 }}>
                                {(d["Full Name"] || "?")[0].toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontSize: "15px", fontWeight: 500, color: "#fff", marginBottom: "2px" }}>{d["Full Name"]}</div>
                                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{d["Department"]}</div>
                              </div>
                            </div>
                            <div style={{ background: "rgba(220,38,38,0.2)", border: "1px solid rgba(220,38,38,0.4)", borderRadius: "10px", padding: "6px 12px", textAlign: "center", animation: "rbGlow 3s ease infinite" }}>
                              <div style={{ fontSize: "16px", fontWeight: 700, color: "#ef4444", lineHeight: 1 }}>{d["Blood Group"]}</div>
                              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.5px", marginTop: "2px" }}>BLOOD</div>
                            </div>
                          </div>

                          {/* Info pills */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                            {[
                              { icon: "🏛", val: d["University Name"] },
                              { icon: "📍", val: d["present address"] },
                              { icon: "📅", val: d["Last Blood Donation Date"] || "No record" },
                            ].map((item, j) => item.val && (
                              <div key={j} style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "4px 10px", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
                                <span>{item.icon}</span>{item.val}
                              </div>
                            ))}
                          </div>

                          <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", marginBottom: "14px" }} />

                          {/* Phone + Call Me */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.5px", marginBottom: "2px" }}>PHONE</div>
                              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{d["Phone Number"]}</div>
                            </div>
                            <div style={{ flexShrink: 0, width: "120px" }}>
                              <CallMeButton phone={d["Phone Number"]} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA for guests */}
              {!user && !donors.length && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "40px" }}>
                  <div style={{ ...S.card, border: "0.5px solid rgba(220,38,38,0.3)" }}>
                    <p style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>Become a donor</p>
                    <p style={{ ...S.sub, marginBottom: "16px", fontSize: "13px" }}>Join our network and save lives.</p>
                    <button style={{ ...S.btn("red"), width: "100%", padding: "10px" }} onClick={() => goTo(VIEWS.SIGNUP)}>Get started →</button>
                  </div>
                  <div style={S.card}>
                    <p style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>Already registered?</p>
                    <p style={{ ...S.sub, marginBottom: "16px", fontSize: "13px" }}>Sign in to manage your profile.</p>
                    <button style={{ ...S.btn("ghost"), width: "100%", padding: "10px" }} onClick={() => goTo(VIEWS.LOGIN)}>Sign in →</button>
                  </div>
                </div>
              )}

              {/* Dashboard for logged-in users */}
              {user && !donors.length && (
                <div style={{ marginTop: "32px" }}>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "12px", justifyContent: "center" }}>
                    <div style={{ background: "rgba(220,38,38,0.12)", border: "0.5px solid rgba(220,38,38,0.25)", borderRadius: "10px", padding: "10px 20px", textAlign: "center" }}>
                      <div style={{ fontSize: "20px", marginBottom: "2px" }}>🩸</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.5px" }}>BLOOD DONOR</div>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: myProfile ? "#fca5a5" : "rgba(255,255,255,0.5)" }}>
                        {myProfile ? myProfile["Blood Group"] : "Not registered"}
                      </div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: "10px", padding: "10px 20px", textAlign: "center" }}>
                      <div style={{ fontSize: "20px", marginBottom: "2px" }}>✅</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.5px" }}>STATUS</div>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: myProfile ? "#86efac" : "rgba(255,255,255,0.5)" }}>
                        {myProfile ? "Registered" : "Unregistered"}
                      </div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: "10px", padding: "10px 20px", textAlign: "center" }}>
                      <div style={{ fontSize: "20px", marginBottom: "2px" }}>📍</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.5px" }}>LOCATION</div>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
                        {myProfile ? (myProfile["present address"] || "—") : "—"}
                      </div>
                    </div>
                  </div>
                  <div style={S.menuCard}>
                    <button className="rb-menu-btn" style={S.menuBtn} onClick={() => goTo(VIEWS.REGISTER)}>
                      <span style={{ fontSize: "18px", width: "24px", textAlign: "center" }}>🩸</span>
                      <div>
                        <div style={{ fontWeight: 500, marginBottom: "3px" }}>Register as donor</div>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Fill your details — takes 1 minute</div>
                      </div>
                    </button>
                    <button className="rb-menu-btn" style={S.menuBtn} onClick={() => { goTo(VIEWS.PROFILE); loadProfile(); }}>
                      <span style={{ fontSize: "18px", width: "24px", textAlign: "center" }}>👤</span>
                      <div>
                        <div style={{ fontWeight: 500, marginBottom: "3px" }}>My profile</div>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>View your donor listing</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── LOGIN ── */}
          {view === VIEWS.LOGIN && (
            <div className="rb-page">
              <div style={S.loginCard}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>🩸</div>
                <h2 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "10px" }}>Sign In</h2>
                <p style={{ ...S.sub, marginBottom: "24px" }}>Welcome back to RedBond</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
                  <input style={S.formInput} type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                  <input style={S.formInput} type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
                  <button style={{ ...S.btn("red"), padding: "12px", fontSize: "14px" }} onClick={login} disabled={authSubmitting}>
                    {authSubmitting ? "Signing in..." : "Sign In"}
                  </button>
                  <button style={{ ...S.btn("ghost"), padding: "12px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }} onClick={googleSignIn} disabled={authSubmitting}>
                    <GoogleIcon /> Continue with Google
                  </button>
                  <p style={{ ...S.sub, textAlign: "center", fontSize: "13px" }}>
                    No account?{" "}
                    <span onClick={() => goTo(VIEWS.SIGNUP)} style={{ color: "#fca5a5", cursor: "pointer" }}>Create one</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── SIGNUP ── */}
          {view === VIEWS.SIGNUP && (
            <div className="rb-page">
              <div style={S.loginCard}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>🩸</div>
                <h2 style={{ fontSize: "20px", fontWeight: 500, marginBottom: "10px" }}>Create Account</h2>
                <p style={{ ...S.sub, marginBottom: "24px" }}>Join the blood donor network</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
                  <input style={S.formInput} type="email" placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
                  <input style={S.formInput} type="password" placeholder="Password (min 6 chars)" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && signup()} />
                  <button style={{ ...S.btn("red"), padding: "12px", fontSize: "14px" }} onClick={signup} disabled={authSubmitting}>
                    {authSubmitting ? "Creating..." : "Create Account"}
                  </button>
                  <button style={{ ...S.btn("ghost"), padding: "12px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }} onClick={googleSignIn} disabled={authSubmitting}>
                    <GoogleIcon /> Continue with Google
                  </button>
                  <p style={{ ...S.sub, textAlign: "center", fontSize: "13px" }}>
                    Already have an account?{" "}
                    <span onClick={() => goTo(VIEWS.LOGIN)} style={{ color: "#fca5a5", cursor: "pointer" }}>Sign in</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── REGISTER ── */}
          {view === VIEWS.REGISTER && user && (
            <div className="rb-page" style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ ...S.formCard, textAlign: "center" }}>
                  <div style={{ fontSize: "40px", marginBottom: "14px" }}>📋</div>
                  <h3 style={{ fontSize: "16px", fontWeight: 500, marginBottom: "10px" }}>Fill via Google Form</h3>
                  <p style={{ ...S.sub, marginBottom: "20px", fontSize: "13px" }}>Complete your profile using our official Google Form</p>
                  <button onClick={() => window.open(GOOGLE_FORM_URL, "_blank")} style={{ ...S.btn("red"), width: "100%", padding: "12px" }}>
                    Open Google Form
                  </button>
                </div>
                <div style={S.formCard}>
                  <h3 style={{ fontSize: "16px", fontWeight: 500, marginBottom: "18px" }}>Or fill here</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div className="rb-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div><label style={S.formLabel}>Email</label><input style={{ ...S.formInput, opacity: 0.5, cursor: "not-allowed" }} type="email" value={regForm["Email"]} disabled /></div>
                      <div><label style={S.formLabel}>Full Name *</label><input style={S.formInput} type="text" placeholder="Your name" value={regForm["Full Name"]} onChange={e => setRegForm(f => ({ ...f, "Full Name": e.target.value }))} /></div>
                    </div>
                    <div className="rb-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div><label style={S.formLabel}>Student ID *</label><input style={S.formInput} type="text" placeholder="ID" value={regForm["Student ID"]} onChange={e => setRegForm(f => ({ ...f, "Student ID": e.target.value }))} /></div>
                      <div><label style={S.formLabel}>University *</label><input style={S.formInput} type="text" placeholder="Uni" value={regForm["University Name"]} onChange={e => setRegForm(f => ({ ...f, "University Name": e.target.value }))} /></div>
                    </div>
                    <div className="rb-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div><label style={S.formLabel}>Department *</label><input style={S.formInput} type="text" placeholder="Dept" value={regForm["Department"]} onChange={e => setRegForm(f => ({ ...f, "Department": e.target.value }))} /></div>
                      <div>
                        <label style={S.formLabel}>Blood Group *</label>
                        <select style={S.formInput} value={regForm["Blood Group"]} onChange={e => setRegForm(f => ({ ...f, "Blood Group": e.target.value }))}>
                          <option value="">Select</option>
                          {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                      </div>
                    </div>
                    <div><label style={S.formLabel}>Phone *</label><input style={S.formInput} type="tel" placeholder="+880" value={regForm["Phone Number"]} onChange={e => setRegForm(f => ({ ...f, "Phone Number": e.target.value }))} /></div>
                    <div><label style={S.formLabel}>Address *</label><input style={S.formInput} type="text" placeholder="City" value={regForm["present address"]} onChange={e => setRegForm(f => ({ ...f, "present address": e.target.value }))} /></div>
                    <div className="rb-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={S.formLabel}>Donated before?</label>
                        <select style={S.formInput} value={regForm["Did you donate before ?"]} onChange={e => setRegForm(f => ({ ...f, "Did you donate before ?": e.target.value }))}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div><label style={S.formLabel}>Last Date</label><input style={S.formInput} type="text" placeholder="dd/mm/yyyy" value={regForm["Last Blood Donation Date"]} onChange={e => setRegForm(f => ({ ...f, "Last Blood Donation Date": e.target.value }))} /></div>
                    </div>
                    <button onClick={submitRegister} disabled={authSubmitting} style={{ ...S.btn("red"), padding: "11px", fontSize: "14px", marginTop: "4px" }}>
                      {authSubmitting ? "Registering..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PROFILE ── */}
          {view === VIEWS.PROFILE && user && (
            <div className="rb-page" style={{ maxWidth: "600px", margin: "0 auto" }}>
              {profileLoading && <div style={S.empty}>Loading your profile...</div>}

              {!profileLoading && !myProfile && (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🩸</div>
                  <p style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>Not registered yet</p>
                  <p style={{ ...S.sub, marginBottom: "24px", fontSize: "14px" }}>Register as a donor to appear in search results.</p>
                  <button style={{ ...S.btn("red"), padding: "12px 28px", fontSize: "14px" }} onClick={() => goTo(VIEWS.REGISTER)}>Register as Donor</button>
                </div>
              )}

              {!profileLoading && myProfile && (
                <div>
                  <div style={{ background: "linear-gradient(145deg, rgba(220,38,38,0.12) 0%, rgba(255,255,255,0.03) 100%)", border: "0.5px solid rgba(220,38,38,0.25)", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }}>
                    <div style={{ height: "3px", background: "linear-gradient(90deg,#b91c1c,#ef4444,#b91c1c)", backgroundSize: "200%", animation: "rbTicker 3s linear infinite" }} />
                    <div style={{ padding: "24px" }}>
                      {/* Profile header */}
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                        <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(220,38,38,0.2)", border: "2px solid rgba(220,38,38,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 700, color: "#fca5a5", flexShrink: 0 }}>
                          {(myProfile["Full Name"] || "?")[0].toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "20px", fontWeight: 500, marginBottom: "4px" }}>{myProfile["Full Name"] || "—"}</div>
                          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                            {myProfile["Department"] || ""}{myProfile["University Name"] ? " · " + myProfile["University Name"] : ""}
                          </div>
                        </div>
                        <div style={{ background: "rgba(220,38,38,0.2)", border: "1.5px solid rgba(220,38,38,0.5)", borderRadius: "12px", padding: "8px 16px", textAlign: "center", animation: "rbGlow 3s ease infinite" }}>
                          <div style={{ fontSize: "22px", fontWeight: 700, color: "#ef4444", lineHeight: 1 }}>{myProfile["Blood Group"] || "—"}</div>
                          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.5px", marginTop: "3px" }}>BLOOD GROUP</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", animation: "rbPulse 2s infinite" }} />
                        <span style={{ fontSize: "12px", color: "#86efac", letterSpacing: "0.5px" }}>Active Donor · Registered</span>
                      </div>

                      {/* Info grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", overflow: "hidden" }}>
                        {[
                          { label: "Student ID",    val: myProfile["Student ID"] },
                          { label: "Phone",          val: myProfile["Phone Number"] },
                          { label: "University",     val: myProfile["University Name"] },
                          { label: "Department",     val: myProfile["Department"] },
                          { label: "Address",        val: myProfile["present address"] },
                          { label: "Email",          val: myProfile["Email Address"] || myProfile["Email"] },
                          { label: "Last Donation",  val: myProfile["Last Blood Donation Date"] || "N/A" },
                          { label: "Donated Before", val: myProfile["Did you donate before ?"] || "N/A" },
                        ].map((item, i) => (
                          <div key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)", padding: "14px 16px" }}>
                            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</div>
                            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", wordBreak: "break-word" }}>{item.val || "—"}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "1px", background: "rgba(255,255,255,0.025)", borderRadius: "0 0 10px 10px", padding: "14px 16px" }}>
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "4px" }}>Emergency Availability</div>
                        <div style={{ fontSize: "14px", color: myProfile["Emergency Donation Availability"] === "Yes" ? "#86efac" : "rgba(255,255,255,0.6)" }}>
                          {myProfile["Emergency Donation Availability"] || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* ── CALL ME — opens WhatsApp ── */}
                    <div style={{ flex: 1 }}>
                      <CallMeButton phone={myProfile["Phone Number"]} style={{ borderRadius: "12px", padding: "13px 22px", fontSize: "14px" }} />
                    </div>
                    <button style={{ ...S.btn("ghost"), flex: "0 0 auto", padding: "11px 18px", fontSize: "13px" }} onClick={loadProfile}>
                      ↻ Refresh
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

          {/* ── CLUB PAGE ── */}
          {view === VIEWS.CLUB && (
            <div className="rb-page" style={{ maxWidth: "600px", margin: "0 auto", paddingBottom: "20px" }}>

              {/* Hero card */}
              <div style={{
                position: "relative", borderRadius: "20px", overflow: "hidden",
                background: "linear-gradient(145deg, rgba(220,38,38,0.12), rgba(255,255,255,0.03))",
                border: "0.5px solid rgba(220,38,38,0.2)",
                padding: "40px 32px", textAlign: "center", marginBottom: "20px",
              }}>
                <div style={{ height: "3px", background: "linear-gradient(90deg,#b91c1c,#ef4444,#b91c1c)", backgroundSize: "200%", animation: "rbTicker 3s linear infinite", position: "absolute", top: 0, left: 0, right: 0 }} />

                {/* Animated logo */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  <div className="rb-club-logo-wrap rb-club-logo-wrap--lg">
                    <div className="rb-club-logo-ring rb-club-logo-ring--1" />
                    <div className="rb-club-logo-ring rb-club-logo-ring--2" />
                    <div className="rb-club-logo-ring rb-club-logo-ring--3" />
                    <img
                      src="/logo.jpg"
                      alt="EU Public Health Club Logo"
                      className="rb-club-logo-img rb-club-logo-img--lg"
                      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                    />
                    <div className="rb-club-logo-fallback rb-club-logo-fallback--lg" style={{ display: "none" }}>🏥</div>
                  </div>
                </div>

                <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "6px", letterSpacing: "-0.3px" }}>
                  EU Public Health Club
                </h2>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
                  Eastern University, Dhaka, Bangladesh
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(34,197,94,0.1)", border: "0.5px solid rgba(34,197,94,0.25)", borderRadius: "20px", padding: "4px 14px", marginTop: "10px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "rbPulse 2s infinite" }} />
                  <span style={{ fontSize: "11px", color: "#86efac", letterSpacing: "0.5px" }}>Active Club</span>
                </div>
              </div>

              {/* Contact cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61578832395322"
                  target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div className="rb-club-card rb-club-card--blue">
                    <div className="rb-club-card-icon" style={{ background: "rgba(59,130,246,0.15)", border: "0.5px solid rgba(59,130,246,0.3)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#60a5fa">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "3px" }}>Facebook Page</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Follow us for updates & events</div>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "18px" }}>→</div>
                  </div>
                </a>

                {/* Gmail */}
                <a
                  href="mailto:eupublichealthclub@gmail.com"
                  style={{ textDecoration: "none" }}
                >
                  <div className="rb-club-card rb-club-card--red">
                    <div className="rb-club-card-icon" style={{ background: "rgba(239,68,68,0.12)", border: "0.5px solid rgba(239,68,68,0.3)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "3px" }}>Official Email</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>eupublichealthclub@gmail.com</div>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "18px" }}>→</div>
                  </div>
                </a>

                {/* Location */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Eastern+University+Asulia+Dhaka+Bangladesh"
                  target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div className="rb-club-card rb-club-card--green">
                    <div className="rb-club-card-icon" style={{ background: "rgba(34,197,94,0.1)", border: "0.5px solid rgba(34,197,94,0.3)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "3px" }}>Our Location</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Eastern University, Asulia Model Town, Dhaka</div>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "18px" }}>→</div>
                  </div>
                </a>

              </div>

              {/* Map embed */}
              <div style={{ marginTop: "20px", borderRadius: "16px", overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.08)", position: "relative" }}>
                <div style={{ height: "3px", background: "linear-gradient(90deg,#22c55e,#86efac,#22c55e)", backgroundSize: "200%", animation: "rbTicker 3s linear infinite" }} />
                <iframe
                  title="Eastern University Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.4!2d90.470711!3d23.869825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b7b7b7b7b7%3A0x0!2sEastern+University%2C+Asulia%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1"
                  width="100%"
                  height="220"
                  style={{ display: "block", border: "none", filter: "invert(0.9) hue-rotate(180deg) brightness(0.85) saturate(1.2)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div style={{ padding: "12px 16px", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Eastern University, Asulia Model Town, Dhaka</span>
                </div>
              </div>

            </div>
          )}

        {/* ── FOOTER ── */}
        <footer style={{ position: "relative", zIndex: 1, borderTop: "0.5px solid rgba(255,255,255,0.06)", marginTop: "auto" }}>

          {/* ── Animated Club Logo + Name Section ── */}
          <div
            onClick={() => goTo(VIEWS.CLUB)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "16px", padding: "20px 24px", cursor: "pointer",
              background: "linear-gradient(135deg, rgba(220,38,38,0.07) 0%, rgba(255,255,255,0.02) 100%)",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
              transition: "background 0.2s",
              position: "relative", overflow: "hidden",
            }}
            className="rb-club-banner"
          >
            {/* Shimmer sweep */}
            <div className="rb-club-shimmer" />

            {/* Logo */}
            <div className="rb-club-logo-wrap">
              <div className="rb-club-logo-ring rb-club-logo-ring--1" />
              <div className="rb-club-logo-ring rb-club-logo-ring--2" />
              <img
                src="/logo.jpg"
                alt="EU Public Health Club"
                className="rb-club-logo-img"
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              />
              {/* Fallback if logo.jpg not found */}
              <div className="rb-club-logo-fallback" style={{ display: "none" }}>🏥</div>
            </div>

            {/* Text */}
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "0.3px", marginBottom: "3px" }}>
                EU Public Health Club
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.5px" }}>
                Eastern University · Tap to learn more →
              </div>
            </div>
          </div>

          {/* Ticker */}
          <div style={{ overflow: "hidden", padding: "10px 0", background: "rgba(220,38,38,0.05)" }}>
            <div style={{ display: "flex", animation: "rbTicker 22s linear infinite", whiteSpace: "nowrap", willChange: "transform" }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "32px", paddingRight: "64px", fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "1.2px", textTransform: "uppercase", flexShrink: 0 }}>
                  <span style={{ color: "#ef4444", fontSize: "9px" }}>✦</span>
                  <span>Developed for Eastern University Public Health Club</span>
                  <span style={{ color: "#ef4444", fontSize: "9px" }}>✦</span>
                  <span>RedBond Blood Donor Network</span>
                  <span style={{ color: "#ef4444", fontSize: "9px" }}>✦</span>
                  <span>Saving Lives · Saving Futures</span>
                  <span style={{ color: "#ef4444", fontSize: "9px" }}>✦</span>
                  <span>EU Public Health Club</span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "10px 20px", color: "rgba(255,255,255,0.15)", fontSize: "11px" }}>
            Created by{" "}
            <a href="https://github.com/Bayazid26" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(252,165,165,0.35)" }}>
              Bayazid Ahmed
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

// ─── GOOGLE ICON ──────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20 20-8.9 20-20c0-1.4-.1-2.7-.5-4z"/>
      <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.4 19.2 13.5 24 13.5c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 7.1 29.6 5 24 5c-7.7 0-14.3 4.1-18 10.2z"/>
      <path fill="#FBBC05" d="M24 43c5.5 0 10.5-1.9 14.4-4.9l-6.7-5.5C29.6 34.5 26.9 35.5 24 35.5c-5.7 0-10.6-3-13.2-7.5l-7 5.4C7.6 39.8 15.3 43 24 43z"/>
      <path fill="#EA4335" d="M43.6 20H24v8h11.8c-.8 2.3-2.3 4.2-4.3 5.6l6.7 5.5c3.9-3.6 6.3-8.9 6.3-15.1 0-1.4-.2-2.7-.9-4z"/>
    </svg>
  );
}