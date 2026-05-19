"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

// Fallback static divisions — shown immediately, replaced when API loads
const STATIC_DIVISIONS = [
  { name: "Gastroenterology" },
  { name: "Orthopaedics" },
  { name: "Paediatrics" },
];

export default function Footer() {
  const pathname = usePathname();
  const [divisions, setDivisions] = useState<{ name: string }[]>(STATIC_DIVISIONS);
  const [settings, setSettings] = useState<Record<string, string>>({});

  // Load footer data lazily (after page paint) — does NOT block navigation
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/footer-data", { signal: controller.signal })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.divisions?.length) setDivisions(data.divisions);
        if (data?.settings) setSettings(data.settings);
      })
      .catch(() => {}); // silently fail
    return () => controller.abort();
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-brand-clinical border-t border-brand-cyan/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Info */}
          <div>
            <h3 className="font-sora font-bold text-2xl text-brand-blue mb-4">
              PADOWA <span className="text-brand-navy">HEALTHCARE</span>
            </h3>
            <p className="text-brand-orange font-medium text-sm mb-4 tracking-wide">
              {settings?.footer_tagline || "Love in Every Dose"}
            </p>
            <p className="text-brand-navy/70 text-sm leading-relaxed mb-6">
              {settings?.footer_description ||
                "A premium doctor-led pharmaceutical organization committed to delivering quality-driven and innovative healthcare solutions."}
            </p>
            <div className="flex gap-4">
              {settings?.social_fb && (
                <a href={settings.social_fb} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-navy/60 hover:text-brand-blue hover:shadow-md transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              )}
              {settings?.social_tw && (
                <a href={settings.social_tw} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-navy/60 hover:text-brand-blue hover:shadow-md transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              )}
              {settings?.social_ig && (
                <a href={settings.social_ig} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-navy/60 hover:text-brand-blue hover:shadow-md transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              )}
              {settings?.social_li && (
                <a href={settings.social_li} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-navy/60 hover:text-brand-blue hover:shadow-md transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sora font-semibold text-brand-navy mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-brand-navy/70 hover:text-brand-orange transition-colors text-sm">About Us</Link>
              <Link href="/divisions" className="text-brand-navy/70 hover:text-brand-orange transition-colors text-sm">Our Divisions</Link>
              <Link href="/contact" className="text-brand-navy/70 hover:text-brand-orange transition-colors text-sm">Contact</Link>
              <Link href="/distributor-inquiry" className="text-brand-navy/70 hover:text-brand-orange transition-colors text-sm">Partner With Us</Link>
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-sora font-semibold text-brand-navy mb-6">Divisions</h4>
            <ul className="space-y-3">
              {divisions.map((div, i) => (
                <li key={i}>
                  <Link
                    href={`/divisions/${encodeURIComponent(div.name.toLowerCase())}`}
                    className="text-brand-navy/70 hover:text-brand-cyan transition-colors text-sm"
                  >
                    {div.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sora font-semibold text-brand-navy mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={20} className="text-brand-cyan shrink-0" />
                <span className="text-brand-navy/70 text-sm">{settings?.contact_address || "123 Health Avenue, Medical District, City, Country"}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={20} className="text-brand-cyan shrink-0" />
                <span className="text-brand-navy/70 text-sm">{settings?.contact_phone || "+1 234 567 8900"}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={20} className="text-brand-cyan shrink-0" />
                <span className="text-brand-navy/70 text-sm">{settings?.contact_email || "info@padowahealthcare.com"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-navy/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-navy/50 text-sm text-center md:text-left">
            © {new Date().getFullYear()} PADOWA Health Care. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-brand-navy/50 text-sm">Founded by Dr. Prasanth & Dr. Praveen</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
