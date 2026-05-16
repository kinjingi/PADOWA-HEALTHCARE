"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { getSettings, updateSettings } from "@/app/admin/actions";

export default function HeroBannerPage() {
  const [formData, setFormData] = useState({
    hero_badge: "Doctor-Led Healthcare Organization",
    hero_title_main: "Innovating Healthcare With ",
    hero_title_highlight: "Care & Clinical Excellence",
    hero_description: "Delivering trusted pharmaceutical solutions through scientific excellence, quality-focused innovation, and ethical healthcare practices."
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const keys = Object.keys(formData);
      const data = await getSettings(keys);
      if (Object.keys(data).length > 0) {
        setFormData(prev => ({ ...prev, ...data }));
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings(formData);
    setSaving(false);
    alert("Hero Banner updated successfully!");
  };

  if (loading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">Hero Banner Settings</h1>
        <p className="text-brand-navy/60">Edit the main content shown at the top of the homepage.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Small Badge Text</label>
            <input 
              type="text" 
              required
              value={formData.hero_badge}
              onChange={e => setFormData({...formData, hero_badge: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Main Title (Black Text)</label>
              <input 
                type="text" 
                required
                value={formData.hero_title_main}
                onChange={e => setFormData({...formData, hero_title_main: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Title Highlight (Gradient Text)</label>
              <input 
                type="text" 
                required
                value={formData.hero_title_highlight}
                onChange={e => setFormData({...formData, hero_title_highlight: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Description</label>
            <textarea 
              required
              rows={3}
              value={formData.hero_description}
              onChange={e => setFormData({...formData, hero_description: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none" 
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
