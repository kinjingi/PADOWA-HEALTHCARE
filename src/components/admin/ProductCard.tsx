"use client";

import { Edit2, Trash2 } from "lucide-react";
import { memo } from "react";
import { deleteProduct } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name?: string;
    composition?: string;
    description?: string | null;
  };
}

export default memo(function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteProduct(product.id);
    setIsDeleting(false);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to delete product");
    }
  };

  return (
    <div className={`border border-gray-100 rounded-xl p-4 hover:border-brand-blue/30 transition-colors group ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
      <h4 className="font-bold text-brand-navy mb-1">{product.name}</h4>
      <p className="text-xs text-gray-500 mb-4">{product.composition}</p>
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link 
          href={`/admin/products/edit/${product.id}`}
          className="p-1.5 text-gray-400 hover:text-brand-blue rounded bg-gray-50"
        >
          <Edit2 size={14} />
        </Link>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-1.5 text-gray-400 hover:text-red-500 rounded bg-gray-50 disabled:opacity-50"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
});
