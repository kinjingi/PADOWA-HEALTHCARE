"use client";

import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { useState } from "react";
import { createInquiry } from "@/app/admin/actions";

export default function DistributorInquiry() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;
    const type = formData.get("type") as string;
    const division = formData.get("division") as string;
    const msg = formData.get("message") as string;
    
    const combinedMessage = `Partner Type: ${type}\nInterested Division: ${division}\nLocation: ${city}, ${state}\n\nAdditional Details: ${msg}`;
    formData.set("message", combinedMessage);
    
    await createInquiry(formData);
    setLoading(false);
    setSuccess(true);
    e.currentTarget.reset();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <main className="min-h-screen pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Handshake size={40} className="text-brand-blue" />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-sora mb-6 text-brand-navy"
          >
            Partner With Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-navy/70 leading-relaxed"
          >
            Join our growing network of distributors and franchise partners. Together, we can deliver quality healthcare to every corner.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-[2.5rem]"
        >
          <h3 className="font-sora font-bold text-2xl mb-8 border-b border-gray-100 pb-4">Distributor Inquiry Form</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">Name *</label>
                <input name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">Company/Firm Name *</label>
                <input name="company" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">Phone Number *</label>
                <input name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">Email Address *</label>
                <input name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">State *</label>
                <input name="state" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">City *</label>
                <input name="city" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">Business Type</label>
                <select name="type" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue appearance-none">
                  <option value="PCD Franchise">PCD Franchise</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">Interested Division</label>
                <select name="division" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue appearance-none">
                  <option value="All Divisions">All Divisions</option>
                  <option value="Gastro">Gastro</option>
                  <option value="Ortho">Ortho</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Cardio">Cardio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy/80 mb-2">Additional Message</label>
              <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" placeholder="Tell us more about your requirements..."></textarea>
            </div>

            <button disabled={loading} type="submit" className="w-full py-4 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover-trigger mt-4 disabled:opacity-50">
              {loading ? "Submitting..." : success ? "Inquiry Submitted Successfully!" : "Submit Inquiry"}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
