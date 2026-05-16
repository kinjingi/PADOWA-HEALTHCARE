"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Grid, MessageSquare, LogOut, Settings, Globe } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Hero Banner", href: "/admin/hero", icon: <LayoutDashboard size={20} /> },
    { name: "Information Pages", href: "/admin/information", icon: <MessageSquare size={20} /> },
    { name: "Products", href: "/admin/products", icon: <Package size={20} /> },
    { name: "Divisions", href: "/admin/divisions", icon: <Grid size={20} /> },
    { name: "Inquiries", href: "/admin/inquiries", icon: <MessageSquare size={20} /> },
    { name: "About & Contact", href: "/admin/about", icon: <Globe size={20} /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    // Remove the simple auth cookie
    document.cookie = "padowa_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col z-50">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="font-sora font-bold text-xl text-brand-blue flex items-center gap-2">
            PADOWA <span className="text-xs px-2 py-1 bg-brand-cyan/10 text-brand-cyan rounded-md">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive 
                  ? "bg-brand-blue text-white shadow-md shadow-blue-500/20" 
                  : "text-brand-navy/60 hover:bg-gray-100 hover:text-brand-navy"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link 
            href="/"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-brand-navy/60 hover:bg-gray-100 hover:text-brand-navy transition-colors"
          >
            <Globe size={20} />
            Back to Website
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
