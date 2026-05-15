"use client";
import { useState, useEffect } from "react";
import PhoneInput from "./PhoneInput";
import { DESTINATIONS } from "./destinations";

// Destinations grouped by region — hardcoded to match the map exactly
const DEST_GROUPS: {region:string; cities:string[]}[] = [
  { region:"Middle East",   cities:["Dubai","Abu Dhabi"] },
  { region:"Indian Ocean",  cities:["Maldives","Mauritius"] },
  { region:"Asia",          cities:["Sri Lanka","Bali","Phuket","Singapore","Tokyo","Kyoto","Osaka","Hakone","Hanoi","Helsinki"] },
  { region:"Europe",        cities:["Florence","Pisa","Rome","Dubrovnik","Crete","Mykonos","Lisbon"] },
  { region:"Americas",      cities:["New York","Cancún","Buenos Aires"] },
  { region:"Africa",        cities:["Cape Town"] },
];

const MONTHS      = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WHEN_OPT    = ["Next month","In 2–3 months","In 3–6 months","In 6–12 months","Not sure yet"];
const FLEX_CHIPS  = ["Exact dates","± 3 days","± 1 week","± 2 weeks","± 1 month"];
const TRIP_TYPES  = [{label:"Leisure",val:"leisure"},{label:"Honeymoon",val:"honeymoon"},{label:"Family",val:"family"},{label:"Business",val:"business"},{label:"Special occasion",val:"special"},{label:"Solo",val:"solo"}];
const SERVICES    = [{label:"Flights",val:"flights"},{label:"Hotel",val:"hotel"},{label:"Transfers",val:"transfers"},{label:"Car hire",val:"car"},{label:"Activities",val:"activities"},{label:"Insurance",val:"insurance"},{label:"Tour guide",val:"guide"},{label:"Special touch",val:"special_touch"}];

function getMonthsFor(when: string): string[] {
  const m = new Date().getMonth();
  const range: Record<string,[number,number]> = {
    "Next month":    [1,1], "In 2–3 months":[2,3],
    "In 3–6 months":[3,6], "In 6–12 months":[6,12],
  };
  if (!range[when]) return MONTHS;
  const [from, to] = range[when];
  const result: string[] = [];
  for (let i=from; i<=to; i++) result.push(MONTHS[(m+i)%12]);
  return result;
}

interface Props { preselectedDest?: string; }

export default function ItineraryForm({ preselectedDest }: Props) {
  const [step, setStep]         = useState(1);
  const [submitted, setSubmit]  = useState(false);

  // Step 1
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nat, setNat]     = useState("");
  const [adults, setAd]   = useState(2);
  const [children, setCh] = useState(0);
  const [infants, setIn]  = useState(0);
  const [tripType, setTT] = useState("leisure");

  // Step 2
  const [dest, setDest]             = useState(preselectedDest||"");
  const [multiCity, setMultiCity]   = useState(false);
  const [extraCities, setExtra]     = useState<string[]>([]);
  const [addingCity, setAddingCity] = useState("");
  const [style, setStyle]           = useState("");
  const [dateMode, setDateMode]     = useState("fixed");
  const [depDate, setDep]           = useState("");
  const [retDate, setRet]           = useState("");
  const [flexRange, setFlex]        = useState("Exact dates");
  const [undWhen, setUndWhen]       = useState("");
  const [undMonth, setUndMonth]     = useState("");
  const [from, setFrom]             = useState("");
  const [stars, setStars]           = useState("");

  // Step 3
  const [services, setSvcs] = useState(["flights","hotel","transfers"]);
  const [notes, setNotes]   = useState("");

  useEffect(()=>{
    if(preselectedDest){ setDest(preselectedDest); setStep(1); }
  },[preselectedDest]);

  const toggleSvc = (v:string)=>setSvcs(s=>s.includes(v)?s.filter(x=>x!==v):[...s,v]);

  // ── Shared styles ──────────────────────────────────────────────
  const cream = "#F8F2E8";
  const wine  = "#6B1532";
  const fi: React.CSSProperties = {
    background:cream, border:"1px solid #D4BFA3", borderRadius:8,
    padding:"11px 14px", fontFamily:"Inter,sans-serif", fontSize:14,
    color:"#1a0a0f", outline:"none", width:"100%", transition:"border-color .25s,background .25s",
  };
  const selFi: React.CSSProperties = {
    ...fi, appearance:"none" as const, cursor:"pointer",
    backgroundImage:`url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B1532' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", paddingRight:32,
  };
  const fl: React.CSSProperties = {
    fontSize:10, letterSpacing:"2px", textTransform:"uppercase" as const,
    color:"#7a5560", marginBottom:6, display:"block",
  };
  const fo = (e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>)=>{e.target.style.borderColor=wine;e.target.style.background="white";};
  const fb = (e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>)=>{e.target.style.borderColor="#D4BFA3";e.target.style.background=cream;};

  // ── Sub-components ─────────────────────────────────────────────
  const Counter = ({val,dec,inc}:{val:number;dec:()=>void;inc:()=>void})=>(
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <button onClick={dec} style={{width:28,height:28,borderRadius:"50%",border:"1.5px solid #D4BFA3",background:"white",color:wine,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
      <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:26,width:28,textAlign:"center",color:"#1a0a0f"}}>{val}</span>
      <button onClick={inc} style={{width:28,height:28,borderRadius:"50%",border:"1.5px solid #D4BFA3",background:"white",color:wine,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
    </div>
  );

  const ModeBtn = ({mode,label,sub}:{mode:string;label:string;sub:string})=>(
    <div onClick={()=>setDateMode(mode)} style={{
      flex:1, padding:"14px 12px", textAlign:"center", cursor:"pointer",
      border:`1px solid ${dateMode===mode?wine:"#D4BFA3"}`,
      borderRadius:10, background:dateMode===mode?"rgba(107,21,50,.04)":cream,
      transition:"all .2s",
    }}>
      <div style={{fontSize:13,fontWeight:500,color:dateMode===mode?wine:"#3d1520",marginBottom:3}}>{label}</div>
      <div style={{fontSize:11,color:"#B8A0A8"}}>{sub}</div>
    </div>
  );

  const BtnNext = ({label,onClick}:{label:string;onClick:()=>void})=>(
    <button onClick={onClick} style={{width:"100%",background:wine,color:"white",border:"none",borderRadius:10,padding:14,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif",marginTop:28}}>
      {label}
    </button>
  );
  const BtnBack = ({onClick}:{onClick:()=>void})=>(
    <button onClick={onClick} style={{background:"white",color:"#7a5560",border:"1px solid #D4BFA3",borderRadius:10,padding:"14px 16px",fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Inter,sans-serif",marginTop:12}}>
      ← Back
    </button>
  );

  // destInfo not needed — using dest string directly
  const allCities = Object.keys(DESTINATIONS).filter(k=>k!==dest&&!extraCities.includes(k));

  if(submitted) return(
    <div style={{textAlign:"center",padding:"48px 0"}}>
      <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:48,marginBottom:18}}>✈</div>
      <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:38,fontWeight:300,marginBottom:10}}>Request sent!</h3>
      <p style={{fontSize:14,color:"#7a5560",lineHeight:1.8,marginBottom:28}}>Mercedes will review your itinerary and get back to you within 24 hours.</p>
      <a href="https://wa.me/971553719863" target="_blank" style={{background:wine,color:"white",padding:"13px 28px",borderRadius:32,textDecoration:"none",fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500}}>
        Message on WhatsApp
      </a>
    </div>
  );

  return(
    <div>
      {/* ── Progress bar ── */}
      <div style={{display:"flex",border:"1px solid #D4BFA3",borderRadius:10,overflow:"hidden",marginBottom:32}}>
        {[{n:1,l:"Travellers"},{n:2,l:"Destination"},{n:3,l:"Services"},{n:4,l:"Review"}].map(({n,l})=>(
          <div key={n} onClick={()=>n<step&&setStep(n)} style={{
            flex:1, padding:"12px 8px", textAlign:"center", fontSize:10, letterSpacing:"1.5px", textTransform:"uppercase",
            color:n===step?wine:n<step?wine:"#B8A0A8",
            background:n===step?"white":n<step?"white":cream,
            borderRight:n<4?"1px solid #D4BFA3":"none",
            display:"flex", flexDirection:"column", alignItems:"center", gap:5,
            cursor:n<step?"pointer":"default", transition:"all .3s",
          }}>
            <span style={{
              width:22, height:22, borderRadius:"50%",
              border:`1.5px solid ${n===step?wine:n<step?wine:"#D4BFA3"}`,
              fontSize:11, display:"flex", alignItems:"center", justifyContent:"center",
              background:n<step?wine:"transparent",
              color:n<step?"white":n===step?wine:"#B8A0A8", transition:"all .3s",
            }}>{n<step?"✓":n}</span>
            {l}
          </div>
        ))}
      </div>

      {/* ── STEP 1: Travellers ── */}
      {step===1&&(
        <div>
          {/* Destination banner */}
          {dest&&dest!=="Other"&&(
            <div style={{display:"flex",alignItems:"center",gap:14,background:"linear-gradient(135deg,#4a0f22,#6B1532)",borderRadius:10,padding:"14px 18px",marginBottom:20,border:"1px solid rgba(201,169,110,.2)"}}>
              <div>
                <p style={{fontSize:10,letterSpacing:"2.5px",textTransform:"uppercase",color:"rgba(248,242,232,.5)",marginBottom:2}}>Planning a trip to</p>
                <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,color:"#F5EDD8",fontWeight:300}}>
                  {dest}{extraCities.length>0?" + "+extraCities.join(", "):""}
                </p>
              </div>
              <button onClick={()=>{setDest("");setExtra([]);}} style={{marginLeft:"auto",background:"rgba(248,242,232,.1)",border:"none",color:"rgba(248,242,232,.45)",cursor:"pointer",borderRadius:6,padding:"4px 10px",fontSize:12}}>
                Change
              </button>
            </div>
          )}

          <div className="form-row-2">
            <div><label style={fl}>First name</label><input style={fi} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" onFocus={fo} onBlur={fb}/></div>
            <div><label style={fl}>Email</label><input style={fi} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onFocus={fo} onBlur={fb}/></div>
          </div>
          <div className="form-row-2">
            <div><label style={fl}>WhatsApp</label><PhoneInput value={phone} onChange={setPhone}/></div>
            <div><label style={fl}>Nationality</label><input style={fi} value={nat} onChange={e=>setNat(e.target.value)} placeholder="e.g. Argentine, British..." onFocus={fo} onBlur={fb}/></div>
          </div>

          <label style={{...fl,marginBottom:12}}>How many are travelling?</label>
          <div className="form-row-3" style={{marginBottom:18}}>
            {[
              {lbl:"Adults",sub:"18+",val:adults,dec:()=>setAd(a=>Math.max(1,a-1)),inc:()=>setAd(a=>a+1)},
              {lbl:"Children",sub:"2–17",val:children,dec:()=>setCh(c=>Math.max(0,c-1)),inc:()=>setCh(c=>c+1)},
              {lbl:"Infants",sub:"Under 2",val:infants,dec:()=>setIn(i=>Math.max(0,i-1)),inc:()=>setIn(i=>i+1)},
            ].map(({lbl,sub,val,dec,inc})=>(
              <div key={lbl} style={{border:"1px solid #D4BFA3",borderRadius:10,padding:14,display:"flex",flexDirection:"column",alignItems:"center",gap:10,background:cream}}>
                <div style={{fontSize:12,fontWeight:500,color:"#3d1520",textAlign:"center"}}>
                  {lbl}<br/><span style={{fontSize:10,color:"#B8A0A8",fontWeight:300}}>{sub}</span>
                </div>
                <Counter val={val} dec={dec} inc={inc}/>
              </div>
            ))}
          </div>

          <label style={{...fl,marginBottom:12}}>Type of trip</label>
          <div className="form-row-3" style={{marginBottom:20}}>
            {TRIP_TYPES.map(t=>(
              <div key={t.val} onClick={()=>setTT(t.val)} style={{
                border:`1px solid ${tripType===t.val?wine:"#D4BFA3"}`,
                borderRadius:10, padding:"13px 10px", textAlign:"center", cursor:"pointer",
                background:tripType===t.val?"rgba(107,21,50,.05)":cream, transition:"all .25s",
              }}>
                <div style={{fontSize:12,letterSpacing:"0.5px",color:tripType===t.val?wine:"#3d1520",fontWeight:tripType===t.val?500:300}}>{t.label}</div>
              </div>
            ))}
          </div>
          <BtnNext label="Next: Destination & Dates →" onClick={()=>setStep(2)}/>
        </div>
      )}

      {/* ── STEP 2: Destination ── */}
      {step===2&&(
        <div>

          {/* Primary destination + style */}
          <div className="form-row-2" style={{marginBottom:16}}>
            <div>
              <label style={fl}>Destination</label>
              <select style={selFi} value={dest} onChange={e=>{setDest(e.target.value);setExtra([]);setMultiCity(false);}}>
                <option value="">Where do you want to go?</option>
                {DEST_GROUPS.map(({region,cities})=>(
                  <optgroup key={region} label={region}>
                    {cities.map(c=><option key={c} value={c}>{c}</option>)}
                  </optgroup>
                ))}
                <option value="Other">Other destination...</option>
              </select>
            </div>
            <div>
              <label style={fl}>Trip style</label>
              <select style={selFi} value={style} onChange={e=>setStyle(e.target.value)}>
                <option value="">Any preference...</option>
                {["City Break","Island Getaway","Cultural Immersion","Adventure","Luxury & Relaxation"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Multi-city section */}
          {dest && dest!=="Other" && (
            <div style={{marginBottom:18,padding:"14px 16px",background:cream,borderRadius:10,border:"1px solid #EDE3D4"}}>

              {/* Toggle */}
              <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:multiCity?14:0}}>
                <div
                  onClick={()=>{setMultiCity(!multiCity);setExtra([]);}}
                  style={{
                    width:38,height:22,borderRadius:11,
                    background:multiCity?wine:"#D4BFA3",
                    position:"relative",transition:"background .25s",cursor:"pointer",flexShrink:0,
                  }}>
                  <div style={{
                    position:"absolute",top:3,left:multiCity?18:3,
                    width:16,height:16,borderRadius:"50%",background:"white",
                    transition:"left .25s",boxShadow:"0 1px 3px rgba(0,0,0,.2)",
                  }}/>
                </div>
                <span style={{fontSize:13,color:"#3d1520"}}>Combining multiple cities?</span>
              </label>

              {/* City picker */}
              {multiCity && (
                <div>
                  {/* Selected extra cities */}
                  {extraCities.length>0&&(
                    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
                      {extraCities.map(c=>(
                        <div key={c} style={{
                          display:"flex",alignItems:"center",gap:8,
                          background:"white",border:`1px solid ${wine}`,
                          borderRadius:8,padding:"6px 12px",fontSize:13,color:wine,
                        }}>
                          {DESTINATIONS[c]?.label||c}
                          <button onClick={()=>setExtra(p=>p.filter(x=>x!==c))} style={{
                            background:"none",border:"none",cursor:"pointer",
                            color:"#B8A0A8",fontSize:16,lineHeight:1,padding:0,
                            display:"flex",alignItems:"center",
                          }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dropdown to add a city */}
                  {extraCities.length < 4 && (
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <select
                        style={{...selFi,flex:1,fontSize:13,color:addingCity?"#1a0a0f":"#B8A0A8"}}
                        value={addingCity}
                        onChange={e=>setAddingCity(e.target.value)}
                      >
                        <option value="">Add a city...</option>
                        {DEST_GROUPS.map(({region,cities})=>{
                          const available = cities.filter(k=>k!==dest&&!extraCities.includes(k));
                          if(!available.length) return null;
                          return(
                            <optgroup key={region} label={region}>
                              {available.map(c=><option key={c} value={c}>{c}</option>)}
                            </optgroup>
                          );
                        })}
                      </select>
                      <button
                        onClick={()=>{if(addingCity){setExtra(p=>[...p,addingCity]);setAddingCity("");}}}
                        disabled={!addingCity}
                        style={{
                          padding:"11px 18px",borderRadius:8,border:"none",fontSize:12,
                          letterSpacing:"1px",textTransform:"uppercase",cursor:addingCity?"pointer":"default",
                          background:addingCity?wine:"#D4BFA3",color:"white",
                          transition:"background .2s",whiteSpace:"nowrap",fontFamily:"Inter,sans-serif",
                        }}>
                        Add
                      </button>
                    </div>
                  )}
                  {extraCities.length>=4&&(
                    <p style={{fontSize:12,color:"#B8A0A8",marginTop:4}}>Maximum of 4 cities reached.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Date section ── */}
          <div style={{marginBottom:16}}>
            <label style={{...fl,marginBottom:10}}>When are you thinking of travelling?</label>
            <div style={{display:"flex",gap:10,marginBottom:16}}>
              <ModeBtn mode="fixed"     label="Fixed dates"  sub="I know my dates"/>
              <ModeBtn mode="undecided" label="Not decided"  sub="Still planning"/>
            </div>

            {dateMode==="fixed"&&(
              <div>
                <div className="form-row-2" style={{marginBottom:14}}>
                  <div><label style={fl}>Departure</label><input style={fi} type="date" value={depDate} onChange={e=>setDep(e.target.value)}/></div>
                  <div><label style={fl}>Return</label><input style={fi} type="date" value={retDate} onChange={e=>setRet(e.target.value)}/></div>
                </div>
                <div>
                  <label style={{...fl,marginBottom:8}}>I'm flexible by</label>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {FLEX_CHIPS.map(r=>(
                      <button key={r} onClick={()=>setFlex(r)} style={{
                        padding:"7px 16px",borderRadius:20,fontSize:12,cursor:"pointer",transition:"all .2s",
                        background:flexRange===r?wine:cream,
                        color:flexRange===r?"white":wine,
                        border:`1px solid ${flexRange===r?wine:"#D4BFA3"}`,
                      }}>{r}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {dateMode==="undecided"&&(
              <div className="form-row-2">
                <div>
                  <label style={fl}>Roughly when?</label>
                  <select style={selFi} value={undWhen} onChange={e=>{setUndWhen(e.target.value);setUndMonth("");}}>
                    <option value="">Select a timeframe...</option>
                    {WHEN_OPT.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={fl}>Any preferred month?</label>
                  <select style={selFi} value={undMonth} onChange={e=>setUndMonth(e.target.value)}>
                    <option value="">No preference</option>
                    {getMonthsFor(undWhen).map(m=><option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="form-row-2">
            <div><label style={fl}>Departing from</label><input style={fi} value={from} onChange={e=>setFrom(e.target.value)} placeholder="City or airport..." onFocus={fo} onBlur={fb}/></div>
            <div>
              <label style={fl}>Hotel preference</label>
              <select style={selFi} value={stars} onChange={e=>setStars(e.target.value)}>
                <option>No preference</option>
                <option>3 stars — Good & comfortable</option>
                <option>4 stars — Superior quality</option>
                <option>5 stars — Luxury</option>
                <option>Boutique / Unique</option>
              </select>
            </div>
          </div>

          <div style={{display:"flex",gap:12,marginTop:28}}>
            <BtnBack onClick={()=>setStep(1)}/>
            <button onClick={()=>setStep(3)} style={{flex:1,background:wine,color:"white",border:"none",borderRadius:10,padding:14,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
              Next: Services →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Services ── */}
      {step===3&&(
        <div>
          <label style={{...fl,marginBottom:12}}>What do you need? Select all that apply</label>
          <div className="svc-grid" style={{marginBottom:20}}>
            {SERVICES.map(s=>(
              <div key={s.val} onClick={()=>toggleSvc(s.val)} style={{
                border:`1px solid ${services.includes(s.val)?wine:"#D4BFA3"}`,
                borderRadius:8, padding:"13px 10px", textAlign:"center", cursor:"pointer",
                background:services.includes(s.val)?"rgba(107,21,50,.05)":cream, transition:"all .25s",
              }}>
                <div style={{fontSize:12,letterSpacing:"0.5px",color:services.includes(s.val)?wine:"#3d1520",fontWeight:services.includes(s.val)?500:300}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:16}}>
            <label style={fl}>Anything else Mercedes should know?</label>
            <textarea
              style={{...fi,minHeight:100,lineHeight:1.6,resize:"vertical"}}
              value={notes} onChange={e=>setNotes(e.target.value)}
              placeholder="Special requests, dietary needs, anniversaries, specific hotels in mind..."
              onFocus={fo as any} onBlur={fb as any}
            />
          </div>
          <div style={{display:"flex",gap:12,marginTop:8}}>
            <BtnBack onClick={()=>setStep(2)}/>
            <button onClick={()=>setStep(4)} style={{flex:1,background:wine,color:"white",border:"none",borderRadius:10,padding:14,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
              Review request →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Review ── */}
      {step===4&&(
        <div>
          <div style={{background:cream,border:"1px solid #D4BFA3",borderRadius:12,padding:22,marginBottom:18}}>
            {[
              ["Name",         name||"—"],
              ["Destination",  dest ? dest+(extraCities.length>0?" + "+extraCities.join(", "):"") : "—"],
              ["Dates",        dateMode==="fixed"&&depDate&&retDate?`${depDate} → ${retDate} (${flexRange})`:undWhen||(undMonth?`Approx. ${undMonth}`:"")||"—"],
              ["Departing from",from||"—"],
              ["Travellers",   `${adults} adult${adults>1?"s":""}${children?`, ${children} child${children>1?"ren":""}`:""  }${infants?`, ${infants} infant${infants>1?"s":""}`:""}`],
              ["Trip type",    tripType],
              ["Services",     services.join(", ")||"—"],
              ["WhatsApp",     phone||"—"],
            ].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #EDE3D4"}}>
                <span style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"#7a5560"}}>{l}</span>
                <span style={{fontSize:13,color:"#1a0a0f",textAlign:"right",maxWidth:"65%"}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{marginBottom:18,display:"flex",alignItems:"flex-start",gap:10}}>
            <input type="checkbox" style={{marginTop:3,accentColor:wine}}/>
            <span style={{fontSize:13,color:"#3d1520",lineHeight:1.5}}>I agree to be contacted by Mercedes Basutto about my travel enquiry</span>
          </div>
          <button onClick={()=>setSubmit(true)} style={{width:"100%",background:wine,color:"white",border:"none",borderRadius:10,padding:14,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
            Send my itinerary request
          </button>
          <p style={{fontSize:11,color:"#7a5560",textAlign:"center",marginTop:12}}>
            You'll hear back within 24 hours · <a href="tel:+971553719863" style={{color:wine}}>+971 553 719 863</a>
          </p>
          <div style={{marginTop:12}}><BtnBack onClick={()=>setStep(3)}/></div>
        </div>
      )}

      <style>{`
        .form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
        .form-row-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        .svc-grid   { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
        @media(max-width:640px){
          .form-row-2 { grid-template-columns:1fr; }
          .form-row-3 { grid-template-columns:1fr 1fr; }
          .svc-grid   { grid-template-columns:1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
