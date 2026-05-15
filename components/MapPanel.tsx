"use client";
import dynamic from "next/dynamic";
import { DESTINATIONS } from "./destinations";

const MapComponent = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div style={{ flex: 1, background: "#F8F2E8" }} />
  ),
});

interface Props {
  onSelect: (dest: string) => void;
  onFly: (dest: string) => void;
  selectedDest: string;
}

export default function MapPanel({ onSelect, onFly, selectedDest }: Props) {
  return (
    // height:100% fills the grid cell (580px on desktop, auto on mobile)
    // overflow:hidden clips any accidental overflow
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#F8F2E8",
        borderRight: "1px solid #EDE3D4",
        overflow: "hidden",
      }}
    >
      {/* HEADER — fixed height */}
      <div
        style={{
          padding: "13px 20px",
          borderBottom: "1px solid #EDE3D4",
          background: "white",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 9,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#B8A0A8",
          }}
        >
          Where do you want to go?
        </span>
      </div>

      {/* MAP — flex:1 fills ALL remaining space between header and pills */}
      <div
        style={{
          flex: "1 1 0",   // ← grows to fill whatever space is left
          position: "relative",
          overflow: "hidden",
          minHeight: 0,    // ← required: lets flex shrink below content size
        }}
      >
        <MapComponent onSelect={onSelect} selectedDest={selectedDest} />
      </div>

      {/* PILLS — fixed height */}
      <div
        className="map-pills"
        style={{
          flexShrink: 0,
          padding: "10px 14px",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          background: "white",
          borderTop: "1px solid #EDE3D4",
        }}
      >
        {Object.keys(DESTINATIONS).map((key) => (
          <button
            key={key}
            onClick={() => onFly(key)}
            style={{
              background: selectedDest === key ? "#6B1532" : "#F8F2E8",
              color: selectedDest === key ? "white" : "#6B1532",
              border: `1px solid ${selectedDest === key ? "#6B1532" : "#D4BFA3"}`,
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 11,
              cursor: "pointer",
              transition: "all .2s",
              whiteSpace: "nowrap",
            }}
          >
            {DESTINATIONS[key].label.split(",")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}