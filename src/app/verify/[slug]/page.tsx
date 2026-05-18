import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ShieldCheck, Info, FlaskConical, ClipboardCheck } from "lucide-react";
import Link from "next/link";

export default async function ProductVerifyPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  let product = null;
  try {
    product = await (prisma.product as any).findUnique({
      where: { slug },
      include: { division: true }
    });
  } catch (error) {
    console.error("ProductVerifyPage database error:", error);
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24 px-4">
      <div className="max-w-xl mx-auto">
        {/* Verification Badge */}
        <div className="bg-green-500 text-white p-4 rounded-t-3xl flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-widest shadow-lg">
          <ShieldCheck size={20} />
          Authentic PADOWA Healthcare Product
        </div>

        <div className="bg-white rounded-b-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="p-8 border-b border-gray-50 text-center">
            <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">{product.name}</h1>
            <p className="text-brand-cyan font-medium flex items-center justify-center gap-2">
              <FlaskConical size={16} />
              {product.composition}
            </p>
          </div>

          {/* Details Section */}
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Info size={16} />
                About this Formulation
              </h3>
              <p className="text-brand-navy/70 leading-relaxed bg-brand-clinical p-5 rounded-2xl border border-brand-cyan/10">
                {product.description || "Information about this therapeutic formulation is being updated. Please refer to the packaging or consult a healthcare professional."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Division</p>
                <p className="font-bold text-brand-navy">{product.division.name}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Quality Standard</p>
                <p className="font-bold text-brand-navy">WHO-GMP</p>
              </div>
            </div>

            {/* Support CTA */}
            <div className="pt-6">
              <Link 
                href="/contact" 
                className="block w-full py-4 bg-brand-blue text-white rounded-2xl font-bold text-center hover:bg-brand-cyan transition-colors shadow-lg shadow-blue-500/20"
              >
                Inquire for Business
              </Link>
            </div>
          </div>

          {/* Footer Footer */}
          <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
              <ClipboardCheck size={14} />
              Digital Verification System v1.0
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-brand-navy/40 hover:text-brand-blue text-sm transition-colors">
            Back to Corporate Website
          </Link>
        </div>
      </div>
    </main>
  );
}
