"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { updatePassword } from "@/app/admin/actions";

export default function SettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    setLoading(true);
    const result = await updatePassword(newPassword);
    
    if (result.success) {
      setMessage({ type: "success", text: "Password updated successfully!" });
      setNewPassword("");
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update password" });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">Settings</h1>
        <p className="text-brand-navy/60">Manage website configuration and admin credentials.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8">
        <div className="max-w-md">
          <h3 className="text-lg font-bold text-brand-navy mb-4">Admin Security</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-2">Update Master Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50" 
              />
            </div>
            {message.text && (
              <p className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                {message.text}
              </p>
            )}
            <button 
              type="submit"
              disabled={loading} 
              className="px-6 py-3 rounded-xl bg-brand-blue text-white font-medium hover:bg-brand-cyan transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
