"use client";
import { useState } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// Dates with events (month 0-indexed)
const EVENT_DATES: Record<string, number[]> = {
  "2026-4": [15,22],
  "2026-5": [5,12,20],
  "2026-6": [4,18],
  "2026-7": [8,22],
  "2026-9": [12],
  "2026-10":[14,28],
};

const START = new Date(2026, 4, 1); // May 2026
const MAX_OFFSET = 5;

export default function MiniCalendar() {
  const [offset, setOffset] = useState(0);
  const d = new Date(START.getFullYear(), START.getMonth() + offset, 1);
  const year = d.getFullYear();
  const month = d.getMonth();
  const key = `${year}-${month}`;
  const events = EVENT_DATES[key] || [];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const today = new Date();

  return (
    <div style={{padding:"14px 16px",borderBottom:"1px solid #EDE3D4",flexShrink:0}}>
      {/* Month nav */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <button onClick={()=>offset>0&&setOffset(o=>o-1)}
          style={{width:24,height:24,borderRadius:"50%",border:"1px solid #D4BFA3",background:"transparent",color:offset<=0?"#D4BFA3":"#7a5560",fontSize:13,cursor:offset<=0?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          ‹
        </button>
        <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:15}}>
          {MONTHS[month]} {year}
        </span>
        <button onClick={()=>offset<MAX_OFFSET&&setOffset(o=>o+1)}
          style={{width:24,height:24,borderRadius:"50%",border:"1px solid #D4BFA3",background:"transparent",color:offset>=MAX_OFFSET?"#D4BFA3":"#7a5560",fontSize:13,cursor:offset>=MAX_OFFSET?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          ›
        </button>
      </div>

      {/* Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
        {DAYS.map(d=>(
          <div key={d} style={{fontSize:9,letterSpacing:"1px",textTransform:"uppercase",color:"#B8A0A8",textAlign:"center",padding:"3px 0"}}>
            {d}
          </div>
        ))}
        {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
        {Array.from({length:daysInMonth}).map((_,i)=>{
          const day = i+1;
          const isToday = day===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();
          const hasEvent = events.includes(day);
          const isWeekend = [0,6].includes(new Date(year,month,day).getDay());
          return (
            <div key={day} style={{
              width:28,height:28,borderRadius:"50%",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:11,margin:"1px auto",
              background: hasEvent ? "#6B1532" : isToday ? "rgba(107,21,50,.08)" : "transparent",
              color: hasEvent ? "white" : isToday ? "#6B1532" : isWeekend ? "#7a5560" : "#1a0a0f",
              fontWeight: hasEvent||isToday ? 500 : 300,
              cursor: hasEvent ? "pointer" : "default",
              transition:"all .2s",
            }}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
