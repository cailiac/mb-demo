"use client";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import MapPanel from "@/components/MapPanel";
import CalendarPanel from "@/components/CalendarPanel";
import ItineraryForm from "@/components/ItineraryForm";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedDest, setSelectedDest] = useState("");
  const [flyDest, setFlyDest] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  // Called from popup "Plan this trip" → set dest + scroll to form
  const handleSelect = (dest: string) => {
    setSelectedDest(dest);
    setFlyDest(dest);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  // Called from pills / calendar → fly on map only, no scroll to form
  const handleFly = (dest: string) => {
    setFlyDest(dest);
    setSelectedDest(dest);
  };

  return (
    <>
      <Navbar />
      <Hero />

      {/* 3-COLUMN PANEL: 1/4 | 2/4 | 1/4 — responsive via CSS */}
      <div id="panel">
        <Testimonials />
        <MapPanel onSelect={handleSelect} onFly={handleFly} selectedDest={flyDest} />
        <CalendarPanel onSelect={handleFly} />
      </div>

      {/* FORM SECTION */}
      <section id="plan" ref={formRef} style={{ background: "white", borderTop: "2px solid #EDE3D4" }}>
        <div className="form-section-pad">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .7 }}
            style={{ fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: "#6B1532", marginBottom: 12 }}>
            Itinerary Builder
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .7, delay: .08 }}
            style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(30px,4vw,46px)", fontWeight: 300, marginBottom: 8 }}>
            Build your trip request
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .7, delay: .16 }}
            style={{ fontSize: 14, color: "#7a5560", lineHeight: 1.75, marginBottom: 32 }}>
            Fill in the details — Mercedes will send you a personalised itinerary and quote within 24 hours.
          </motion.p>
          <ItineraryForm preselectedDest={selectedDest} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#4a0f22", padding: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div>
          <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 20, fontStyle: "italic", color: "#F8F2E8" }}>Mercedes Basutto</p>
          <p style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(248,242,232,.4)", marginTop: 4 }}>Certified Travel Counsellor · Dubai</p>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Plan a trip","Destinations","About"].map((l,i)=>(
            <a key={i} href="#" style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(248,242,232,.4)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "rgba(248,242,232,.2)" }}>© 2026 Mercedes Basutto · Travel Counsellors Dubai</p>
      </footer>
    </>
  );
}
