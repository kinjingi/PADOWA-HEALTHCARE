"use client";

import { motion } from "framer-motion";
import { Search, Filter, Activity } from "lucide-react";
import Link from "next/link";

export default function Products() {
  const products = [
    { name: "Pandowa DSR", comp: "Pantoprazole 40mg + Domperidone 30mg", div: "Gastro", form: "Capsule", pack: "10x10 Alu-Alu" },
    { name: "Acedowa P", comp: "Aceclofenac 100mg + Paracetamol 325mg", div: "Ortho", form: "Tablet", pack: "10x10 Blister" },
    { name: "Cefdowa 200", comp: "Cefixime 200mg", div: "General", form: "Tablet", pack: "10x10 Alu-Alu" },
    { name: "Podowa 200", comp: "Cefpodoxime 200mg", div: "General", form: "Tablet", pack: "10x10 Alu-Alu" },
    { name: "Moxdowa CV", comp: "Amoxicillin 500mg + Clavulanic Acid 125mg", div: "General", form: "Tablet", pack: "10x6 Alu-Alu" },
    { name: "Rabedowa DSR", comp: "Rabeprazole 20mg + Domperidone 30mg", div: "Gastro", form: "Capsule", pack: "10x10 Alu-Alu" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-brand-clinical">
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-8 gap-6">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold font-sora mb-4 text-brand-navy"
            >
              Our Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-brand-navy/70"
            >
              Comprehensive range of quality-assured pharmaceutical formulations.
            </motion.p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search molecules..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-brand-navy font-medium transition-colors">
              <Filter size={18} />
              <span className="hidden md:inline">Filter</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-clinical to-cyan-50/30 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="text-brand-cyan/20 group-hover:scale-110 group-hover:text-brand-cyan/40 transition-all duration-500">
                  <Activity size={80} />
                </div>
                <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-wide rounded-full text-brand-blue shadow-sm">
                  {prod.div}
                </span>
              </div>
              
              <h3 className="text-xl font-bold font-sora mb-1 text-brand-navy">{prod.name}</h3>
              <p className="text-sm text-brand-navy/60 mb-4 h-10">{prod.comp}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs font-medium bg-gray-50 text-brand-navy/70 px-3 py-1.5 rounded-lg border border-gray-100">{prod.form}</span>
                <span className="text-xs font-medium bg-gray-50 text-brand-navy/70 px-3 py-1.5 rounded-lg border border-gray-100">{prod.pack}</span>
              </div>
              
              <button className="w-full py-3 rounded-xl bg-brand-clinical text-brand-blue font-medium hover:bg-brand-blue hover:text-white transition-colors group-hover:shadow-md hover-trigger">
                View Full Details
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
