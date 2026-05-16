"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { verifyPassword } from "@/app/admin/actions";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await verifyPassword(password);
    
    if (result.success) {
      // Set a cookie (expires in 1 day)
      document.cookie = "padowa_admin_auth=authenticated; path=/; max-age=86400";
      // Force a hard navigation so the server reads the new cookie immediately
      window.location.href = "/admin";
    } else {
      setError(result.error || "Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue">
          <Lock size={32} />
        </div>
        <h1 className="text-2xl font-bold font-sora text-center text-brand-navy mb-2">Admin Access</h1>
        <p className="text-center text-gray-500 mb-8">Please enter the master password to access the dashboard.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
              placeholder="••••••••"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
