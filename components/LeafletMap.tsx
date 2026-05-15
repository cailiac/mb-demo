"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DESTINATIONS } from "./destinations";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ── Pure SVG marker — mathematically perfect circles, no CSS transform issues ──
function makeIcon(active: boolean) {
  const dot    = active ? "#C9A96E" : "#6B1532";
  const ring   = active ? "#C9A96E" : "#6B1532";
  const dotFill = active ? "#C9A96E" : "#F8F2E8";

  return L.divIcon({
    className: "",
    html: `<svg
      width="44" height="44"
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      style="display:block;overflow:visible;line-height:0;">
      <!-- Ring 1 -->
      <circle cx="22" cy="22" r="7" fill="none" stroke="${ring}" stroke-width="1.5">
        <animate attributeName="r"       values="7;20"   dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0"  dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <!-- Ring 2 delayed -->
      <circle cx="22" cy="22" r="7" fill="none" stroke="${ring}" stroke-width="1.5">
        <animate attributeName="r"       values="7;20"   dur="2.5s" begin="1.1s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0"  dur="2.5s" begin="1.1s" repeatCount="indefinite"/>
      </circle>
      <!-- Solid dot -->
      <circle cx="22" cy="22" r="7"
        fill="${dotFill}"
        stroke="${dot}"
        stroke-width="2"
        style="filter:drop-shadow(0 2px 4px rgba(107,21,50,.35))"/>
    </svg>`,
    iconSize:    [44, 44],
    iconAnchor:  [22, 22],
    popupAnchor: [0, -22],
  });
}

const WORLD_CENTER: [number, number] = [20, 0]; // Centrado entre Europa y África
const INITIAL_ZOOM = 2; // Zoom alejado para ver todo el mapa

// ── Fix mobile: call invalidateSize after map mounts ──
function MapReady() {
  const map = useMap();
  useEffect(() => {
    // Small delay so the container has its final CSS dimensions
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

function MapController({ selectedDest }: { selectedDest: string }) {
  const map = useMap();
  const controlAdded = useRef(false);

  // Zoom-out button
  useEffect(() => {
    if (controlAdded.current) return;
    controlAdded.current = true;
    // World icon — SVG globe, zoom to full world centered
    const ZoomOut = L.Control.extend({
      onAdd() {
        const btn = L.DomUtil.create("button");
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5" stroke="#6B1532" stroke-width="1.2"/><ellipse cx="8" cy="8" rx="3" ry="6.5" stroke="#6B1532" stroke-width="1.2"/><line x1="1.5" y1="8" x2="14.5" y2="8" stroke="#6B1532" stroke-width="1.2"/><line x1="2.5" y1="5" x2="13.5" y2="5" stroke="#6B1532" stroke-width="0.9"/><line x1="2.5" y1="11" x2="13.5" y2="11" stroke="#6B1532" stroke-width="0.9"/></svg>`;
        btn.title = "View full world";
        btn.style.cssText =
          "width:32px;height:32px;background:white;border:none;border-radius:8px;" +
          "box-shadow:0 2px 8px rgba(0,0,0,.15);cursor:pointer;display:flex;" +
          "align-items:center;justify-content:center;margin-left:12px;";
        btn.onmouseenter = ()=>{ btn.style.background="#F8F2E8"; };
        btn.onmouseleave = ()=>{ btn.style.background="white"; };
        L.DomEvent.on(btn, "click", e => {
          L.DomEvent.stopPropagation(e);
          map.flyTo([20, 0], 2, { duration: 1.2 });
        });
        return btn;
      },
      onRemove() {},
    });
    new ZoomOut({ position: "topleft" }).addTo(map);

    // Fullscreen button
    const FullscreenCtrl = L.Control.extend({
      onAdd() {
        const btn = L.DomUtil.create("button");
        btn.innerHTML = `<span style="font-size:14px;color:#6B1532;" title="Fullscreen">⛶</span>`;
        let isFull = false;
        btn.style.cssText =
          "width:32px;height:32px;background:white;border:none;border-radius:8px;" +
          "box-shadow:0 2px 8px rgba(0,0,0,.15);cursor:pointer;display:flex;" +
          "align-items:center;justify-content:center;margin-left:12px;";
        L.DomEvent.on(btn, "click", e => {
          L.DomEvent.stopPropagation(e);
          const container = map.getContainer();
          if (!isFull) {
            container.requestFullscreen?.() || (container as any).webkitRequestFullscreen?.();
            btn.innerHTML = `<span style="font-size:14px;color:#6B1532;">✕</span>`;
            isFull = true;
          } else {
            document.exitFullscreen?.() || (document as any).webkitExitFullscreen?.();
            btn.innerHTML = `<span style="font-size:14px;color:#6B1532;">⛶</span>`;
            isFull = false;
          }
          setTimeout(() => map.invalidateSize(), 300);
        });
        return btn;
      },
      onRemove() {},
    });
    new FullscreenCtrl({ position: "topleft" }).addTo(map);
  }, [map]);

  // Fly to selected destination
  useEffect(() => {
    if (selectedDest && DESTINATIONS[selectedDest]) {
      const d = DESTINATIONS[selectedDest];
      map.flyTo([d.lat, d.lng], 6, { duration: 1.2 });
    }
  }, [selectedDest, map]);

  return null;
}

interface Props {
  onSelect: (dest: string) => void;
  onFly?: (dest: string) => void;
  selectedDest: string;
}

export default function LeafletMap({ onSelect, selectedDest }: Props) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={false}
      worldCopyJump={false}
      maxBounds={[[-85, -180], [85, 180]]}
      maxBoundsViscosity={1.0}
      minZoom={2}
      style={{ flex: 1, minHeight: 380, width: "100%", height: "100%" }}
      attributionControl={false}
    >
      <MapReady />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />

      {Object.entries(DESTINATIONS).map(([key, d]) => (
        <Marker
          key={key}
          position={[d.lat, d.lng]}
          icon={makeIcon(selectedDest === key)}
        >
          <Popup maxWidth={300} minWidth={260} className="mb-popup">
            <div style={{ fontFamily: "Inter, sans-serif", padding: "4px 0" }}>
              <strong style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 20,
                fontWeight: 400,
                color: "#F5EDD8",
                display: "block",
                marginBottom: 6,
                lineHeight: 1.2,
              }}>
                {d.label}
              </strong>
              <span style={{
                fontSize: 13,
                color: "rgba(248,242,232,.62)",
                display: "block",
                marginBottom: 16,
                lineHeight: 1.55,
              }}>
                {d.desc}
              </span>
              <button
                onClick={() => onSelect(key)}
                style={{
                  background: "#6B1532",
                  color: "white",
                  border: "none",
                  borderRadius: 7,
                  padding: "11px 18px",
                  fontSize: 10,
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  width: "100%",
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
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

      <MapController selectedDest={selectedDest} />
    </MapContainer>
  );
}
