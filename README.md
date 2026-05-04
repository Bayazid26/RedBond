<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>RedBond — Blood Donor Network</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>
<style>
  :root {
    --red: #E8192C;
    --red-dark: #a0101e;
    --red-glow: rgba(232,25,44,0.35);
    --bg: #0a0608;
    --bg2: #110a0c;
    --bg3: #1a0c10;
    --card: rgba(255,255,255,0.032);
    --border: rgba(232,25,44,0.18);
    --text: #f0e8ea;
    --muted: #7a6068;
    --accent: #ff4d5e;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── NOISE OVERLAY ── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.55;
  }

  /* ── AMBIENT GLOW ── */
  .ambient {
    position: fixed; border-radius: 50%; filter: blur(120px);
    pointer-events: none; z-index: 0; animation: drift 10s ease-in-out infinite alternate;
  }
  .ambient-1 { width: 600px; height: 600px; background: rgba(180,10,30,0.15); top: -200px; left: -200px; }
  .ambient-2 { width: 400px; height: 400px; background: rgba(232,25,44,0.08); bottom: 10%; right: -150px; animation-delay: -5s; }
  @keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(30px,20px) scale(1.05); } }

  /* ── LAYOUT ── */
  .wrapper { position: relative; z-index: 1; max-width: 940px; margin: 0 auto; padding: 0 24px 80px; }

  /* ── HERO ── */
  .hero {
    text-align: center;
    padding: 90px 20px 60px;
    position: relative;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(232,25,44,0.1); border: 1px solid var(--border);
    border-radius: 999px; padding: 6px 18px; font-size: 12px;
    font-family: 'JetBrains Mono', monospace; color: var(--accent);
    letter-spacing: 0.08em; margin-bottom: 28px;
    animation: fadeSlideDown 0.7s ease both;
  }
  .pulse-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--red); display: inline-block;
    animation: pulse 1.4s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 var(--red-glow); }
    50% { box-shadow: 0 0 0 7px transparent; }
  }

  .hero-icon {
    font-size: 72px; line-height: 1;
    display: block; margin: 0 auto 18px;
    animation: heartbeat 1.4s ease-in-out infinite;
    filter: drop-shadow(0 0 28px var(--red-glow));
  }
  @keyframes heartbeat {
    0%,100% { transform: scale(1); }
    14% { transform: scale(1.15); }
    28% { transform: scale(1); }
    42% { transform: scale(1.08); }
    56% { transform: scale(1); }
  }

  .hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(56px, 10vw, 100px);
    letter-spacing: 0.04em; line-height: 0.9;
    background: linear-gradient(135deg, #fff 0%, #ffb3bb 50%, var(--red) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: fadeSlideDown 0.9s 0.1s ease both;
  }
  .hero-sub {
    font-size: 17px; color: var(--muted); margin-top: 16px; max-width: 480px; margin-inline: auto;
    font-weight: 400; line-height: 1.6;
    animation: fadeSlideDown 0.9s 0.2s ease both;
  }
  .hero-tagline {
    font-family: 'JetBrains Mono', monospace; font-size: 13px;
    color: var(--red); letter-spacing: 0.12em; margin-top: 10px;
    animation: fadeSlideDown 0.9s 0.3s ease both;
  }

  .hero-cta {
    display: inline-flex; align-items: center; gap: 10px;
    margin-top: 36px; padding: 14px 32px;
    background: var(--red); color: #fff; font-weight: 600;
    border-radius: 8px; text-decoration: none; font-size: 15px;
    box-shadow: 0 0 40px var(--red-glow);
    transition: transform 0.2s, box-shadow 0.2s;
    animation: fadeSlideDown 0.9s 0.4s ease both;
  }
  .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 0 60px var(--red-glow); }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── DIVIDER ── */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 50px 0;
  }

  /* ── SECTION HEADER ── */
  .section-header {
    display: flex; align-items: center; gap: 14px; margin-bottom: 28px;
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .section-header.visible { opacity: 1; transform: translateY(0); }
  .section-icon {
    width: 42px; height: 42px; border-radius: 10px;
    background: linear-gradient(135deg, var(--red-dark), var(--red));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
    box-shadow: 0 0 20px var(--red-glow);
  }
  .section-header h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; letter-spacing: 0.06em;
    background: linear-gradient(90deg, #fff, #cc8890);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  /* ── CARD GRID ── */
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    position: relative; overflow: hidden;
    transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    opacity: 0; transform: translateY(20px);
  }
  .card.visible { opacity: 1; transform: translateY(0); }
  .card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(232,25,44,0.06) 0%, transparent 60%);
    pointer-events: none;
  }
  .card:hover {
    transform: translateY(-4px);
    border-color: rgba(232,25,44,0.45);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 30px var(--red-glow);
  }
  .card-emoji { font-size: 28px; margin-bottom: 12px; display: block; }
  .card h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; color: #fff; }
  .card p { font-size: 14px; color: var(--muted); line-height: 1.6; }

  /* ── TECH TABLE ── */
  .tech-table {
    width: 100%; border-collapse: collapse;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .tech-table.visible { opacity: 1; transform: translateY(0); }
  .tech-table th {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.1em;
    color: var(--red); text-transform: uppercase;
    padding: 10px 18px; text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .tech-table td {
    padding: 14px 18px; font-size: 14px; color: var(--muted);
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.2s;
  }
  .tech-table td:first-child { color: var(--text); font-weight: 500; }
  .tech-table tr:hover td { background: rgba(232,25,44,0.05); }
  .badge {
    display: inline-block; padding: 3px 10px;
    background: rgba(232,25,44,0.15); border: 1px solid var(--border);
    border-radius: 999px; font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: var(--accent);
  }

  /* ── CODE BLOCK ── */
  .code-wrap {
    background: #0e0609; border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden; margin: 12px 0;
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .code-wrap.visible { opacity: 1; transform: translateY(0); }
  .code-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; background: rgba(255,255,255,0.03);
    border-bottom: 1px solid var(--border);
  }
  .code-dots { display: flex; gap: 6px; }
  .code-dots span { width: 11px; height: 11px; border-radius: 50%; }
  .dot-r { background: #ff5f57; }
  .dot-y { background: #febc2e; }
  .dot-g { background: #28c840; }
  .code-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); }
  pre {
    padding: 20px; overflow-x: auto;
    font-family: 'JetBrains Mono', monospace; font-size: 13px;
    line-height: 1.7; color: #c9a0a8;
  }
  .kw { color: #e86f7c; }
  .str { color: #a8d0a0; }
  .cm { color: #555; font-style: italic; }
  .fn { color: #c9b0e8; }

  /* ── STEPS ── */
  .steps { counter-reset: step; display: flex; flex-direction: column; gap: 0; }
  .step {
    display: flex; gap: 20px; position: relative;
    padding-bottom: 28px;
    opacity: 0; transform: translateX(-16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .step.visible { opacity: 1; transform: translateX(0); }
  .step-left { display: flex; flex-direction: column; align-items: center; }
  .step-num {
    counter-increment: step;
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, var(--red-dark), var(--red));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif; font-size: 18px;
    color: #fff; flex-shrink: 0;
    box-shadow: 0 0 16px var(--red-glow);
  }
  .step-line {
    flex: 1; width: 1px;
    background: linear-gradient(180deg, var(--border), transparent);
    margin-top: 6px;
  }
  .step-body { padding-top: 6px; }
  .step-body h4 { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px; }
  .step-body p { font-size: 14px; color: var(--muted); line-height: 1.6; }

  /* ── QUOTE ── */
  .quote-block {
    background: linear-gradient(135deg, rgba(232,25,44,0.08), rgba(232,25,44,0.03));
    border-left: 3px solid var(--red); border-radius: 0 12px 12px 0;
    padding: 24px 28px; margin: 28px 0;
    position: relative;
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .quote-block.visible { opacity: 1; transform: translateY(0); }
  .quote-block::before {
    content: '"'; position: absolute; top: -10px; left: 18px;
    font-family: 'Bebas Neue', sans-serif; font-size: 80px;
    color: var(--red); opacity: 0.2; line-height: 1;
  }
  .quote-block p { font-size: 18px; font-style: italic; color: var(--text); line-height: 1.7; }
  .quote-block span { font-size: 13px; color: var(--muted); margin-top: 8px; display: block; }

  /* ── FIELDS LIST ── */
  .fields-list {
    display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px;
  }
  .field-chip {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 14px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 8px; font-size: 13px; color: var(--text);
    transition: border-color 0.2s, background 0.2s;
  }
  .field-chip:hover { border-color: var(--red); background: rgba(232,25,44,0.07); }
  .field-chip span { font-size: 16px; }

  /* ── FUTURE GRID ── */
  .future-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 18px 20px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; margin-bottom: 10px;
    transition: transform 0.2s, border-color 0.2s;
    opacity: 0; transform: translateY(14px);
  }
  .future-item.visible { opacity: 1; transform: translateY(0); }
  .future-item:hover { transform: translateX(6px); border-color: var(--border); }
  .future-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
  .future-item h4 { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
  .future-item p { font-size: 13px; color: var(--muted); line-height: 1.5; }

  /* ── FOOTER ── */
  .footer {
    text-align: center; padding: 50px 20px;
    border-top: 1px solid var(--border);
    position: relative;
    opacity: 0; transition: opacity 0.8s ease;
  }
  .footer.visible { opacity: 1; }
  .footer-heart { font-size: 40px; display: block; margin-bottom: 14px; animation: heartbeat 1.4s ease-in-out infinite; }
  .footer h3 { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 0.06em; }
  .footer p { font-size: 14px; color: var(--muted); margin-top: 8px; }
  .footer-link {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 20px; color: var(--red); text-decoration: none;
    font-family: 'JetBrains Mono', monospace; font-size: 13px;
    transition: opacity 0.2s;
  }
  .footer-link:hover { opacity: 0.75; }
  .mit-badge {
    display: inline-block; margin-top: 20px;
    padding: 5px 14px; border: 1px solid var(--border);
    border-radius: 999px; font-size: 12px; color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
  }

  /* ── SCROLL PROGRESS ── */
  #progress {
    position: fixed; top: 0; left: 0; height: 2px;
    background: linear-gradient(90deg, var(--red-dark), var(--red), #ff8090);
    z-index: 999; width: 0; transition: width 0.1s linear;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .hero { padding: 60px 12px 40px; }
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>

<div id="progress"></div>
<div class="ambient ambient-1"></div>
<div class="ambient ambient-2"></div>

<div class="wrapper">

  <!-- ── HERO ── -->
  <header class="hero">
    <div class="hero-badge">
      <span class="pulse-dot"></span>
      v1.0 · Open Source · MIT License
    </div>
    <span class="hero-icon">🩸</span>
    <h1>RedBond</h1>
    <p class="hero-sub">A modern, real-time blood donor finder platform — built to connect people in emergencies, instantly.</p>
    <p class="hero-tagline">❝ Saving Lives · Saving Futures ❞</p>
    <a class="hero-cta" href="https://github.com/Bayazid26" target="_blank">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
      View on GitHub
    </a>
  </header>

  <div class="divider"></div>

  <!-- ── FEATURES ── -->
  <section>
    <div class="section-header">
      <div class="section-icon">🔍</div>
      <h2>Core Features</h2>
    </div>
    <div class="grid-2">
      <div class="card">
        <span class="card-emoji">🔍</span>
        <h3>Donor Search</h3>
        <p>Search by blood group (A+, O−, B+ & more) with real-time listings and a clean card-based UI.</p>
      </div>
      <div class="card">
        <span class="card-emoji">👤</span>
        <h3>Authentication</h3>
        <p>Email/password login and Google Sign-In powered by secure Firebase Authentication.</p>
      </div>
      <div class="card">
        <span class="card-emoji">🧾</span>
        <h3>Donor Registration</h3>
        <p>Register via built-in form or Google Form. Donor data stored securely via Google Sheets API.</p>
      </div>
      <div class="card">
        <span class="card-emoji">📊</span>
        <h3>User Dashboard</h3>
        <p>View donor status, blood group, location, profile and registration — all in one place.</p>
      </div>
      <div class="card">
        <span class="card-emoji">📞</span>
        <h3>Instant Contact</h3>
        <p>One-tap Call or WhatsApp integration via the "Call Me" button for direct donor communication.</p>
      </div>
      <div class="card">
        <span class="card-emoji">🏥</span>
        <h3>Club Integration</h3>
        <p>EU Public Health Club page with contact links, Facebook, Email, Location and embedded map.</p>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ── TECH STACK ── -->
  <section>
    <div class="section-header">
      <div class="section-icon">🛠️</div>
      <h2>Tech Stack</h2>
    </div>
    <table class="tech-table">
      <thead>
        <tr>
          <th>Technology</th>
          <th>Usage</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>⚛️ React</td><td>Frontend UI Framework</td><td><span class="badge">v19</span></td></tr>
        <tr><td>⚡ Vite</td><td>Build Tool & Dev Server</td><td><span class="badge">Latest</span></td></tr>
        <tr><td>🔥 Firebase</td><td>Authentication & Backend</td><td><span class="badge">v10+</span></td></tr>
        <tr><td>📊 Google Sheets API</td><td>Donor Data Storage</td><td><span class="badge">v4</span></td></tr>
        <tr><td>🎨 CSS Custom</td><td>Styling & Animations</td><td><span class="badge">Vanilla</span></td></tr>
      </tbody>
    </table>
  </section>

  <div class="divider"></div>

  <!-- ── PROJECT STRUCTURE ── -->
  <section>
    <div class="section-header">
      <div class="section-icon">📂</div>
      <h2>Project Structure</h2>
    </div>
    <div class="code-wrap">
      <div class="code-header">
        <div class="code-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div>
        <span class="code-label">redbond/ directory</span>
      </div>
      <pre><span class="cm">redbond/</span>
├── <span class="kw">public/</span>
├── <span class="kw">src/</span>
│   ├── <span class="fn">App.jsx</span>          <span class="cm"># Root component</span>
│   ├── <span class="fn">main.jsx</span>         <span class="cm"># Entry point</span>
│   ├── <span class="fn">index.css</span>        <span class="cm"># Global styles</span>
│   ├── <span class="kw">components/</span>      <span class="cm"># Reusable UI components</span>
│   └── <span class="kw">assets/</span>          <span class="cm"># Images, icons</span>
├── <span class="str">package.json</span>
├── <span class="str">vite.config.js</span>
└── <span class="str">README.md</span></pre>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ── INSTALLATION ── -->
  <section>
    <div class="section-header">
      <div class="section-icon">⚙️</div>
      <h2>Installation & Setup</h2>
    </div>
    <div class="steps">
      <div class="step">
        <div class="step-left"><div class="step-num">1</div><div class="step-line"></div></div>
        <div class="step-body">
          <h4>Clone the Repository</h4>
          <div class="code-wrap" style="margin-top:10px">
            <div class="code-header"><div class="code-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div><span class="code-label">bash</span></div>
            <pre><span class="kw">git</span> clone https://github.com/Bayazid26/redbond.git
<span class="kw">cd</span> redbond</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-left"><div class="step-num">2</div><div class="step-line"></div></div>
        <div class="step-body">
          <h4>Install Dependencies</h4>
          <div class="code-wrap" style="margin-top:10px">
            <div class="code-header"><div class="code-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div><span class="code-label">bash</span></div>
            <pre><span class="kw">npm</span> install</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-left"><div class="step-num">3</div><div class="step-line"></div></div>
        <div class="step-body">
          <h4>Run Development Server</h4>
          <div class="code-wrap" style="margin-top:10px">
            <div class="code-header"><div class="code-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div><span class="code-label">bash</span></div>
            <pre><span class="kw">npm</span> run dev</pre>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-left"><div class="step-num">4</div></div>
        <div class="step-body">
          <h4>Build for Production</h4>
          <div class="code-wrap" style="margin-top:10px">
            <div class="code-header"><div class="code-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div><span class="code-label">bash</span></div>
            <pre><span class="kw">npm</span> run build</pre>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ── FIREBASE SETUP ── -->
  <section>
    <div class="section-header">
      <div class="section-icon">🔐</div>
      <h2>Firebase Setup</h2>
    </div>
    <div class="grid-3" style="margin-bottom:20px">
      <div class="card"><span class="card-emoji">1️⃣</span><h3>Create Project</h3><p>Go to Firebase Console and create a new project.</p></div>
      <div class="card"><span class="card-emoji">2️⃣</span><h3>Enable Auth</h3><p>Enable Email/Password and Google Sign-In providers.</p></div>
      <div class="card"><span class="card-emoji">3️⃣</span><h3>Add Config</h3><p>Paste your Firebase config object into the app.</p></div>
    </div>
    <div class="code-wrap">
      <div class="code-header"><div class="code-dots"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span></div><span class="code-label">firebase.js</span></div>
      <pre><span class="kw">const</span> FIREBASE_CONFIG = {
  <span class="fn">apiKey</span>: <span class="str">"YOUR_API_KEY"</span>,
  <span class="fn">authDomain</span>: <span class="str">"your-app.firebaseapp.com"</span>,
  <span class="fn">projectId</span>: <span class="str">"your-project-id"</span>,
  <span class="fn">storageBucket</span>: <span class="str">"your-app.appspot.com"</span>,
  <span class="fn">messagingSenderId</span>: <span class="str">"123456789"</span>,
  <span class="fn">appId</span>: <span class="str">"1:123456789:web:abcdef"</span>
};</pre>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ── DATA FIELDS ── -->
  <section>
    <div class="section-header">
      <div class="section-icon">📡</div>
      <h2>Data Handling</h2>
    </div>
    <p style="color:var(--muted);font-size:14px;margin-bottom:20px;line-height:1.7">
      Donor data is fetched from <strong style="color:var(--text)">Google Sheets via SheetDB API</strong>. Each donor record contains the following fields:
    </p>
    <div class="fields-list">
      <div class="field-chip"><span>👤</span> Full Name</div>
      <div class="field-chip"><span>🩸</span> Blood Group</div>
      <div class="field-chip"><span>📞</span> Phone Number</div>
      <div class="field-chip"><span>📍</span> Address</div>
      <div class="field-chip"><span>🎓</span> University</div>
      <div class="field-chip"><span>📅</span> Last Donation Date</div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ── FUTURE IMPROVEMENTS ── -->
  <section>
    <div class="section-header">
      <div class="section-icon">🎯</div>
      <h2>Future Improvements</h2>
    </div>
    <div class="future-item">
      <span class="future-icon">📍</span>
      <div><h4>Location-Based Filtering</h4><p>GPS-powered donor search to find the nearest available match in real time.</p></div>
    </div>
    <div class="future-item">
      <span class="future-icon">🔔</span>
      <div><h4>Emergency Notifications</h4><p>Instant push alerts to available donors during critical blood shortage situations.</p></div>
    </div>
    <div class="future-item">
      <span class="future-icon">🧠</span>
      <div><h4>AI Donor Recommendation</h4><p>Smart matching algorithm that recommends the most compatible and available donors.</p></div>
    </div>
    <div class="future-item">
      <span class="future-icon">📱</span>
      <div><h4>Mobile Application</h4><p>Native iOS & Android apps for on-the-go access to the donor network.</p></div>
    </div>
    <div class="future-item">
      <span class="future-icon">🔒</span>
      <div><h4>Advanced Verification</h4><p>Multi-step donor identity and health verification system for safer connections.</p></div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ── CONTRIBUTING ── -->
  <section>
    <div class="section-header">
      <div class="section-icon">🤝</div>
      <h2>Contributing</h2>
    </div>
    <div class="grid-3">
      <div class="card"><span class="card-emoji">🍴</span><h3>Fork</h3><p>Fork the repository to your own GitHub account.</p></div>
      <div class="card"><span class="card-emoji">🌿</span><h3>Branch</h3><p>Create a new feature branch for your changes.</p></div>
      <div class="card"><span class="card-emoji">📬</span><h3>Pull Request</h3><p>Commit your changes and open a PR for review.</p></div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ── MISSION QUOTE ── -->
  <div class="quote-block">
    <p>Saving Lives · Saving Futures</p>
    <span>RedBond aims to create a fast, reliable, and accessible blood donation network to help people in emergency situations.</span>
  </div>

  <div class="divider"></div>

  <!-- ── FOOTER ── -->
  <footer class="footer">
    <span class="footer-heart">🩸</span>
    <h3>RedBond</h3>
    <p>Built with passion by <strong>Bayazid Ahmed</strong></p>
    <br/>
    <a class="footer-link" href="https://github.com/Bayazid26" target="_blank">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
      github.com/Bayazid26
    </a>
    <br/>
    <span class="mit-badge">📜 MIT License</span>
    <p style="margin-top:28px;font-size:13px;color:var(--muted)">
      ⭐ Star the repo · 🔗 Share with others · ❤️ Help save lives
    </p>
  </footer>

</div>

<script>
  // ── SCROLL PROGRESS ──
  const bar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (p * 100) + '%';
  });

  // ── INTERSECTION OBSERVER ──
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), delay * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-header, .card, .tech-table, .code-wrap, .step, .future-item, .quote-block, .footer').forEach((el, i) => {
    el.dataset.delay = i % 6;
    obs.observe(el);
  });
</script>
</body>
</html>
