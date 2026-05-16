import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function AddProductPage() {
  const divisions = await prisma.division.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

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
