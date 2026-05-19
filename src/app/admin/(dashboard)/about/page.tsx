"use client";

import { Save, Info, Users, Phone, Target, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/app/admin/actions";

export default function AboutContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    about_us: "A doctor-led pharmaceutical organization committed to delivering quality-driven and innovative healthcare solutions.",
    mission: "To deliver trusted pharmaceutical solutions through scientific excellence, quality-focused innovation, and ethical practices.",
    aim: "To contribute toward healthier communities by providing accessible, reliable, and quality-driven pharmaceutical care.",
    leadership: "Founded by Dr. Prasanth, Pharm.D and Dr. Praveen, Pharm.D. Science-driven and patient-centered.",
    contact_email: "info@padowahealthcare.com",
    contact_phone: "+91 1234567890",
    contact_address: "123 Health Avenue, Medical District, City, Country",
    social_fb: "",
    social_ig: "",
    social_li: "",
    social_tw: "",
    footer_tagline: "Love in Every Dose",
    footer_description: "A premium doctor-led pharmaceutical organization committed to delivering quality-driven and innovative healthcare solutions.",
    our_vision: "To build a future-ready healthcare organization recognized for innovation, trust, and excellence in pharmaceutical care.",
    cv1_title: "Scientific Excellence",
    cv1_desc: "Rigorous research and clinical focus in every formulation.",
    cv1_icon: "Activity",
    cv2_title: "Ethical Practices",
    cv2_desc: "Transparency and integrity in all our healthcare operations.",
    cv2_icon: "ShieldCheck",
    cv3_title: "Quality Driven",
    cv3_desc: "Uncompromising standards maintaining WHO-GMP quality.",
    cv3_icon: "Award"
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings(Object.keys(formData));
        if (Object.keys(data).length > 0) {
          setFormData(prev => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("AboutContactPage load error:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings(formData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="p-12 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSave}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">About & Contact Info</h1>
            <p className="text-brand-navy/60">Manage your company's mission, aim, leadership, contact details, vision, and core values.</p>
          </div>
          
          <button 
            type="submit"
            disabled={saving}
            className="px-5 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
              <div className="p-2 bg-brand-blue/10 text-brand-blue rounded-lg"><Info size={20} /></div>
              <h2 className="text-xl font-bold text-brand-navy">Company Identity</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">About Us</label>
              <textarea 
                rows={3}
                value={formData.about_us}
                onChange={e => setFormData({...formData, about_us: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Footer Tagline</label>
                <input 
                  type="text"
                  value={formData.footer_tagline}
                  onChange={e => setFormData({...formData, footer_tagline: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Footer Description</label>
                <input 
                  type="text"
                  value={formData.footer_description}
                  onChange={e => setFormData({...formData, footer_description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Our Mission</label>
              <textarea 
                rows={2}
                value={formData.mission}
                onChange={e => setFormData({...formData, mission: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Our Aim</label>
              <textarea 
                rows={2}
                value={formData.aim}
                onChange={e => setFormData({...formData, aim: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="space-y-8">
            {/* Vision Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                <div className="p-2 bg-blue-100 text-brand-blue rounded-lg"><Target size={20} /></div>
                <h2 className="text-xl font-bold text-brand-navy">Our Vision</h2>
              </div>
              
              <div>
                <textarea 
                  rows={3}
                  value={formData.our_vision}
                  onChange={e => setFormData({...formData, our_vision: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Leadership Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                <div className="p-2 bg-brand-cyan/10 text-brand-cyan rounded-lg"><Users size={20} /></div>
                <h2 className="text-xl font-bold text-brand-navy">Leadership</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Founders Info</label>
                <textarea 
                  rows={2}
                  value={formData.leadership}
                  onChange={e => setFormData({...formData, leadership: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><Star size={20} /></div>
            <h2 className="text-xl font-bold text-brand-navy">Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-brand-navy/60 uppercase">Value 1</label>
              <input 
                type="text" 
                value={formData.cv1_title}
                onChange={e => setFormData({...formData, cv1_title: e.target.value})}
                placeholder="Value 1 Title"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
              />
              <textarea 
                rows={2}
                value={formData.cv1_desc}
                onChange={e => setFormData({...formData, cv1_desc: e.target.value})}
                placeholder="Value 1 Description"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
              ></textarea>
              <select 
                value={formData.cv1_icon}
                onChange={e => setFormData({...formData, cv1_icon: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-white text-sm"
              >
                <option value="Activity">Activity / Heartbeat</option>
                <option value="ShieldCheck">Shield / Ethics</option>
                <option value="Award">Award / Quality</option>
                <option value="Heart">Heart</option>
                <option value="Zap">Zap</option>
                <option value="Brain">Brain</option>
                <option value="Eye">Eye</option>
                <option value="Dna">DNA</option>
                <option value="Pill">Pill</option>
                <option value="Sparkles">Sparkles</option>
                <option value="Stethoscope">Stethoscope</option>
                <option value="Lightbulb">Lightbulb</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-brand-navy/60 uppercase">Value 2</label>
              <input 
                type="text" 
                value={formData.cv2_title}
                onChange={e => setFormData({...formData, cv2_title: e.target.value})}
                placeholder="Value 2 Title"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
              />
              <textarea 
                rows={2}
                value={formData.cv2_desc}
                onChange={e => setFormData({...formData, cv2_desc: e.target.value})}
                placeholder="Value 2 Description"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
              ></textarea>
              <select 
                value={formData.cv2_icon}
                onChange={e => setFormData({...formData, cv2_icon: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-white text-sm"
              >
                <option value="Activity">Activity / Heartbeat</option>
                <option value="ShieldCheck">Shield / Ethics</option>
                <option value="Award">Award / Quality</option>
                <option value="Heart">Heart</option>
                <option value="Zap">Zap</option>
                <option value="Brain">Brain</option>
                <option value="Eye">Eye</option>
                <option value="Dna">DNA</option>
                <option value="Pill">Pill</option>
                <option value="Sparkles">Sparkles</option>
                <option value="Stethoscope">Stethoscope</option>
                <option value="Lightbulb">Lightbulb</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-brand-navy/60 uppercase">Value 3</label>
              <input 
                type="text" 
                value={formData.cv3_title}
                onChange={e => setFormData({...formData, cv3_title: e.target.value})}
                placeholder="Value 3 Title"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
              />
              <textarea 
                rows={2}
                value={formData.cv3_desc}
                onChange={e => setFormData({...formData, cv3_desc: e.target.value})}
                placeholder="Value 3 Description"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"
              ></textarea>
              <select 
                value={formData.cv3_icon}
                onChange={e => setFormData({...formData, cv3_icon: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-white text-sm"
              >
                <option value="Activity">Activity / Heartbeat</option>
                <option value="ShieldCheck">Shield / Ethics</option>
                <option value="Award">Award / Quality</option>
                <option value="Heart">Heart</option>
                <option value="Zap">Zap</option>
                <option value="Brain">Brain</option>
                <option value="Eye">Eye</option>
                <option value="Dna">DNA</option>
                <option value="Pill">Pill</option>
                <option value="Sparkles">Sparkles</option>
                <option value="Stethoscope">Stethoscope</option>
                <option value="Lightbulb">Lightbulb</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact & Social Links below */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
              <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg"><Phone size={20} /></div>
              <h2 className="text-xl font-bold text-brand-navy">Contact Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Email Address</label>
                <input type="email" value={formData.contact_email} onChange={e => setFormData({...formData, contact_email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Phone Number</label>
                <input type="text" value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Office Address</label>
                <textarea rows={2} value={formData.contact_address} onChange={e => setFormData({...formData, contact_address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Social Media Handles</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Facebook URL</label>
                <input type="url" value={formData.social_fb} onChange={e => setFormData({...formData, social_fb: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Instagram URL</label>
                <input type="url" value={formData.social_ig} onChange={e => setFormData({...formData, social_ig: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">LinkedIn URL</label>
                <input type="url" value={formData.social_li} onChange={e => setFormData({...formData, social_li: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Twitter / X URL</label>
                <input type="url" value={formData.social_tw} onChange={e => setFormData({...formData, social_tw: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
