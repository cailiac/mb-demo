"use client";
import dynamic from "next/dynamic";
import { DESTINATIONS } from "./destinations";

const MapComponent = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div style={{flex:1,minHeight:380,display:"flex",alignItems:"center",justifyContent:"center",background:"#e8dece",color:"#7a5560",fontSize:13,gap:8}}>
      <span style={{fontSize:20}}>🗺️</span> Loading map...
    </div>
  )
});

interface Props {
  onSelect: (dest: string) => void; // called from popup "Plan this trip"
  onFly: (dest: string) => void;    // called from pills: just fly, don't scroll to form
  selectedDest: string;
}

export default function MapPanel({ onSelect, onFly, selectedDest }: Props) {
  return (
    <div style={{background:"#F8F2E8",display:"flex",flexDirection:"column",borderRight:"1px solid #EDE3D4"}}>
      <div style={{padding:"13px 20px",borderBottom:"1px solid #EDE3D4",background:"white",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <span style={{fontSize:9,letterSpacing:"3px",textTransform:"uppercase",color:"#B8A0A8"}}>Where do you want to go?</span>
        <span style={{fontSize:11,color:"#7a5560"}}>✦ Click a destination</span>
      </div>

      <MapComponent onSelect={onSelect} onFly={onFly} selectedDest={selectedDest} />

      <div style={{padding:"10px 14px",background:"white",borderTop:"1px solid #EDE3D4",display:"flex",flexWrap:"wrap",gap:5,flexShrink:0}}>
        {Object.keys(DESTINATIONS).map(key => (
          <button key={key} onClick={() => onFly(key)}
            style={{
              background: selectedDest===key ? "#6B1532" : "#F8F2E8",
              color: selectedDest===key ? "white" : "#6B1532",
              border: `1px solid ${selectedDest===key ? "#6B1532" : "#D4BFA3"}`,
              borderRadius:20, padding:"4px 12px", fontSize:11, cursor:"pointer",
              transition:"all .2s", whiteSpace:"nowrap",
            }}>
            {DESTINATIONS[key].label.split(",")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
