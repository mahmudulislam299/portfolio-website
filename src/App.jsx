import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV = ["Home", "About", "Skills", "Projects", "Experience", "Achievements", "Contact"];

const TYPING_STRINGS = [
  "Embedded Systems Engineer",
  "Embedded Linux Developer",
  "IoT Product Builder",
  "Edge AI Engineer",
  "Firmware Architect",
  "PCB & Hardware Designer",
];

const SKILLS = [
  { cat: "Firmware Development", icon: "⚙️", items: ["C / C++", "FreeRTOS", "Device Drivers", "Embedded Architecture", "Real-time Control", "Bare-metal Programming"] },
  { cat: "Embedded Linux", icon: "🐧", items: ["Linux Kernel / BSP", "OpenWRT", "BusyBox", "Cross-compilation", "Shell Scripting", "Yocto / OE"] },
  { cat: "Networking & Comms", icon: "📡", items: ["TCP/IP", "MQTT / HTTP", "BLE / Wi-Fi", "GSM / LTE", "SRT / RTSP", "MIPI CSI-2"] },
  { cat: "Hardware & Interfaces", icon: "🔌", items: ["I2C / SPI / UART", "PCB Design (KiCad)", "Altium Designer", "Schematic Capture", "Li-ion BMS", "Power Electronics"] },
  { cat: "AI & Computer Vision", icon: "🤖", items: ["Edge AI", "NCNN Engine", "Human Detection", "MobileNet", "Camera Pipeline", "Video Analytics"] },
  { cat: "Cloud & IoT", icon: "☁️", items: ["Azure IoT Hub", "MQTT Broker", "OTA Firmware", "MongoDB", "Docker", "IoT Gateway"] },
];

const PROJECTS = [
  {
    num: "01", title: "Keo Cam — AI Body Camera", subtitle: "Embedded Linux · Edge AI · Cloud",
    desc: "Full-stack AI-enabled body camera on Ingenic T31 SoC. HEVC/H.265 encoding, RTSP/SRT live streaming, BLE provisioning, remote monitoring, and cloud connectivity.",
    tags: ["Ingenic T31", "HEVC/H.265", "RTSP/SRT", "BLE", "Edge AI", "Embedded Linux"], color: "#6D28D9",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  },
  {
    num: "02", title: "AI Human Detection Camera", subtitle: "Computer Vision · NCNN · Edge",
    desc: "Real-time human detection on embedded hardware using NCNN inference engine and MobileNet. Optimized for low-power edge deployment with full video analytics pipeline.",
    tags: ["NCNN", "MobileNet", "Computer Vision", "Edge AI", "Embedded Linux"], color: "#7C3AED",
    banner: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80",
  },
  {
    num: "03", title: "Remote Battery Monitoring", subtitle: "IoT · Telecom · GSM/4G",
    desc: "Monitors 48V Li-ion backup batteries at telecom towers — voltage, current, SOC, temperature — with GSM/4G remote data transmission and real-time alerting.",
    tags: ["GSM/4G", "Li-ion BMS", "IoT", "C Firmware", "Cloud"], color: "#9333EA",
    banner: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80",
  },
  {
    num: "04", title: "4G OpenWRT Cellular Router", subtitle: "OpenWRT · Networking · Embedded",
    desc: "OpenWRT-based cellular router with UART data ingestion, eMMC local storage, 4G/LTE uplink, and full technical documentation for engineering team handover.",
    tags: ["OpenWRT", "4G/LTE", "UART", "eMMC", "Networking"], color: "#a855f7",
    banner: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=80",
  },
  {
    num: "05", title: "VuAI Workplace AI Sensor", subtitle: "RTOS · OTA · Power Optimization",
    desc: "RTOS firmware optimization, power profiling, OTA firmware update via Linux-based IoT gateway. Production release for workplace AI sensing device.",
    tags: ["FreeRTOS", "Power Optimization", "OTA", "Linux Gateway"], color: "#c026d3",
    banner: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80",
  },
  {
    num: "06", title: "praniSheba IoT Base Station", subtitle: "TDM Sensor Network · KiCad PCB",
    desc: "Remote cowshed environment monitoring (NH3, CH4, temp, humidity). Custom TDM-based nRF sensor network with Wi-Fi and GSM uplink.",
    tags: ["nRF TDM", "Wi-Fi", "GSM", "KiCad PCB", "IoT"], color: "#db2777",
    banner: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80",
  },
];

const EXPERIENCE = [
  { role: "Embedded System Engineer", co: "Teton Electronics Ltd", loc: "Dhaka, Bangladesh", period: "Jul 2024 – Present", current: true,
    points: ["Firmware for smart camera & IoT products on Ingenic T31/T23 SoC with Embedded Linux", "IMX327/GC4653 sensor integration, MIPI CSI-2, HEVC/H.265 RTSP/SRT pipeline", "OTA firmware architecture, cross-team integration with HW & SW partners"] },
  { role: "Embedded Software Engineer", co: "ACluster LLC (Remote)", loc: "USA-based", period: "Apr 2024 – Jul 2024",
    points: ["TRIAC-based AC motor controller firmware with phase-angle speed control", "Driver-level support for managed Ethernet switch embedded systems"] },
  { role: "Embedded Software Engineer", co: "Binate Solutions (for Avuity LLC)", loc: "Dhaka, Bangladesh", period: "Jul 2023 – Mar 2024",
    points: ["Optimized VuAI workplace AI sensor: performance, memory, power on RTOS", "Resolved camera capture failure & production instability", "OTA firmware update via Linux-based IoT gateway"] },
  { role: "Embedded Project Consultant", co: "Tespack Ltd (Remote)", loc: "Helsinki, Finland", period: "Oct 2023 – Jan 2024",
    points: ["Led 4G cellular router development on OpenWRT", "UART pipeline, eMMC storage, cellular data transmission"] },
  { role: "Senior IoT Engineer", co: "adorsho praniSheba Ltd", loc: "Dhaka, Bangladesh", period: "Oct 2022 – Jun 2023",
    points: ["Led IoT team, authored PRDs and product roadmaps", "Hardware research, PCB layout (KiCad), firmware, end-to-end delivery"] },
  { role: "IoT Engineer", co: "adorsho praniSheba Ltd", loc: "Dhaka, Bangladesh", period: "Mar 2021 – Oct 2022",
    points: ["Multi-product IoT development: HW design, firmware, PCB", "Custom firmware libs: async GSM, TDM sensor network, flash handler", "Assembled and tested 40+ IoT devices; automated flashing via Bash"] },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "BASIS National ICT Award 2022", sub: "Winner — Industrial-Agriculture Category", color: "#6D28D9" },
  { icon: "🥇", title: "Inter University Project Competition", sub: "Champion — 2018", color: "#7C3AED" },
  { icon: "🌍", title: "International Client Projects", sub: "USA · Finland · Remote Engineering", color: "#9333EA" },
  { icon: "🤖", title: "40+ IoT Devices Deployed", sub: "From PCB design to production", color: "#a855f7" },
  { icon: "📄", title: "IEEE Publication", sub: "EEE ICECE 2020 — Signal Processing", color: "#c026d3" },
  { icon: "🎓", title: "BSc EEE — BUET", sub: "Bangladesh's top engineering university", color: "#db2777" },
];

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
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const typed = useTyping(TYPING_STRINGS);

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
      const ids = NAV.map(id => ({ id, top: document.getElementById(id)?.offsetTop ?? 0 }));
      const y = window.scrollY + 140;
      for (let i = ids.length - 1; i >= 0; i--) {
        if (ids[i].top <= y) { setActive(ids[i].id); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
          .hero-photo{display:none!important}
          .nav-links{display:none!important}
          .exp-grid{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .about-grid{grid-template-columns:1fr!important}
        }
        @media(max-width:600px){.wrap{padding:0 1.1rem}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes glow{0%,100%{opacity:.4}50%{opacity:.9}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(2);opacity:0}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .tag{display:inline-block;font-size:11px;font-weight:600;padding:3px 9px;border-radius:5px;margin:3px 3px 3px 0;letter-spacing:.02em;border:1px solid rgba(109,40,217,.3);background:rgba(109,40,217,.12);color:#c084fc;transition:all .2s;cursor:default}
        .tag:hover{background:rgba(109,40,217,.25);border-color:rgba(109,40,217,.5)}
        .btn-primary{display:inline-flex;align-items:center;gap:7px;padding:13px 26px;border-radius:9px;background:linear-gradient(135deg,#6D28D9,#9333EA);color:#fff;font-size:14px;font-weight:600;text-decoration:none;border:none;cursor:pointer;transition:all .2s;letter-spacing:.02em;box-shadow:0 4px 24px rgba(109,40,217,.4)}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(109,40,217,.55)}
        .btn-outline{display:inline-flex;align-items:center;gap:7px;padding:12px 24px;border-radius:9px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:all .2s;letter-spacing:.02em}
        .btn-outline:hover{transform:translateY(-1px)}
        .section-label{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#9333EA;margin-bottom:.5rem;display:flex;align-items:center;gap:8px}
        .section-label::before{content:'';display:block;width:24px;height:2px;background:linear-gradient(90deg,#6D28D9,#9333EA);border-radius:2px}
        .section-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.9rem,4vw,2.9rem);font-weight:700;letter-spacing:-.03em;line-height:1.1;margin-bottom:1rem}
        .card-h{transition:border-color .2s,transform .25s,box-shadow .25s}
        .card-h:hover{border-color:rgba(109,40,217,.45)!important;transform:translateY(-4px);box-shadow:0 16px 48px rgba(109,40,217,.18)!important}
        input,textarea{font-family:inherit}
        input:focus,textarea:focus{outline:none;border-color:#6D28D9!important;box-shadow:0 0 0 3px rgba(109,40,217,.15)}
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
            <span style={{ background:"linear-gradient(135deg,#6D28D9,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>M</span>
            <span style={{ color:text }}>ahmudul</span>
            <span style={{ color:text3,fontWeight:400,fontSize:"13px",marginLeft:"6px" }}>(Robince)</span>
          </div>
          <nav className="nav-links" style={{ display:"flex",gap:"2px" }}>
            {NAV.map(l => (
              <button key={l} onClick={() => go(l)} style={{ background:active===l?"rgba(109,40,217,.15)":"transparent",border:"none",cursor:"pointer",padding:"7px 13px",borderRadius:"7px",fontSize:"13px",fontWeight:500,color:active===l?"#c084fc":text2,transition:"all .15s" }}>{l}</button>
            ))}
          </nav>
          <div style={{ display:"flex",gap:"8px",alignItems:"center" }}>
            <button onClick={() => setDark(!D)} style={{ background:card,border:`1px solid ${border}`,borderRadius:"8px",padding:"7px 12px",cursor:"pointer",color:text2,fontSize:"16px",transition:"all .2s" }}>{D?"☀️":"🌙"}</button>
            <a href="#" className="btn-primary" style={{ padding:"8px 18px",fontSize:"13px" }}>Download CV ↓</a>
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
                <span style={{ fontSize:"12px",fontWeight:600,color:"#c084fc",letterSpacing:".04em" }}>Available for opportunities · Dhaka, Bangladesh</span>
              </div>
            </Fade>

            <Fade delay={0.05}>
              <h1 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(2.6rem,5.5vw,4.5rem)",fontWeight:700,letterSpacing:"-.04em",lineHeight:1.0,color:text,marginBottom:"0.6rem" }}>
                Mahmudul Islam
              </h1>
              <h1 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(2.6rem,5.5vw,4.5rem)",fontWeight:700,letterSpacing:"-.04em",lineHeight:1.0,background:"linear-gradient(135deg,#6D28D9 0%,#9333EA 40%,#db2777 100%)",backgroundSize:"200% 200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"gradient-shift 4s ease infinite",marginBottom:"1.5rem" }}>
                (Robince)
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
                Building intelligent connected devices, AI-powered cameras, and embedded systems from hardware interfaces to cloud connectivity. 5+ years shipping production firmware across IoT, Embedded Linux, and Edge AI.
              </p>
            </Fade>

            <Fade delay={0.17}>
              <div style={{ display:"flex",flexWrap:"wrap",gap:".875rem" }}>
                <button className="btn-primary" onClick={() => go("Projects")}>View Projects →</button>
                <button className="btn-outline" onClick={() => go("Contact")} style={{ border:`1.5px solid ${border}`,color:text,background:"transparent" }}>Contact Me</button>
                <a href="https://www.linkedin.com/in/mahmudulrobince/" target="_blank" rel="noreferrer" className="btn-outline" style={{ border:`1.5px solid ${border}`,color:text2,background:"transparent" }}>LinkedIn ↗</a>
                <a href="https://github.com/mahmudulislam299" target="_blank" rel="noreferrer" className="btn-outline" style={{ border:`1.5px solid ${border}`,color:text2,background:"transparent" }}>GitHub ↗</a>
              </div>
            </Fade>
          </div>

          {/* Photo */}
          <div className="hero-photo" style={{ position:"relative",animation:"float 7s ease-in-out infinite" }}>
            <div style={{ position:"absolute",inset:"-14px",borderRadius:"30px",background:"linear-gradient(135deg,#6D28D9,#9333EA,#db2777)",opacity:.3,filter:"blur(22px)",zIndex:0 }} />
            <div style={{ position:"relative",zIndex:1,borderRadius:"26px",overflow:"hidden",border:`1.5px solid rgba(109,40,217,.4)` }}>
              <img src="/photo.jpg" alt="Mahmudul Islam" style={{ width:"100%",display:"block",objectFit:"cover",maxHeight:"540px",objectPosition:"top center" }} />
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"1.5rem",background:"linear-gradient(to top,rgba(13,8,21,.95) 0%,transparent 100%)" }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"15px",color:"#F4F0FF",marginBottom:"3px" }}>Mahmudul Islam (Robince)</div>
                <div style={{ fontSize:"12px",color:"#c084fc",fontWeight:500 }}>Embedded Systems Engineer · BSc EEE, BUET</div>
              </div>
            </div>
            {/* Floating chips */}
            {[
              { txt:"Ingenic T31", top:"-18px", right:"24px" },
              { txt:"HEVC · H.265", bottom:"100px", left:"-30px" },
              { txt:"Edge AI", top:"38%", right:"-32px" },
            ].map(({ txt, top, bottom, left, right }) => (
              <div key={txt} style={{ position:"absolute",top,bottom,left,right,background:D?"rgba(13,8,21,.92)":"rgba(255,255,255,.95)",border:"1px solid rgba(109,40,217,.45)",borderRadius:"8px",padding:"6px 13px",fontSize:"12px",fontWeight:600,color:"#c084fc",backdropFilter:"blur(10px)",whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(109,40,217,.25)" }}>
                {txt}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="About" style={{ padding:"6rem 0",background:bg2,borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}` }}>
        <div className="wrap">
          <div className="about-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center" }}>
            <Fade>
              <div className="section-label">Who I am</div>
              <h2 className="section-title">Turning silicon into<br /><span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>smart products</span></h2>
              <p style={{ color:text2,fontSize:"15px",lineHeight:1.85,marginBottom:"1.25rem" }}>
                I'm a passionate Embedded Systems Engineer with 5+ years of experience developing firmware, IoT devices, Embedded Linux solutions, AI-enabled camera systems, and cloud-connected edge devices.
              </p>
              <p style={{ color:text2,fontSize:"15px",lineHeight:1.85,marginBottom:"2rem" }}>
                From bare-metal C on microcontrollers to Linux kernel BSPs and Edge AI pipelines — I work across the full stack. Currently at Teton Electronics building next-gen camera platforms on Ingenic SoCs.
              </p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:"8px" }}>
                {["Embedded C/C++","Embedded Linux","Device Drivers","RTOS","IoT","Edge AI","PCB Design","HEVC Streaming"].map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </Fade>
            <Fade delay={0.1}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
                {[
                  { icon:"🎓", title:"BSc in EEE", sub:"BUET · 2016–2021" },
                  { icon:"📍", title:"Based in", sub:"Dhaka, Bangladesh" },
                  { icon:"🌐", title:"Experience", sub:"5+ Years · 6+ Companies" },
                  { icon:"📄", title:"IEEE Published", sub:"EEE ICECE 2020" },
                  { icon:"🏭", title:"Devices Built", sub:"40+ IoT products" },
                  { icon:"🌍", title:"Clients", sub:"USA · Finland · Remote" },
                ].map(({ icon, title, sub }) => (
                  <div key={title} className="card-h" style={{ background:card,border:`1px solid ${border}`,borderRadius:"14px",padding:"1.25rem",textAlign:"center" }}>
                    <div style={{ fontSize:"1.75rem",marginBottom:"8px" }}>{icon}</div>
                    <div style={{ fontWeight:600,fontSize:"13px",color:text,marginBottom:"3px" }}>{title}</div>
                    <div style={{ fontSize:"12px",color:text3 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" style={{ padding:"7rem 0",borderBottom:`1px solid ${border}` }}>
        <div className="wrap">
          <Fade>
            <div className="section-label">Technical expertise</div>
            <h2 className="section-title">Core <span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Skills</span></h2>
            <p style={{ color:text2,fontSize:"15px",maxWidth:"500px",lineHeight:1.7,marginBottom:"3rem" }}>From bare-metal firmware to cloud AI systems — full-stack embedded engineering.</p>
          </Fade>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:"1.25rem" }}>
            {SKILLS.map((s, i) => (
              <Fade key={s.cat} delay={i * 0.06}>
                <div className="card-h" style={{ background:card,border:`1px solid ${border}`,borderRadius:"16px",padding:"1.5rem" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"1.25rem" }}>
                    <div style={{ width:"42px",height:"42px",borderRadius:"12px",background:"rgba(109,40,217,.15)",border:"1px solid rgba(109,40,217,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px" }}>{s.icon}</div>
                    <div style={{ fontWeight:700,fontSize:"14px",color:text }}>{s.cat}</div>
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
      <section id="Projects" style={{ padding:"7rem 0",background:bg2,borderBottom:`1px solid ${border}` }}>
        <div className="wrap">
          <Fade>
            <div className="section-label">Featured work</div>
            <h2 className="section-title">Selected <span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Projects</span></h2>
            <p style={{ color:text2,fontSize:"15px",maxWidth:"500px",lineHeight:1.7,marginBottom:"3rem" }}>End-to-end embedded products — hardware, firmware, networking, AI, and cloud.</p>
          </Fade>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1.5rem" }}>
            {PROJECTS.map((p, i) => (
              <Fade key={p.num} delay={i * 0.07}>
                <div className="card-h" style={{ background:card,border:`1px solid ${border}`,borderRadius:"18px",overflow:"hidden" }}>
                  {/* Banner */}
                  <div style={{ position:"relative",height:"190px",overflow:"hidden",cursor:"zoom-in" }} onClick={() => setLightbox(p.banner)}>
                    <img src={p.banner} alt={p.title} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s ease" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.07)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    />
                    <div style={{ position:"absolute",inset:0,background:`linear-gradient(to top,rgba(13,8,21,.85) 0%,rgba(13,8,21,.1) 60%,transparent 100%)` }} />
                    <div style={{ position:"absolute",top:"12px",left:"14px",background:`${p.color}cc`,borderRadius:"6px",padding:"3px 10px",fontSize:"10.5px",fontWeight:700,color:"#fff",letterSpacing:".06em",textTransform:"uppercase" }}>{p.num}</div>
                    <div style={{ position:"absolute",top:"12px",right:"14px",background:"rgba(0,0,0,.5)",borderRadius:"6px",padding:"6px 8px",fontSize:"13px",color:"#fff" }}>🔍</div>
                    <div style={{ position:"absolute",bottom:"12px",left:"14px" }}>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"15px",color:"#fff",marginBottom:"2px",textShadow:"0 1px 8px rgba(0,0,0,.8)" }}>{p.title}</div>
                      <div style={{ fontSize:"11px",color:p.color,fontWeight:600,textTransform:"uppercase",letterSpacing:".07em",filter:"brightness(1.4)" }}>{p.subtitle}</div>
                    </div>
                  </div>
                  {/* Body */}
                  <div style={{ padding:"1.25rem 1.5rem 1.5rem" }}>
                    <p style={{ fontSize:"13px",color:text2,lineHeight:1.8,marginBottom:"1rem" }}>{p.desc}</p>
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
      <section id="Experience" style={{ padding:"7rem 0",borderBottom:`1px solid ${border}` }}>
        <div className="wrap">
          <Fade>
            <div className="section-label">Career history</div>
            <h2 className="section-title">Work <span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Experience</span></h2>
          </Fade>
          <div style={{ marginTop:"3rem" }}>
            {EXPERIENCE.map((e, i) => (
              <Fade key={i} delay={i * 0.06}>
                <div className="exp-grid" style={{ display:"grid",gridTemplateColumns:"190px 1fr",gap:"2.5rem",padding:"2rem 0",borderBottom:`1px solid ${border}` }}>
                  <div style={{ paddingTop:"2px" }}>
                    <div style={{ fontSize:"12px",color:text3,fontWeight:500,marginBottom:"6px",fontFamily:"'JetBrains Mono',monospace",lineHeight:1.5 }}>{e.period}</div>
                    <div style={{ fontSize:"11.5px",color:text3,marginBottom:"8px" }}>📍 {e.loc}</div>
                    {e.current && (
                      <div style={{ display:"inline-flex",alignItems:"center",gap:"5px",padding:"3px 10px",borderRadius:"6px",background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.3)",fontSize:"10.5px",fontWeight:700,color:"#22c55e",letterSpacing:".06em",textTransform:"uppercase" }}>
                        <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#22c55e",flexShrink:0 }} />Current
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"16px",color:text,marginBottom:"4px",letterSpacing:"-.01em" }}>{e.role}</div>
                    <div style={{ fontSize:"13px",color:"#9333EA",fontWeight:600,marginBottom:".875rem" }}>{e.co}</div>
                    <ul style={{ paddingLeft:"1.1rem" }}>
                      {e.points.map((pt, j) => (
                        <li key={j} style={{ fontSize:"13px",color:text2,lineHeight:1.8,marginBottom:"4px" }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="Achievements" style={{ padding:"7rem 0",background:bg2,borderBottom:`1px solid ${border}` }}>
        <div className="wrap">
          <Fade>
            <div className="section-label">Recognition & credentials</div>
            <h2 className="section-title">Achievements &amp; <span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Certifications</span></h2>
          </Fade>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1rem",marginTop:"3rem",marginBottom:"3rem" }}>
            {ACHIEVEMENTS.map((a, i) => (
              <Fade key={i} delay={i * 0.06}>
                <div className="card-h" style={{ background:card,border:`1px solid ${border}`,borderRadius:"14px",padding:"1.5rem",display:"flex",gap:"1rem",alignItems:"flex-start" }}>
                  <div style={{ width:"46px",height:"46px",borderRadius:"13px",background:`linear-gradient(135deg,${a.color}33,${a.color}11)`,border:`1px solid ${a.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",flexShrink:0 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontWeight:600,fontSize:"14px",color:text,marginBottom:"4px" }}>{a.title}</div>
                    <div style={{ fontSize:"12.5px",color:a.color,fontWeight:500 }}>{a.sub}</div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.1}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"16px",color:text,marginBottom:"1.25rem" }}>Professional Certifications</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
              {[
                { name:"Microsoft Azure Fundamentals", issuer:"Microsoft", icon:"☁️" },
                { name:"Cisco Certified Network Associate", issuer:"Cisco (CCNA)", icon:"🌐" },
              ].map((c, i) => (
                <div key={i} className="card-h" style={{ background:card,border:`1px solid ${border}`,borderRadius:"14px",padding:"1.25rem 1.75rem",display:"flex",alignItems:"center",gap:"1rem" }}>
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
      <section id="Contact" style={{ padding:"7rem 0" }}>
        <div className="wrap">
          <div className="contact-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start" }}>
            <Fade>
              <div className="section-label">Get in touch</div>
              <h2 className="section-title">Let's build<br /><span style={{ background:"linear-gradient(135deg,#6D28D9,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>something great.</span></h2>
              <p style={{ color:text2,fontSize:"15px",lineHeight:1.8,marginBottom:"2rem" }}>
                Open to embedded systems roles, IoT consulting, PCB design, firmware projects, and Edge AI. Available for remote and international work.
              </p>
              <div style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
                {[
                  { icon:"✉️", label:"Email", value:"mahmudulislam299@gmail.com", href:"mailto:mahmudulislam299@gmail.com" },
                  { icon:"💼", label:"LinkedIn", value:"/in/mahmudulrobince", href:"https://www.linkedin.com/in/mahmudulrobince/" },
                  { icon:"🐙", label:"GitHub", value:"/mahmudulislam299", href:"https://github.com/mahmudulislam299" },
                  { icon:"📞", label:"Phone", value:"+880 1811 177722", href:"tel:+8801811177722" },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="card-h" style={{ display:"flex",alignItems:"center",gap:"14px",padding:"1rem 1.25rem",background:card,border:`1px solid ${border}`,borderRadius:"12px",textDecoration:"none" }}>
                    <div style={{ width:"40px",height:"40px",borderRadius:"11px",background:"rgba(109,40,217,.15)",border:"1px solid rgba(109,40,217,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize:"11px",color:text3,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",marginBottom:"2px" }}>{label}</div>
                      <div style={{ fontSize:"13px",color:"#c084fc",fontWeight:500 }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Fade>

            <Fade delay={0.1}>
              <div style={{ background:card,border:`1px solid ${border}`,borderRadius:"20px",padding:"2rem" }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"18px",color:text,marginBottom:"1.5rem" }}>Send a message</div>
                {[
                  { label:"Full Name", type:"text", ph:"Your name" },
                  { label:"Email Address", type:"email", ph:"your@email.com" },
                  { label:"Subject", type:"text", ph:"Project inquiry, job opportunity..." },
                ].map(({ label, type, ph }) => (
                  <div key={label} style={{ marginBottom:"1.25rem" }}>
                    <label style={{ display:"block",fontSize:"12px",fontWeight:600,color:text2,marginBottom:"6px",letterSpacing:".04em",textTransform:"uppercase" }}>{label}</label>
                    <input type={type} placeholder={ph} style={{ width:"100%",padding:"11px 14px",background:D?"rgba(255,255,255,.05)":"rgba(109,40,217,.05)",border:`1px solid ${border}`,borderRadius:"9px",color:text,fontSize:"14px" }} />
                  </div>
                ))}
                <div style={{ marginBottom:"1.5rem" }}>
                  <label style={{ display:"block",fontSize:"12px",fontWeight:600,color:text2,marginBottom:"6px",letterSpacing:".04em",textTransform:"uppercase" }}>Message</label>
                  <textarea placeholder="Tell me about your project..." rows={4} style={{ width:"100%",padding:"11px 14px",background:D?"rgba(255,255,255,.05)":"rgba(109,40,217,.05)",border:`1px solid ${border}`,borderRadius:"9px",color:text,fontSize:"14px",resize:"vertical" }} />
                </div>
                <button className="btn-primary" style={{ width:"100%",justifyContent:"center" }}>Send Message →</button>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${border}`,padding:"2rem 0",background:bg2 }}>
        <div className="wrap" style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:".75rem" }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"15px",fontWeight:600,color:text }}>
            <span style={{ background:"linear-gradient(135deg,#6D28D9,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>M</span>ahmudul Islam (Robince)
          </div>
          <div style={{ display:"flex",gap:"1.5rem" }}>
            {[{ l:"GitHub", h:"https://github.com/mahmudulislam299" },{ l:"LinkedIn", h:"https://www.linkedin.com/in/mahmudulrobince/" },{ l:"Email", h:"mailto:mahmudulislam299@gmail.com" }].map(({ l, h }) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" style={{ fontSize:"13px",color:text3,textDecoration:"none",fontWeight:500,transition:"color .15s" }}
                onMouseEnter={e => e.target.style.color="#c084fc"}
                onMouseLeave={e => e.target.style.color=text3}
              >{l}</a>
            ))}
          </div>
          <span style={{ fontSize:"12px",color:text3 }}>© 2025 · Dhaka, Bangladesh · BSc EEE, BUET</span>
        </div>
      </footer>
    </div>
  );
}