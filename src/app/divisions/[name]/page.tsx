import { getDivisions } from "@/app/admin/actions";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function DivisionPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  
  let divisions: any[] = [];
  let products: any[] = [];
  
  try {
    divisions = await getDivisions();
  } catch (error) {
    console.error("DivisionPage divisions error:", error);
  }
  
  const division = divisions.find(d => d.name.toLowerCase() === name.toLowerCase());
  
  if (!division) {
    notFound();
  }

  try {
    const q = query(collection(db, "products"), where("divisionId", "==", division.id));
    const querySnapshot = await getDocs(q);
    products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];
  } catch (error) {
    console.error("DivisionPage products error:", error);
  }

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <Link href="/divisions" className="inline-flex items-center gap-2 text-brand-navy/60 hover:text-brand-blue mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Divisions
        </Link>
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-sora text-brand-navy mb-4">{division.name} Division</h1>
          <p className="text-lg text-brand-navy/70 leading-relaxed">
            {division.description || "Comprehensive healthcare solutions tailored for this therapeutic segment."}
          </p>
        </div>

        <h2 className="text-2xl font-bold font-sora text-brand-navy mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
            <h3 className="text-xl font-bold text-brand-navy mb-2">No products added yet</h3>
            <p className="text-gray-500">Products for the {division.name} division will be listed here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-brand-blue mb-2">{product.name}</h3>
                <p className="text-sm font-medium text-brand-navy/60 mb-4">{product.composition}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
