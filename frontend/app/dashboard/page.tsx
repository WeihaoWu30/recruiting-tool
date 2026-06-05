<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HR Dashboard – Banking Recruitment</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --bg: #0d0e13;
    --sidebar-bg: #111218;
    --card-bg: #181a22;
    --card-inner: #1e2029;
    --border: rgba(255,255,255,0.07);
    --purple: #9333ea;
    --purple-light: #a855f7;
    --purple-glow: rgba(147,51,234,0.25);
    --text: #f0f0f5;
    --muted: #6b7280;
    --accent-orange: #f97316;
    --accent-blue: #3b82f6;
    --accent-green: #22c55e;
    --accent-gray: #4b5563;
    --col-contacted: rgba(249,115,22,0.15);
    --col-replied: rgba(59,130,246,0.15);
    --col-interested: rgba(34,197,94,0.15);
    --col-not: rgba(75,85,99,0.1);
    --border-contacted: rgba(249,115,22,0.4);
    --border-replied: rgba(59,130,246,0.4);
    --border-interested: rgba(34,197,94,0.4);
    --border-not: rgba(75,85,99,0.3);
  }
 
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
 
  /* ── SIDEBAR ── */
  .sidebar {
    width: 260px;
    min-width: 260px;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    gap: 4px;
  }
 
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px 24px;
  }
 
  .logo-icon {
    width: 42px; height: 42px;
    background: var(--purple);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 18px var(--purple-glow);
  }
 
  .logo-text h1 {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
    line-height: 1.2;
  }
 
  .logo-text p {
    font-size: 11px;
    color: var(--muted);
    font-weight: 400;
  }
 
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
    transition: all 0.2s;
    text-decoration: none;
  }
 
  .nav-item:hover { background: rgba(255,255,255,0.05); color: var(--text); }
 
  .nav-item.active {
    background: var(--purple);
    color: #fff;
    box-shadow: 0 4px 16px var(--purple-glow);
  }
 
  .nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
 
  .sidebar-spacer { flex: 1; }
 
  .chrome-card {
    background: linear-gradient(135deg, #1e1230 0%, #15192b 100%);
    border: 1px solid rgba(147,51,234,0.3);
    border-radius: 14px;
    padding: 16px;
    margin-top: 8px;
  }
 
  .chrome-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 4px;
  }
 
  .chrome-card p {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 14px;
  }
 
  .btn-download {
    width: 100%;
    background: var(--purple);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 0;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px var(--purple-glow);
  }
 
  .btn-download:hover {
    background: var(--purple-light);
    box-shadow: 0 6px 20px rgba(147,51,234,0.4);
    transform: translateY(-1px);
  }
 
  /* ── MAIN ── */
  .main {
    flex: 1;
    overflow-x: auto;
    overflow-y: auto;
    padding: 36px 36px 36px 40px;
    display: flex;
    flex-direction: column;
  }
 
  .page-header { margin-bottom: 28px; }
 
  .page-header h2 {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.5px;
  }
 
  .page-header p { font-size: 14px; color: var(--muted); margin-top: 4px; }
 
  /* ── BOARD ── */
  .board {
    display: grid;
    grid-template-columns: repeat(4, minmax(260px, 1fr));
    gap: 18px;
    flex: 1;
    align-items: start;
  }
 
  .column {
    border-radius: 16px;
    padding: 20px 16px;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 340px;
    animation: fadeUp 0.4s ease both;
  }
 
  .column:nth-child(1) { background: var(--col-contacted); border-color: var(--border-contacted); animation-delay: 0.05s; }
  .column:nth-child(2) { background: var(--col-replied);   border-color: var(--border-replied);   animation-delay: 0.1s;  }
  .column:nth-child(3) { background: var(--col-interested);border-color: var(--border-interested);animation-delay: 0.15s; }
  .column:nth-child(4) { background: var(--col-not);       border-color: var(--border-not);       animation-delay: 0.2s;  }
 
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
 
  .col-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }
 
  .col-title {
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
  }
 
  .col-title svg { width: 20px; height: 20px; }
 
  .col-count {
    font-size: 12px;
    font-weight: 600;
    background: rgba(255,255,255,0.1);
    color: var(--muted);
    border-radius: 20px;
    padding: 2px 9px;
  }
 
  /* ── CANDIDATE CARD ── */
  .cand-card {
    background: var(--card-inner);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    cursor: pointer;
    transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
    animation: fadeUp 0.35s ease both;
  }
 
  .cand-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    border-color: rgba(255,255,255,0.15);
  }
 
  .cand-top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }
 
  .avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: var(--purple);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 0 12px var(--purple-glow);
  }
 
  .cand-info h4 {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    line-height: 1.2;
  }
 
  .cand-info p { font-size: 12px; color: var(--muted); margin-top: 2px; }
 
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }
 
  .tag {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.12);
    color: #c4c9d8;
    background: rgba(255,255,255,0.04);
  }
 
  .tag-more {
    font-size: 11px;
    color: var(--muted);
    padding: 3px 7px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: transparent;
  }
 
  .source-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: default;
  }
 
  .source-badge.linkedin {
    background: rgba(59,130,246,0.15);
    color: #60a5fa;
    border: 1px solid rgba(59,130,246,0.3);
  }
 
  .source-badge.indeed {
    background: rgba(34,197,94,0.15);
    color: #4ade80;
    border: 1px solid rgba(34,197,94,0.3);
  }
 
  /* empty state */
  .empty-state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    font-size: 13px;
    min-height: 100px;
  }
 
  /* scrollbar */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
</style>
</head>
<body>
 
<!-- ── SIDEBAR ── -->
<aside class="sidebar">
  <div class="logo">
    <div class="logo-icon">🤖</div>
    <div class="logo-text">
      <h1>HR Dashboard</h1>
      <p>Banking Recruitment</p>
    </div>
  </div>
 
  <a class="nav-item active" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    Pipeline
  </a>
  <a class="nav-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    Candidates
  </a>
  <a class="nav-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    Outreach Templates
  </a>
  <a class="nav-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    Campaigns
  </a>
  <a class="nav-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    Analytics
  </a>
  <a class="nav-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    Compliance Review
  </a>
  <a class="nav-item" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
    Settings
  </a>
 
  <div class="sidebar-spacer"></div>
 
  <div class="chrome-card">
    <h3>Chrome Extension</h3>
    <p>Autofill for LinkedIn &amp; Indeed</p>
    <button class="btn-download">Download Extension</button>
  </div>
</aside>
 
<!-- ── MAIN ── -->
<main class="main">
  <div class="page-header">
    <h2>Pipeline Board</h2>
    <p>Visualize candidates across recruitment stages</p>
  </div>
 
  <div class="board">
 
    <!-- CONTACTED -->
    <div class="column">
      <div class="col-header">
        <div class="col-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Contacted
        </div>
        <span class="col-count">2</span>
      </div>
 
      <div class="cand-card">
        <div class="cand-top">
          <div class="avatar">SJ</div>
          <div class="cand-info">
            <h4>Sarah Johnson</h4>
            <p>Senior React Developer</p>
          </div>
        </div>
        <div class="tags">
          <span class="tag">React</span>
          <span class="tag">TypeScript</span>
          <span class="tag-more">+1</span>
        </div>
        <span class="source-badge linkedin">🔗 LinkedIn</span>
      </div>
 
      <div class="cand-card">
        <div class="cand-top">
          <div class="avatar">MC</div>
          <div class="cand-info">
            <h4>Michael Chen</h4>
            <p>Full Stack Engineer</p>
          </div>
        </div>
        <div class="tags">
          <span class="tag">Python</span>
          <span class="tag">Django</span>
          <span class="tag-more">+1</span>
        </div>
        <span class="source-badge indeed">✔ Indeed</span>
      </div>
    </div>
 
    <!-- REPLIED -->
    <div class="column">
      <div class="col-header">
        <div class="col-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Replied
        </div>
        <span class="col-count">2</span>
      </div>
 
      <div class="cand-card">
        <div class="cand-top">
          <div class="avatar">ER</div>
          <div class="cand-info">
            <h4>Emily Rodriguez</h4>
            <p>Frontend Developer</p>
          </div>
        </div>
        <div class="tags">
          <span class="tag">Vue.js</span>
          <span class="tag">CSS</span>
          <span class="tag-more">+1</span>
        </div>
        <span class="source-badge linkedin">🔗 LinkedIn</span>
      </div>
 
      <div class="cand-card">
        <div class="cand-top">
          <div class="avatar">DP</div>
          <div class="cand-info">
            <h4>David Park</h4>
            <p>Backend Engineer</p>
          </div>
        </div>
        <div class="tags">
          <span class="tag">Java</span>
          <span class="tag">Spring</span>
          <span class="tag-more">+1</span>
        </div>
        <span class="source-badge linkedin">🔗 LinkedIn</span>
      </div>
    </div>
 
    <!-- INTERESTED -->
    <div class="column">
      <div class="col-header">
        <div class="col-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          Interested
        </div>
        <span class="col-count">2</span>
      </div>
 
      <div class="cand-card">
        <div class="cand-top">
          <div class="avatar">LW</div>
          <div class="cand-info">
            <h4>Lisa Wang</h4>
            <p>DevOps Engineer</p>
          </div>
        </div>
        <div class="tags">
          <span class="tag">Docker</span>
          <span class="tag">Kubernetes</span>
          <span class="tag-more">+1</span>
        </div>
        <span class="source-badge indeed">✔ Indeed</span>
      </div>
 
      <div class="cand-card">
        <div class="cand-top">
          <div class="avatar">JM</div>
          <div class="cand-info">
            <h4>James Miller</h4>
            <p>Software Engineer</p>
          </div>
        </div>
        <div class="tags">
          <span class="tag">Go</span>
          <span class="tag">GraphQL</span>
          <span class="tag-more">+1</span>
        </div>
        <span class="source-badge linkedin">🔗 LinkedIn</span>
      </div>
    </div>
 
    <!-- NOT INTERESTED -->
    <div class="column">
      <div class="col-header">
        <div class="col-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
          Not Interested
        </div>
        <span class="col-count">0</span>
      </div>
      <div class="empty-state">No candidates in this stage</div>
    </div>
 
  </div>
</main>
 
</body>
</html>
 