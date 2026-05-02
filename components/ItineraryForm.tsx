"use client";
import { useState, useEffect } from "react";
import PhoneInput from "./PhoneInput";
import { DESTINATIONS } from "./destinations";

const TRIP_TYPES = [
  {icon:"🌅",label:"Leisure",val:"leisure"},
  {icon:"💑",label:"Honeymoon",val:"honeymoon"},
  {icon:"👨‍👩‍👧",label:"Family",val:"family"},
  {icon:"💼",label:"Business",val:"business"},
  {icon:"🎉",label:"Special occasion",val:"special"},
  {icon:"🧳",label:"Solo",val:"solo"},
];
const SERVICES = [
  {icon:"✈️",label:"Flights",val:"flights"},
  {icon:"🏨",label:"Hotel",val:"hotel"},
  {icon:"🚌",label:"Transfers",val:"transfers"},
  {icon:"🚗",label:"Car hire",val:"car"},
  {icon:"🎭",label:"Activities",val:"activities"},
  {icon:"🛡️",label:"Insurance",val:"insurance"},
  {icon:"🧭",label:"Tour guide",val:"guide"},
  {icon:"🎁",label:"Special touch",val:"special_touch"},
];

interface Props { preselectedDest?: string; }

export default function ItineraryForm({ preselectedDest }: Props) {
  const [step, setStep]         = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Step 1
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nat, setNat]     = useState("");
  const [adults, setAdults]   = useState(2);
  const [children, setChild]  = useState(0);
  const [infants, setInfant]  = useState(0);
  const [tripType, setType]   = useState("leisure");

  // Step 2 — pre-filled from map
  const [dest, setDest]   = useState(preselectedDest || "");
  const [style, setStyle] = useState("");
  const [depDate, setDep] = useState("");
  const [retDate, setRet] = useState("");
  const [from, setFrom]   = useState("");
  const [stars, setStars] = useState("");

  // Step 3
  const [services, setSvcs] = useState(["flights","hotel","transfers"]);
  const [notes, setNotes]   = useState("");

  // When parent sends a new destination: stay on step 1 but pre-fill step 2
  useEffect(() => {
    if (preselectedDest) {
      setDest(preselectedDest);
      setStep(1); // always start from step 1
    }
  }, [preselectedDest]);

  const toggleSvc = (v: string) => setSvcs(s => s.includes(v) ? s.filter(x=>x!==v) : [...s,v]);

  const fi: React.CSSProperties = {
    background:"#F8F2E8", border:"1px solid #D4BFA3", borderRadius:8,
    padding:"11px 14px", fontFamily:"Inter,sans-serif", fontSize:14,
    color:"#1a0a0f", outline:"none", width:"100%",
    transition:"border-color .25s,background .25s",
  };
  const fl: React.CSSProperties = {
    fontSize:10, letterSpacing:"2px", textTransform:"uppercase" as const,
    color:"#7a5560", marginBottom:6, display:"block", fontWeight:400,
  };
  const selStyle: React.CSSProperties = {
    ...fi, appearance:"none" as const, cursor:"pointer",
    backgroundImage:`url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B1532' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:32,
  };
  const focusOn  = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => { e.target.style.borderColor="#6B1532"; e.target.style.background="white"; };
  const focusOff = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => { e.target.style.borderColor="#D4BFA3"; e.target.style.background="#F8F2E8"; };

  const Counter = ({ val, dec, inc }: { val:number; dec:()=>void; inc:()=>void }) => (
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <button onClick={dec} style={{width:28,height:28,borderRadius:"50%",border:"1.5px solid #D4BFA3",background:"white",color:"#6B1532",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
      <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:26,width:28,textAlign:"center",color:"#1a0a0f",fontWeight:400}}>{val}</span>
      <button onClick={inc} style={{width:28,height:28,borderRadius:"50%",border:"1.5px solid #D4BFA3",background:"white",color:"#6B1532",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
    </div>
  );
  const BtnNext = ({ label, onClick }: { label:string; onClick:()=>void }) => (
    <button onClick={onClick} style={{width:"100%",background:"#6B1532",color:"white",border:"none",borderRadius:10,padding:14,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif",marginTop:28}}>
      {label}
    </button>
  );
  const BtnBack = ({ onClick }: { onClick:()=>void }) => (
    <button onClick={onClick} style={{background:"white",color:"#7a5560",border:"1px solid #D4BFA3",borderRadius:10,padding:"14px 16px",fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Inter,sans-serif",marginTop:12}}>
      ← Back
    </button>
  );

  const destInfo = dest ? DESTINATIONS[dest] : null;

  if (submitted) return (
    <div style={{textAlign:"center",padding:"48px 0"}}>
      <div style={{fontSize:56,marginBottom:18}}>✈️</div>
      <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:38,fontWeight:300,marginBottom:10}}>Request sent!</h3>
      <p style={{fontSize:14,color:"#7a5560",lineHeight:1.8,marginBottom:28}}>Mercedes will review your itinerary and send you a personalised proposal within 24 hours.</p>
      <a href="https://wa.me/971553719863" target="_blank" style={{background:"#6B1532",color:"white",padding:"13px 28px",borderRadius:32,textDecoration:"none",fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500}}>
        💬 Also message on WhatsApp
      </a>
    </div>
  );

  return (
    <div>
      {/* Destination banner — shown when a dest is preselected */}
      {destInfo && (
        <div style={{
          display:"flex",alignItems:"center",gap:12,
          background:"linear-gradient(135deg,#4a0f22,#6B1532)",
          borderRadius:10,padding:"14px 18px",marginBottom:24,
          border:"1px solid rgba(201,169,110,.25)",
        }}>
          <span style={{fontSize:28}}>{destInfo.emoji}</span>
          <div>
            <p style={{fontSize:10,letterSpacing:"2.5px",textTransform:"uppercase",color:"rgba(248,242,232,.5)",marginBottom:2}}>Planning a trip to</p>
            <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,color:"#F8F2E8",fontWeight:300}}>{destInfo.label}</p>
          </div>
          <button onClick={()=>{setDest("");}} style={{marginLeft:"auto",background:"rgba(248,242,232,.1)",border:"none",color:"rgba(248,242,232,.5)",cursor:"pointer",borderRadius:6,padding:"4px 10px",fontSize:11}}>
            ✕ Change
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div style={{display:"flex",border:"1px solid #D4BFA3",borderRadius:10,overflow:"hidden",marginBottom:32}}>
        {[{n:1,l:"Travellers"},{n:2,l:"Destination"},{n:3,l:"Services"},{n:4,l:"Review"}].map(({n,l})=>(
          <div key={n} onClick={()=>n<step&&setStep(n)} style={{
            flex:1,padding:"12px 8px",textAlign:"center",fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",
            color:n===step?"#6B1532":n<step?"#6B1532":"#B8A0A8",
            background:n===step?"white":n<step?"white":"#F8F2E8",
            borderRight:n<4?"1px solid #D4BFA3":"none",
            display:"flex",flexDirection:"column",alignItems:"center",gap:5,
            cursor:n<step?"pointer":"default",transition:"all .3s",
          }}>
            <span style={{width:22,height:22,borderRadius:"50%",
              border:`1.5px solid ${n===step?"#6B1532":n<step?"#6B1532":"#D4BFA3"}`,
              fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",
              background:n<step?"#6B1532":"transparent",
              color:n<step?"white":n===step?"#6B1532":"#B8A0A8",transition:"all .3s",
            }}>{n<step?"✓":n}</span>
            {l}
          </div>
        ))}
      </div>

      {/* STEP 1: Travellers */}
      {step===1&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <div><label style={fl}>First name</label>
              <input style={fi} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" onFocus={focusOn} onBlur={focusOff}/>
            </div>
            <div><label style={fl}>Email</label>
              <input style={fi} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onFocus={focusOn} onBlur={focusOff}/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <div><label style={fl}>WhatsApp</label>
              <PhoneInput value={phone} onChange={setPhone}/>
            </div>
            <div><label style={fl}>Nationality</label>
              <input style={fi} value={nat} onChange={e=>setNat(e.target.value)} placeholder="e.g. Argentine, British..." onFocus={focusOn} onBlur={focusOff}/>
            </div>
          </div>

          <label style={{...fl,marginBottom:12}}>How many are travelling?</label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18}}>
            {[
              {ico:"👤",lbl:"Adults",sub:"18+",val:adults,dec:()=>setAdults(a=>Math.max(1,a-1)),inc:()=>setAdults(a=>a+1)},
              {ico:"🧒",lbl:"Children",sub:"2–17",val:children,dec:()=>setChild(c=>Math.max(0,c-1)),inc:()=>setChild(c=>c+1)},
              {ico:"👶",lbl:"Infants",sub:"Under 2",val:infants,dec:()=>setInfant(i=>Math.max(0,i-1)),inc:()=>setInfant(i=>i+1)},
            ].map(({ico,lbl,sub,val,dec,inc})=>(
              <div key={lbl} style={{border:"1px solid #D4BFA3",borderRadius:10,padding:14,display:"flex",flexDirection:"column",alignItems:"center",gap:10,background:"#F8F2E8"}}>
                <div style={{fontSize:24}}>{ico}</div>
                <div style={{fontSize:11,color:"#3d1520",textAlign:"center",lineHeight:1.3,fontWeight:500}}>
                  {lbl}<br/><span style={{fontSize:9,color:"#7a5560",fontWeight:300}}>{sub}</span>
                </div>
                <Counter val={val} dec={dec} inc={inc}/>
              </div>
            ))}
          </div>

          <label style={{...fl,marginBottom:12}}>Type of trip</label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
            {TRIP_TYPES.map(t=>(
              <div key={t.val} onClick={()=>setType(t.val)} style={{
                border:`1px solid ${tripType===t.val?"#6B1532":"#D4BFA3"}`,borderRadius:10,padding:"14px 10px",
                textAlign:"center",cursor:"pointer",
                background:tripType===t.val?"rgba(107,21,50,.06)":"#F8F2E8",transition:"all .25s",
              }}>
                <div style={{fontSize:24,marginBottom:5}}>{t.icon}</div>
                <div style={{fontSize:10,letterSpacing:"1px",textTransform:"uppercase",color:tripType===t.val?"#6B1532":"#3d1520",fontWeight:tripType===t.val?500:400}}>{t.label}</div>
              </div>
            ))}
          </div>
          <BtnNext label="Next: Destination & Dates →" onClick={()=>setStep(2)}/>
        </div>
      )}

      {/* STEP 2: Destination — pre-filled from map */}
      {step===2&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <div>
              <label style={fl}>Destination</label>
              <select style={selStyle} value={dest} onChange={e=>setDest(e.target.value)}>
                <option value="">Where do you want to go?</option>
                <optgroup label="Middle East & Asia">
                  {["Dubai","Maldives","Sri Lanka","Bali","Phuket","Philippines"].map(d=><option key={d} value={d}>{d}</option>)}
                </optgroup>
                <optgroup label="Europe">
                  <option value="Paris">Paris, France</option>
                  <option value="London">London, UK</option>
                </optgroup>
                <optgroup label="Latin America">
                  <option value="Mexico">México</option>
                  <option value="Buenos Aires">Buenos Aires</option>
                </optgroup>
                <option value="Other">Other destination...</option>
              </select>
            </div>
            <div>
              <label style={fl}>Trip style</label>
              <select style={selStyle} value={style} onChange={e=>setStyle(e.target.value)}>
                <option value="">Any preference...</option>
                {["City Break","Island Getaway","Cultural Immersion","Adventure","Luxury & Relaxation"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <div><label style={fl}>Departure date</label><input style={fi} type="date" value={depDate} onChange={e=>setDep(e.target.value)}/></div>
            <div><label style={fl}>Return date</label><input style={fi} type="date" value={retDate} onChange={e=>setRet(e.target.value)}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <div><label style={fl}>Departing from</label>
              <input style={fi} value={from} onChange={e=>setFrom(e.target.value)} placeholder="City or airport..." onFocus={focusOn} onBlur={focusOff}/>
            </div>
            <div>
              <label style={fl}>Hotel preference</label>
              <select style={selStyle} value={stars} onChange={e=>setStars(e.target.value)}>
                <option>No preference</option>
                <option>3★ — Good & comfortable</option>
                <option>4★ — Superior quality</option>
                <option>5★ — Luxury</option>
                <option>Boutique / Unique</option>
              </select>
            </div>
          </div>
          <div style={{display:"flex",gap:12,marginTop:28}}>
            <BtnBack onClick={()=>setStep(1)}/>
            <button onClick={()=>setStep(3)} style={{flex:1,background:"#6B1532",color:"white",border:"none",borderRadius:10,padding:14,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
              Next: Services →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Services */}
      {step===3&&(
        <div>
          <label style={{...fl,marginBottom:12}}>What do you need? Select all that apply</label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:20}}>
            {SERVICES.map(s=>(
              <div key={s.val} onClick={()=>toggleSvc(s.val)} style={{
                border:`1px solid ${services.includes(s.val)?"#6B1532":"#D4BFA3"}`,borderRadius:8,
                padding:"12px 6px",textAlign:"center",cursor:"pointer",
                background:services.includes(s.val)?"rgba(107,21,50,.06)":"#F8F2E8",transition:"all .25s",
              }}>
                <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
                <div style={{fontSize:10,letterSpacing:".5px",textTransform:"uppercase",color:services.includes(s.val)?"#6B1532":"#3d1520",fontWeight:services.includes(s.val)?500:400}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:16}}>
            <label style={fl}>Anything else Mercedes should know?</label>
            <textarea style={{...fi,minHeight:100,lineHeight:1.6,resize:"vertical"}} value={notes} onChange={e=>setNotes(e.target.value)}
              placeholder="Special requests, dietary needs, anniversaries, specific hotels in mind..."
              onFocus={e=>{(e.target as HTMLElement).style.cssText+="border-color:#6B1532;background:white;"}}
              onBlur={e=>{(e.target as HTMLElement).style.cssText+="border-color:#D4BFA3;background:#F8F2E8;"}}/>
          </div>
          <div style={{display:"flex",gap:12,marginTop:8}}>
            <BtnBack onClick={()=>setStep(2)}/>
            <button onClick={()=>setStep(4)} style={{flex:1,background:"#6B1532",color:"white",border:"none",borderRadius:10,padding:14,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
              Review request →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review */}
      {step===4&&(
        <div>
          <div style={{background:"#F8F2E8",border:"1px solid #D4BFA3",borderRadius:12,padding:22,marginBottom:18}}>
            {[
              ["Name", name||"—"],
              ["Destination", destInfo ? `${destInfo.emoji} ${destInfo.label}` : dest||"—"],
              ["Dates", depDate&&retDate?`${depDate} → ${retDate}`:"—"],
              ["Departing from", from||"—"],
              ["Travellers", `${adults} adult${adults>1?"s":""}${children?`, ${children} child${children>1?"ren":""}`:""}${infants?`, ${infants} infant${infants>1?"s":""}`:""}`],
              ["Trip type", tripType],
              ["Services", services.join(", ")||"—"],
              ["WhatsApp", phone||"—"],
            ].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #EDE3D4"}}>
                <span style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"#7a5560"}}>{l}</span>
                <span style={{fontSize:13,color:"#1a0a0f",textAlign:"right",maxWidth:"65%"}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{marginBottom:18,display:"flex",alignItems:"flex-start",gap:10}}>
            <input type="checkbox" style={{marginTop:3,accentColor:"#6B1532"}}/>
            <span style={{fontSize:13,color:"#3d1520",lineHeight:1.5}}>I agree to be contacted by Mercedes Basutto about my travel enquiry</span>
          </div>
          <button onClick={()=>setSubmitted(true)} style={{width:"100%",background:"#6B1532",color:"white",border:"none",borderRadius:10,padding:14,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
            Send my itinerary request ✈️
          </button>
          <p style={{fontSize:11,color:"#7a5560",textAlign:"center",marginTop:12}}>
            You'll hear back within 24 hours · <a href="tel:+971553719863" style={{color:"#6B1532"}}>+971 553 719 863</a>
          </p>
          <div style={{marginTop:12}}><BtnBack onClick={()=>setStep(3)}/></div>
        </div>
      )}
    </div>
  );
}
