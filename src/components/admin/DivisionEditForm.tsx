"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateDivision } from "@/app/admin/actions";
import { Save } from "lucide-react";

interface DivisionEditFormProps {
  division: {
    id: string;
    name: string;
    description: string | null;
    icon?: string;
  };
}

export default function DivisionEditForm({ division }: DivisionEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: division.name,
    description: division.description || "",
    icon: division.icon || "Lightbulb"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await updateDivision(division.id, formData.name, formData.description, formData.icon);
    
    if (result.success) {
      router.push("/admin/divisions");
      router.refresh();
    } else {
      alert(result.error || "Failed to update division");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Division Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Icon Symbol</label>
            <select 
              value={formData.icon}
              onChange={e => setFormData({...formData, icon: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-white"
            >
              <option value="Heart">Cardiology / Heart</option>
              <option value="Activity">Gastroenterology / General Pulse</option>
              <option value="ShieldCheck">Orthopedic / Immunity / Shield</option>
              <option value="Baby">Pediatrics / Infant</option>
              <option value="Zap">Neurology / Energy</option>
              <option value="Brain">Brain / Neuro</option>
              <option value="Eye">Ophthalmology / Vision</option>
              <option value="Dna">Biotech / Genetics / DNA</option>
              <option value="Pill">Pills / General Medicine</option>
              <option value="Sparkles">Dermatology / Skin Care</option>
              <option value="Flame">Inflammation / Urology</option>
              <option value="Droplet">Liquid / Nephrology</option>
              <option value="Stethoscope">Stethoscope / Clinical</option>
              <option value="Lightbulb">Lightbulb / Innovation / Default</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update Division"}
          </button>
        </div>
      </div>
    </form>
  );
}
