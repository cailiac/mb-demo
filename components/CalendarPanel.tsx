"use client";
import { useState, useEffect } from "react";
import MiniCalendar from "./MiniCalendar";

const EVENTS = [
  { month:"May 2026", name:"Dubai · Summer Escapes", detail:"Curated getaways for Dubai residents before peak summer heat.", dest:"Dubai" },
  { month:"Jun 2026", name:"Maldives · Last Availability", detail:"Peak honeymoon season closing. Overwater villas nearly full.", dest:"Maldives" },
  { month:"Jul – Aug 2026", name:"Europe · Summer Season", detail:"Paris, London, Rome — best weather. Book early for July.", dest:"Paris" },
  { month:"Oct 12, 2026", name:"Paris · Celine Dion Concert", detail:"5 nights · Pullman Tour Eiffel · Air France · Private transfers.", dest:"Paris" },
];

const PACKAGES = [
  { name:"Paris, France", nights:"7 nights · City of Light", tags:["✈️ Flights","🏨 5★","🚗 Transfers"], dest:"Paris" },
  { name:"Maldives", nights:"7 nights · Overwater Villa", tags:["✈️ Flights","🏝️ Villa","🤿 Activities"], dest:"Maldives" },
  { name:"Bali, Indonesia", nights:"10 nights · Family Villa", tags:["✈️ Flights","🏡 Villa","🚗 Driver"], dest:"Bali" },
  { name:"Phuket, Thailand", nights:"8 nights · Beach Resort", tags:["✈️ Flights","🏖️ Resort","🚤 Islands"], dest:"Phuket" },
];

interface Props { onSelect: (dest: string) => void; }

export default function CalendarPanel({ onSelect }: Props) {
  const [slide, setSlide] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=>setSlide(s=>(s+1)%2), 7000);
    return ()=>clearInterval(t);
  },[]);

  return (
    <div style={{background:"white",display:"flex",flexDirection:"column",overflow:"hidden",minHeight:600}}>
      {/* Header */}
      <div style={{padding:"14px 18px",borderBottom:"1px solid #EDE3D4",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <span style={{fontSize:9,letterSpacing:"3px",textTransform:"uppercase",color:"#B8A0A8"}}>Next 6 months</span>
      </div>

      {/* Mini calendar */}
      <MiniCalendar />

      {/* Events / Packages label */}
      <div style={{padding:"10px 16px",fontSize:9,letterSpacing:"3px",textTransform:"uppercase",color:"#B8A0A8",borderBottom:"1px solid #EDE3D4",display:"flex",justifyContent:"space-between",flexShrink:0}}>
        <span>{slide===0?"Upcoming events":"Signature packages"}</span>
        <span>{slide+1} / 2</span>
      </div>

      {/* Slides */}
      <div style={{flex:1,overflow:"hidden",position:"relative"}}>
        {/* Events slide */}
        <div style={{position:"absolute",inset:0,opacity:slide===0?1:0,transform:slide===0?"translateX(0)":"translateX(16px)",transition:"opacity .5s,transform .5s",pointerEvents:slide===0?"auto":"none",overflowY:"auto"}}>
          {EVENTS.map((e,i)=>(
            <div key={i} style={{padding:"12px 16px",borderBottom:"1px solid #EDE3D4",cursor:"pointer",position:"relative"}}
              onMouseEnter={ev=>{(ev.currentTarget as HTMLElement).style.background="rgba(107,21,50,.025)";}}
              onMouseLeave={ev=>{(ev.currentTarget as HTMLElement).style.background="";}}
              onClick={()=>{onSelect(e.dest);document.getElementById("plan")?.scrollIntoView({behavior:"smooth"});}}>
              <div style={{fontSize:9,letterSpacing:"2.5px",textTransform:"uppercase",color:"#6B1532",marginBottom:3}}>{e.month}</div>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:14,marginBottom:3}}>{e.name}</div>
              <div style={{fontSize:11,color:"#B8A0A8",lineHeight:1.5}}>{e.detail}</div>
              <button onClick={ev=>{ev.stopPropagation();onSelect(e.dest);document.getElementById("plan")?.scrollIntoView({behavior:"smooth"});}}
                style={{marginTop:7,fontSize:9,letterSpacing:"1.5px",textTransform:"uppercase",padding:"3px 10px",borderRadius:10,background:"rgba(107,21,50,.07)",color:"#6B1532",cursor:"pointer",border:"none",transition:"all .2s"}}>
                Plan now →
              </button>
            </div>
          ))}
        </div>

        {/* Packages slide */}
        <div style={{position:"absolute",inset:0,opacity:slide===1?1:0,transform:slide===1?"translateX(0)":"translateX(16px)",transition:"opacity .5s,transform .5s",pointerEvents:slide===1?"auto":"none",overflowY:"auto"}}>
          {PACKAGES.map((p,i)=>(
            <div key={i} style={{padding:"12px 16px",borderBottom:"1px solid #EDE3D4",cursor:"pointer"}}
              onMouseEnter={ev=>{(ev.currentTarget as HTMLElement).style.background="rgba(107,21,50,.025)";}}
              onMouseLeave={ev=>{(ev.currentTarget as HTMLElement).style.background="";}}
              onClick={()=>{onSelect(p.dest);document.getElementById("plan")?.scrollIntoView({behavior:"smooth"});}}>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:14,fontStyle:"italic"}}>{p.name}</div>
              <div style={{fontSize:10,letterSpacing:"1px",textTransform:"uppercase",color:"#B8A0A8",margin:"2px 0 7px"}}>{p.nights}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {p.tags.map((tag,j)=>(
                  <span key={j} style={{background:"#F8F2E8",color:"#7a5560",fontSize:10,padding:"2px 7px",borderRadius:6}}>{tag}</span>
                ))}
              </div>
              <button style={{marginTop:7,fontSize:9,letterSpacing:"1.5px",textTransform:"uppercase",color:"#6B1532",background:"none",border:"none",cursor:"pointer",padding:0}}>
                Request →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div style={{padding:"8px 16px",borderTop:"1px solid #EDE3D4",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
        {[0,1].map(i=>(
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
