"use client";
import { useState } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const EVENT_DATES: Record<string, number[]> = {
  "2026-1": [7, 14],
  "2026-5": [1, 15],
  "2026-6": [4, 24],
  "2026-7": [1, 15],
  "2026-9": [1, 15],
  "2026-11":[20, 26],
};

const START = new Date(2026, 4, 1);
const MAX_OFFSET = 7;

export default function MiniCalendar() {
  const [offset, setOffset] = useState(0);

  const d = new Date(START.getFullYear(), START.getMonth() + offset, 1);
  const year  = d.getFullYear();
  const month = d.getMonth();
  const events      = EVENT_DATES[`${year}-${month}`] || [];
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today       = new Date();

  const cell = 26; // compact fixed size

  return (
    <div style={{padding:"10px 14px",borderBottom:"1px solid #EDE3D4",flexShrink:0}}>
      {/* Month nav */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <button onClick={()=>offset>0&&setOffset(o=>o-1)}
          style={{width:24,height:24,borderRadius:"50%",border:"1px solid #D4BFA3",background:"transparent",
            color:offset<=0?"#D4BFA3":"#7a5560",fontSize:13,cursor:offset<=0?"default":"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>‹</button>
        <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:14}}>
          {MONTHS[month]} {year}
        </span>
        <button onClick={()=>offset<MAX_OFFSET&&setOffset(o=>o+1)}
          style={{width:24,height:24,borderRadius:"50%",border:"1px solid #D4BFA3",background:"transparent",
            color:offset>=MAX_OFFSET?"#D4BFA3":"#7a5560",fontSize:13,cursor:offset>=MAX_OFFSET?"default":"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>›</button>
      </div>

      {/* Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:1}}>
        {DAYS.map(d=>(
          <div key={d} style={{fontSize:8,letterSpacing:"1px",textTransform:"uppercase",
            color:"#B8A0A8",textAlign:"center",paddingBottom:3}}>
            {d}
          </div>
        ))}
        {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
        {Array.from({length:daysInMonth}).map((_,i)=>{
          const day      = i+1;
          const isToday  = day===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();
          const hasEvent = events.includes(day);
          const isWeekend= [0,6].includes(new Date(year,month,day).getDay());
          return(
            <div key={day} style={{
              width:cell,height:cell,borderRadius:"50%",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:11,margin:"1px auto",
              background:hasEvent?"#6B1532":isToday?"rgba(107,21,50,.08)":"transparent",
              color:hasEvent?"white":isToday?"#6B1532":isWeekend?"#7a5560":"#1a0a0f",
              fontWeight:hasEvent||isToday?500:300,
              cursor:hasEvent?"pointer":"default",
            }}>{day}</div>
          );
        })}
      </div>
    </div>
  );
}
