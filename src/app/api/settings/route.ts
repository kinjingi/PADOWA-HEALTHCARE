import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const keysParam = url.searchParams.get("keys") ?? "";
  const keys = keysParam.split(",").map(k => k.trim()).filter(Boolean);

  if (keys.length === 0) return NextResponse.json({});

  try {
    const snap = await adminDb.collection("settings").get();
    const all = new Map(snap.docs.map(d => [d.id, d.data().value ?? ""]));
    const result: Record<string, string> = {};
    for (const key of keys) result[key] = all.get(key) ?? "";
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  } catch (err) {
    console.error("settings API error:", err);
    return NextResponse.json({});
  }
}
