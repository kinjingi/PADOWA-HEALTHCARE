import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDivisions } from "@/app/admin/actions";
import ProductForm from "@/components/admin/ProductForm";

export default async function AddProductPage() {
  const divisions = await getDivisions();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/products" className="inline-flex items-center text-brand-navy/60 hover:text-brand-blue transition-colors gap-2 text-sm font-medium mb-4">
          <ArrowLeft size={16} />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold font-sora text-brand-navy">Add New Product</h1>
        <p className="text-brand-navy/60 mt-2">Create a new product and assign it to a therapeutic division.</p>
      </div>
      
      <ProductForm divisions={divisions} />
    </div>
  );
}
