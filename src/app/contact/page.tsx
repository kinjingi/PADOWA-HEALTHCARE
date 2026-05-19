"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { createInquiry } from "@/app/admin/actions";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    contact_address: "123 Health Avenue, Medical District, City, Country 123456",
    contact_phone: "+91 1234567890",
    contact_email: "info@padowahealthcare.com",
  });

  useEffect(() => {
    fetch("/api/settings?keys=contact_address,contact_phone,contact_email")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setSettings(prev => ({
            ...prev,
            ...Object.fromEntries(Object.entries(data).filter(([_, v]) => Boolean(v)))
          }));
        }
      })
      .catch(err => console.error("Error loading contact settings:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    const formData = new FormData(form);
    await createInquiry(formData);
    setLoading(false);
    setSuccess(true);
    form.reset();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <main className="min-h-screen pt-32 pb-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-sora mb-6 text-brand-navy"
          >
            Connect With Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-navy/70 leading-relaxed"
          >
            We'd love to hear from you. Reach out to us for any inquiries, partnerships, or product information.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 rounded-3xl flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-brand-cyan shrink-0">
                <MapPin />
              </div>
              <div>
                <h3 className="font-sora font-bold text-xl mb-2">Corporate Office</h3>
                <p className="text-brand-navy/60 leading-relaxed whitespace-pre-line">
                  {settings.contact_address}
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-brand-cyan shrink-0">
                <Phone />
              </div>
              <div>
                <h3 className="font-sora font-bold text-xl mb-2">Contact Numbers</h3>
                <p className="text-brand-navy/60">{settings.contact_phone}</p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-brand-cyan shrink-0">
                <Mail />
              </div>
              <div>
                <h3 className="font-sora font-bold text-xl mb-2">Email Addresses</h3>
                <p className="text-brand-navy/60">{settings.contact_email}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-10 rounded-3xl"
          >
            <h3 className="font-sora font-bold text-2xl mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-navy/80 mb-2">Full Name</label>
                  <input name="name" required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy/80 mb-2">Email Address</label>
                  <input name="email" required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-navy/80 mb-2">Phone Number</label>
                  <input name="phone" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy/80 mb-2">Company (Optional)</label>
                  <input name="company" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" placeholder="Your Company" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-navy/80 mb-2">Message</label>
                <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" placeholder="Your message here..."></textarea>
              </div>
              
              <button disabled={loading} type="submit" className="w-full py-4 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors shadow-lg shadow-blue-500/20 hover-trigger disabled:opacity-50">
                {loading ? "Sending..." : success ? "Message Sent Successfully!" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
