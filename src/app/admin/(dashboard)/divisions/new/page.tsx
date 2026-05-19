"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import { createDivision } from "@/app/admin/actions";

export default function AddDivisionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const result = await createDivision(formData);
    
    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      router.push("/admin/divisions");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/divisions" className="inline-flex items-center text-brand-navy/60 hover:text-brand-blue transition-colors gap-2 text-sm font-medium mb-4">
          <ArrowLeft size={16} />
          Back to Divisions
        </Link>
        <h1 className="text-3xl font-bold font-sora text-brand-navy">Add New Division</h1>
        <p className="text-brand-navy/60 mt-2">Create a new therapeutic division category for your products.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-navy mb-2">Division Name *</label>
            <input 
              type="text" 
              id="name"
              name="name"
              required
              placeholder="e.g. Gastroenterology"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-brand-navy mb-2">Short Description</label>
            <textarea 
              id="description"
              name="description"
              rows={3}
              placeholder="Briefly describe this division..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
            ></textarea>
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-brand-navy mb-2">Icon Symbol *</label>
            <select 
              id="icon"
              name="icon"
              required
              defaultValue="Lightbulb"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all bg-white"
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

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <Link href="/admin/divisions" className="px-6 py-3 rounded-xl border border-gray-200 text-brand-navy font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-brand-blue text-white font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              <Save size={18} />
              {isSubmitting ? "Saving..." : "Save Division"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
