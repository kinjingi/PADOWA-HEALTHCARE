import { Package, MessageSquare, Activity, TrendingUp, Grid } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  // In a real app, fetch these from DB. For now, we use Prisma counts.
  const productCount = await prisma.product.count();
  const inquiryCount = await prisma.inquiry.count();
  const divisionCount = await prisma.division.count();

  const stats = [
    { title: "Total Products", value: productCount, icon: <Package size={24} className="text-brand-blue" />, bg: "bg-blue-50" },
    { title: "Divisions", value: divisionCount, icon: <Activity size={24} className="text-brand-cyan" />, bg: "bg-cyan-50" },
    { title: "New Inquiries", value: inquiryCount, icon: <MessageSquare size={24} className="text-brand-orange" />, bg: "bg-orange-50" },
    { title: "Site Visits", value: "24k+", icon: <TrendingUp size={24} className="text-green-500" />, bg: "bg-green-50" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">Dashboard Overview</h1>
      <p className="text-brand-navy/60 mb-8">Welcome back to the PADOWA Healthcare admin panel.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-brand-navy">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold font-sora mb-4 text-brand-navy">Recent Inquiries</h2>
          <div className="text-center py-10 text-gray-400">
            <MessageSquare size={40} className="mx-auto mb-3 opacity-20" />
            <p>No recent inquiries.</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold font-sora mb-4 text-brand-navy">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/products/new" className="p-4 bg-gray-50 rounded-xl hover:bg-brand-blue hover:text-white transition-colors text-left group">
              <Package size={20} className="mb-2 text-brand-blue group-hover:text-white" />
              <div className="font-medium">Add New Product</div>
            </Link>
            <Link href="/admin/divisions" className="p-4 bg-gray-50 rounded-xl hover:bg-brand-cyan hover:text-white transition-colors text-left group">
              <Grid size={20} className="mb-2 text-brand-cyan group-hover:text-white" />
              <div className="font-medium">Manage Divisions</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ensure the Grid icon is imported properly. Wait, it's not imported. I'll import it.
