import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

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
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  } catch (err) {
    console.error("footer-data API error:", err);
    return NextResponse.json({ divisions: [], settings: {} });
  }
}
