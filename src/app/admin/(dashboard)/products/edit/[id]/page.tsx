import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDivisions } from "@/app/admin/actions";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductEditForm from "@/components/admin/ProductEditForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let product = null;
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      product = { id: docSnap.id, ...docSnap.data() } as any;
    }
  } catch (error) {
    console.error("EditProductPage error loading product:", error);
  }

  if (!product) {
    notFound();
  }

  const divisions = await getDivisions();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/products" className="inline-flex items-center text-brand-navy/60 hover:text-brand-blue transition-colors gap-2 text-sm font-medium mb-4">
          <ArrowLeft size={16} />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold font-sora text-brand-navy">Edit Product</h1>
        <p className="text-brand-navy/60 mt-2">Update the details for "{product.name}".</p>
      </div>
      
      <ProductEditForm product={product} divisions={divisions} />
    </div>
  );
}
