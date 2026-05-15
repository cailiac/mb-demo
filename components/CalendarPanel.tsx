"use client";
import { useState, useEffect } from "react";
import MiniCalendar from "./MiniCalendar";

const EVENTS = [
  { month:"Feb",     name:"Rio · Carnaval",           detail:"The world's biggest carnival. Hotels sell out months in advance.",       dest:"Rio de Janeiro" },
  { month:"Jun",     name:"Pantanal · Best Wildlife",  detail:"Dry season peak: jaguars, giant otters & birds most visible.",           dest:"Pantanal" },
  { month:"Jun–Jul", name:"Festa Junina",              detail:"Brazil's beloved mid-winter folk festival across the Northeast.",        dest:"Salvador" },
  { month:"Jul",     name:"Gramado · Winter Festival", detail:"Film festival, chocolate & European charm in peak season.",              dest:"Gramado" },
  { month:"Aug",     name:"Bonito · Dry Season",       detail:"Clearest waters of the year — best snorkeling in the crystal rivers.",  dest:"Bonito" },
  { month:"Oct–Nov", name:"Chapada · Waterfalls",      detail:"Rains return, waterfalls reach full flow. Ideal for trekking.",         dest:"Chapada Diamantina" },
  { month:"Dec–Jan", name:"Florianópolis · Summer",    detail:"Brazilian summer: beaches at their best, festival atmosphere.",         dest:"Florianópolis" },
];

const PACKAGES = [
  { name:"Amazon, Manaus",  nights:"7 nights · Jungle Lodge",  tags:["Flights","Lodge","River tours"], dest:"Manaus / Amazon" },
  { name:"Rio de Janeiro",  nights:"6 nights · City & Beaches",tags:["Flights","5★ Hotel","Transfers"],dest:"Rio de Janeiro" },
  { name:"Pantanal",        nights:"5 nights · Safari",        tags:["Flights","Lodge","Wildlife"],    dest:"Pantanal" },
  { name:"Florianópolis",   nights:"8 nights · Family Beach",  tags:["Flights","Beach house","Driver"],dest:"Florianópolis" },
];

interface Props { onSelect: (dest: string) => void; }

export default function CalendarPanel({ onSelect }: Props) {
  const [slide, setSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s+1)%2), 7000);
    return () => clearInterval(t);
  }, []);

  const activeList = slide === 0 ? EVENTS : PACKAGES;

  return (
    <div style={{background:"white", display:"flex", flexDirection:"column", width:"100%", boxSizing:"border-box"}}>

      {/* Header */}
      <div style={{padding:"14px 18px",borderBottom:"1px solid #EDE3D4",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <span style={{fontSize:9,letterSpacing:"3px",textTransform:"uppercase",color:"#B8A0A8"}}>Best time to travel</span>
      </div>

      {/* Mini calendar — always visible, compact on mobile */}
      <MiniCalendar />

      {/* Tab switcher */}
      <div style={{padding:"10px 16px",fontSize:9,letterSpacing:"3px",textTransform:"uppercase",color:"#B8A0A8",borderBottom:"1px solid #EDE3D4",display:"flex",justifyContent:"space-between",flexShrink:0}}>
        <span>{slide===0?"Annual events":"Signature packages"}</span>
        <span>{slide+1} / 2</span>
      </div>

      {/* List — scrollable with max height so it never overflows */}
      <div style={{width:"100%",overflowY:"auto",maxHeight:"320px"}}>
        {slide === 0
          ? EVENTS.map((e,i) => (
              <div key={i}
                style={{padding:"12px 16px",borderBottom:"1px solid #EDE3D4",cursor:"pointer"}}
                onMouseEnter={ev=>(ev.currentTarget as HTMLElement).style.background="rgba(107,21,50,.025)"}
                onMouseLeave={ev=>(ev.currentTarget as HTMLElement).style.background=""}
                onClick={()=>{onSelect(e.dest);document.getElementById("plan")?.scrollIntoView({behavior:"smooth"});}}>
                <div style={{fontSize:9,letterSpacing:"2.5px",textTransform:"uppercase",color:"#6B1532",marginBottom:3}}>{e.month}</div>
                <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:14,marginBottom:3}}>{e.name}</div>
                <div style={{fontSize:11,color:"#B8A0A8",lineHeight:1.5}}>{e.detail}</div>
                <button
                  onClick={ev=>{ev.stopPropagation();onSelect(e.dest);document.getElementById("plan")?.scrollIntoView({behavior:"smooth"});}}
                  style={{marginTop:7,fontSize:9,letterSpacing:"1.5px",textTransform:"uppercase",padding:"3px 10px",borderRadius:10,background:"rgba(107,21,50,.07)",color:"#6B1532",cursor:"pointer",border:"none"}}>
                  Plan now →
                </button>
              </div>
            ))
          : PACKAGES.map((p,i) => (
              <div key={i}
                style={{padding:"12px 16px",borderBottom:"1px solid #EDE3D4",cursor:"pointer"}}
                onMouseEnter={ev=>(ev.currentTarget as HTMLElement).style.background="rgba(107,21,50,.025)"}
                onMouseLeave={ev=>(ev.currentTarget as HTMLElement).style.background=""}
                onClick={()=>{onSelect(p.dest);document.getElementById("plan")?.scrollIntoView({behavior:"smooth"});}}>
                <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:14,fontStyle:"italic"}}>{p.name}</div>
                <div style={{fontSize:10,letterSpacing:"1px",textTransform:"uppercase",color:"#B8A0A8",margin:"2px 0 7px"}}>{p.nights}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                  {p.tags.map((tag,j) => (
                    <span key={j} style={{background:"#F8F2E8",color:"#7a5560",fontSize:10,padding:"2px 7px",borderRadius:6}}>{tag}</span>
                  ))}
                </div>
              </div>
            ))
        }
      </div>

      {/* Dots nav */}
      <div style={{padding:"12px 16px",borderTop:"1px solid #EDE3D4",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
        {[0,1].map(i => (
          <button key={i} onClick={()=>setSlide(i)}
            style={{width:i===slide?8:5,height:i===slide?8:5,borderRadius:"50%",background:i===slide?"#6B1532":"#D4BFA3",border:"none",cursor:"pointer",transition:"all .3s",padding:0}}/>
        ))}
        <button onClick={()=>setSlide(s=>(s+1)%2)}
          style={{marginLeft:"auto",width:24,height:24,borderRadius:"50%",border:"1px solid #D4BFA3",background:"white",color:"#7a5560",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          ›
        </button>
      </div>
    </div>
  );
}
