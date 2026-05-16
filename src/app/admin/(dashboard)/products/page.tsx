import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/admin/ProductCard";

// Force dynamic so we get the latest data
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const divisions = await prisma.division.findMany({
    include: {
      products: {
        orderBy: { updatedAt: 'desc' }
      },
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">Products by Division</h1>
          <p className="text-brand-navy/60">Manage your product catalog categorized by therapeutic divisions.</p>
        </div>
        
        <div className="flex gap-4">
          <Link href="/admin/divisions/new" className="px-5 py-3 bg-white border border-gray-200 text-brand-navy rounded-xl font-medium hover:border-brand-blue hover:text-brand-blue transition-colors flex items-center gap-2">
            <Plus size={18} />
            Add Division
          </Link>
          <Link href="/admin/products/new" className="px-5 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20">
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      </div>

      {divisions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <h3 className="text-xl font-bold text-brand-navy mb-2">No Divisions Found</h3>
          <p className="text-gray-500 mb-6">You need to create a division before adding products.</p>
          <Link href="/admin/divisions/new" className="inline-flex px-6 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors items-center gap-2">
            <Plus size={18} /> Create First Division
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {divisions.map((division) => (
            <div key={division.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold font-sora text-brand-navy">{division.name} Division</h2>
                  <p className="text-sm text-gray-500 mt-1">{division.description || "No description provided"}</p>
                </div>
              </div>
              
              <div className="p-6">
                {division.products.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">No products in this division yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {division.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
