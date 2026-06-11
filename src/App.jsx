import { useState, useEffect, useRef } from "react";
import { portfolio } from "./portfolioData";

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(ref, threshold = 0.1) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return vis;
}

function Fade({ children, delay = 0, y = 28, style = {} }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : `translateY(${y}px)`, transition: `opacity .7s ${delay}s cubic-bezier(.16,1,.3,1),transform .7s ${delay}s cubic-bezier(.16,1,.3,1)`, ...style }}>
      {children}
    </div>
  );
}

function ElectronicSymbol({ type }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <svg viewBox="0 0 64 32" aria-hidden="true">
      {type === "resistor" && <path {...common} d="M2 16h10l4-7 7 14 7-14 7 14 7-14 4 7h14" />}
      {type === "capacitor" && <><path {...common} d="M2 16h24M26 6v20M38 6v20M38 16h24" /></>}
      {type === "inductor" && <path {...common} d="M2 16h10c0-10 10-10 10 0 0-10 10-10 10 0 0-10 10-10 10 0 0-10 10-10 10 0h10" />}
      {type === "diode" && <><path {...common} d="M2 16h20M42 16h20M22 7v18l20-9zM42 7v18" /></>}
      {type === "led" && <><path {...common} d="M2 16h18M40 16h22M20 7v18l20-9zM40 7v18M38 5l8-4M43 9l8-4M44 1h2v2M49 5h2v2" /></>}
      {type === "transistor" && <><circle {...common} cx="34" cy="16" r="13" /><path {...common} d="M2 16h19M21 8v16M21 11l13-7M21 21l13 7M34 4h15M34 28h15M29 24l5 4-1-6" /></>}
      {type === "ground" && <><path {...common} d="M32 2v14M18 16h28M23 21h18M28 26h8" /></>}
    </svg>
  );
}

function SectionMotion({ variant = 0 }) {
  const chips = [
    { x: "7%", y: "18%", width: 64, height: 48, dx: "30px", dy: "-28px", rotate: "-8deg", duration: "12s", delay: "-2s", label: "MCU" },
    { x: "82%", y: "13%", width: 52, height: 40, dx: "-28px", dy: "34px", rotate: "12deg", duration: "15s", delay: "-7s", label: "ARM" },
    { x: "76%", y: "72%", width: 72, height: 52, dx: "35px", dy: "-24px", rotate: "-5deg", duration: "17s", delay: "-4s", label: "I/O" },
    { x: "14%", y: "80%", width: 48, height: 36, dx: "-22px", dy: "-36px", rotate: "7deg", duration: "14s", delay: "-9s", label: "RTOS" },
  ];
  const traces = [
    { x: "-4%", y: "25%", width: "31%", rotate: "-8deg", duration: "8s", delay: "-1s" },
    { x: "68%", y: "45%", width: "36%", rotate: "11deg", duration: "10s", delay: "-5s" },
    { x: "10%", y: "88%", width: "27%", rotate: "5deg", duration: "9s", delay: "-3s" },
  ];
  const symbols = [
    { type: "resistor", x: "36%", y: "12%", width: 72, rotate: "-12deg", dx: "24px", dy: "28px", duration: "14s", delay: "-5s" },
    { type: "capacitor", x: "54%", y: "80%", width: 54, rotate: "8deg", dx: "-30px", dy: "-22px", duration: "12s", delay: "-3s" },
    { type: "inductor", x: "4%", y: "54%", width: 68, rotate: "4deg", dx: "32px", dy: "-18px", duration: "16s", delay: "-8s" },
    { type: "diode", x: "88%", y: "48%", width: 58, rotate: "-7deg", dx: "-25px", dy: "24px", duration: "13s", delay: "-6s" },
    { type: variant % 2 ? "transistor" : "led", x: "44%", y: "42%", width: 50, rotate: "10deg", dx: "20px", dy: "-28px", duration: "17s", delay: "-11s" },
    { type: "ground", x: "62%", y: "24%", width: 38, rotate: "0deg", dx: "-18px", dy: "24px", duration: "15s", delay: "-9s" },
  ];

  return (
    <div className={`section-motion motion-${variant}`} aria-hidden="true">
      {chips.map((chip, index) => (
        <span
          className="motion-chip"
          key={`chip-${index}`}
          style={{
            "--x": chip.x,
            "--y": chip.y,
            "--chip-width": `${chip.width}px`,
            "--chip-height": `${chip.height}px`,
            "--dx": chip.dx,
            "--dy": chip.dy,
            "--rotate": chip.rotate,
            "--duration": chip.duration,
            "--delay": chip.delay,
          }}
        >
          <span>{chip.label}</span>
        </span>
      ))}
      {traces.map((trace, index) => (
        <span
          className="signal-trace"
          key={`trace-${index}`}
          style={{
            "--x": trace.x,
            "--y": trace.y,
            "--width": trace.width,
            "--rotate": trace.rotate,
            "--duration": trace.duration,
            "--delay": trace.delay,
          }}
        />
      ))}
      {symbols.map((symbol, index) => (
        <span
          className="motion-symbol"
          key={`${symbol.type}-${index}`}
          style={{
            "--x": symbol.x,
            "--y": symbol.y,
            "--symbol-width": `${symbol.width}px`,
            "--dx": symbol.dx,
            "--dy": symbol.dy,
            "--rotate": symbol.rotate,
            "--duration": symbol.duration,
            "--delay": symbol.delay,
          }}
        >
          <ElectronicSymbol type={symbol.type} />
        </span>
      ))}
    </div>
  );
}

function useTyping(strings, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx((idx + 1) % strings.length); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);
  return text;
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { person, hero, about, skillsSection, skills, projectsSection, projects, experience, achievements, certifications, contact, navigation, socialLinks } = portfolio;
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const typed = useTyping(hero.typingStrings);

  const D = dark;
  const bg    = D ? "#0D0815" : "#fafafa";
  const bg2   = D ? "#110d1c" : "#f3eeff";
  const card  = D ? "rgba(255,255,255,0.04)" : "#ffffff";
  const text  = D ? "#F4F0FF" : "#1a0533";
  const text2 = D ? "#a08cc0" : "#5c4a80";
  const text3 = D ? "#5c4a80" : "#9b8cbf";
  const border= D ? "rgba(255,255,255,0.07)" : "rgba(109,40,217,0.12)";

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const ids = navigation.map(id => ({ id, top: document.getElementById(id)?.offsetTop ?? 0 }));
      const y = window.scrollY + 140;
      for (let i = ids.length - 1; i >= 0; i--) {
        if (ids[i].top <= y) { setActive(ids[i].id); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const emailAddress = socialLinks.find(link => link.label === "Email")?.value ?? "";

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(current => ({ ...current, [name]: value }));
  };

  const handleContactSubmit = async e => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim() || "Portfolio contact";
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setFormStatus("Please add your name, email, and message before sending.");
      return;
    }

    setIsSending(true);
    setFormStatus("Sending your message...");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: subject,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!res.ok) throw new Error("Message send failed");

      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormStatus("Message sent successfully. Thanks for reaching out.");
    } catch (error) {
      setFormStatus("Message could not be sent right now. Please email me directly from the link on the left.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: bg, color: text, minHeight: "100vh", overflowX: "hidden", transition: "background .3s,color .3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:#6D28D966;color:#fff}
        .wrap{max-width:1100px;margin:0 auto;padding:0 2rem}
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important}
          .hero-photo{display:block!important;width:min(100%,390px);min-height:470px!important;margin:0 auto;order:-1}
          .hero-portrait-stage{inset:-1rem -2rem -2rem!important}
          .hero-floating-tag{display:none!important}
          .hero-status{display:none!important}
          .nav-links{display:none!important}
          .exp-grid{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .about-grid{grid-template-columns:1fr!important}
          .about-facts{grid-template-columns:1fr 1fr!important}
          .fact-card{min-height:132px!important}
          .fact-card:last-child{grid-column:span 2!important}
          .experience-card{padding:1.4rem!important}
          .section-orb{opacity:.45!important}
          .motion-chip{opacity:.28!important}
          .motion-symbol{opacity:.25!important}
          .signal-trace{opacity:.28!important}
        }
        @media(max-width:600px){
          .wrap{padding:0 1.1rem}
          .hero-grid{gap:2.5rem!important;padding-top:1.75rem!important}
          .hero-photo{width:min(92vw,350px);min-height:410px!important}
          .about-facts{grid-template-columns:1fr!important}
          .fact-card,.fact-card:last-child{grid-column:span 1!important}
        }
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes glow{0%,100%{opacity:.4}50%{opacity:.9}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(2);opacity:0}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes orbit-spin{to{transform:rotate(360deg)}}
        @keyframes orbit-spin-reverse{to{transform:rotate(-360deg)}}
        @keyframes tag-orbit{to{transform:rotate(360deg)}}
        @keyframes tag-orbit-counter{to{transform:translate(-50%,-50%) rotate(-360deg)}}
        @keyframes portrait-breathe{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-5px) scale(1.008)}}
        @keyframes scan-pass{0%,18%{transform:translateY(-140%);opacity:0}30%{opacity:.45}60%{opacity:.15}72%,100%{transform:translateY(520%);opacity:0}}
        @keyframes chip-drift{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes chip-float{0%,100%{transform:translate3d(0,0,0) rotate(var(--rotate))}50%{transform:translate3d(var(--dx),var(--dy),0) rotate(calc(var(--rotate) + 4deg))}}
        @keyframes ambient-drift{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(24px,-20px,0) scale(1.08)}}
        @keyframes trace-drift{0%,100%{transform:rotate(var(--rotate)) translateX(0);opacity:.2}50%{transform:rotate(var(--rotate)) translateX(24px);opacity:.48}}
        @keyframes signal-run{0%{left:0;opacity:0}12%{opacity:1}82%{opacity:1}100%{left:100%;opacity:0}}
        @keyframes grid-current{to{background-position:56px 28px}}
        @media(prefers-reduced-motion:reduce){
          .hero-orbit,.hero-portrait-stage,.hero-scan,.motion-chip,.motion-symbol,.signal-trace,.signal-trace::before,.modern-section::after,.section-orb{animation:none!important}
          .hero-tag-orbit{display:none!important}
        }
        .tag{display:inline-block;font-size:11px;font-weight:600;padding:4px 10px;border-radius:99px;margin:3px 3px 3px 0;letter-spacing:.02em;border:1px solid rgba(139,92,246,.22);background:rgba(139,92,246,.08);color:#c4b5fd;transition:all .2s;cursor:default}
        .tag:hover{background:rgba(139,92,246,.16);border-color:rgba(167,139,250,.38);color:#ddd6fe}
        .btn-primary{display:inline-flex;align-items:center;gap:7px;padding:13px 26px;border-radius:9px;background:linear-gradient(135deg,#6D28D9,#9333EA);color:#fff;font-size:14px;font-weight:600;text-decoration:none;border:none;cursor:pointer;transition:all .2s;letter-spacing:.02em;box-shadow:0 4px 24px rgba(109,40,217,.4)}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(109,40,217,.55)}
        .btn-outline{display:inline-flex;align-items:center;gap:7px;padding:12px 24px;border-radius:9px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:all .2s;letter-spacing:.02em}
        .btn-outline:hover{transform:translateY(-1px)}
        .hero-action{position:relative;overflow:hidden;border:1px solid rgba(192,132,252,.3)!important;background:rgba(109,40,217,.11)!important;color:#e9d5ff!important;backdrop-filter:blur(14px);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 8px 25px rgba(0,0,0,.12)}
        .hero-action::before{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 20%,rgba(255,255,255,.08),transparent 80%);transform:translateX(-120%);transition:transform .45s ease}
        .hero-action:hover{transform:translateY(-3px);border-color:rgba(192,132,252,.58)!important;background:rgba(109,40,217,.2)!important;box-shadow:0 12px 34px rgba(109,40,217,.22),inset 0 1px 0 rgba(255,255,255,.1)}
        .hero-action:hover::before{transform:translateX(120%)}
        .hero-action-icon{width:22px;height:22px;display:grid;place-items:center;border-radius:7px;background:rgba(192,132,252,.14);border:1px solid rgba(192,132,252,.18);font-size:10px;color:#d8b4fe}
        .nav-rail{padding:4px;border:1px solid rgba(167,139,250,.14);border-radius:12px;background:rgba(109,40,217,.07);box-shadow:inset 0 1px 0 rgba(255,255,255,.035),0 8px 28px rgba(0,0,0,.08);backdrop-filter:blur(14px)}
        .nav-item{position:relative;border:1px solid transparent;cursor:pointer;padding:7px 12px;border-radius:8px;font-size:12px;font-weight:600;transition:background .2s,border-color .2s,color .2s,transform .2s}
        .nav-item:hover{transform:translateY(-1px);background:rgba(139,92,246,.12)!important;border-color:rgba(167,139,250,.18)!important;color:#d8b4fe!important}
        .hero-tag-orbit{position:absolute;z-index:4;width:450px;height:450px;left:50%;top:48%;margin-left:-225px;margin-top:-225px;border-radius:50%;animation:tag-orbit 216s linear infinite;pointer-events:none}
        .hero-floating-tag{position:absolute;left:50%;top:0;transform:translate(-50%,-50%);display:flex;align-items:center;gap:7px;border-radius:99px;padding:7px 12px 7px 8px;font-size:10px;font-weight:600;white-space:nowrap;backdrop-filter:blur(16px);animation:tag-orbit-counter 216s linear infinite}
        .section-label{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#9333EA;margin-bottom:.5rem;display:flex;align-items:center;gap:8px}
        .section-label::before{content:'';display:block;width:7px;height:7px;background:#9333EA;border-radius:50%;box-shadow:0 0 0 5px rgba(147,51,234,.12),0 0 18px rgba(147,51,234,.55)}
        .section-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.1rem,4vw,3.15rem);font-weight:700;letter-spacing:-.045em;line-height:1.05;margin-bottom:1rem}
        .modern-section{position:relative;isolation:isolate;overflow:hidden}
        .modern-section>.wrap{position:relative;z-index:2}
        .modern-section::after{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(192,132,252,.11) 1px,transparent 1px);background-size:28px 28px;opacity:.35;-webkit-mask-image:linear-gradient(to bottom,transparent,black 22%,black 78%,transparent);mask-image:linear-gradient(to bottom,transparent,black 22%,black 78%,transparent);animation:grid-current 18s linear infinite}
        .section-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(8px);z-index:0;animation:ambient-drift 18s ease-in-out infinite}
        .section-motion{position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden}
        .motion-chip{position:absolute;left:var(--x);top:var(--y);width:var(--chip-width);height:var(--chip-height);display:grid;place-items:center;border-radius:7px;border:1px solid rgba(167,139,250,.24);background:linear-gradient(145deg,rgba(109,40,217,.1),rgba(17,13,28,.04));box-shadow:inset 0 0 0 3px rgba(167,139,250,.025),0 0 28px rgba(109,40,217,.08);opacity:.46;animation:chip-float var(--duration) ease-in-out var(--delay) infinite}
        .motion-chip::before,.motion-chip::after{content:'';position:absolute;left:-7px;right:-7px;height:5px;background:repeating-linear-gradient(90deg,transparent 0 7px,rgba(192,132,252,.35) 7px 10px,transparent 10px 15px)}
        .motion-chip::before{top:-5px}
        .motion-chip::after{bottom:-5px}
        .motion-chip>span{font-family:'JetBrains Mono',monospace;font-size:7px;font-weight:600;letter-spacing:.12em;color:rgba(196,181,253,.55)}
        .motion-chip>span::before,.motion-chip>span::after{content:'';position:absolute;top:7px;bottom:7px;width:5px;background:repeating-linear-gradient(180deg,transparent 0 6px,rgba(192,132,252,.32) 6px 9px,transparent 9px 14px)}
        .motion-chip>span::before{left:-5px}
        .motion-chip>span::after{right:-5px}
        .motion-1 .motion-chip,.motion-4 .motion-chip{border-color:rgba(219,39,119,.2);filter:hue-rotate(16deg)}
        .motion-2 .motion-chip,.motion-5 .motion-chip{filter:hue-rotate(-15deg)}
        .motion-symbol{position:absolute;left:var(--x);top:var(--y);width:var(--symbol-width);color:rgba(196,181,253,.42);opacity:.48;filter:drop-shadow(0 0 8px rgba(139,92,246,.25));animation:chip-float var(--duration) ease-in-out var(--delay) infinite}
        .motion-symbol svg{display:block;width:100%;height:auto;overflow:visible}
        .motion-symbol::after{content:'';position:absolute;inset:-8px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.08),transparent 68%);opacity:.6}
        .motion-1 .motion-symbol,.motion-4 .motion-symbol{color:rgba(244,114,182,.34)}
        .motion-2 .motion-symbol,.motion-5 .motion-symbol{color:rgba(125,211,252,.32)}
        .signal-trace{position:absolute;left:var(--x);top:var(--y);width:var(--width);height:1px;background:linear-gradient(90deg,transparent,rgba(109,40,217,.08) 8%,rgba(192,132,252,.38) 50%,rgba(219,39,119,.12) 88%,transparent);opacity:.4;transform-origin:left center;animation:trace-drift var(--duration) ease-in-out var(--delay) infinite}
        .signal-trace::after{content:'';position:absolute;left:18%;top:-13px;width:1px;height:26px;background:linear-gradient(transparent,rgba(192,132,252,.3),transparent);box-shadow:84px 7px 0 rgba(147,51,234,.18),168px -5px 0 rgba(219,39,119,.14)}
        .signal-trace::before{content:'';position:absolute;left:0;top:-3px;width:7px;height:7px;border-radius:50%;background:#c084fc;box-shadow:0 0 8px #9333EA,0 0 20px rgba(147,51,234,.8);animation:signal-run var(--duration) linear var(--delay) infinite}
        .glass-panel{position:relative;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.04)}
        .glass-panel::before{content:'';position:absolute;inset:0 0 auto;height:1px;background:linear-gradient(90deg,transparent,rgba(192,132,252,.65),transparent);opacity:.65}
        .card-h{position:relative;overflow:hidden;transition:border-color .25s,transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s}
        .card-h::after{content:'';position:absolute;width:140px;height:140px;right:-90px;top:-90px;border-radius:50%;background:rgba(147,51,234,.12);filter:blur(8px);transition:transform .4s ease,opacity .3s;opacity:.45;pointer-events:none}
        .card-h:hover{border-color:rgba(109,40,217,.45)!important;transform:translateY(-6px);box-shadow:0 22px 60px rgba(44,18,75,.2)!important}
        .card-h:hover::after{transform:scale(1.45);opacity:.8}
        .about-facts{grid-template-columns:1fr 1fr}
        .fact-card{min-height:134px}
        .fact-card:last-child{grid-column:span 2;min-height:112px}
        .fact-card .fact-icon{transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s}
        .fact-card:hover .fact-icon{transform:translateY(-2px);box-shadow:0 12px 30px var(--fact-glow)}
        .skill-card{min-height:200px}
        .skill-card::before{content:'';position:absolute;left:1.5rem;right:1.5rem;top:0;height:1px;background:linear-gradient(90deg,transparent,#8b5cf6,transparent);opacity:.7}
        .project-card{transform-style:preserve-3d}
        .project-card:hover .project-image{transform:scale(1.06)}
        .achievement-card{min-height:112px}
        .contact-link:hover .contact-arrow{transform:translateX(4px);color:#c084fc!important}
        .experience-list{position:relative}
        .experience-list::before{content:'';position:absolute;top:1.5rem;bottom:1.5rem;left:8px;width:1px;background:linear-gradient(to bottom,#9333EA,rgba(147,51,234,.15))}
        .experience-item{position:relative;padding-left:2.5rem}
        .experience-dot{position:absolute;left:0;top:2rem;width:17px;height:17px;border-radius:50%;background:#110d1c;border:4px solid #9333EA;box-shadow:0 0 0 6px rgba(147,51,234,.12),0 0 24px rgba(147,51,234,.45)}
        .experience-card{transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
        .experience-card:hover{transform:translateX(5px);border-color:rgba(147,51,234,.42)!important;box-shadow:0 20px 55px rgba(44,18,75,.18)}
        input,textarea{font-family:inherit}
        input:focus,textarea:focus{outline:none;border-color:#6D28D9!important;box-shadow:0 0 0 3px rgba(109,40,217,.15)}
        input::placeholder,textarea::placeholder{color:#73618e}
      `}</style>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,.88)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",cursor:"zoom-out" }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth:"860px",width:"100%",borderRadius:"18px",overflow:"hidden",border:"1px solid rgba(109,40,217,.4)",boxShadow:"0 0 80px rgba(109,40,217,.35)" }}>
            <img src={lightbox} alt="preview" style={{ width:"100%",display:"block" }} />
          </div>
          <button onClick={() => setLightbox(null)} style={{ position:"fixed",top:"1.5rem",right:"1.5rem",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",borderRadius:"50%",width:"42px",height:"42px",fontSize:"18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
        </div>
      )}

      {/* ── NAV ── */}
      <header style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,background:scrolled?(D?"rgba(13,8,21,.93)":"rgba(250,250,250,.93)"):"transparent",borderBottom:scrolled?`1px solid ${border}`:"1px solid transparent",backdropFilter:scrolled?"blur(20px)":"none",transition:"all .3s ease" }}>
        <div className="wrap" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",height:"66px" }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"17px",letterSpacing:"-.02em" }}>
            <span style={{ background:"linear-gradient(135deg,#6D28D9,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{person.fullName[0]}</span>
            <span style={{ color:text }}>{person.fullName.slice(1)}</span>
            <span style={{ color:text3,fontWeight:400,fontSize:"13px",marginLeft:"6px" }}>({person.nickname})</span>
          </div>
          <nav className="nav-links nav-rail" style={{ display:"flex",gap:"2px" }}>
            {navigation.map(l => (
              <button className="nav-item" key={l} onClick={() => go(l)} style={{ background:active===l?"linear-gradient(135deg,rgba(109,40,217,.28),rgba(147,51,234,.17))":"rgba(255,255,255,.015)",borderColor:active===l?"rgba(192,132,252,.32)":"transparent",color:active===l?"#e9d5ff":text2,boxShadow:active===l?"0 5px 18px rgba(109,40,217,.18),inset 0 1px 0 rgba(255,255,255,.06)":"none" }}>{l}</button>
            ))}
          </nav>
          <div style={{ display:"flex",gap:"8px",alignItems:"center" }}>
            <button onClick={() => setDark(!D)} style={{ background:card,border:`1px solid ${border}`,borderRadius:"8px",padding:"7px 12px",cursor:"pointer",color:text2,fontSize:"16px",transition:"all .2s" }}>{D?"☀️":"🌙"}</button>
            <a href={person.cv} download className="btn-primary" style={{ padding:"8px 18px",fontSize:"13px" }}>Download CV ↓</a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="Home" style={{ minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"66px" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:`linear-gradient(${border} 1px,transparent 1px),linear-gradient(90deg,${border} 1px,transparent 1px)`,backgroundSize:"60px 60px",pointerEvents:"none" }} />
        <div style={{ position:"absolute",top:"10%",left:"-10%",width:"700px",height:"700px",borderRadius:"50%",background:"radial-gradient(circle,rgba(109,40,217,.14) 0%,transparent 70%)",pointerEvents:"none",animation:"glow 5s ease-in-out infinite" }} />
        <div style={{ position:"absolute",bottom:"0",right:"-5%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(219,39,119,.09) 0%,transparent 70%)",pointerEvents:"none",animation:"glow 7s ease-in-out infinite 2s" }} />

        <div className="wrap hero-grid" style={{ width:"100%",paddingTop:"3rem",paddingBottom:"5rem",display:"grid",gridTemplateColumns:"1fr 420px",gap:"4rem",alignItems:"center" }}>
          {/* Left */}
          <div>
            <Fade>
              <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"6px 16px",borderRadius:"100px",border:"1px solid rgba(109,40,217,.35)",background:"rgba(109,40,217,.1)",marginBottom:"2rem" }}>
                <div style={{ position:"relative",width:"8px",height:"8px",flexShrink:0 }}>
                  <div style={{ position:"absolute",inset:0,borderRadius:"50%",background:"#22c55e",animation:"pulse-ring 1.5s ease-out infinite" }} />
                  <div style={{ position:"absolute",inset:0,borderRadius:"50%",background:"#22c55e" }} />
                </div>
                <span style={{ fontSize:"12px",fontWeight:600,color:"#c084fc",letterSpacing:".04em" }}>{person.availability} · {person.location}</span>
              </div>
            </Fade>

            <Fade delay={0.05}>
              <h1 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(2.6rem,5.5vw,4.5rem)",fontWeight:700,letterSpacing:"-.04em",lineHeight:1.0,color:text,marginBottom:"0.6rem" }}>
                {person.fullName}
              </h1>
              <h1 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(2.6rem,5.5vw,4.5rem)",fontWeight:700,letterSpacing:"-.04em",lineHeight:1.0,background:"linear-gradient(135deg,#6D28D9 0%,#9333EA 40%,#db2777 100%)",backgroundSize:"200% 200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"gradient-shift 4s ease infinite",marginBottom:"1.5rem" }}>
                ({person.nickname})
              </h1>
            </Fade>

            <Fade delay={0.1}>
              <div style={{ fontSize:"1.2rem",fontWeight:600,marginBottom:"1.5rem",minHeight:"2rem",display:"flex",alignItems:"center",gap:"4px" }}>
                <span style={{ color:"#c084fc" }}>{typed}</span>
                <span style={{ animation:"blink 1s infinite",color:"#9333EA",fontWeight:300 }}>|</span>
              </div>
            </Fade>

            <Fade delay={0.13}>
              <p style={{ fontSize:"15px",color:text2,lineHeight:1.85,maxWidth:"520px",marginBottom:"2.5rem" }}>
                {person.introduction}
              </p>
            </Fade>

            <Fade delay={0.17}>
              <div style={{ display:"flex",flexWrap:"wrap",gap:".875rem" }}>
                <button className="btn-primary" onClick={() => go("Projects")}>View Projects →</button>
                <button className="btn-outline hero-action" onClick={() => go("Contact")}><span className="hero-action-icon">✉</span>Contact Me</button>
                {socialLinks.filter(link => link.label !== "Email").map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="btn-outline hero-action"><span className="hero-action-icon">{link.label === "LinkedIn" ? "in" : "<>"}</span>{link.label} ↗</a>
                ))}
              </div>
            </Fade>
          </div>

          {/* Photo */}
          <div className="hero-photo" style={{ position:"relative",minHeight:"570px",isolation:"isolate" }}>
            <div className="hero-portrait-stage" style={{ position:"absolute",inset:"-2.5rem -4rem -2rem",animation:"portrait-breathe 8s ease-in-out infinite" }}>
              <div style={{ position:"absolute",inset:"10% 2% 0",borderRadius:"50%",background:D?"radial-gradient(circle,rgba(147,51,234,.3),rgba(109,40,217,.1) 48%,transparent 72%)":"radial-gradient(circle,rgba(147,51,234,.18),rgba(109,40,217,.06) 48%,transparent 72%)",filter:"blur(18px)" }} />
              {[0, 1, 2].map(ring => (
                <div className="hero-orbit" key={ring} style={{ position:"absolute",width:`${66 + ring * 17}%`,aspectRatio:"1",left:`${17 - ring * 8.5}%`,top:`${21 - ring * 6}%`,borderRadius:"50%",border:`1px solid rgba(192,132,252,${.2 - ring * .045})`,clipPath:ring === 1 ? "polygon(0 0,100% 0,100% 62%,0 62%)" : "none",animation:`${ring % 2 ? "orbit-spin-reverse" : "orbit-spin"} ${28 + ring * 14}s linear infinite` }}>
                  <span style={{ position:"absolute",width:ring === 0?"7px":"5px",height:ring === 0?"7px":"5px",borderRadius:"50%",top:ring === 2?"52%":"8%",right:ring === 2?"-2px":"18%",background:ring === 1?"#db2777":"#c084fc",boxShadow:`0 0 14px ${ring === 1 ? "#db2777" : "#9333EA"}` }} />
                </div>
              ))}
              <div className="hero-orbit" style={{ position:"absolute",width:"76%",aspectRatio:"1",left:"12%",top:"18%",borderRadius:"50%",background:"conic-gradient(from 90deg,transparent 0 74%,rgba(192,132,252,.7) 82%,transparent 91%)",WebkitMask:"radial-gradient(farthest-side,transparent calc(100% - 2px),#000 0)",mask:"radial-gradient(farthest-side,transparent calc(100% - 2px),#000 0)",animation:"orbit-spin 18s linear infinite" }} />
              <div style={{ position:"absolute",inset:"0 5%",backgroundImage:"radial-gradient(rgba(192,132,252,.35) 1px,transparent 1px)",backgroundSize:"22px 22px",opacity:.18,WebkitMaskImage:"radial-gradient(circle,black,transparent 68%)",maskImage:"radial-gradient(circle,black,transparent 68%)" }} />
              <div style={{ position:"absolute",inset:"0",WebkitMaskImage:"radial-gradient(ellipse 58% 72% at 50% 47%,black 38%,rgba(0,0,0,.88) 52%,rgba(0,0,0,.42) 66%,transparent 82%)",maskImage:"radial-gradient(ellipse 58% 72% at 50% 47%,black 38%,rgba(0,0,0,.88) 52%,rgba(0,0,0,.42) 66%,transparent 82%)" }}>
                <img src={person.photo} alt={`${person.fullName}, ${person.role}`} decoding="async" fetchPriority="high" style={{ width:"100%",height:"100%",display:"block",objectFit:"contain",objectPosition:"center",filter:D?"saturate(.82) contrast(1.1) brightness(.88)":"saturate(.88) contrast(1.06) brightness(1.01)" }} />
                <div style={{ position:"absolute",inset:"12% 15% 10%",borderRadius:"50%",background:"linear-gradient(135deg,rgba(109,40,217,.3),transparent 48%,rgba(219,39,119,.12))",mixBlendMode:"color",pointerEvents:"none",filter:"blur(18px)" }} />
                <div style={{ position:"absolute",inset:0,background:D?"radial-gradient(ellipse 55% 70% at 50% 46%,transparent 32%,rgba(13,8,21,.18) 53%,rgba(13,8,21,.72) 72%,#0D0815 100%)":"radial-gradient(ellipse 55% 70% at 50% 46%,transparent 32%,rgba(250,250,250,.14) 53%,rgba(250,250,250,.7) 72%,#fafafa 100%)",pointerEvents:"none" }} />
                <div className="hero-scan" style={{ position:"absolute",left:"20%",right:"20%",top:"17%",height:"15%",borderRadius:"50%",background:"linear-gradient(to bottom,transparent,rgba(192,132,252,.22),transparent)",filter:"blur(8px)",mixBlendMode:"screen",animation:"scan-pass 7s ease-in-out infinite",pointerEvents:"none" }} />
              </div>
            </div>
            <div className="hero-status" style={{ position:"absolute",zIndex:3,right:"-8px",bottom:"54px",display:"flex",alignItems:"center",gap:"8px",padding:"7px 11px",borderRadius:"99px",background:D?"rgba(17,13,28,.72)":"rgba(255,255,255,.75)",border:"1px solid rgba(192,132,252,.22)",backdropFilter:"blur(16px)",boxShadow:"0 10px 35px rgba(0,0,0,.16)",fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",fontWeight:500,color:text2,letterSpacing:".08em",textTransform:"uppercase" }}>
              <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 10px #22c55e" }} />
              Systems online
            </div>
            {/* Orbiting skill labels */}
            {hero.floatingTags.map(({ text: tagText }, index) => (
              <div className="hero-tag-orbit" key={tagText} style={{ animationDelay:`-${index * 72}s` }}>
                <div className="hero-floating-tag" style={{ background:D?"rgba(17,13,28,.74)":"rgba(255,255,255,.82)",border:"1px solid rgba(192,132,252,.28)",color:text2,boxShadow:"0 10px 35px rgba(0,0,0,.16)",animationDelay:`-${index * 72}s` }}>
                  <span style={{ display:"grid",placeItems:"center",width:"19px",height:"19px",borderRadius:"50%",background:"linear-gradient(135deg,#6D28D9,#db2777)",color:"#fff",fontFamily:"'JetBrains Mono',monospace",fontSize:"7px" }}>0{index + 1}</span>
                  {tagText}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="About" className="modern-section" style={{ padding:"7.5rem 0",background:bg2,borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}` }}>
        <SectionMotion variant={0} />
        <div className="section-orb" style={{ width:"420px",height:"420px",left:"-220px",top:"5%",background:"radial-gradient(circle,rgba(109,40,217,.16),transparent 68%)" }} />
        <div className="wrap">
          <div className="about-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center" }}>
            <Fade>
              <div className="glass-panel" style={{ padding:"2.25rem",borderRadius:"24px",background:D?"linear-gradient(145deg,rgba(28,20,43,.96),rgba(18,13,29,.96))":"linear-gradient(145deg,#ffffff,#f8f5ff)",border:D?"1px solid rgba(167,139,250,.14)":"1px solid rgba(109,40,217,.1)",boxShadow:D?"0 28px 80px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.04)":"0 28px 80px rgba(75,45,120,.1),inset 0 1px 0 #fff" }}>
                <div className="section-label">{about.label}</div>
                <h2 className="section-title">{about.title}<br /><span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{about.highlightedTitle}</span></h2>
                {about.paragraphs.map((paragraph, index) => (
                  <p key={paragraph} style={{ color:text2,fontSize:"15px",lineHeight:1.9,marginBottom:index === about.paragraphs.length - 1 ? "2rem" : "1.25rem" }}>{paragraph}</p>
                ))}
                <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
                  {about.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </Fade>
            <Fade delay={0.1}>
              <div className="about-facts" style={{ display:"grid",gap:"1rem" }}>
                {about.facts.map(({ icon, title, subtitle }, index) => (
                  <div
                    key={title}
                    className="card-h fact-card"
                    style={{
                      "--fact-glow": "rgba(139,92,246,.22)",
                      background:D?"linear-gradient(145deg,rgba(30,22,46,.96),rgba(19,14,30,.96))":"linear-gradient(145deg,#fff,#faf8ff)",
                      border:D?"1px solid rgba(167,139,250,.13)":"1px solid rgba(109,40,217,.1)",
                      borderRadius:"18px",
                      padding:"1.35rem",
                      textAlign:"left",
                      display:"flex",
                      alignItems:"center",
                      gap:"13px",
                      boxShadow:D?"0 16px 42px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.035)":"0 16px 42px rgba(75,45,120,.08),inset 0 1px 0 #fff",
                    }}
                  >
                    <div className="fact-icon" style={{ width:"48px",height:"48px",borderRadius:"14px",display:"grid",placeItems:"center",fontSize:"1.3rem",flexShrink:0,background:D?"linear-gradient(145deg,rgba(139,92,246,.18),rgba(139,92,246,.07))":"linear-gradient(145deg,#f0e9ff,#faf7ff)",border:D?"1px solid rgba(167,139,250,.2)":"1px solid rgba(109,40,217,.12)",boxShadow:"0 8px 22px rgba(0,0,0,.08)" }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"14px",color:text,marginBottom:"5px",letterSpacing:"-.01em" }}>{title}</div>
                      <div style={{ fontSize:"11.5px",color:text3,lineHeight:1.5 }}>{subtitle}</div>
                    </div>
                    <span style={{ position:"absolute",right:"13px",top:"13px",width:"5px",height:"5px",borderRadius:"50%",background:"#8b5cf6",boxShadow:"0 0 10px rgba(139,92,246,.8)" }} />
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" className="modern-section" style={{ padding:"7.5rem 0",borderBottom:`1px solid ${border}` }}>
        <SectionMotion variant={1} />
        <div className="section-orb" style={{ width:"500px",height:"500px",right:"-280px",top:"8%",background:"radial-gradient(circle,rgba(219,39,119,.11),transparent 68%)" }} />
        <div className="wrap">
          <Fade>
            <div className="section-label">{skillsSection.label}</div>
            <h2 className="section-title">{skillsSection.title} <span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{skillsSection.highlightedTitle}</span></h2>
            <p style={{ color:text2,fontSize:"15px",maxWidth:"500px",lineHeight:1.7,marginBottom:"3rem" }}>{skillsSection.description}</p>
          </Fade>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:"1.25rem" }}>
            {skills.map((s, i) => (
              <Fade key={s.category} delay={i * 0.06}>
                <div className="card-h skill-card" style={{ background:D?"linear-gradient(145deg,rgba(29,21,44,.97),rgba(18,13,29,.97))":"linear-gradient(145deg,#fff,#faf8ff)",border:D?"1px solid rgba(167,139,250,.13)":"1px solid rgba(109,40,217,.1)",borderRadius:"20px",padding:"1.65rem",boxShadow:D?"0 18px 48px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.035)":"0 18px 48px rgba(75,45,120,.08),inset 0 1px 0 #fff" }}>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px",marginBottom:"1.35rem" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:"11px" }}>
                      <div style={{ width:"46px",height:"46px",borderRadius:"14px",background:D?"linear-gradient(145deg,rgba(139,92,246,.2),rgba(139,92,246,.07))":"linear-gradient(145deg,#eee7ff,#faf7ff)",border:D?"1px solid rgba(167,139,250,.22)":"1px solid rgba(109,40,217,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",boxShadow:"0 10px 28px rgba(109,40,217,.1)" }}>{s.icon}</div>
                      <div style={{ fontWeight:700,fontSize:"14px",color:text,lineHeight:1.35 }}>{s.category}</div>
                    </div>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:text3 }}>0{i + 1}</span>
                  </div>
                  <div style={{ display:"flex",flexWrap:"wrap" }}>
                    {s.items.map(item => <span key={item} className="tag">{item}</span>)}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="Projects" className="modern-section" style={{ padding:"7.5rem 0",background:bg2,borderBottom:`1px solid ${border}` }}>
        <SectionMotion variant={2} />
        <div className="section-orb" style={{ width:"540px",height:"540px",left:"-300px",bottom:"5%",background:"radial-gradient(circle,rgba(109,40,217,.14),transparent 68%)" }} />
        <div className="wrap">
          <Fade>
            <div className="section-label">{projectsSection.label}</div>
            <h2 className="section-title">{projectsSection.title} <span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{projectsSection.highlightedTitle}</span></h2>
            <p style={{ color:text2,fontSize:"15px",maxWidth:"500px",lineHeight:1.7,marginBottom:"3rem" }}>{projectsSection.description}</p>
          </Fade>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1.5rem" }}>
            {projects.map((p, i) => (
              <Fade key={p.title} delay={i * 0.07}>
                <div className="card-h project-card" style={{ background:D?"linear-gradient(145deg,rgba(255,255,255,.045),rgba(109,40,217,.025))":"linear-gradient(145deg,#fff,rgba(109,40,217,.025))",border:`1px solid ${border}`,borderRadius:"22px",overflow:"hidden",boxShadow:"0 18px 50px rgba(0,0,0,.09)" }}>
                  {/* Banner */}
                  <div style={{ position:"relative",height:"215px",overflow:"hidden",cursor:"zoom-in" }} onClick={() => setLightbox(p.image)}>
                    <img className="project-image" src={p.image} alt={p.title} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform .6s cubic-bezier(.16,1,.3,1)" }} />
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,8,21,.92) 0%,rgba(13,8,21,.12) 65%,transparent 100%)" }} />
                    <div style={{ position:"absolute",top:"14px",left:"14px",display:"flex",alignItems:"center",gap:"7px",background:"rgba(13,8,21,.55)",backdropFilter:"blur(14px)",border:"1px solid rgba(255,255,255,.12)",borderRadius:"99px",padding:"5px 10px",fontSize:"9.5px",fontWeight:700,color:"#fff",letterSpacing:".08em" }}><span style={{ width:"6px",height:"6px",borderRadius:"50%",background:p.color,boxShadow:`0 0 10px ${p.color}` }} />PROJECT {String(i + 1).padStart(2, "0")}</div>
                    <div style={{ position:"absolute",top:"14px",right:"14px",width:"32px",height:"32px",display:"grid",placeItems:"center",background:"rgba(13,8,21,.5)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.12)",borderRadius:"50%",fontSize:"12px",color:"#fff" }}>↗</div>
                    <div style={{ position:"absolute",bottom:"16px",left:"18px",right:"18px" }}>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"17px",color:"#fff",marginBottom:"4px",textShadow:"0 1px 8px rgba(0,0,0,.8)" }}>{p.title}</div>
                      <div style={{ fontSize:"9.5px",color:"#d8b4fe",fontWeight:600,textTransform:"uppercase",letterSpacing:".1em" }}>{p.subtitle}</div>
                    </div>
                  </div>
                  {/* Body */}
                  <div style={{ padding:"1.4rem 1.5rem 1.6rem" }}>
                    <p style={{ fontSize:"13px",color:text2,lineHeight:1.8,marginBottom:"1rem" }}>{p.description}</p>
                    <div style={{ display:"flex",flexWrap:"wrap" }}>
                      {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="Experience" className="modern-section" style={{ padding:"7.5rem 0",borderBottom:`1px solid ${border}` }}>
        <SectionMotion variant={3} />
        <div className="section-orb" style={{ width:"480px",height:"480px",right:"-260px",top:"18%",background:"radial-gradient(circle,rgba(147,51,234,.11),transparent 68%)" }} />
        <div className="wrap">
          <Fade>
            <div className="section-label">Career history</div>
            <h2 className="section-title">Work <span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Experience</span></h2>
          </Fade>
          <div className="experience-list" style={{ marginTop:"3rem" }}>
            {experience.map((e, i) => (
              <Fade key={`${e.company}-${e.period}`} delay={i * 0.06}>
                <div className="experience-item" style={{ paddingBottom:"1.25rem" }}>
                  <span className="experience-dot" style={{ background:D?"#110d1c":"#fafafa" }} />
                  <div className="experience-card glass-panel" style={{ background:`linear-gradient(135deg,${card},${D?"rgba(109,40,217,.045)":"rgba(109,40,217,.025)"})`,border:`1px solid ${border}`,borderRadius:"20px",padding:"1.75rem 2rem",boxShadow:"0 18px 55px rgba(0,0,0,.08)" }}>
                    <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap",marginBottom:"1.15rem" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:"12px" }}>
                        <div style={{ width:"64px",height:"64px",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0,background:D?"#fff":"#fff",border:"1px solid rgba(192,132,252,.3)",boxShadow:"0 8px 24px rgba(0,0,0,.13)",fontFamily:"'Space Grotesk',sans-serif",fontSize:"15px",fontWeight:700,color:"#7C3AED",letterSpacing:".04em" }}>
                          {e.companyIcon?.startsWith("/") ? (
                            <img src={e.companyIcon} alt={`${e.company} logo`} style={{ width:"100%",height:"100%",objectFit:"contain",padding:"5px" }} />
                          ) : (
                            e.companyIcon || e.company.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize:"11px",color:"#c084fc",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:"7px" }}>{e.company}</div>
                          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"18px",color:text,letterSpacing:"-.02em" }}>{e.role}</div>
                        </div>
                      </div>
                      <div style={{ display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap" }}>
                        {e.current && <span style={{ padding:"4px 9px",borderRadius:"99px",background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.3)",fontSize:"9.5px",fontWeight:700,color:"#22c55e",letterSpacing:".08em",textTransform:"uppercase" }}>Current</span>}
                        <span style={{ padding:"5px 10px",borderRadius:"7px",background:"rgba(109,40,217,.1)",border:"1px solid rgba(109,40,217,.18)",fontSize:"10.5px",color:text2,fontWeight:600,fontFamily:"'JetBrains Mono',monospace" }}>{e.period}</span>
                      </div>
                    </div>
                    <div style={{ fontSize:"11.5px",color:text3,marginBottom:"1rem" }}>📍 {e.location}</div>
                    <div style={{ display:"grid",gap:"8px" }}>
                      {e.points.map(pt => (
                        <div key={pt} style={{ display:"grid",gridTemplateColumns:"8px 1fr",gap:"10px",alignItems:"start",fontSize:"13px",color:text2,lineHeight:1.7 }}>
                          <span style={{ width:"5px",height:"5px",borderRadius:"50%",background:"#9333EA",marginTop:"8px",boxShadow:"0 0 8px rgba(147,51,234,.7)" }} />{pt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="Achievements" className="modern-section" style={{ padding:"7.5rem 0",background:bg2,borderBottom:`1px solid ${border}` }}>
        <SectionMotion variant={4} />
        <div className="section-orb" style={{ width:"500px",height:"500px",left:"-270px",top:"10%",background:"radial-gradient(circle,rgba(219,39,119,.1),transparent 68%)" }} />
        <div className="wrap">
          <Fade>
            <div className="section-label">Recognition & credentials</div>
            <h2 className="section-title">Achievements &amp; <span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Certifications</span></h2>
          </Fade>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1rem",marginTop:"3rem",marginBottom:"3rem" }}>
            {achievements.map((a, i) => (
              <Fade key={a.title} delay={i * 0.06}>
                <div className="card-h achievement-card" style={{ background:D?"linear-gradient(145deg,rgba(255,255,255,.045),rgba(109,40,217,.02))":"linear-gradient(145deg,#fff,rgba(109,40,217,.025))",border:`1px solid ${border}`,borderRadius:"18px",padding:"1.45rem",display:"flex",gap:"1rem",alignItems:"center" }}>
                  <div style={{ width:"52px",height:"52px",borderRadius:"16px",background:`linear-gradient(135deg,${a.color}38,${a.color}10)`,border:`1px solid ${a.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.55rem",flexShrink:0,boxShadow:`0 10px 28px ${a.color}18` }}>{a.icon}</div>
                  <div>
                    <div style={{ fontWeight:600,fontSize:"14px",color:text,marginBottom:"4px" }}>{a.title}</div>
                    <div style={{ fontSize:"12.5px",color:a.color,fontWeight:500 }}>{a.subtitle}</div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.1}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"16px",color:text,marginBottom:"1.25rem" }}>Professional Certifications</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
              {certifications.map(c => (
                <div key={c.name} className="card-h" style={{ background:D?"linear-gradient(145deg,rgba(255,255,255,.045),rgba(109,40,217,.025))":"#fff",border:`1px solid ${border}`,borderRadius:"18px",padding:"1.35rem 1.75rem",display:"flex",alignItems:"center",gap:"1rem" }}>
                  <div style={{ width:"46px",height:"46px",borderRadius:"13px",background:"rgba(109,40,217,.12)",border:"1px solid rgba(109,40,217,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem" }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:"14px",color:text,marginBottom:"3px" }}>{c.name}</div>
                    <div style={{ fontSize:"12px",color:text3 }}>{c.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" className="modern-section" style={{ padding:"7.5rem 0" }}>
        <SectionMotion variant={5} />
        <div className="section-orb" style={{ width:"600px",height:"600px",right:"-320px",bottom:"-220px",background:"radial-gradient(circle,rgba(109,40,217,.15),transparent 68%)" }} />
        <div className="wrap">
          <div className="contact-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start" }}>
            <Fade>
              <div className="section-label">Get in touch</div>
              <h2 className="section-title">Let's build<br /><span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>something great.</span></h2>
              <p style={{ color:text2,fontSize:"15px",lineHeight:1.8,marginBottom:"2rem" }}>
                {contact.description}
              </p>
              <div style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
                {[
                  { icon:"✉️", ...socialLinks.find(link => link.label === "Email") },
                  { icon:"💼", ...socialLinks.find(link => link.label === "LinkedIn") },
                  { icon:"🐙", ...socialLinks.find(link => link.label === "GitHub") },
                  { icon:"📞", ...contact.phone },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="card-h contact-link" style={{ display:"flex",alignItems:"center",gap:"14px",padding:"1rem 1.15rem",background:D?"linear-gradient(145deg,rgba(255,255,255,.045),rgba(109,40,217,.025))":"#fff",border:`1px solid ${border}`,borderRadius:"16px",textDecoration:"none" }}>
                    <div style={{ width:"44px",height:"44px",borderRadius:"13px",background:"linear-gradient(135deg,rgba(109,40,217,.2),rgba(219,39,119,.08))",border:"1px solid rgba(109,40,217,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize:"11px",color:text3,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",marginBottom:"2px" }}>{label}</div>
                      <div style={{ fontSize:"13px",color:"#c084fc",fontWeight:500 }}>{value}</div>
                    </div>
                    <span className="contact-arrow" style={{ marginLeft:"auto",color:text3,transition:"transform .2s,color .2s" }}>↗</span>
                  </a>
                ))}
              </div>
            </Fade>

            <Fade delay={0.1}>
              <div className="glass-panel" style={{ background:D?"linear-gradient(145deg,rgba(255,255,255,.055),rgba(109,40,217,.035))":"linear-gradient(145deg,#fff,rgba(109,40,217,.03))",border:`1px solid ${border}`,borderRadius:"24px",padding:"2rem",boxShadow:"0 28px 80px rgba(0,0,0,.14)" }}>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",marginBottom:"1.75rem" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"19px",color:text }}>Send a message</div>
                  <span style={{ width:"34px",height:"34px",borderRadius:"50%",display:"grid",placeItems:"center",background:"rgba(109,40,217,.14)",border:"1px solid rgba(192,132,252,.2)",color:"#c084fc" }}>↗</span>
                </div>
                <form onSubmit={handleContactSubmit}>
                  {[
                    { name:"name", label:"Full Name", type:"text", ph:"Your name", required:true },
                    { name:"email", label:"Email Address", type:"email", ph:"your@email.com", required:true },
                    { name:"subject", label:"Subject", type:"text", ph:"Project inquiry, job opportunity..." },
                  ].map(({ name, label, type, ph, required }) => (
                    <div key={label} style={{ marginBottom:"1.25rem" }}>
                      <label htmlFor={`contact-${name}`} style={{ display:"block",fontSize:"12px",fontWeight:600,color:text2,marginBottom:"6px",letterSpacing:".04em",textTransform:"uppercase" }}>{label}</label>
                      <input id={`contact-${name}`} name={name} type={type} placeholder={ph} value={formData[name]} onChange={handleFormChange} required={required} style={{ width:"100%",padding:"13px 14px",background:D?"rgba(255,255,255,.04)":"rgba(109,40,217,.035)",border:`1px solid ${border}`,borderRadius:"12px",color:text,fontSize:"14px",transition:"border-color .2s,box-shadow .2s" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom:"1.5rem" }}>
                    <label htmlFor="contact-message" style={{ display:"block",fontSize:"12px",fontWeight:600,color:text2,marginBottom:"6px",letterSpacing:".04em",textTransform:"uppercase" }}>Message</label>
                    <textarea id="contact-message" name="message" placeholder="Tell me about your project..." rows={4} value={formData.message} onChange={handleFormChange} required style={{ width:"100%",padding:"13px 14px",background:D?"rgba(255,255,255,.04)":"rgba(109,40,217,.035)",border:`1px solid ${border}`,borderRadius:"12px",color:text,fontSize:"14px",resize:"vertical",transition:"border-color .2s,box-shadow .2s" }} />
                  </div>
                  <button type="submit" className="btn-primary" disabled={isSending} style={{ width:"100%",justifyContent:"center",opacity:isSending?.7:1,cursor:isSending?"not-allowed":"pointer" }}>{isSending ? "Sending..." : "Send Message ->"}</button>
                  {formStatus && <p role="status" style={{ marginTop:"12px",fontSize:"13px",lineHeight:1.6,color:"#c084fc",textAlign:"center" }}>{formStatus}</p>}
                </form>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${border}`,padding:"2.25rem 0",background:D?"linear-gradient(180deg,#110d1c,#0D0815)":"linear-gradient(180deg,#f3eeff,#fafafa)" }}>
        <div className="wrap" style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:".75rem" }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"15px",fontWeight:600,color:text }}>
            <span style={{ background:"linear-gradient(135deg,#6D28D9,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{person.firstName[0]}</span>{person.fullName.slice(1)} ({person.nickname})
          </div>
          <div style={{ display:"flex",gap:"1.5rem" }}>
            {socialLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize:"13px",color:text3,textDecoration:"none",fontWeight:500,transition:"color .15s" }}
                onMouseEnter={e => e.target.style.color="#c084fc"}
                onMouseLeave={e => e.target.style.color=text3}
              >{label}</a>
            ))}
          </div>
          <span style={{ fontSize:"12px",color:text3 }}>© {new Date().getFullYear()} · {person.location} · {person.education}</span>
        </div>
      </footer>
    </div>
  );
}
