"use client";

import { Edit2, Trash2, Package } from "lucide-react";
import { deleteDivision } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface DivisionRowProps {
  division: {
    id: string;
    name: string;
    description: string | null;
    _count: {
      products: number;
    };
  };
}

export default function DivisionRow({ division }: DivisionRowProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (division._count.products > 0) {
      alert("Cannot delete a division that has products. Please delete or move the products first.");
      return;
    }

    if (!confirm(`Are you sure you want to delete the "${division.name}" division?`)) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteDivision(division.id);
    setIsDeleting(false);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to delete division");
    }
  };

  return (
    <div className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
      <div>
        <h3 className="text-lg font-bold text-brand-navy">{division.name}</h3>
        <p className="text-sm text-brand-navy/60 mt-1 max-w-2xl truncate">
          {division.description || "No description provided."}
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-lg">
          <Package size={16} />
          <span className="text-sm font-medium">{division._count.products} Products</span>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href={`/admin/divisions/edit/${division.id}`}
            className="p-2 text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </Link>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
