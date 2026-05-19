import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// Cache for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const [divisionsSnap, settingsSnap] = await Promise.all([
      adminDb.collection("divisions").orderBy("name").get(),
      adminDb.collection("settings").get(),
    ]);

    const divisions = divisionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const settings: Record<string, string> = {};
    settingsSnap.docs.forEach(doc => {
      settings[doc.id] = doc.data().value ?? "";
    });

    return NextResponse.json({ divisions, settings }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("footer-data API error:", err);
    return NextResponse.json({ divisions: [], settings: {} });
  }
}
