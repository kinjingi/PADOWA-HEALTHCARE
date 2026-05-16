"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/admin/actions";
import { Save } from "lucide-react";

interface ProductFormProps {
  divisions: { id: string; name: string }[];
}

export default function ProductForm({ divisions }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    composition: "",
    description: "",
    divisionId: divisions.length > 0 ? divisions[0].id : "",
    imageUrl: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await createProduct(formData);
    
    if (result.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert(result.error || "Failed to create product");
      setLoading(false);
    }
  };

  if (divisions.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-yellow-700">
        You must create at least one division before adding products.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8">
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Product Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Padowa-650"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Composition</label>
            <input 
              type="text" 
              required
              value={formData.composition}
              onChange={e => setFormData({...formData, composition: e.target.value})}
              placeholder="e.g. Paracetamol 650mg"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Division</label>
            <select 
              required
              value={formData.divisionId}
              onChange={e => setFormData({...formData, divisionId: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-white"
            >
              {divisions.map(div => (
                <option key={div.id} value={div.id}>{div.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Description (Optional)</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Detailed description of the product..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none" 
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Create Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
