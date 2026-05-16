"use client";

import { motion, Variants } from "framer-motion";
import { Activity, Target, ShieldCheck } from "lucide-react";

interface AboutClientProps {
  settings: Record<string, string>;
}

export default function AboutClient({ settings }: AboutClientProps) {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 overflow-hidden selection:bg-brand-cyan/30">
      {/* Hero Banner */}
      <section className="relative py-20 mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-clinical via-cyan-50/30 to-white -z-10"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[80px] -z-10 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[80px] -z-10 translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-cyan-100 text-brand-blue font-medium text-sm mb-6 shadow-sm">
              <Activity size={16} />
              <span>Our Story</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold font-sora mb-6 text-brand-navy">
              About PADOWA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Health Care</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-brand-navy/70 leading-relaxed font-light">
              {settings.about_us || "A premium doctor-led pharmaceutical organization committed to delivering quality-driven and innovative healthcare solutions."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-10 md:p-14 rounded-[2.5rem] border-t-4 border-t-brand-blue bg-gradient-to-b from-white/80 to-white/40 hover:shadow-xl transition-shadow duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mb-8 shadow-sm border border-blue-100/50">
              <Target size={32} className="text-brand-blue" />
            </div>
            <h2 className="text-3xl font-bold font-sora mb-6 text-brand-navy">Our Vision</h2>
            <p className="text-brand-navy/70 text-lg leading-relaxed italic font-light">
              "{settings.our_vision || "To build a future-ready healthcare organization recognized for innovation, trust, and excellence in pharmaceutical care."}"
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="glass-card p-10 md:p-14 rounded-[2.5rem] border-t-4 border-t-brand-cyan bg-gradient-to-b from-white/80 to-white/40 hover:shadow-xl transition-shadow duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 flex items-center justify-center mb-8 shadow-sm border border-cyan-100/50">
              <Activity size={32} className="text-brand-cyan" />
            </div>
            <h2 className="text-3xl font-bold font-sora mb-6 text-brand-navy">Our Mission</h2>
            <p className="text-brand-navy/70 text-lg leading-relaxed font-light">
              {settings.mission || "To deliver trusted pharmaceutical solutions through scientific excellence, quality-focused innovation, and ethical healthcare practices."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-sora mb-12 text-brand-navy">Leadership & Trust</motion.h2>
            <motion.div variants={fadeInUp} className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-cyan"></div>
              <ShieldCheck size={120} className="absolute -top-10 -right-10 text-brand-clinical/50 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10">
                <svg className="w-10 h-10 text-brand-cyan/40 mb-6 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="text-xl md:text-2xl text-brand-navy/80 mb-10 leading-relaxed font-light">
                  {settings.leadership || "PADOWA Health Care is built on the foundation of clinical expertise and ethical practices. As a doctor-led organization, our focus remains on patient-centered care and accessible pharmaceutical solutions that make a real difference."}
                </p>
                <div className="flex flex-col items-center gap-2">
                  <p className="font-sora font-bold text-xl text-brand-navy">Dr. Prasanth, <span className="text-sm font-normal text-brand-navy/60">Pharm.D</span></p>
                  <p className="font-sora font-bold text-xl text-brand-navy">Dr. Praveen, <span className="text-sm font-normal text-brand-navy/60">Pharm.D</span></p>
                  <div className="mt-4 px-4 py-1.5 rounded-full bg-orange-50 border border-brand-orange/20">
                    <p className="text-brand-orange font-semibold text-xs tracking-[0.2em] uppercase">Founders</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
