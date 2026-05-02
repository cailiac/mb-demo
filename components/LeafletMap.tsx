"use client";
import { useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DESTINATIONS } from "./destinations";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Pulsing marker with emoji
function makeIcon(emoji: string, active: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
        <!-- Pulse rings -->
        <div style="
          position:absolute;inset:0;border-radius:50%;
          border:2px solid ${active ? '#C9A96E' : '#6B1532'};
          animation:pulseRing 2s ease-out infinite;
          opacity:0;
        "></div>
        <div style="
          position:absolute;inset:0;border-radius:50%;
          border:2px solid ${active ? '#C9A96E' : '#6B1532'};
          animation:pulseRing 2s ease-out infinite 0.6s;
          opacity:0;
        "></div>
        <!-- Core -->
        <div style="
          width:34px;height:34px;
          background:${active ? '#C9A96E' : 'white'};
          border:2.5px solid ${active ? '#C9A96E' : '#6B1532'};
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:16px;
          box-shadow:0 2px 12px rgba(107,21,50,${active ? '.5' : '.25'});
          cursor:pointer;
          position:relative;z-index:1;
          transition:all .25s;
        ">${emoji}</div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
  });
}

// Inject pulse keyframes once
function PulseStyles() {
  useEffect(() => {
    if (document.getElementById("pulse-style")) return;
    const style = document.createElement("style");
    style.id = "pulse-style";
    style.textContent = `
      @keyframes pulseRing {
        0%  { transform: scale(0.8); opacity: 0.7; }
        70% { transform: scale(1.8); opacity: 0; }
        100%{ transform: scale(0.8); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

// Fly to selected + zoom-out button control
function MapControls({ selectedDest }: { selectedDest: string }) {
  const map = useMap();

  // Fly to selected dest
  useEffect(() => {
    if (selectedDest && DESTINATIONS[selectedDest]) {
      const d = DESTINATIONS[selectedDest];
      map.flyTo([d.lat, d.lng], 5, { animate: true, duration: 1.2 });
    }
  }, [selectedDest, map]);

  // Add zoom-out button
  useEffect(() => {
    const ZoomOutControl = L.Control.extend({
      onAdd: () => {
        const btn = L.DomUtil.create("button", "leaflet-zoomout-btn");
        btn.innerHTML = `<span title="Zoom out to world view" style="font-size:16px;">🌍</span>`;
        btn.style.cssText = `
          width:34px;height:34px;background:white;border:none;border-radius:8px;
          box-shadow:0 2px 8px rgba(0,0,0,.15);cursor:pointer;display:flex;
          align-items:center;justify-content:center;margin:0;transition:all .2s;
        `;
        btn.onmouseenter = () => { btn.style.background = "#F8F2E8"; };
        btn.onmouseleave = () => { btn.style.background = "white"; };
        L.DomEvent.on(btn, "click", (e) => {
          L.DomEvent.stopPropagation(e);
          map.flyTo([20, 20], 2, { animate: true, duration: 1.2 });
        });
        return btn;
      },
      onRemove: () => {},
    });
    const ctrl = new ZoomOutControl({ position: "topleft" });
    ctrl.addTo(map);
    return () => { ctrl.remove(); };
  }, [map]);

  return null;
}

interface Props {
  onSelect: (dest: string) => void;  // from popup "Plan this trip" → scrolls to form
  onFly?: (dest: string) => void;    // from pills → fly only, no scroll
  selectedDest: string;
}

export default function LeafletMap({ onSelect, onFly, selectedDest }: Props) {
  const popupRefs = useRef<Record<string, L.Popup>>({});

  return (
    <MapContainer
      center={[20, 20]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ flex: 1, minHeight: 400, width: "100%" }}
      attributionControl={false}
    >
      <PulseStyles />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />

      {Object.entries(DESTINATIONS).map(([key, d]) => (
        <Marker
          key={key}
          position={[d.lat, d.lng]}
          icon={makeIcon(d.emoji, selectedDest === key)}
        >
          <Popup maxWidth={340} minWidth={320} className="mb-popup">
            <div style={{ fontFamily: "Inter,sans-serif" }}>
              {/* City name in cream/beige */}
              <strong style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: 17,
                color: "#F5EDD8",
                display: "block",
                marginBottom: 3,
              }}>
                {d.emoji} {d.label}
              </strong>
              <span style={{
                fontSize: 12,
                color: "rgba(248,242,232,.55)",
                display: "block",
                marginBottom: 12,
                lineHeight: 1.4,
              }}>
                {d.desc}
              </span>
              <button
                onClick={() => onSelect(key)}
                style={{
                  background: "#6B1532",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  padding: "9px 16px",
                  fontSize: 10,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  width: "100%",
                  fontFamily: "Inter,sans-serif",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  transition: "opacity .2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = ".85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Plan this trip →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      <MapControls selectedDest={selectedDest} />
    </MapContainer>
  );
}