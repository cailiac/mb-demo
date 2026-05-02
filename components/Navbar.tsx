"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:500,height:64,
      display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",
      transition:"background .5s,border-color .5s",
      background: scrolled ? "rgba(74,15,34,.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: `1px solid ${scrolled ? "rgba(248,242,232,.08)" : "transparent"}`,
    }}>
      <a href="#" style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,fontStyle:"italic",color:"#F8F2E8",textDecoration:"none"}}>
        Mercedes Basutto
      </a>
      <ul style={{display:"flex",gap:32,listStyle:"none"}}>
        {["Plan a trip","Destinations","About"].map((l,i) => (
          <li key={i}><a href={i===0?"#plan":i===1?"#panel":"#about"} style={{fontSize:11,letterSpacing:"2.5px",textTransform:"uppercase",color:"rgba(248,242,232,.45)",textDecoration:"none"}}>
            {l}
          </a></li>
        ))}
      </ul>
      <a href="https://wa.me/971553719863" target="_blank" style={{
        fontSize:11,letterSpacing:"2px",textTransform:"uppercase",color:"#F8F2E8",
        textDecoration:"none",padding:"9px 20px",border:"1px solid rgba(248,242,232,.3)",
        borderRadius:24,display:"flex",alignItems:"center",gap:6,
      }}>
        💬 WhatsApp
      </a>
    </nav>
  );
}
