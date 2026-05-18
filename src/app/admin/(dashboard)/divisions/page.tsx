import { getDivisions } from "@/app/admin/actions";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DivisionRow from "@/components/admin/DivisionRow";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function DivisionsPage() {
  const divisionsList = await getDivisions();

  let products: any[] = [];
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
  } catch (error) {
    console.error("Failed to load products for divisions counting:", error);
  }

  const divisions = divisionsList.map(division => ({
    ...division,
    _count: {
      products: products.filter(p => p.divisionId === division.id).length
    }
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">Divisions</h1>
          <p className="text-brand-navy/60">Manage your company's therapeutic divisions.</p>
        </div>
        
        <Link href="/admin/divisions/new" className="px-5 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-cyan transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20">
          <Plus size={18} />
          Add Division
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {divisions.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-xl font-bold text-brand-navy mb-2">No Divisions Found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't added any therapeutic divisions yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {divisions.map((division) => (
              <DivisionRow key={division.id} division={division} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
