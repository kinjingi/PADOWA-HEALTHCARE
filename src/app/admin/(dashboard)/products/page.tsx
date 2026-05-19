import { getDivisions, getProducts } from "@/app/admin/actions";
import { adminDb } from "@/lib/firebase-admin";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProductListClient from "@/components/admin/ProductListClient";

// Force dynamic so we get the latest data
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  // Run both queries in parallel for speed
  const [divisionsList, allProducts] = await Promise.all([
    getDivisions(),
    (async () => {
      try {
        const snap = await adminDb
          .collection("products")
          .orderBy("updatedAt", "desc")
          .get();
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.error("Failed to load products:", e);
        return [];
      }
    })(),
  ]);

  const divisions = divisionsList.map((division: any) => ({
    ...division,
    // Pre-attach product count for the client component
    productCount: allProducts.filter((p: any) => p.divisionId === division.id).length,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">
            Products by Division
          </h1>
          <p className="text-brand-navy/60">
            Manage your product catalog categorized by therapeutic divisions.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/admin/divisions/new"
            className="px-5 py-3 bg-white border border-gray-200 text-brand-navy rounded-xl font-medium hover:border-brand-blue hover:text-brand-blue transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Division
          </Link>
          <Link
            href="/admin/products/new"
            className="px-5 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      </div>

      {divisions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <h3 className="text-xl font-bold text-brand-navy mb-2">No Divisions Found</h3>
          <p className="text-gray-500 mb-6">
            You need to create a division before adding products.
          </p>
          <Link
            href="/admin/divisions/new"
            className="inline-flex px-6 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors items-center gap-2"
          >
            <Plus size={18} /> Create First Division
          </Link>
        </div>
      ) : (
        <ProductListClient divisions={divisions} />
      )}
    </div>
  );
}
