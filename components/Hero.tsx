"use client";
import { motion } from "framer-motion";

const fadeUp = { hidden:{opacity:0,y:22}, show:{opacity:1,y:0} };

export default function Hero() {
  return (
    <section style={{
      height:"100vh", minHeight:580, position:"relative", overflow:"hidden",
      background:"linear-gradient(155deg,#4a0f22 0%,#6B1532 50%,#9B2848 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    }}>
      {/* Dot pattern */}
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,.04) 1px,transparent 0)",backgroundSize:"36px 36px",pointerEvents:"none"}}/>
      {/* Orbs */}
      <div style={{position:"absolute",width:700,height:700,top:-180,right:-180,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,169,110,.12) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:400,height:400,bottom:-80,left:80,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,.05) 0%,transparent 65%)",pointerEvents:"none"}}/>

      <motion.div
        initial="hidden" animate="show"
        variants={{show:{transition:{staggerChildren:.18}}}}
        style={{position:"relative",zIndex:2,textAlign:"center",maxWidth:680,padding:"0 24px"}}
      >
        <motion.p variants={fadeUp} transition={{duration:.8,ease:[.22,1,.36,1]}}
          style={{fontSize:10,letterSpacing:"5px",textTransform:"uppercase",color:"rgba(248,242,232,.4)",marginBottom:22}}>
          Certified Travel Counsellor · Dubai, UAE
        </motion.p>
        <motion.h1 variants={fadeUp} transition={{duration:.9,ease:[.22,1,.36,1]}}
          style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(40px,8vw,88px)",fontWeight:300,lineHeight:1.05,color:"#F8F2E8",marginBottom:22}}>
          Family adventures<br/><em style={{fontStyle:"italic",color:"rgba(248,242,232,.65)"}}>in Brazil.</em>
        </motion.h1>
        <motion.p variants={fadeUp} transition={{duration:.8,ease:[.22,1,.36,1]}}
          style={{fontSize:15,color:"rgba(248,242,232,.55)",lineHeight:1.8,marginBottom:40,maxWidth:440,marginLeft:"auto",marginRight:"auto"}}>
          17 years crafting unforgettable journeys across Brazil — every itinerary 100% personalized for your family.
        </motion.p>
        <motion.div variants={fadeUp} transition={{duration:.8,ease:[.22,1,.36,1]}} className="hero-buttons">
          <a href="#plan" style={{background:"#F8F2E8",color:"#6B1532",fontSize:11,letterSpacing:"2px",textTransform:"uppercase",fontWeight:500,padding:"13px 28px",borderRadius:32,textDecoration:"none",display:"inline-block"}}>
            Build my itinerary
          </a>
          <a href="https://wa.me/971553719863" target="_blank" style={{background:"transparent",color:"#F8F2E8",fontSize:11,letterSpacing:"2px",textTransform:"uppercase",padding:"13px 28px",borderRadius:32,border:"1px solid rgba(248,242,232,.3)",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8}}>
            💬 WhatsApp me
          </a>
        </motion.div>
      </motion.div>

      {/* Stats bar — 4 cols desktop, 2×2 mobile via CSS */}
      <motion.div
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:1}}
        className="hero-stats"
      >
        {[["500+","Families"],["17","Years Experience"],["24/7","Support"],["100%","Personalized"]].map(([n,l],i)=>(
          <div key={i} className="hero-stat-item">
            <div className="hero-stat-num">{n}</div>
            <div className="hero-stat-label">{l}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <div style={{position:"absolute",bottom:68,left:"50%",transform:"translateX(-50%)",zIndex:4,cursor:"pointer"}}
        onClick={()=>document.getElementById("panel")?.scrollIntoView({behavior:"smooth"})}>
        <div style={{width:1,height:44,background:"linear-gradient(to bottom,rgba(248,242,232,.35),transparent)",margin:"0 auto"}}/>
      </div>
    </section>
  );
}
