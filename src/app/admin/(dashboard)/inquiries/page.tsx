import prisma from "@/lib/prisma";
import { MessageSquare } from "lucide-react";
import DeleteInquiryButton from "@/components/admin/DeleteInquiryButton";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-sora text-brand-navy mb-2">Inquiries</h1>
        <p className="text-brand-navy/60">View and manage contact and partnership requests.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-2">No Inquiries Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">When users submit the contact forms, their messages will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {inquiries.map(inq => (
              <div key={inq.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg text-brand-navy">{inq.name} <span className="text-sm font-normal text-gray-500">({inq.email})</span></h4>
                    <span className="text-xs text-gray-400">{inq.createdAt.toLocaleDateString()}</span>
                  </div>
                  <DeleteInquiryButton id={inq.id} />
                </div>
                <p className="text-sm text-gray-600 mb-2">Phone: {inq.phone} | Company: {inq.company || "N/A"}</p>
                <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800">
                  {inq.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
