"use client";
import { useState, useEffect } from "react";

const TESTS = [
  {
    photo: null, initials: "SH",
    quote: "I always dreamt of a honeymoon in the Maldives. Mercedes made every single detail perfect — from the overwater villa to the sunset cruise.",
    name: "Silvia & Marco H.", origin: "Austria", dest: "Maldives", year: "2024",
  },
  {
    photo: null, initials: "RB",
    quote: "Our Paris trip was magical. The Pullman Tour Eiffel was stunning and the private transfer made everything effortless.",
    name: "Raul & Clelia B.", origin: "Argentina", dest: "Paris, France", year: "2026",
  },
  {
    photo: null, initials: "WF",
    quote: "Bali with three kids felt daunting. Mercedes turned it into the best family holiday we've ever had — she knew what we needed before we did.",
    name: "The Williams Family", origin: "United Kingdom", dest: "Bali, Indonesia", year: "2025",
  },
];

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % TESTS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTS[cur];

  return (
    <div style={{
      background: "white",
      borderRight: "1px solid #EDE3D4",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{padding:"14px 18px",borderBottom:"1px solid #EDE3D4",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <span style={{fontSize:9,letterSpacing:"3px",textTransform:"uppercase",color:"#B8A0A8"}}>Client stories</span>
        <span style={{fontSize:10,color:"#B8A0A8"}}>{cur+1} / {TESTS.length}</span>
      </div>

      {/* Content */}
      <div style={{padding:18, display:"flex", flexDirection:"column", gap:14, width:"100%", boxSizing:"border-box"}}>

        {isMobile ? (
          /* ── MOBILE: compact horizontal layout ── */
          <>
            {/* Row: small photo + name */}
            <div style={{display:"flex", alignItems:"center", gap:12, width:"100%"}}>
              <div style={{
                width:64, height:64, borderRadius:10, flexShrink:0,
                background:"linear-gradient(135deg,#4a0f22,#8B2040)",
                display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
              }}>
                {t.photo
                  ? <img src={t.photo} alt={t.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  : <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:18,fontWeight:300,color:"rgba(248,242,232,.6)"}}>{t.initials}</span>
                }
              </div>
              <div style={{minWidth:0, flex:1}}>
                <div style={{fontSize:11,fontWeight:500,color:"#1a0a0f",marginBottom:2}}>{t.name}</div>
                <div style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"#B8A0A8"}}>{t.origin}</div>
              </div>
            </div>

            {/* Quote — full width, wraps properly */}
            <p style={{
              fontFamily:"Cormorant Garamond,serif", fontSize:15, fontStyle:"italic",
              lineHeight:1.65, color:"#1a0a0f", margin:0,
              width:"100%", wordBreak:"break-word", overflowWrap:"break-word",
            }}>
              "{t.quote}"
            </p>

            {/* Dest + year */}
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              <span style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"#6B1532"}}>{t.dest}</span>
              <span style={{fontSize:10,color:"#D4BFA3"}}>·</span>
              <span style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"#B8A0A8"}}>{t.year}</span>
            </div>
          </>
        ) : (
          /* ── DESKTOP: large photo on top ── */
          <>
            <div style={{
              width:"100%", aspectRatio:"4/3", borderRadius:10, flexShrink:0,
              background:"linear-gradient(135deg,#4a0f22,#8B2040)",
              display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
            }}>
              {t.photo
                ? <img src={t.photo} alt={t.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                : <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:42,fontWeight:300,color:"rgba(248,242,232,.5)"}}>{t.initials}</span>
              }
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"#B8A0A8"}}>{t.name} · {t.origin}</div>
              <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:14,fontStyle:"italic",lineHeight:1.65,color:"#1a0a0f",margin:0}}>"{t.quote}"</p>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"#6B1532"}}>{t.dest}</span>
                <span style={{fontSize:10,color:"#D4BFA3"}}>·</span>
                <span style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"#B8A0A8"}}>{t.year}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div style={{padding:"10px 18px",borderTop:"1px solid #EDE3D4",display:"flex",alignItems:"center",gap:6,flexShrink:0,marginTop:"auto"}}>
        {TESTS.map((_,i) => (
          <button key={i} onClick={() => setCur(i)}
            style={{width:i===cur?8:5,height:i===cur?8:5,borderRadius:"50%",background:i===cur?"#6B1532":"#D4BFA3",border:"none",cursor:"pointer",transition:"all .3s",padding:0}}/>
        ))}
        <div style={{marginLeft:"auto",display:"flex",gap:4}}>
          {["‹","›"].map((a,i) => (
            <button key={i} onClick={() => setCur(c => (c+(i?1:TESTS.length-1))%TESTS.length)}
              style={{width:26,height:26,borderRadius:"50%",border:"1px solid #D4BFA3",background:"white",color:"#7a5560",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
