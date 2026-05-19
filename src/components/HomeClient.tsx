"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";

interface HomeClientProps {
  heroSettings: Record<string, string>;
  informations: any[];
  divisions: any[];
}

const getIconComponent = (iconName: string | undefined, nameText: string, size = 24) => {
  if (iconName) {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) return <IconComponent size={size} />;
  }

  // Fallback to name-based matching
  const n = nameText.toLowerCase();
  if (n.includes('gastro')) return <Icons.Activity size={size} />;
  if (n.includes('ortho')) return <Icons.ShieldCheck size={size} />;
  if (n.includes('pedi')) return <Icons.Baby size={size} />;
  if (n.includes('cardio')) return <Icons.Heart size={size} />;
  if (n.includes('neuro')) return <Icons.Zap size={size} />;
  if (n.includes('mission')) return <Icons.Award size={size} />;
  if (n.includes('aim') || n.includes('vision')) return <Icons.Target size={size} />;
  if (n.includes('leadership')) return <Icons.Stethoscope size={size} />;
  if (n.includes('about')) return <Icons.Activity size={size} />;
  if (n.includes('excel') || n.includes('science')) return <Icons.Activity size={size} />;
  if (n.includes('ethic')) return <Icons.ShieldCheck size={size} />;
  if (n.includes('qual')) return <Icons.Award size={size} />;
  return <Icons.Lightbulb size={size} />;
};

export default function HomeClient({ heroSettings, informations, divisions }: HomeClientProps) {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  const badge = heroSettings?.hero_badge || "Doctor-Led Healthcare Organization";
  const titleMain = heroSettings?.hero_title_main || "Innovating Healthcare With ";
  const titleHighlight = heroSettings?.hero_title_highlight || "Care & Clinical Excellence";
  const description = heroSettings?.hero_description || "Delivering trusted pharmaceutical solutions through scientific excellence, quality-focused innovation, and ethical healthcare practices.";

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <main ref={containerRef} className="min-h-screen pt-24 overflow-hidden relative selection:bg-brand-cyan/30">
      {/* SECTION 2 - HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-10 pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-50/80 via-white to-blue-50/80 opacity-80"></div>
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-200/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-brand-blue font-medium text-sm shadow-sm">
                  <Icons.ShieldCheck size={16} />
                  <span>{badge}</span>
                </motion.div>
                {heroSettings?.hero_budget && (
                  <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50/80 backdrop-blur-sm border border-orange-100 text-brand-orange font-medium text-sm shadow-sm">
                    <Icons.Award size={16} />
                    <span>{heroSettings.hero_budget}</span>
                  </motion.div>
                )}
              </div>
              
              <motion.h1 
                variants={fadeInUp} 
                style={{ y: y1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-sora leading-tight mb-6 text-brand-navy"
              >
                {titleMain} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">{titleHighlight}</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-brand-navy/70 mb-10 leading-relaxed max-w-xl font-light">
                {description}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/divisions" className="hover-trigger px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all flex items-center gap-2">
                  Explore Divisions <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="hover-trigger px-8 py-4 bg-white/80 backdrop-blur-sm text-brand-navy border border-gray-200 rounded-xl font-medium hover:border-brand-orange hover:text-brand-orange hover:shadow-md transition-all">
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block h-[600px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                  className="relative w-full max-w-md aspect-square rounded-full border border-cyan-200/40 flex items-center justify-center bg-gradient-to-tr from-cyan-50/10 to-transparent"
                >
                  <div className="absolute w-[80%] h-[80%] rounded-full border border-blue-200/40 animate-[spin_30s_linear_infinite]"></div>
                  <div className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-cyan-100/50 to-blue-50/50 backdrop-blur-3xl border border-white/60 flex items-center justify-center shadow-2xl">
                    <Icons.Activity size={80} className="text-brand-blue/30" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LATEST INFORMATION SECTION */}
      <section className="py-24 relative z-10 -mt-10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-sora mb-4 text-brand-navy">Latest Updates & Information</motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-navy/60 font-light">Stay updated with our latest medical breakthroughs and organizational news.</motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(informations || []).slice(0, 3).map((info, i) => (
              <motion.div variants={fadeInUp} key={i} className="glass-card rounded-[2rem] p-8 group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-white/60 bg-white/60 backdrop-blur-lg">
                <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 transition-transform">
                  {getIconComponent(undefined, info.category, 20)}
                </div>
                <p className="text-brand-cyan font-medium text-xs tracking-wider uppercase mb-3">{info.category}</p>
                <h3 className="text-xl font-bold font-sora mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">{info.title}</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed mb-6 font-light line-clamp-3">{info.desc}</p>
                <Link 
                  href={info.link || "#"} 
                  target={info.link?.startsWith('http') ? "_blank" : "_self"}
                  className="text-brand-blue font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all opacity-80 group-hover:opacity-100"
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - DIVISIONS SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-sora mb-4 text-brand-navy">Our Specialized Divisions</motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-navy/60 font-light">Comprehensive healthcare solutions tailored for specific therapeutic segments.</motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {(divisions || []).map((div, i) => (
              <motion.div variants={fadeInUp} key={i} className="hover-trigger relative p-8 rounded-[2rem] border border-gray-100/80 bg-white hover:border-brand-orange/30 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-3 transition-all duration-500 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-clinical group-hover:bg-orange-50 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 group-hover:text-brand-orange transition-all duration-300 shadow-sm border border-brand-cyan/10 group-hover:border-brand-orange/20">
                    {getIconComponent(div.icon, div.name, 28)}
                  </div>
                  <h3 className="text-xl font-bold font-sora mb-3 group-hover:text-brand-blue transition-colors duration-300">{div.name}</h3>
                  <p className="text-brand-navy/60 text-sm mb-6 font-light line-clamp-3">{div.description || "Comprehensive healthcare solutions tailored for this therapeutic segment."}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - FLOATING INFORMATION SECTION */}
      <section className="py-24 bg-brand-clinical relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-sora mb-4 text-brand-navy">Who We Are</motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-navy/60 font-light">The foundation, mission, and vision driving PADOWA Health Care forward.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "About Us",
                desc: heroSettings.about_us || "A doctor-led pharmaceutical organization committed to delivering quality-driven and innovative healthcare solutions.",
              },
              {
                title: "Our Mission",
                desc: heroSettings.mission || "To deliver trusted pharmaceutical solutions through scientific excellence, quality-focused innovation, and ethical practices.",
              },
              {
                title: "Our Aim",
                desc: heroSettings.aim || "To contribute toward healthier communities by providing accessible, reliable, and quality-driven pharmaceutical care.",
              },
              {
                title: "Leadership",
                desc: heroSettings.leadership || "Founded by Dr. Prasanth, Pharm.D and Dr. Praveen, Pharm.D. Science-driven and patient-centered.",
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                style={{ y: i % 2 === 0 ? y1 : y2 }}
              >
                <motion.div 
                  whileHover={{ y: -15, scale: 1.03 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white/80 backdrop-blur-sm border border-white shadow-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 p-8 rounded-[2rem] group h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 group-hover:from-orange-50 group-hover:to-orange-100 flex items-center justify-center mb-6 transition-all duration-500 shadow-sm border border-cyan-100 group-hover:border-brand-orange/30">
                    <div className="text-brand-cyan group-hover:text-brand-orange transition-colors duration-300">
                      {getIconComponent(undefined, item.title, 28)}
                    </div>
                  </div>
                  <h3 className="font-sora font-bold text-xl mb-3 group-hover:text-brand-blue transition-colors duration-300">{item.title}</h3>
                  <p className="text-brand-navy/70 text-sm leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES SECTION (Moved from About Page to Homepage Bottom) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-sora mb-4 text-brand-navy">Our Core Values</motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-navy/60 font-light">The fundamental principles that drive our commitment to healthcare excellence.</motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { title: heroSettings.cv1_title || "Scientific Excellence", desc: heroSettings.cv1_desc || "Rigorous research and clinical focus in every formulation.", icon: heroSettings.cv1_icon },
              { title: heroSettings.cv2_title || "Ethical Practices", desc: heroSettings.cv2_desc || "Transparency and integrity in all our healthcare operations.", icon: heroSettings.cv2_icon },
              { title: heroSettings.cv3_title || "Quality Driven", desc: heroSettings.cv3_desc || "Uncompromising standards maintaining WHO-GMP quality.", icon: heroSettings.cv3_icon }
            ].map((val, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -15, scale: 1.03 }}
                className="text-center p-10 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-50 to-blue-50 group-hover:from-orange-50 group-hover:to-orange-100 flex items-center justify-center text-brand-cyan group-hover:text-brand-orange mb-8 transition-all duration-500 shadow-sm border border-cyan-100 group-hover:border-brand-orange/30">
                  {getIconComponent(val.icon, val.title, 32)}
                </div>
                <h3 className="text-xl font-bold font-sora mb-4 text-brand-navy group-hover:text-brand-blue transition-colors duration-300">{val.title}</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed font-light">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}
