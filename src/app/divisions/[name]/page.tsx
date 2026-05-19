import { getDivisions } from "@/app/admin/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DivisionPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  
  let divisions: any[] = [];
  
  try {
    divisions = await getDivisions();
  } catch (error) {
    console.error("DivisionPage divisions error:", error);
  }
  
  const division = divisions.find(d => d.name.toLowerCase() === name.toLowerCase());
  
  if (!division) {
    notFound();
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
      </div>
    </main>
  );
}
