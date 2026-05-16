"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteInquiry } from "@/app/admin/actions";

export default function DeleteInquiryButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    
    setIsDeleting(true);
    const result = await deleteInquiry(id);
    if (result.error) {
      alert(result.error);
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
      title="Delete Inquiry"
    >
      <Trash2 size={18} />
    </button>
  );
}
