"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Plan a trip",   href: "#plan"  },
    { label: "Destinations",  href: "#panel" },
    { label: "About",         href: "#about" },
  ];

  return (
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:500,height:64,
        display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",
        transition:"background .5s,border-color .5s",
        background: scrolled || open ? "rgba(74,15,34,.96)" : "transparent",
        backdropFilter: scrolled || open ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled || open ? "rgba(248,242,232,.08)" : "transparent"}`,
      }}>
        {/* Logo */}
        <a href="#" style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,fontStyle:"italic",color:"#F8F2E8",textDecoration:"none",zIndex:10}}>
          Mercedes Basutto
        </a>

        {/* Desktop nav */}
        <ul className="nav-links" style={{display:"flex",gap:32,listStyle:"none"}}>
          {links.map((l,i) => (
            <li key={i}>
              <a href={l.href} style={{fontSize:11,letterSpacing:"2.5px",textTransform:"uppercase",color:"rgba(248,242,232,.45)",textDecoration:"none"}}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop WhatsApp CTA */}
        <a href="https://wa.me/971553719863" target="_blank" className="nav-cta" style={{
          fontSize:11,letterSpacing:"2px",textTransform:"uppercase",color:"#F8F2E8",
          textDecoration:"none",padding:"9px 20px",border:"1px solid rgba(248,242,232,.3)",
          borderRadius:24,display:"flex",alignItems:"center",gap:6,
        }}>
          💬 WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          style={{
            display:"none", background:"none", border:"none", cursor:"pointer",
            padding:8, zIndex:10,
          }}
          aria-label="Menu"
        >
          <div style={{
            width:22, display:"flex", flexDirection:"column", gap:5, transition:"all .3s",
          }}>
            <span style={{
              display:"block", height:1.5, background:"#F8F2E8", borderRadius:2,
              transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
              transition:"transform .3s",
            }}/>
            <span style={{
              display:"block", height:1.5, background:"#F8F2E8", borderRadius:2,
              opacity: open ? 0 : 1, transition:"opacity .2s",
            }}/>
            <span style={{
              display:"block", height:1.5, background:"#F8F2E8", borderRadius:2,
              transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
              transition:"transform .3s",
            }}/>
          </div>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className="nav-mobile-menu" style={{
        position:"fixed", top:64, left:0, right:0, zIndex:499,
        background:"rgba(74,15,34,.97)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(248,242,232,.08)",
        padding: open ? "20px 24px 28px" : "0 24px",
        maxHeight: open ? 300 : 0,
        overflow:"hidden",
        transition:"max-height .35s ease, padding .35s ease",
        display:"none",
      }}>
        <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:0}}>
          {links.map((l,i) => (
            <li key={i} style={{borderBottom:"1px solid rgba(248,242,232,.06)"}}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display:"block", padding:"16px 0",
                  fontSize:13, letterSpacing:"2.5px", textTransform:"uppercase",
                  color:"rgba(248,242,232,.7)", textDecoration:"none",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://wa.me/971553719863" target="_blank"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            marginTop:20, padding:"13px 0",
            background:"#6B1532", color:"white", borderRadius:10,
            fontSize:11, letterSpacing:"2px", textTransform:"uppercase", textDecoration:"none",
          }}
        >
          💬 WhatsApp Mercedes
        </a>
      </div>
    </>
  );
}