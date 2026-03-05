import { useState, useEffect, useRef } from "react";

const HEARTS = ["♥", "✦", "✿", "◆", "❋", "✶", "⬦", "✸", "❀"];

const C = {
  rose:     "#FF4D8D",
  deepRose: "#E0285E",
  crimson:  "#A01040",
  gold:     "#FFD166",
  softGold: "#FFE8A0",
  dark:     "#060308",
  dark2:    "#0D0510",
  dark3:    "#120818",
  text:     "#FFF0F5",
  textSub:  "#F0C8D8",
  textDim:  "#C090A8",
};

/* ══════════════════════════════════════════
   ALL KEYFRAMES
══════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Dancing+Script:wght@500;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#060308;color:#FFF0F5;font-family:'Cormorant Garamond',serif;overflow-x:hidden;cursor:none}
button{cursor:none!important}

@keyframes fadeUp{
  0%{opacity:0;transform:translateY(40px) scale(0.97)}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes fadeDown{
  0%{opacity:0;transform:translateY(-30px)}
  100%{opacity:1;transform:translateY(0)}
}
@keyframes fadeIn{
  0%{opacity:0}100%{opacity:1}
}
@keyframes zoomIn{
  0%{opacity:0;transform:scale(0.65)}
  60%{transform:scale(1.06)}
  100%{opacity:1;transform:scale(1)}
}
@keyframes slideRight{
  0%{opacity:0;transform:translateX(-40px)}
  100%{opacity:1;transform:translateX(0)}
}
@keyframes ribbonIn{
  0%{opacity:0;transform:scaleX(0)}
  100%{opacity:1;transform:scaleX(1)}
}

@keyframes textGlow{
  0%,100%{filter:drop-shadow(0 0 12px rgba(255,77,141,0.6))}
  50%{filter:drop-shadow(0 0 60px rgba(255,77,141,1)) drop-shadow(0 0 110px rgba(255,232,160,0.6))}
}
@keyframes goldGlow{
  0%,100%{text-shadow:0 0 20px rgba(255,209,102,0.5),0 2px 6px rgba(0,0,0,0.9)}
  50%{text-shadow:0 0 70px rgba(255,209,102,1),0 0 130px rgba(255,77,141,0.5),0 2px 6px rgba(0,0,0,0.9)}
}
@keyframes pulseBorder{
  0%,100%{box-shadow:0 0 0 0 rgba(255,77,141,0.5),inset 0 0 20px rgba(255,77,141,0.03)}
  50%{box-shadow:0 0 0 10px rgba(255,77,141,0),inset 0 0 50px rgba(255,77,141,0.1)}
}
@keyframes breathe{
  0%,100%{transform:scale(1);opacity:0.9}
  50%{transform:scale(1.04);opacity:1}
}
@keyframes gemSpin{
  0%{transform:rotate(0deg) scale(1)}
  50%{transform:rotate(180deg) scale(1.5)}
  100%{transform:rotate(360deg) scale(1)}
}
@keyframes heartbeat{
  0%,100%{transform:scale(1)}
  14%{transform:scale(1.35)}
  28%{transform:scale(1)}
  42%{transform:scale(1.25)}
  70%{transform:scale(1)}
}
@keyframes floatUp{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-14px)}
}

@keyframes orbFloat1{
  0%,100%{transform:translate(0,0) scale(1)}
  33%{transform:translate(70px,50px) scale(1.12)}
  66%{transform:translate(-30px,80px) scale(0.9)}
}
@keyframes orbFloat2{
  0%,100%{transform:translate(0,0)}
  50%{transform:translate(-60px,-70px) scale(1.2)}
}
@keyframes orbFloat3{
  0%,100%{transform:translate(-50%,-50%) scale(1)}
  50%{transform:translate(-50%,-50%) scale(1.5)}
}
@keyframes driftLeft{
  0%,100%{transform:translateX(0) translateY(0)}
  50%{transform:translateX(-45px) translateY(25px)}
}

@keyframes shimmerLine{
  0%{background-position:-200% center}
  100%{background-position:200% center}
}
@keyframes scanLine{
  0%{top:-4px;opacity:0}
  8%{opacity:1}
  92%{opacity:1}
  100%{top:100%;opacity:0}
}
@keyframes lineExpand{
  0%{transform:scaleX(0);opacity:0}
  100%{transform:scaleX(1);opacity:1}
}

@keyframes floatHeart{
  0%{transform:translateY(0) rotate(-8deg) scale(1);opacity:0.95}
  40%{transform:translateY(-42vh) rotate(14deg) scale(1.1);opacity:0.7}
  100%{transform:translateY(-108vh) rotate(-6deg) scale(0.5);opacity:0}
}
@keyframes particleFade{
  0%{opacity:1;transform:scale(1) translateY(0)}
  100%{opacity:0;transform:scale(0) translateY(-24px)}
}
@keyframes scrollBounce{
  0%,100%{opacity:1;transform:scaleY(1)}
  50%{opacity:0.15;transform:scaleY(0.25)}
}
@keyframes waveText{
  0%,100%{transform:translateY(0)}
  25%{transform:translateY(-7px)}
  75%{transform:translateY(5px)}
}
@keyframes glitchX{
  0%,90%,100%{clip-path:inset(0 0 100% 0);opacity:0}
  91%{clip-path:inset(20% 0 60% 0);opacity:0.5;transform:translateX(3px)}
  93%{clip-path:inset(60% 0 15% 0);opacity:0.3;transform:translateX(-3px)}
  95%{clip-path:inset(40% 0 40% 0);opacity:0.4;transform:translateX(2px)}
  97%{clip-path:inset(0 0 80% 0);opacity:0.2}
}
@keyframes cardReveal{
  0%{opacity:0;transform:translateY(32px) rotateX(8deg)}
  100%{opacity:1;transform:translateY(0) rotateX(0deg)}
}
@keyframes rotateSlow{
  0%{transform:rotate(0deg)}
  100%{transform:rotate(360deg)}
}
@keyframes borderPulse{
  0%,100%{border-color:rgba(255,77,141,0.2)}
  50%{border-color:rgba(255,77,141,0.55)}
}
`;

/* ══════════════════════════════════════════
   STAR CANVAS
══════════════════════════════════════════ */
function StarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.2,
      speed: 0.002 + Math.random() * 0.014,
      phase: Math.random() * Math.PI * 2,
      gold: Math.random() > 0.75,
      rose: Math.random() > 0.9,
    }));
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() / 1000;
      stars.forEach(s => {
        const a = 0.05 + 0.95 * ((Math.sin(t * s.speed * 10 + s.phase) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        if (s.rose) ctx.fillStyle = `rgba(255,77,141,${a})`;
        else if (s.gold) ctx.fillStyle = `rgba(255,209,102,${a})`;
        else ctx.fillStyle = `rgba(255,240,245,${a * 0.8})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

/* ══════════════════════════════════════════
   CURSOR
══════════════════════════════════════════ */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const move = e => {
      pos.current.mx = e.clientX; pos.current.my = e.clientY;
      if (dotRef.current) { dotRef.current.style.left = e.clientX - 6 + "px"; dotRef.current.style.top = e.clientY - 6 + "px"; }
      if (Math.random() > 0.78) {
        const id = Date.now() + Math.random();
        const pal = [C.rose, C.gold, C.softGold, "#FF80B0"];
        setParticles(p => [...p, { id, x: e.clientX + (Math.random()-0.5)*10, y: e.clientY + (Math.random()-0.5)*10, color: pal[Math.floor(Math.random()*pal.length)], size: 2+Math.random()*4 }]);
        setTimeout(() => setParticles(p => p.filter(x => x.id !== id)), 800);
      }
    };
    window.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      const { mx, my } = pos.current;
      pos.current.rx += (mx - pos.current.rx - 18) * 0.1;
      pos.current.ry += (my - pos.current.ry - 18) * 0.1;
      if (ringRef.current) { ringRef.current.style.left = pos.current.rx + "px"; ringRef.current.style.top = pos.current.ry + "px"; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:"fixed",width:12,height:12,borderRadius:"50%",background:C.rose,pointerEvents:"none",zIndex:9999,boxShadow:`0 0 16px ${C.rose},0 0 36px rgba(255,77,141,0.5)`,mixBlendMode:"screen" }} />
      <div ref={ringRef} style={{ position:"fixed",width:36,height:36,border:`1px solid rgba(255,77,141,0.6)`,borderRadius:"50%",pointerEvents:"none",zIndex:9998 }} />
      {particles.map(p => <div key={p.id} style={{ position:"fixed",left:p.x-p.size/2,top:p.y-p.size/2,width:p.size,height:p.size,borderRadius:"50%",background:p.color,pointerEvents:"none",zIndex:9997,animation:"particleFade 0.8s ease-out forwards",boxShadow:`0 0 6px ${p.color}` }} />)}
    </>
  );
}

/* ══════════════════════════════════════════
   REVEAL HOOK
══════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
function NavBtn({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background:"none",border:"none",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.3em",color:h?C.rose:C.textDim,textTransform:"uppercase",transition:"color 0.3s,text-shadow 0.3s",textShadow:h?`0 0 20px ${C.rose}`:"none" }}>
      {children}
    </button>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"20px 52px",display:"flex",justifyContent:"space-between",alignItems:"center",background:scrolled?"rgba(6,3,8,0.97)":"linear-gradient(to bottom,rgba(6,3,8,0.9),transparent)",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?`1px solid rgba(255,77,141,0.12)`:"none",transition:"all 0.5s ease" }}>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ width:7,height:7,background:C.rose,transform:"rotate(45deg)",animation:"gemSpin 5s linear infinite",boxShadow:`0 0 12px ${C.rose}` }} />
        <span style={{ fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:"0.35em",color:C.gold,textShadow:`0 0 20px rgba(255,209,102,0.6)` }}>SEMPRO · 2026</span>
      </div>
      <div style={{ display:"flex",gap:40 }}>
        {[["message","Pesan"],["journey","Perjalanan"],["wishes","Harapan"]].map(([id,lbl]) => <NavBtn key={id} onClick={() => go(id)}>{lbl}</NavBtn>)}
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════
   WAVE WORD
══════════════════════════════════════════ */
function WaveWord({ word, baseDelay = 0 }) {
  return (
    <span style={{ display:"inline-flex",gap:"0.02em" }}>
      {word.split("").map((ch,i) => (
        <span key={i} style={{ display:"inline-block",animation:`waveText 3s ease-in-out infinite`,animationDelay:`${baseDelay+i*0.07}s` }}>{ch===" "?"\u00A0":ch}</span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="hero" style={{ position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"100px 24px 80px",zIndex:10,overflow:"hidden" }}>
      {/* orbs */}
      {[
        { w:600,h:600,c:"rgba(200,40,100,0.15)",t:-120,l:-200,a:"orbFloat1 9s ease-in-out infinite" },
        { w:450,h:450,c:"rgba(255,209,102,0.08)",b:-100,r:-120,a:"orbFloat2 11s ease-in-out infinite" },
        { w:360,h:360,c:"rgba(140,20,70,0.2)",t:"42%",l:"50%",tr:"translate(-50%,-50%)",a:"orbFloat3 7s ease-in-out infinite" },
        { w:200,h:200,c:"rgba(255,77,141,0.1)",t:"18%",r:"8%",a:"driftLeft 13s ease-in-out infinite" },
      ].map((o,i) => <div key={i} style={{ position:"absolute",width:o.w,height:o.h,borderRadius:"50%",background:`radial-gradient(circle,${o.c},transparent 70%)`,filter:"blur(80px)",pointerEvents:"none",top:o.t,left:o.l,bottom:o.b,right:o.r,transform:o.tr,animation:o.a }} />)}

      {/* eyebrow */}
      <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:24,opacity:0,animation:"fadeDown 0.8s ease forwards 0.2s" }}>
        <div style={{ width:50,height:1,background:`linear-gradient(90deg,transparent,${C.rose})`,animation:"ribbonIn 1s ease forwards 0.4s",transformOrigin:"right" }} />
        <span style={{ fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.55em",color:C.rose,textTransform:"uppercase",textShadow:`0 0 25px ${C.rose}` }}>dengan penuh cinta</span>
        <div style={{ width:50,height:1,background:`linear-gradient(90deg,${C.rose},transparent)`,animation:"ribbonIn 1s ease forwards 0.4s",transformOrigin:"left" }} />
      </div>

      {/* subtitle */}
      <div style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(13px,2.2vw,17px)",fontWeight:400,letterSpacing:"0.65em",color:C.textSub,marginBottom:10,opacity:0,animation:"fadeUp 0.9s ease forwards 0.4s",textShadow:`0 0 30px rgba(255,200,216,0.5)` }}>
        S E L A M A T
      </div>

      {/* SEMPRO */}
      <h1 style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(58px,12vw,134px)",fontWeight:700,lineHeight:0.9,marginBottom:30,opacity:0,animation:"zoomIn 1.1s cubic-bezier(0.34,1.56,0.64,1) forwards 0.6s",position:"relative" }}>
        <span style={{ display:"block",background:`linear-gradient(135deg,${C.rose} 0%,${C.softGold} 45%,${C.rose} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"textGlow 3s ease-in-out infinite 1.5s",backgroundSize:"200% auto",letterSpacing:"-0.02em" }}>SEMPRO</span>
        <span style={{ position:"absolute",inset:0,display:"block",background:`linear-gradient(135deg,${C.gold},${C.rose})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"glitchX 5s ease-in-out infinite 2.5s",letterSpacing:"-0.02em",pointerEvents:"none" }}>SEMPRO</span>
      </h1>

      {/* name */}
      <div style={{ fontFamily:"'Dancing Script',cursive",fontSize:"clamp(38px,7vw,72px)",fontWeight:700,marginBottom:38,opacity:0,animation:"fadeUp 1s ease forwards 0.9s" }}>
        <span style={{ color:C.softGold,animation:"goldGlow 3.5s ease-in-out infinite 2s" }}>
          <WaveWord word="Ayu Komariyah" baseDelay={1.2} />
        </span>
      </div>

      {/* divider gems */}
      <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:38,opacity:0,animation:"fadeIn 1s ease forwards 1.1s" }}>
        <div style={{ width:72,height:1,background:`linear-gradient(90deg,transparent,${C.gold})`,animation:"lineExpand 1s ease forwards 1.2s",transformOrigin:"right" }} />
        {[C.rose,C.softGold,C.rose].map((c,i) => <div key={i} style={{ width:i===1?13:7,height:i===1?13:7,background:c,transform:"rotate(45deg)",boxShadow:`0 0 14px ${c}`,animation:`gemSpin ${4+i}s linear infinite`,animationDelay:`${i*0.4}s` }} />)}
        <div style={{ width:72,height:1,background:`linear-gradient(90deg,${C.gold},transparent)`,animation:"lineExpand 1s ease forwards 1.2s",transformOrigin:"left" }} />
      </div>

      {/* tagline */}
      <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(17px,2.8vw,24px)",fontStyle:"italic",color:C.textSub,maxWidth:540,lineHeight:1.95,marginBottom:54,opacity:0,animation:"fadeUp 1s ease forwards 1.3s",fontWeight:300,textShadow:"0 2px 20px rgba(0,0,0,0.95)" }}>
        Di antara bintang-bintang yang tak terhitung,<br/>
        <span style={{ color:C.rose,fontWeight:700,fontStyle:"normal",textShadow:`0 0 30px ${C.rose},0 2px 8px rgba(0,0,0,0.9)` }}>kamu bersinar paling terang malam ini.</span><br/>
        Seminar Proposalmu adalah bukti keberanianmu.
      </p>

      {/* CTA */}
      <div style={{ display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center",opacity:0,animation:"fadeUp 1s ease forwards 1.5s" }}>
        <GlowBtn onClick={() => go("message")} variant="primary">Baca Pesanku</GlowBtn>
        <GlowBtn onClick={() => go("wishes")} variant="ghost">Harapan Untukmu</GlowBtn>
      </div>

      {/* scroll cue */}
      <div style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,opacity:0,animation:"fadeIn 1s ease forwards 2.2s" }}>
        <span style={{ fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:"0.5em",color:C.textDim,textTransform:"uppercase" }}>SCROLL</span>
        <div style={{ width:1,height:44,background:`linear-gradient(to bottom,${C.rose},transparent)`,animation:"scrollBounce 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   GLOW BUTTON
══════════════════════════════════════════ */
function GlowBtn({ children, onClick, variant = "primary" }) {
  const [h, setH] = useState(false);
  const p = variant === "primary";
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding:"17px 50px",fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:"0.3em",textTransform:"uppercase",border:`1px solid ${p?(h?"transparent":C.rose):(h?C.gold:"rgba(255,209,102,0.35)")}`,background:p?(h?`linear-gradient(135deg,${C.deepRose},${C.crimson})`:"transparent"):"transparent",color:p?C.text:(h?C.softGold:C.gold),boxShadow:h?(p?`0 0 50px rgba(255,77,141,0.55),0 0 100px rgba(255,77,141,0.2)`:`0 0 40px rgba(255,209,102,0.35)`):"none",transform:h?"translateY(-3px) scale(1.03)":"none",transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)",textShadow:h?`0 0 20px currentColor,0 2px 4px rgba(0,0,0,0.9)`:"0 2px 4px rgba(0,0,0,0.9)" }}>
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════
   SECTION TAG
══════════════════════════════════════════ */
function SectionTag({ children, center }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:22,justifyContent:center?"center":"flex-start" }}>
      <div style={{ width:32,height:1,background:`linear-gradient(90deg,transparent,${C.rose})` }} />
      <span style={{ fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.55em",color:C.rose,textTransform:"uppercase",textShadow:`0 0 22px rgba(255,77,141,0.8)` }}>{children}</span>
      {center && <div style={{ width:32,height:1,background:`linear-gradient(90deg,${C.rose},transparent)` }} />}
    </div>
  );
}

/* ══════════════════════════════════════════
   MESSAGE SECTION
══════════════════════════════════════════ */
function MessageSection() {
  const [ref, v] = useReveal();
  return (
    <section id="message" style={{ position:"relative",zIndex:10,padding:"130px 24px",background:`linear-gradient(to bottom,${C.dark},${C.dark2},${C.dark})` }}>
      <div style={{ maxWidth:860,margin:"0 auto" }}>
        <SectionTag>Dari Hati</SectionTag>
        <div ref={ref} style={{ position:"relative",border:`1px solid rgba(255,77,141,0.22)`,padding:"clamp(36px,6vw,68px)",background:"rgba(255,77,141,0.04)",overflow:"hidden",opacity:v?1:0,transform:v?"translateY(0)":"translateY(38px)",transition:"opacity 1s ease, transform 1s ease",animation:v?"pulseBorder 4s ease-in-out infinite 1s, borderPulse 6s ease-in-out infinite 1s":"none" }}>
          {/* scan line */}
          <div style={{ position:"absolute",left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,rgba(255,77,141,0.5),transparent)`,animation:"scanLine 5s linear infinite",pointerEvents:"none" }} />
          {/* shimmer top */}
          <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.rose},${C.gold},${C.rose},transparent)`,backgroundSize:"200% auto",animation:"shimmerLine 3s linear infinite" }} />
          {/* corner brackets */}
          {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
            <div key={i} style={{ position:"absolute",...pos,width:22,height:22,
              borderTop:i<2?`1px solid rgba(255,77,141,0.7)`:"none",
              borderBottom:i>=2?`1px solid rgba(255,77,141,0.7)`:"none",
              borderLeft:(i===0||i===2)?`1px solid rgba(255,77,141,0.7)`:"none",
              borderRight:(i===1||i===3)?`1px solid rgba(255,77,141,0.7)`:"none",
            }} />
          ))}
          {/* bg quote char */}
          <div style={{ position:"absolute",top:28,left:20,fontFamily:"'Cormorant Garamond',serif",fontSize:240,lineHeight:0.65,color:"rgba(255,77,141,0.07)",fontStyle:"italic",pointerEvents:"none",userSelect:"none" }}>"</div>

          <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,2.8vw,28px)",fontStyle:"italic",lineHeight:2,color:C.text,fontWeight:300,position:"relative",zIndex:2,marginBottom:46,textShadow:"0 2px 20px rgba(0,0,0,0.95)" }}>
            Setiap malam yang kau habiskan menatap layar,<br/>
            setiap halaman yang kau tulis dengan tangan gemetar,<br/>
            setiap keraguan yang kau kalahkan dalam diam —<br/><br/>
            semua itu membawamu ke{" "}
            <span style={{ color:C.rose,fontWeight:700,fontStyle:"normal",textShadow:`0 0 30px ${C.rose},0 2px 6px rgba(0,0,0,0.9)` }}>momen ini</span>.<br/><br/>
            Hari ini bukan sekadar seminar.<br/>
            Hari ini adalah{" "}
            <span style={{ color:C.softGold,fontWeight:700,fontStyle:"normal",textShadow:`0 0 30px ${C.gold},0 2px 6px rgba(0,0,0,0.9)` }}>kamu membuktikan</span><br/>
            bahwa mimpi tidak pernah terlalu besar<br/>
            untuk seseorang yang bersungguh-sungguh.
          </p>
          <div style={{ display:"flex",alignItems:"center",gap:20 }}>
            <div style={{ width:52,height:1,background:`linear-gradient(90deg,${C.gold},transparent)` }} />
            <span style={{ fontFamily:"'Dancing Script',cursive",fontSize:24,color:C.gold,textShadow:`0 0 30px ${C.gold},0 2px 6px rgba(0,0,0,0.9)` }}>dengan bangga & cinta</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   JOURNEY
══════════════════════════════════════════ */
const STEPS = [
  { n:"01",title:"Keberanian Bermimpi",body:"Kamu memilih jalan yang tidak mudah, dan itu membutuhkan keberanian luar biasa yang tidak semua orang miliki." },
  { n:"02",title:"Kerja Keras Tanpa Henti",body:"Setiap malam yang panjang, setiap revisi yang melelahkan — semuanya adalah ukiran indah dari dedikasimu." },
  { n:"03",title:"Hari Ini — Sempro 2026",body:"kamu siap.",accent:true,prefix:"Kini kamu berdiri di depan penguji, dan semua yang ada di sini percaya: " },
  { n:"04",title:"Masa Depan Gemilang",body:"Ini bukan akhir. Ini adalah pintu pertama dari ribuan pintu menuju hal-hal besar yang menantimu." },
];

function Step({ step, delay }) {
  const [ref, v] = useReveal(0.1);
  const [h, setH] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:"grid",gridTemplateColumns:"80px 1fr",gap:28,position:"relative",paddingBottom:54,opacity:v?1:0,transform:v?"translateX(0)":"translateX(-30px)",transition:`opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      <div style={{ width:48,height:48,border:`1px solid ${h?"transparent":C.rose}`,background:h?`linear-gradient(135deg,${C.rose},${C.deepRose})`:"rgba(255,77,141,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:600,color:h?C.dark:C.rose,transition:"all 0.4s ease",boxShadow:h?`0 0 40px rgba(255,77,141,0.7),inset 0 0 20px rgba(255,77,141,0.1)`:"none",flexShrink:0,textShadow:h?"none":`0 0 15px ${C.rose}`,animation:h?"heartbeat 0.8s ease":"none" }}>{step.n}</div>
      <div style={{ paddingTop:6 }}>
        <h3 style={{ fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:600,color:h?C.rose:C.text,marginBottom:12,letterSpacing:"0.06em",transition:"color 0.3s,text-shadow 0.3s",textShadow:h?`0 0 25px ${C.rose},0 2px 6px rgba(0,0,0,0.9)`:"0 2px 10px rgba(0,0,0,0.9)" }}>{step.title}</h3>
        <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontStyle:"italic",color:C.textSub,lineHeight:1.88,fontWeight:300,textShadow:"0 1px 12px rgba(0,0,0,0.9)" }}>
          {step.accent ? <>{step.prefix}<span style={{ color:C.rose,fontStyle:"normal",fontWeight:700,textShadow:`0 0 25px ${C.rose},0 2px 6px rgba(0,0,0,0.9)` }}>{step.body}</span></> : step.body}
        </p>
      </div>
      {step.n !== "04" && <div style={{ position:"absolute",left:39,top:50,bottom:0,width:1,background:`linear-gradient(to bottom,rgba(255,77,141,0.45),transparent)` }} />}
    </div>
  );
}

function JourneySection() {
  const [ref, v] = useReveal();
  return (
    <section id="journey" style={{ position:"relative",zIndex:10,padding:"130px 24px",background:C.dark2 }}>
      <div style={{ maxWidth:860,margin:"0 auto" }}>
        <SectionTag>Perjalananmu</SectionTag>
        <h2 ref={ref} style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(28px,5vw,54px)",fontWeight:600,color:C.text,marginBottom:70,lineHeight:1.2,opacity:v?1:0,transform:v?"translateY(0)":"translateY(24px)",transition:"all 0.9s ease",textShadow:"0 2px 30px rgba(0,0,0,0.95)" }}>
          Setiap langkah<br/><span style={{ color:C.rose,fontStyle:"italic",textShadow:`0 0 40px ${C.rose},0 2px 10px rgba(0,0,0,0.9)` }}>bermakna.</span>
        </h2>
        {STEPS.map((s,i) => <Step key={i} step={s} delay={i*0.14} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   WISHES
══════════════════════════════════════════ */
const WISHES = [
  { n:"I",  title:"Kejernihan",body:"Semoga setiap kata yang kau ucapkan hari ini mengalir jernih, penuh keyakinan, dan menyentuh hati para penguji." },
  { n:"II", title:"Ketenangan",body:"Semoga hatimu tenang seperti malam yang indah, dan kepercayaan dirimu memancar seperti bintang paling terang." },
  { n:"III",title:"Kelancaran",body:"Semoga seluruh perjuanganmu berbuah manis — seminar lancar, hasil memuaskan, dan langkah berikutnya lebih mudah." },
];

function WishCard({ wish, delay }) {
  const [ref, v] = useReveal(0.1);
  const [h, setH] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ border:`1px solid ${h?"rgba(255,209,102,0.55)":"rgba(255,209,102,0.18)"}`,padding:"46px 30px",background:h?"rgba(255,209,102,0.07)":"rgba(255,209,102,0.02)",position:"relative",overflow:"hidden",opacity:v?1:0,transform:v?(h?"translateY(-6px)":"translateY(0)"):"translateY(30px)",transition:`opacity 0.7s ease ${delay}s, transform 0.45s ease, border-color 0.4s, background 0.4s, box-shadow 0.4s`,boxShadow:h?`0 20px 70px rgba(0,0,0,0.7),0 0 50px rgba(255,209,102,0.12)`:"none" }}>
      {h && <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,animation:"shimmerLine 2s linear infinite" }} />}
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,transform:h?"scaleX(1)":"scaleX(0)",transition:"transform 0.4s ease" }} />
      <div style={{ fontFamily:"'Cinzel',serif",fontSize:50,color:`rgba(255,209,102,${h?0.25:0.12})`,fontWeight:700,marginBottom:18,lineHeight:1,transition:"color 0.3s" }}>{wish.n}</div>
      <div style={{ fontFamily:"'Cinzel',serif",fontSize:12,color:h?C.softGold:C.gold,letterSpacing:"0.18em",marginBottom:16,textTransform:"uppercase",textShadow:h?`0 0 25px ${C.gold},0 2px 4px rgba(0,0,0,0.9)`:"0 2px 4px rgba(0,0,0,0.9)",transition:"all 0.3s" }}>{wish.title}</div>
      <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontStyle:"italic",color:h?C.textSub:C.textDim,lineHeight:1.88,fontWeight:300,transition:"color 0.3s",textShadow:"0 1px 10px rgba(0,0,0,0.9)" }}>{wish.body}</p>
    </div>
  );
}

function WishesSection() {
  const [ref, v] = useReveal();
  return (
    <section id="wishes" style={{ position:"relative",zIndex:10,padding:"130px 24px",background:C.dark3,textAlign:"center" }}>
      <div style={{ maxWidth:960,margin:"0 auto" }}>
        <SectionTag center>Harapan</SectionTag>
        <h2 ref={ref} style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(26px,5vw,52px)",fontWeight:600,lineHeight:1.3,marginBottom:18,color:C.text,opacity:v?1:0,transform:v?"translateY(0)":"translateY(24px)",transition:"all 0.9s ease",textShadow:"0 2px 30px rgba(0,0,0,0.95)" }}>
          Tiga Doa{" "}<span style={{ color:C.rose,fontStyle:"italic",textShadow:`0 0 40px ${C.rose},0 2px 8px rgba(0,0,0,0.9)` }}>Tulus</span><br/>Untukmu
        </h2>
        <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontStyle:"italic",color:C.textSub,marginBottom:70,fontWeight:300,textShadow:"0 2px 15px rgba(0,0,0,0.95)" }}>Dari kedalaman hati, untuk perjalananmu ke depan</p>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:24 }}>
          {WISHES.map((w,i) => <WishCard key={i} wish={w} delay={i*0.15} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FINAL CTA
══════════════════════════════════════════ */
function FinalSection() {
  const [hearts, setHearts] = useState([]);
  const [fired, setFired] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Kirim Cinta & Semangat");
  const itvRef = useRef(null);

  const fire = () => {
    if (fired) return;
    setFired(true); setBtnLabel("Cinta Terkirim ♥");
    clearInterval(itvRef.current);
    itvRef.current = setInterval(() => {
      const id = Date.now() + Math.random();
      const pal = [C.rose,C.gold,C.softGold,"#FF80B0","#FFE8A0"];
      setHearts(h => [...h, { id, left:3+Math.random()*94, dur:3.5+Math.random()*4, delay:Math.random()*0.4, size:10+Math.random()*28, char:HEARTS[Math.floor(Math.random()*HEARTS.length)], color:pal[Math.floor(Math.random()*pal.length)] }]);
      setTimeout(() => setHearts(h => h.filter(x => x.id !== id)), 8500);
    }, 145);
    setTimeout(() => { clearInterval(itvRef.current); setFired(false); setBtnLabel("Kirim Cinta & Semangat"); }, 5000);
  };

  return (
    <section id="final" style={{ position:"relative",minHeight:"85vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",background:`radial-gradient(ellipse at center,rgba(160,16,64,0.28) 0%,${C.dark} 65%)`,zIndex:10,overflow:"hidden",padding:"80px 24px" }}>
      {hearts.map(h => (
        <div key={h.id} style={{ position:"absolute",bottom:-50,left:`${h.left}%`,fontSize:h.size,color:h.color,animation:`floatHeart ${h.dur}s ease-in-out forwards`,animationDelay:`${h.delay}s`,pointerEvents:"none",zIndex:5,textShadow:`0 0 18px ${h.color}`,filter:`drop-shadow(0 0 8px ${h.color})` }}>{h.char}</div>
      ))}
      <div style={{ position:"absolute",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,40,100,0.14),transparent 70%)",filter:"blur(80px)",pointerEvents:"none",animation:"orbFloat3 8s ease-in-out infinite",top:"50%",left:"50%",transform:"translate(-50%,-50%)" }} />
      {/* spinning ring */}
      <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",border:"1px solid rgba(255,77,141,0.06)",pointerEvents:"none",animation:"rotateSlow 20s linear infinite",top:"50%",left:"50%",transform:"translate(-50%,-50%)" }} />
      <div style={{ position:"absolute",width:380,height:380,borderRadius:"50%",border:"1px solid rgba(255,209,102,0.05)",pointerEvents:"none",animation:"rotateSlow 15s linear infinite reverse",top:"50%",left:"50%",transform:"translate(-50%,-50%)" }} />

      <div style={{ position:"relative",zIndex:10 }}>
        <div style={{ fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.6em",color:C.rose,textTransform:"uppercase",marginBottom:30,textShadow:`0 0 22px ${C.rose}`,animation:"breathe 3s ease-in-out infinite" }}>— selalu —</div>
        <h2 style={{ fontFamily:"'Cinzel',serif",fontSize:"clamp(28px,5.5vw,66px)",fontWeight:700,lineHeight:1.15,marginBottom:26,color:C.text,textShadow:"0 2px 40px rgba(0,0,0,0.95)" }}>
          Percayalah pada dirimu,
          <span style={{ display:"block",fontFamily:"'Dancing Script',cursive",fontSize:"clamp(48px,9vw,98px)",background:`linear-gradient(135deg,${C.rose},${C.softGold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"textGlow 2.5s ease-in-out infinite, floatUp 4s ease-in-out infinite" }}>Ayu.</span>
        </h2>
        <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontStyle:"italic",color:C.textSub,marginBottom:52,fontWeight:300,maxWidth:420,marginLeft:"auto",marginRight:"auto",textShadow:"0 2px 20px rgba(0,0,0,0.95)" }}>
          Kamu sudah sejauh ini. Dan ini baru permulaan dari sesuatu yang sangat indah.
        </p>
        <GlowBtn onClick={fire} variant="primary">{btnLabel}</GlowBtn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background:C.dark,borderTop:`1px solid rgba(255,77,141,0.12)`,padding:"36px 52px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:10,flexWrap:"wrap",gap:16 }}>
      <span style={{ fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:"0.35em",color:C.gold,textShadow:`0 0 20px rgba(255,209,102,0.5)` }}>Selamat Sempro · 2026</span>
      <span style={{ fontFamily:"'Dancing Script',cursive",fontSize:20,color:C.rose,textShadow:`0 0 20px ${C.rose}` }}>dibuat dengan sepenuh hati</span>
    </footer>
  );
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{STYLES}</style>
      <Cursor />
      <StarCanvas />
      <Nav />
      <Hero />
      <MessageSection />
      <JourneySection />
      <WishesSection />
      <FinalSection />
      <Footer />
    </>
  );
}