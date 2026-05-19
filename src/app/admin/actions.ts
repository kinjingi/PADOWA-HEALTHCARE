"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function docToObj(doc: any): any {
  return { id: doc.id, ...doc.data() };
}

// ─── Divisions ────────────────────────────────────────────────────────────────

export async function getDivisions() {
  try {
    const snap = await adminDb.collection("divisions").orderBy("name").get();
    return snap.docs.map(docToObj);
  } catch (error) {
    console.error("getDivisions error:", error);
    return [];
  }
}

export async function createDivision(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    if (!name) return { error: "Division name is required" };

    await adminDb.collection("divisions").add({
      name,
      description,
      createdAt: new Date().toISOString(),
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/divisions");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("createDivision error:", error);
    return { error: "Failed to create division" };
  }
}

export async function updateDivision(id: string, name: string, description: string) {
  try {
    await adminDb.collection("divisions").doc(id).update({
      name,
      description,
      updatedAt: new Date().toISOString(),
    });
    revalidatePath("/admin/divisions");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("updateDivision error:", error);
    return { error: "Failed to update division" };
  }
}

export async function deleteDivision(id: string) {
  try {
    const snap = await adminDb
      .collection("products")
      .where("divisionId", "==", id)
      .limit(1)
      .get();
    if (!snap.empty) return { error: "Cannot delete division that has products" };

    await adminDb.collection("divisions").doc(id).delete();
    revalidatePath("/admin/divisions");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("deleteDivision error:", error);
    return { error: "Failed to delete division" };
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function verifyPassword(password: string) {
  try {
    // Check env var first (fastest — no DB hit)
    const envPassword = process.env.ADMIN_PASSWORD;
    if (envPassword && password === envPassword) return { success: true };

    const docSnap = await adminDb.collection("settings").doc("admin_password").get();
    let value = "padowa123";
    if (docSnap.exists) {
      value = docSnap.data()?.value ?? value;
    } else {
      await adminDb.collection("settings").doc("admin_password").set({ value });
    }

    return password === value
      ? { success: true }
      : { success: false, error: "Incorrect password" };
  } catch (error) {
    console.error("verifyPassword error:", error);
    const envPassword = process.env.ADMIN_PASSWORD || "padowa123";
    return password === envPassword
      ? { success: true }
      : { success: false, error: "Incorrect password" };
  }
}

export async function updatePassword(newPassword: string) {
  try {
    await adminDb.collection("settings").doc("admin_password").set({ value: newPassword });
    return { success: true };
  } catch (error) {
    console.error("updatePassword error:", error);
    return { error: "Failed to update password" };
  }
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export async function getSettings(keys: string[]) {
  try {
    const snap = await adminDb.collection("settings").get();
    const allSettings = new Map(snap.docs.map(d => [d.id, d.data().value ?? ""]));
    const results: Record<string, string> = {};
    for (const key of keys) results[key] = allSettings.get(key) ?? "";
    return results;
  } catch (error) {
    console.error("getSettings error:", error);
    return Object.fromEntries(keys.map(k => [k, ""]));
  }
}

export async function updateSettings(settings: Record<string, string>) {
  try {
    const batch = adminDb.batch();
    for (const [key, value] of Object.entries(settings)) {
      batch.set(adminDb.collection("settings").doc(key), { value });
    }
    await batch.commit();
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("updateSettings error:", error);
    return { error: "Failed to update settings" };
  }
}

// ─── Informations ─────────────────────────────────────────────────────────────

export async function getInformations() {
  try {
    const snap = await adminDb
      .collection("informations")
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map(docToObj);
  } catch (error) {
    console.error("getInformations error:", error);
    return [];
  }
}

export async function createInformation(data: {
  title: string;
  category: string;
  desc: string;
  link?: string;
}) {
  try {
    await adminDb.collection("informations").add({
      ...data,
      createdAt: new Date().toISOString(),
    });
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("createInformation error:", error);
    return { error: "Failed to create information" };
  }
}

export async function updateInformation(
  id: string,
  data: { title: string; category: string; desc: string; link?: string }
) {
  try {
    await adminDb.collection("informations").doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("updateInformation error:", error);
    return { error: "Failed to update information" };
  }
}

export async function deleteInformation(id: string) {
  try {
    await adminDb.collection("informations").doc(id).delete();
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("deleteInformation error:", error);
    return { error: "Failed to delete information" };
  }
}

// ─── Inquiries ────────────────────────────────────────────────────────────────

export async function createInquiry(formData: FormData) {
  try {
    await adminDb.collection("inquiries").add({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || "N/A",
      company: (formData.get("company") as string) || null,
      message: formData.get("message") as string,
      createdAt: new Date().toISOString(),
    });
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("createInquiry error:", error);
    return { error: "Failed to create inquiry" };
  }
}

export async function deleteInquiry(id: string) {
  try {
    await adminDb.collection("inquiries").doc(id).delete();
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("deleteInquiry error:", error);
    return { error: "Failed to delete inquiry" };
  }
}

export async function getInquiries() {
  try {
    const snap = await adminDb
      .collection("inquiries")
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map(docToObj);
  } catch (error) {
    console.error("getInquiries error:", error);
    return [];
  }
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts() {
  try {
    const [productsSnap, divisions] = await Promise.all([
      adminDb.collection("products").orderBy("updatedAt", "desc").get(),
      getDivisions(),
    ]);
    const divisionsMap = new Map(divisions.map((d: any) => [d.id, d]));
    return productsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      division: divisionsMap.get((doc.data() as any).divisionId) || { name: "Unknown" },
    }));
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

export async function createProduct(data: {
  name: string;
  composition: string;
  description: string;
  divisionId: string;
  imageUrl?: string;
}) {
  try {
    const slug =
      data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-" +
      Math.random().toString(36).substring(2, 7);
    await adminDb.collection("products").add({
      ...data,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("createProduct error:", error);
    return { error: "Failed to create product" };
  }
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    composition: string;
    description: string;
    divisionId: string;
    imageUrl?: string;
  }
) {
  try {
    await adminDb.collection("products").doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("updateProduct error:", error);
    return { error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await adminDb.collection("products").doc(id).delete();
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("deleteProduct error:", error);
    return { error: "Failed to delete product" };
  }
}

// Hero/content actions
export async function getHeroData() {
  return getSettings([
    "hero_badge",
    "hero_title_main",
    "hero_title_highlight",
    "hero_description",
    "hero_budget",
  ]);
}
