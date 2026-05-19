import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ divisionId: string }> }
) {
  const { divisionId } = await params;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "0", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "6", 10);

  try {
    // Run total count and paginated fetch in parallel
    const baseQuery = adminDb
      .collection("products")
      .where("divisionId", "==", divisionId)
      .orderBy("updatedAt", "desc");

    // For pagination: fetch offset + limit (Firestore Admin supports offset)
    const [totalSnap, pageSnap] = await Promise.all([
      baseQuery.count().get(),
      baseQuery.offset(page * pageSize).limit(pageSize).get(),
    ]);

    const total = totalSnap.data().count;
    const products = pageSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ products, total });
  } catch (error) {
    console.error("Division products API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
