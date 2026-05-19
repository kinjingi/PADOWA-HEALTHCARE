"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Link from "next/link";

interface Division {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

const getIconComponent = (iconName: string | undefined, nameText: string, size = 32) => {
  if (iconName) {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) return <IconComponent size={size} />;
  }

  const n = nameText.toLowerCase();
  if (n.includes('gastro')) return <Icons.Activity size={size} />;
  if (n.includes('ortho')) return <Icons.ShieldCheck size={size} />;
  if (n.includes('pedi')) return <Icons.Baby size={size} />;
  if (n.includes('cardio')) return <Icons.Heart size={size} />;
  if (n.includes('neuro')) return <Icons.Zap size={size} />;
  return <Icons.Lightbulb size={size} />;
};

export default function DivisionsClient({ divisions }: { divisions: any[] }) {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-sora mb-6 text-brand-navy"
          >
            Our Divisions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-navy/70 leading-relaxed"
          >
            Explore our specialized therapeutic segments dedicated to addressing specific medical needs with clinical precision.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {divisions.map((div, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 rounded-3xl group hover:border-brand-cyan/50"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-clinical flex items-center justify-center text-brand-blue group-hover:scale-110 group-hover:text-brand-cyan transition-all">
                  {getIconComponent(div.icon, div.name)}
                </div>
              </div>
              <h2 className="text-2xl font-bold font-sora mb-3">{div.name} Care</h2>
              <p className="text-brand-navy/60 mb-2 leading-relaxed">{div.description || "Comprehensive healthcare solutions tailored for this therapeutic segment."}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
