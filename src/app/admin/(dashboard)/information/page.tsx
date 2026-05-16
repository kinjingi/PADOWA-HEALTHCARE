"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";
import { getInformations, createInformation, updateInformation, deleteInformation } from "@/app/admin/actions";

type Information = { id: string; title: string; category: string; desc: string };

export default function InformationPages() {
  const [informations, setInformations] = useState<Information[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", category: "", desc: "", link: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const data = await getInformations();
    setInformations(data);
    setLoading(false);
  };

  const openModal = (info?: Information) => {
    if (info) {
      setEditingId(info.id);
      setFormData({ title: info.title, category: info.category, desc: info.desc, link: info.link || "" });
    } else {
      setEditingId(null);
      setFormData({ title: "", category: "", desc: "", link: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    if (editingId) {
      await updateInformation(editingId, formData);
    } else {
      await createInformation(formData);
    }
    
    await fetchInfo();
    setSaving(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this update?")) {
      await deleteInformation(id);
      await fetchInfo();
    }
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">Information Pages</h1>
          <p className="text-brand-navy/60">Manage the latest updates and health information shown on the homepage.</p>
        </div>
        
        <button 
          onClick={() => openModal()}
          className="px-5 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20"
        >
          <Plus size={18} />
          Add New Update
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : informations.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No updates published.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {informations.map((info) => (
              <div key={info.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <span className="text-xs font-medium text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded-md mb-2 inline-block">
                    {info.category}
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy">{info.title}</h3>
                  <p className="text-sm text-brand-navy/60 mt-1 max-w-2xl truncate">{info.desc}</p>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <button 
                    onClick={() => openModal(info)}
                    className="p-2 text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(info.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-brand-navy">{editingId ? "Edit Update" : "Add New Update"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Category</label>
                <input 
                  type="text" 
                  required
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.desc}
                  onChange={e => setFormData({...formData, desc: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">External Link (Optional)</label>
                <input 
                  type="url" 
                  value={formData.link}
                  onChange={e => setFormData({...formData, link: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
                />
              </div>
              
              <div className="pt-4 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} />
                  {saving ? "Saving..." : "Save Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
