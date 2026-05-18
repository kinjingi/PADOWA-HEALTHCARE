import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DivisionEditForm from "@/components/admin/DivisionEditForm";
import { notFound } from "next/navigation";

export default async function EditDivisionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let division = null;
  try {
    const docRef = doc(db, "divisions", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      division = { id: docSnap.id, ...docSnap.data() } as any;
    }
  } catch (error) {
    console.error("EditDivisionPage error loading division:", error);
  }

  if (!division) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/divisions" className="inline-flex items-center text-brand-navy/60 hover:text-brand-blue transition-colors gap-2 text-sm font-medium mb-4">
          <ArrowLeft size={16} />
          Back to Divisions
        </Link>
        <h1 className="text-3xl font-bold font-sora text-brand-navy">Edit Division</h1>
        <p className="text-brand-navy/60 mt-2">Update the details for the "{division.name}" division.</p>
      </div>
      
      <DivisionEditForm division={division} />
    </div>
  );
}
