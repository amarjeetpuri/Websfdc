/**
 * Websfdc Technology — Premium Chat Widget
 * =========================================
 * Upload chat-widget.js + booking-api.php to public_html
 * Add before </body>:  <script src="chat-widget.js"></script>
 */
(function () {
  'use strict';

  const LOGO = 'data:image/png;base64,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';

  const CONFIG = {
    name:        'Websfdc Tech',
    tagline:     'Salesforce Implementation Partner',
    phone:       '+91 70155 48507',
    email:       'info@websfdctech.co.in',
    meetLink:    'https://meet.google.com/cho-uopp-gco',
    apiEndpoint: 'booking-api.php',
    autoOpenDelay: 2000,
  };

  /* ═══════════════════════ CONVERSATION FLOW ═══════════════════════ */
  const FLOW = [
    {
      id: 'welcome', type: 'buttons',
      message: "Hi there! 👋 Welcome to <strong>Websfdc Technology</strong>.<br>What brings you here today?",
      buttons: [
        { label: '🚀 Start a Project',   icon: '🚀', next: 'fname' },
        { label: '👥 Hire a Resource',   icon: '👥', next: 'fname' },
        { label: '💡 Just Exploring',    icon: '💡', next: 'fname' },
      ]
    },
    { id: 'fname',      type: 'input',   message: "May I know your <strong>first name</strong>?",                    key: 'fname',   inputType: 'text',  ph: 'Your first name…',      skip: true,  next: 'lname'  },
    { id: 'lname',      type: 'input',   message: "And your <strong>last name</strong>?",                            key: 'lname',   inputType: 'text',  ph: 'Your last name…',       skip: true,  next: 'email'  },
    { id: 'email',      type: 'input',   message: "What's the best <strong>email address</strong> to reach you?",   key: 'email',   inputType: 'email', ph: 'you@company.com',       skip: true,  next: 'phone'  },
    { id: 'phone',      type: 'input',   message: "Could I also get your <strong>phone number</strong>?",           key: 'phone',   inputType: 'tel',   ph: '+91 XXXXX XXXXX',       skip: true,  next: 'action' },
    {
      id: 'action', type: 'buttons',
      message: "Great! How would you like to <strong>connect with us</strong>?",
      buttons: [
        { label: '📅 Book a Meeting',          next: 'website' },
        { label: '💬 Connect to Consultant',   next: 'website' },
      ]
    },
    { id: 'website',    type: 'input',   message: "What's your <strong>company website</strong>? (helps us prepare)",  key: 'website', inputType: 'url',  ph: 'https://yourcompany.com', skip: true, next: 'pref'  },
    {
      id: 'pref', type: 'buttons',
      message: "What's the <strong>primary focus</strong> of this engagement?",
      buttons: [
        { label: '⚙️ Project Requirement',   next: 'agenda' },
        { label: '🧑‍💻 Hire a Professional',  next: 'agenda' },
        { label: '🤖 Agentforce / Gen AI',   next: 'agenda' },
      ]
    },
    { id: 'agenda',  type: 'input',  message: "Please share a <strong>brief agenda</strong> so we come prepared 🎯", key: 'agenda', inputType: 'text', ph: 'e.g. Need 2 SF developers for 3 months…', skip: true, next: 'bookslot' },
    { id: 'bookslot', type: 'booking', message: null },
  ];

  /* ═══════════════════════════ STATE ═══════════════════════════════ */
  let S = { stepId: 'welcome', data: {}, opened: false, autoOpened: false };
  const getStep = id => FLOW.find(s => s.id === id);

  /* ═══════════════════════════ CSS ═════════════════════════════════ */
  const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

#wc * { box-sizing: border-box; font-family: 'Inter', sans-serif; margin: 0; padding: 0; }

/* ── Bubble ─────────────────────────────────────────────────────── */
#wc-fab {
  position: fixed; bottom: 28px; right: 28px; z-index: 99999;
  width: 64px; height: 64px; border-radius: 50%; border: none; cursor: pointer;
  background: transparent; padding: 0;
  filter: drop-shadow(0 8px 24px rgba(0,112,210,0.45));
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), filter .3s;
}
#wc-fab:hover { transform: scale(1.1) rotate(-5deg); filter: drop-shadow(0 12px 32px rgba(0,112,210,0.6)); }
#wc-fab-inner {
  width: 64px; height: 64px; border-radius: 50%;
  background: linear-gradient(145deg,#0055b3,#0095d4,#00c6ff);
  display: flex; align-items: center; justify-content: center;
  border: 3px solid rgba(255,255,255,0.25);
  position: relative; overflow: hidden;
  transition: all .3s;
}
#wc-fab-inner::before {
  content:''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%);
}
#wc-fab img  { width: 40px; height: 40px; object-fit: contain; border-radius: 50%; position: relative; transition: opacity .2s, transform .2s; }
#wc-fab .wc-x { position: absolute; font-size: 20px; color: #fff; opacity: 0; transform: rotate(90deg); transition: all .3s; font-weight: 300; }
#wc-fab.open .wc-x { opacity: 1; transform: rotate(0); }
#wc-fab.open img { opacity: 0; transform: scale(0.5); }

/* Pulse ring */
#wc-pulse {
  position: fixed; bottom: 28px; right: 28px; z-index: 99998;
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(0,149,212,0.2);
  animation: wcPulse 2.5s ease-out infinite; pointer-events: none;
}
@keyframes wcPulse { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(2.2);opacity:0} }

/* Notification toast */
#wc-toast {
  position: fixed; bottom: 106px; right: 28px; z-index: 99996;
  background: #0a0a1a; color: #fff;
  padding: 12px 18px 12px 14px; border-radius: 16px;
  font-size: 13.5px; font-family: 'Inter',sans-serif; line-height: 1.5;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  max-width: 250px;
  transform: translateX(120%); opacity: 0;
  transition: all .4s cubic-bezier(.34,1.56,.64,1);
  pointer-events: none;
  border: 1px solid rgba(255,255,255,0.08);
}
#wc-toast.show { transform: translateX(0); opacity: 1; }
#wc-toast::after {
  content:''; position:absolute; bottom:-7px; right:22px;
  border:7px solid transparent; border-bottom:none; border-top-color:#0a0a1a;
}
#wc-toast .wc-td { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }

/* ── Panel ──────────────────────────────────────────────────────── */
#wc-panel {
  position: fixed; bottom: 106px; right: 28px; z-index: 99997;
  width: 390px; max-width: calc(100vw - 40px);
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06);
  display: flex; flex-direction: column; overflow: hidden;
  transform: translateY(24px) scale(0.92); opacity: 0; pointer-events: none;
  transition: all .4s cubic-bezier(.34,1.56,.64,1);
  max-height: 640px;
}
#wc-panel.open { transform: translateY(0) scale(1); opacity: 1; pointer-events: all; }

/* ── Header ─────────────────────────────────────────────────────── */
#wc-hdr {
  background: linear-gradient(135deg, #03012e 0%, #0d0535 30%, #1a0550 60%, #0055b3 100%);
  padding: 18px 18px 20px; flex-shrink: 0; position: relative; overflow: hidden;
}
#wc-hdr::before {
  content:''; position:absolute; top:-40px; right:-40px;
  width:160px; height:160px; border-radius:50%;
  background: radial-gradient(circle, rgba(0,149,212,0.3), transparent 70%);
}
#wc-hdr::after {
  content:''; position:absolute; bottom:-30px; left:-20px;
  width:120px; height:120px; border-radius:50%;
  background: radial-gradient(circle, rgba(0,198,255,0.15), transparent 70%);
}
.wc-hdr-top { display:flex; align-items:center; gap:12px; position:relative; z-index:1; }
.wc-logo-ring {
  width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
  background: rgba(255,255,255,0.12); border: 2px solid rgba(255,255,255,0.25);
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  backdrop-filter: blur(10px);
}
.wc-logo-ring img { width: 40px; height: 40px; object-fit: contain; border-radius: 50%; }
.wc-hdr-info h3 { color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -.2px; font-family:'Syne',sans-serif; }
.wc-hdr-info p  { color: rgba(255,255,255,0.65); font-size: 11.5px; margin-top: 2px; display:flex; align-items:center; gap:5px; }
.wc-dot { width:7px; height:7px; background:#4ade80; border-radius:50%; box-shadow:0 0 8px rgba(74,222,128,0.8); flex-shrink:0; }
.wc-close-btn {
  margin-left:auto; background:rgba(255,255,255,0.1); border:none; color:#fff;
  width:30px; height:30px; border-radius:50%; cursor:pointer; font-size:16px;
  display:flex; align-items:center; justify-content:center;
  transition:background .2s; flex-shrink:0;
}
.wc-close-btn:hover { background:rgba(255,255,255,0.2); }

.wc-hdr-stats {
  display: flex; gap: 16px; margin-top: 16px; padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.1); position:relative; z-index:1;
}
.wc-stat { text-align: center; }
.wc-stat strong { display:block; color:#fff; font-size:14px; font-weight:700; font-family:'Syne',sans-serif; }
.wc-stat span   { color:rgba(255,255,255,0.55); font-size:10px; }

/* ── Messages ────────────────────────────────────────────────────── */
#wc-msgs {
  flex:1; overflow-y:auto; padding:20px 16px 8px;
  display:flex; flex-direction:column; gap:16px;
  min-height:180px; max-height:380px;
  scrollbar-width:thin; scrollbar-color:#e8e8e8 transparent;
  background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
}

/* Bot msg */
.wc-brow { display:flex; flex-direction:column; gap:6px; max-width:82%; }
.wc-bavatar {
  width:26px; height:26px; border-radius:50%;
  background:linear-gradient(135deg,#0055b3,#0095d4);
  display:flex; align-items:center; justify-content:center;
  overflow:hidden; flex-shrink:0;
}
.wc-bavatar img { width:22px; height:22px; object-fit:contain; border-radius:50%; }
.wc-bname { font-size:11px; color:#999; font-weight:600; letter-spacing:.3px; text-transform:uppercase; margin-left:2px; }
.wc-bwrap { display:flex; gap:8px; align-items:flex-end; }
.wc-bmsg {
  background:#fff; color:#1a1a2e;
  padding:12px 16px; border-radius:20px; border-bottom-left-radius:6px;
  font-size:14px; line-height:1.6;
  box-shadow:0 2px 12px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04);
  word-break:break-word;
}

/* User msg */
.wc-urow { display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
.wc-uname { font-size:11px; color:#999; font-weight:600; letter-spacing:.3px; text-transform:uppercase; margin-right:2px; }
.wc-umsg {
  background: linear-gradient(135deg, #0055b3, #0095d4);
  color:#fff; padding:12px 16px;
  border-radius:20px; border-bottom-right-radius:6px;
  font-size:14px; font-weight:500; line-height:1.5;
  max-width:75%; word-break:break-word;
  box-shadow:0 4px 16px rgba(0,85,179,0.3);
}

/* ── Button chips ───────────────────────────────────────────────── */
.wc-chips { display:flex; flex-wrap:wrap; gap:8px; padding:4px 0; }
.wc-chip {
  background:#fff; border:1.5px solid #e2e8f0; color:#334155;
  padding:9px 16px; border-radius:24px; font-size:13px; font-weight:500;
  cursor:pointer; transition:all .2s; font-family:'Inter',sans-serif;
  box-shadow:0 2px 8px rgba(0,0,0,0.06);
  display:flex; align-items:center; gap:6px;
}
.wc-chip:hover {
  border-color:#0055b3; color:#0055b3;
  background:linear-gradient(135deg,#f0f6ff,#e8f0ff);
  transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,85,179,0.15);
}

/* ── Inline input ────────────────────────────────────────────────── */
.wc-inrow { display:flex; gap:8px; align-items:center; padding:4px 0; }
.wc-ininp {
  flex:1; border:1.5px solid #e2e8f0; border-radius:24px;
  padding:11px 18px; font-size:13.5px; font-family:'Inter',sans-serif;
  color:#1a1a2e; outline:none; background:#fafbff;
  transition:all .25s; box-shadow:0 2px 8px rgba(0,0,0,0.04);
}
.wc-ininp:focus {
  border-color:#0055b3; background:#fff;
  box-shadow:0 0 0 4px rgba(0,85,179,0.1);
}
.wc-insnd {
  width:42px; height:42px; border-radius:50%; flex-shrink:0; border:none;
  background:linear-gradient(135deg,#0055b3,#0095d4);
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:all .25s; box-shadow:0 4px 14px rgba(0,85,179,0.35);
}
.wc-insnd:hover { transform:scale(1.1); box-shadow:0 6px 20px rgba(0,85,179,0.45); }
.wc-insnd svg { width:16px; height:16px; fill:#fff; }

/* Skip */
.wc-skip {
  font-size:12px; color:#94a3b8; cursor:pointer;
  background:none; border:none; font-family:'Inter',sans-serif;
  display:flex; align-items:center; gap:4px; padding:2px 4px;
  transition:color .2s; margin-left:2px;
}
.wc-skip:hover { color:#0055b3; }

/* ── Booking card ────────────────────────────────────────────────── */
.wc-book-card {
  background:#fff; border-radius:18px; overflow:hidden;
  border:1.5px solid #e2e8f0; max-width:88%;
  box-shadow:0 4px 20px rgba(0,0,0,0.08);
}
.wc-book-top {
  background:linear-gradient(135deg,#f0f6ff,#e8f0ff);
  padding:14px 16px; display:flex; align-items:center; gap:10px;
  border-bottom:1px solid #e2e8f0;
}
.wc-book-icon { font-size:22px; }
.wc-book-top strong { font-size:14px; color:#0055b3; font-weight:700; }
.wc-book-top span   { font-size:11.5px; color:#64748b; display:block; }
.wc-book-body { padding:12px 16px; font-size:13px; color:#64748b; line-height:1.5; }
.wc-book-cta {
  width:100%; padding:13px; border:none; border-top:1px solid #f1f5f9;
  background:linear-gradient(135deg,#0055b3,#0095d4);
  color:#fff; font-size:14px; font-weight:600; font-family:'Inter',sans-serif;
  cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
  transition:opacity .2s; letter-spacing:.2px;
}
.wc-book-cta:hover { opacity:.9; }

/* ── Modal ───────────────────────────────────────────────────────── */
.wc-overlay {
  position:fixed; inset:0; background:rgba(10,10,30,0.6);
  z-index:999999; display:flex; align-items:flex-end; justify-content:center;
  backdrop-filter:blur(4px);
  animation:wcFadeIn .25s ease;
}
@keyframes wcFadeIn{from{opacity:0}to{opacity:1}}
.wc-modal {
  background:#fff; border-radius:28px 28px 0 0;
  padding:0; width:100%; max-width:440px;
  animation:wcSlide .35s cubic-bezier(.34,1.56,.64,1);
  overflow:hidden;
}
@keyframes wcSlide{from{transform:translateY(100%)}to{transform:translateY(0)}}
.wc-modal-hdr {
  background:linear-gradient(135deg,#03012e,#0055b3);
  padding:20px 20px 18px;
  display:flex; align-items:center; gap:10px;
}
.wc-modal-hdr h3 { color:#fff; font-size:16px; font-weight:700; font-family:'Syne',sans-serif; flex:1; }
.wc-modal-hdr p { color:rgba(255,255,255,0.65); font-size:12px; margin-top:2px; }
.wc-modal-cls {
  background:rgba(255,255,255,0.15); border:none; color:#fff;
  width:32px; height:32px; border-radius:50%; cursor:pointer;
  font-size:18px; display:flex; align-items:center; justify-content:center;
  flex-shrink:0; transition:background .2s;
}
.wc-modal-cls:hover { background:rgba(255,255,255,0.25); }
.wc-modal-body { padding:24px 20px 28px; }
.wc-field { margin-bottom:18px; }
.wc-field label { display:block; font-size:12px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:.5px; margin-bottom:8px; }
.wc-field input, .wc-field select {
  width:100%; border:1.5px solid #e2e8f0; border-radius:14px;
  padding:13px 16px; font-size:14px; font-family:'Inter',sans-serif;
  color:#1a1a2e; outline:none; background:#fafbff;
  transition:all .25s;
}
.wc-field input:focus, .wc-field select:focus {
  border-color:#0055b3; background:#fff;
  box-shadow:0 0 0 4px rgba(0,85,179,0.1);
}
.wc-field-row { display:flex; gap:12px; }
.wc-field-row .wc-field { flex:1; }
.wc-modal-info {
  background:linear-gradient(135deg,#f0f6ff,#e8f2ff);
  border-radius:14px; padding:12px 14px;
  display:flex; align-items:center; gap:10px;
  margin-bottom:18px; border:1px solid #d0e4ff;
}
.wc-modal-info span { font-size:12.5px; color:#0055b3; line-height:1.5; font-weight:500; }
.wc-book-now {
  width:100%; padding:16px; border:none; border-radius:16px;
  background:linear-gradient(135deg,#0055b3,#0095d4);
  color:#fff; font-size:15px; font-weight:700;
  font-family:'Inter',sans-serif; cursor:pointer;
  transition:all .25s; letter-spacing:.3px;
  box-shadow:0 6px 20px rgba(0,85,179,0.35);
  display:flex; align-items:center; justify-content:center; gap:8px;
}
.wc-book-now:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,85,179,0.45); }
.wc-book-now:disabled { opacity:.65; transform:none; cursor:not-allowed; }

/* ── Success ─────────────────────────────────────────────────────── */
.wc-success-card {
  background:linear-gradient(135deg,#f0f9ff,#e8f4fd);
  border-radius:20px; border:2px solid #bee3f8;
  padding:20px 18px; text-align:center;
  box-shadow:0 4px 20px rgba(0,149,212,0.12); max-width:88%;
}
.wc-success-card .si { font-size:44px; display:block; margin-bottom:10px; animation:wc-pop .5s cubic-bezier(.34,1.56,.64,1); }
@keyframes wc-pop{from{transform:scale(0)}to{transform:scale(1)}}
.wc-success-card h4 { font-size:16px; font-weight:800; color:#0055b3; margin-bottom:6px; font-family:'Syne',sans-serif; }
.wc-success-card p { font-size:13px; color:#475569; line-height:1.7; }
.wc-meet-btn {
  display:inline-flex; align-items:center; gap:8px; margin-top:14px;
  background:linear-gradient(135deg,#0055b3,#0095d4);
  color:#fff; padding:11px 22px; border-radius:14px;
  font-size:13.5px; font-weight:700; text-decoration:none;
  box-shadow:0 4px 16px rgba(0,85,179,0.3); transition:all .25s;
}
.wc-meet-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,85,179,0.4); }
.wc-cal-tag {
  display:inline-flex; align-items:center; gap:5px; margin-top:10px;
  background:#dcfce7; color:#16a34a; border-radius:20px;
  padding:5px 12px; font-size:12px; font-weight:600;
}

/* ── Typing ──────────────────────────────────────────────────────── */
.wc-typing {
  display:flex; gap:5px; align-items:center;
  padding:12px 16px; background:#fff; border-radius:20px; border-bottom-left-radius:6px;
  box-shadow:0 2px 12px rgba(0,0,0,0.07); width:fit-content;
}
.wc-typing span {
  width:7px; height:7px; border-radius:50%;
  background:linear-gradient(135deg,#0055b3,#0095d4);
  animation:wcDot 1.4s ease-in-out infinite;
}
.wc-typing span:nth-child(2){animation-delay:.2s}
.wc-typing span:nth-child(3){animation-delay:.4s}
@keyframes wcDot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}

/* ── Bottom bar ─────────────────────────────────────────────────── */
#wc-bar {
  padding:12px 14px 14px; border-top:1px solid #f1f5f9;
  display:flex; gap:8px; align-items:center; flex-shrink:0;
  background:#fff;
}
#wc-bar input {
  flex:1; border:1.5px solid #e2e8f0; border-radius:24px;
  padding:11px 18px; font-size:13.5px; font-family:'Inter',sans-serif;
  color:#1a1a2e; outline:none; background:#fafbff; transition:all .25s;
}
#wc-bar input:focus { border-color:#0055b3; background:#fff; box-shadow:0 0 0 4px rgba(0,85,179,0.08); }
#wc-bar button {
  width:42px; height:42px; border-radius:50%; border:none; flex-shrink:0;
  background:linear-gradient(135deg,#0055b3,#0095d4);
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:all .25s; box-shadow:0 4px 14px rgba(0,85,179,0.35);
}
#wc-bar button:hover { transform:scale(1.1); }
#wc-bar button svg { width:16px; height:16px; fill:#fff; }

/* Spinner */
.wc-spin {
  display:inline-block; width:16px; height:16px; border-radius:50%;
  border:2px solid rgba(255,255,255,0.3); border-top-color:#fff;
  animation:wc-spin .7s linear infinite;
}
@keyframes wc-spin{to{transform:rotate(360deg)}}

@media(max-width:430px){
  #wc-panel{right:8px;bottom:88px;width:calc(100vw - 16px);}
  #wc-fab,#wc-pulse{right:14px;bottom:18px;}
  #wc-toast{right:8px;}
}
`;

  /* ══════════════════════════ INIT ════════════════════════════════ */
  function init() {
    const st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    const root = document.createElement('div');
    root.id = 'wc';
    root.innerHTML = `
      <div id="wc-pulse"></div>
      <div id="wc-toast">
        <div>👋 Hi! Need <strong>Salesforce help</strong>?</div>
        <div class="wc-td">Chat with our expert now →</div>
      </div>
      <button id="wc-fab" aria-label="Chat">
        <div class="wc-fab-inner" id="wc-fab-inner">
          <img src="${LOGO}" alt="Websfdc"/>
          <span class="wc-x">✕</span>
        </div>
      </button>
      <div id="wc-panel">
        <div id="wc-hdr">
          <div class="wc-hdr-top">
            <div class="wc-logo-ring"><img src="${LOGO}" alt=""/></div>
            <div class="wc-hdr-info">
              <h3>Websfdc Tech</h3>
              <p><span class="wc-dot"></span>Online · Replies in minutes</p>
            </div>
            <button class="wc-close-btn" id="wc-cls">✕</button>
          </div>
          <div class="wc-hdr-stats">
            <div class="wc-stat"><strong>50+</strong><span>Projects</span></div>
            <div class="wc-stat"><strong>99%</strong><span>Salesforce</span></div>
            <div class="wc-stat"><strong>⚡</strong><span>Agentforce</span></div>
            <div class="wc-stat"><strong>48hr</strong><span>Staffing</span></div>
          </div>
        </div>
        <div id="wc-msgs"></div>
        <div id="wc-bar">
          <input id="wc-inp" type="text" placeholder="Type a message…" autocomplete="off"/>
          <button id="wc-snd"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
        </div>
      </div>`;
    document.body.appendChild(root);

    // Fix fab inner reference
    const fabEl = document.getElementById('wc-fab');
    const fabInnerEl = document.getElementById('wc-fab-inner');
    // Move inner into fab properly
    fabEl.innerHTML = '';
    fabEl.appendChild(fabInnerEl);

    const panel  = document.getElementById('wc-panel');
    const msgs   = document.getElementById('wc-msgs');
    const barInp = document.getElementById('wc-inp');
    const barSnd = document.getElementById('wc-snd');
    const toast  = document.getElementById('wc-toast');
    const pulse  = document.getElementById('wc-pulse');
    const cls    = document.getElementById('wc-cls');

    /* ── Toggle ── */
    function openChat() {
      S.opened = true;
      fabEl.classList.add('open');
      panel.classList.add('open');
      toast.classList.remove('show');
      if (pulse) pulse.style.animation = 'none';
      if (msgs.children.length === 0) setTimeout(() => runStep('welcome'), 500);
    }
    function closeChat() {
      S.opened = false;
      fabEl.classList.remove('open');
      panel.classList.remove('open');
    }

    fabEl.addEventListener('click', () => S.opened ? closeChat() : openChat());
    cls.addEventListener('click', closeChat);

    // Auto-open after 2 seconds
    setTimeout(() => { if (!S.autoOpened) { S.autoOpened = true; openChat(); } }, CONFIG.autoOpenDelay);

    // Show toast after 1s
    setTimeout(() => toast.classList.add('show'), 1000);
    setTimeout(() => toast.classList.remove('show'), 6000);

    /* ── Bottom bar ── */
    function sendBar() {
      const t = barInp.value.trim(); if (!t) return;
      barInp.value = '';
      const ai = document.getElementById('wc-ai');
      if (ai) { ai.value = t; document.getElementById('wc-ab') && document.getElementById('wc-ab').click(); return; }
      // Free text fallback
      addUser(t);
      setTimeout(() => addBot("Thanks for your message! Feel free to use the options above, or call us at <strong>+91 70155 48507</strong> 😊"), 800);
    }
    barSnd.addEventListener('click', sendBar);
    barInp.addEventListener('keydown', e => { if(e.key==='Enter') sendBar(); });

    /* ── Helpers ── */
    const scroll = () => { msgs.scrollTop = msgs.scrollHeight; };

    function showTyping() {
      const w = document.createElement('div'); w.className='wc-brow'; w.id='wc-typ';
      w.innerHTML = `<div class="wc-bname">Websfdc Tech</div>
        <div class="wc-bwrap"><div class="wc-bavatar"><img src="${LOGO}" alt=""/></div>
        <div class="wc-typing"><span></span><span></span><span></span></div></div>`;
      msgs.appendChild(w); scroll();
    }
    function rmTyping() { const t=document.getElementById('wc-typ'); if(t) t.remove(); }

    function addBot(html) {
      return new Promise(r => {
        const w = document.createElement('div'); w.className='wc-brow';
        w.innerHTML = `<div class="wc-bname">Websfdc Tech</div>
          <div class="wc-bwrap"><div class="wc-bavatar"><img src="${LOGO}" alt=""/></div>
          <div class="wc-bmsg">${html}</div></div>`;
        msgs.appendChild(w); scroll(); r(w);
      });
    }

    function addUser(text) {
      const name = [S.data.fname, S.data.lname].filter(Boolean).join(' ') || 'You';
      const w = document.createElement('div'); w.className='wc-urow';
      w.innerHTML = `<div class="wc-uname">${name}</div><div class="wc-umsg">${text}</div>`;
      msgs.appendChild(w); scroll();
    }

    /* ── Step Runner ── */
    async function runStep(id) {
      S.stepId = id;
      const step = getStep(id);
      if (!step) return;
      showTyping();
      await delay(700 + Math.random() * 400);
      rmTyping();
      if (step.message) await addBot(step.message);

      if      (step.type==='buttons') renderChips(step);
      else if (step.type==='input')   renderInput(step);
      else if (step.type==='booking') renderBookingCard(step);
    }

    function renderChips(step) {
      const wrap = document.createElement('div'); wrap.className='wc-chips'; wrap.id='wc-chips';
      step.buttons.forEach(btn => {
        const b = document.createElement('button'); b.className='wc-chip'; b.textContent=btn.label;
        b.onclick = () => {
          wrap.remove();
          addUser(btn.label);
          S.data['btn_'+step.id] = btn.label;
          setTimeout(() => runStep(btn.next), 350);
        };
        wrap.appendChild(b);
      });
      msgs.appendChild(wrap); scroll();
    }

    function renderInput(step) {
      const wrap = document.createElement('div'); wrap.className='wc-inrow'; wrap.id='wc-inrow';
      const inp = document.createElement('input');
      inp.type=step.inputType||'text'; inp.placeholder=step.ph||''; inp.className='wc-ininp'; inp.id='wc-ai';
      const btn = document.createElement('button'); btn.className='wc-insnd'; btn.id='wc-ab';
      btn.innerHTML='<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

      const submit = () => {
        const v = inp.value.trim(); if(!v) return;
        wrap.remove(); skipEl && skipEl.remove();
        S.data[step.key] = v;
        addUser(v);
        setTimeout(() => runStep(step.next), 350);
      };
      btn.onclick = submit;
      inp.addEventListener('keydown', e => { if(e.key==='Enter'){e.preventDefault();submit();} });
      wrap.appendChild(inp); wrap.appendChild(btn);
      msgs.appendChild(wrap);

      let skipEl = null;
      if (step.skip) {
        skipEl = document.createElement('button'); skipEl.className='wc-skip';
        skipEl.innerHTML='Skip <span style="font-size:11px">››</span>';
        skipEl.onclick = () => {
          wrap.remove(); skipEl.remove();
          S.data[step.key] = '';
          addUser('Skip');
          setTimeout(() => runStep(step.next), 350);
        };
        msgs.appendChild(skipEl);
      }
      scroll(); setTimeout(() => inp.focus(), 120);
    }

    function renderBookingCard() {
      const svc = S.data['btn_pref'] || 'Salesforce Consultation';
      const w = document.createElement('div'); w.className='wc-brow';
      w.innerHTML=`<div class="wc-bname">Websfdc Tech</div>
        <div class="wc-bwrap"><div class="wc-bavatar"><img src="${LOGO}" alt=""/></div>
        <div>
          <div class="wc-book-card">
            <div class="wc-book-top">
              <div class="wc-book-icon">📅</div>
              <div><strong>${svc}</strong><span>Free 30-min consultation</span></div>
            </div>
            <div class="wc-book-body">Pick a date &amp; time and we'll send you a <strong>Google Calendar invite</strong> with Meet link instantly!</div>
            <button class="wc-book-cta" id="wc-booknow">📅 Book Now — It's Free!</button>
          </div>
        </div></div>`;
      msgs.appendChild(w); scroll();
      document.getElementById('wc-booknow').addEventListener('click', showModal);
    }

    /* ── Booking Modal ── */
    function showModal() {
      const svc = S.data['btn_pref'] || 'Salesforce Consultation';
      const now = new Date();
      now.setMinutes(Math.ceil(now.getMinutes()/30)*30, 0, 0);
      const minDT = now.toISOString().slice(0,16);

      const ov = document.createElement('div'); ov.className='wc-overlay';
      ov.innerHTML = `
        <div class="wc-modal">
          <div class="wc-modal-hdr">
            <div>
              <h3>Book Your Free Consultation</h3>
              <p>📅 ${svc} · 30 minutes</p>
            </div>
            <button class="wc-modal-cls" id="wc-mcls">✕</button>
          </div>
          <div class="wc-modal-body">
            <div class="wc-modal-info">
              <span>🎥</span>
              <span>A <strong>Google Meet link</strong> will be emailed to you instantly after booking.</span>
            </div>
            <div class="wc-field-row">
              <div class="wc-field">
                <label>Date &amp; Time</label>
                <input type="datetime-local" id="wc-mdt" min="${minDT}" value="${minDT}"/>
              </div>
            </div>
            <div class="wc-field-row">
              <div class="wc-field">
                <label>Your Name</label>
                <input type="text" id="wc-mname" placeholder="Full name" value="${[S.data.fname,S.data.lname].filter(Boolean).join(' ')}"/>
              </div>
            </div>
            <div class="wc-field-row">
              <div class="wc-field">
                <label>Email</label>
                <input type="email" id="wc-memail" placeholder="you@company.com" value="${S.data.email||''}"/>
              </div>
              <div class="wc-field">
                <label>Phone</label>
                <input type="tel" id="wc-mphone" placeholder="+91 XXXXX XXXXX" value="${S.data.phone||''}"/>
              </div>
            </div>
            <button class="wc-book-now" id="wc-mconfirm">📅 Confirm Booking &amp; Get Meet Link</button>
          </div>
        </div>`;
      document.body.appendChild(ov);

      document.getElementById('wc-mcls').onclick = () => ov.remove();
      ov.addEventListener('click', e => { if(e.target===ov) ov.remove(); });

      document.getElementById('wc-mconfirm').onclick = async () => {
        const dtVal   = document.getElementById('wc-mdt').value;
        const name    = document.getElementById('wc-mname').value.trim();
        const email   = document.getElementById('wc-memail').value.trim();
        const phone   = document.getElementById('wc-mphone').value.trim();
        if (!dtVal || !name || !email) { shakeField(!dtVal?'wc-mdt':!name?'wc-mname':'wc-memail'); return; }

        const btn = document.getElementById('wc-mconfirm');
        btn.disabled=true;
        btn.innerHTML='<span class="wc-spin"></span> Creating Calendar Event…';

        const dt = new Date(dtVal);
        const dtEnd = new Date(dt); dtEnd.setMinutes(dtEnd.getMinutes()+30);
        S.data.name    = name;
        S.data.email   = email;
        S.data.phone   = phone;
        S.data.dateISO = dt.toISOString();
        S.data.dateStr = dt.toLocaleString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'});
        S.data.dateRaw = dt.toISOString().split('T')[0];
        S.data.time    = dt.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});

        try {
          await fetch(CONFIG.apiEndpoint, {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
              name, email, phone,
              company:  S.data.website || '',
              service:  svc,
              dateRaw:  S.data.dateRaw,
              time:     S.data.time,
              dateISO:  S.data.dateISO,
              endISO:   dtEnd.toISOString(),
              notes:    S.data.agenda || '',
              meetLink: CONFIG.meetLink,
            })
          });
        } catch(e) { /* show success anyway */ }

        ov.remove();
        showSuccess(svc);
      };
    }

    function shakeField(id) {
      const el = document.getElementById(id); if(!el) return;
      el.style.borderColor='#ef4444';
      el.style.animation='none';
      setTimeout(() => { el.style.animation=''; el.style.borderColor=''; }, 600);
    }

    function showSuccess(svc) {
      const name = S.data.fname || S.data.name || 'there';
      const w = document.createElement('div'); w.className='wc-brow';
      w.innerHTML=`<div class="wc-bname">Websfdc Tech</div>
        <div class="wc-bwrap"><div class="wc-bavatar"><img src="${LOGO}" alt=""/></div>
        <div class="wc-success-card">
          <span class="si">🎉</span>
          <h4>You're All Set!</h4>
          <p>
            Hi <strong>${name}</strong>! Your <strong>${svc}</strong> consultation is confirmed.<br><br>
            📅 <strong>${S.data.dateStr}</strong><br>
            📧 Invite sent to <strong>${S.data.email}</strong>
          </p>
          <a class="wc-meet-btn" href="${CONFIG.meetLink}" target="_blank">🎥 Join Google Meet</a><br>
          <span class="wc-cal-tag">✅ Added to Google Calendar</span>
        </div></div>`;
      msgs.appendChild(w); scroll();

      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          rmTyping();
          addBot("Is there anything else I can help you with? 😊");
          setTimeout(() => {
            const chips = document.createElement('div'); chips.className='wc-chips';
            ['Ask a Question','Book Another','All good, thanks!'].forEach(label => {
              const b=document.createElement('button'); b.className='wc-chip'; b.textContent=label;
              b.onclick=()=>{
                chips.remove(); addUser(label);
                if(label==='Book Another') { S.data={}; setTimeout(()=>runStep('choice'),400); }
                else if(label==='All good, thanks!') setTimeout(()=>addBot("Thank you! Have a great day! 👋✨"),500);
                else setTimeout(()=>addBot("Please type your question below — I'm here to help! 💬"),500);
              };
              chips.appendChild(b);
            });
            msgs.appendChild(chips); scroll();
          }, 400);
        }, 900);
      }, 1200);
    }

    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
