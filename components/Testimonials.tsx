"use client";
import { useState, useEffect } from "react";

const TESTS = [
  { emoji:"🌊", stars:5, quote:"I always dreamt of a honeymoon in the Maldives. Mercedes made every single detail perfect — from the overwater villa to the sunset cruise.", name:"Silvia & Marco H.", dest:"Austria · Maldives 2024" },
  { emoji:"🗼", stars:5, quote:"Our Paris trip was magical. The Pullman Tour Eiffel was stunning and the private transfer made everything effortless.", name:"Raul & Clelia B.", dest:"Argentina · Paris Oct 2026" },
  { emoji:"🌺", stars:5, quote:"Bali with three kids felt daunting. Mercedes turned it into the best family holiday we've ever had — she knew what we needed before we did.", name:"The Williams Family", dest:"UK · Bali Dec 2025" },
];

export default function Testimonials() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c+1)%TESTS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTS[cur];

  return (
    <div style={{background:"white",borderRight:"1px solid #EDE3D4",display:"flex",flexDirection:"column",overflow:"hidden",minHeight:600}}>
      {/* Header */}
      <div style={{padding:"14px 18px",borderBottom:"1px solid #EDE3D4",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <span style={{fontSize:9,letterSpacing:"3px",textTransform:"uppercase",color:"#B8A0A8"}}>Client stories</span>
        <span style={{fontSize:10,color:"#B8A0A8"}}>{cur+1} / {TESTS.length}</span>
      </div>

      {/* Slide */}
      <div style={{flex:1,padding:18,display:"flex",flexDirection:"column",gap:12,overflow:"hidden"}}>
        {/* Photo placeholder */}
        <div style={{width:"100%",aspectRatio:"4/3",borderRadius:10,background:"linear-gradient(135deg,#4a0f22,#8B2040)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,flexShrink:0}}>
          {t.emoji}
        </div>
        <div style={{color:"#C9A96E",fontSize:12,letterSpacing:"3px"}}>{"★".repeat(t.stars)}</div>
        <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:14,fontStyle:"italic",lineHeight:1.65,color:"#1a0a0f",flex:1}}>
          "{t.quote}"
        </p>
        <div>
          <div style={{fontSize:11,fontWeight:500,color:"#1a0a0f"}}>{t.name}</div>
          <div style={{fontSize:10,letterSpacing:"1px",textTransform:"uppercase",color:"#B8A0A8",marginTop:1}}>{t.dest}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{padding:"10px 18px",borderTop:"1px solid #EDE3D4",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
        {TESTS.map((_,i)=>(
          <button key={i} onClick={()=>setCur(i)}
            style={{width:i===cur?8:5,height:i===cur?8:5,borderRadius:"50%",background:i===cur?"#6B1532":"#D4BFA3",border:"none",cursor:"pointer",transition:"all .3s",padding:0}}/>
        ))}
        <div style={{marginLeft:"auto",display:"flex",gap:4}}>
          {["‹","›"].map((a,i)=>(
            <button key={i} onClick={()=>setCur(c=>(c+(i?1:TESTS.length-1))%TESTS.length)}
              style={{width:26,height:26,borderRadius:"50%",border:"1px solid #D4BFA3",background:"white",color:"#7a5560",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
