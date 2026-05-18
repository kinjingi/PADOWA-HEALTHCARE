"use server";

import { revalidatePath } from "next/cache";
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getDivisions() {
  try {
    const q = query(collection(db, "divisions"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];
  } catch (error) {
    console.error("Failed to get divisions:", error);
    return [];
  }
}

export async function createDivision(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name) {
      return { error: "Division name is required" };
    }

    await addDoc(collection(db, "divisions"), {
      name,
      description,
      createdAt: new Date().toISOString()
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/divisions");
    revalidatePath("/divisions"); 
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to create division:", error);
    return { error: "Failed to create division" };
  }
}

export async function updateDivision(id: string, name: string, description: string) {
  try {
    await updateDoc(doc(db, "divisions", id), {
      name,
      description,
      updatedAt: new Date().toISOString()
    });
    revalidatePath("/admin/divisions");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update division:", error);
    return { error: "Failed to update division" };
  }
}

export async function deleteDivision(id: string) {
  try {
    // First check if there are products with this divisionId
    const q = query(collection(db, "products"), where("divisionId", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { error: "Cannot delete division that has products" };
    }
    
    await deleteDoc(doc(db, "divisions", id));
    revalidatePath("/admin/divisions");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete division:", error);
    return { error: "Failed to delete division" };
  }
}

export async function verifyPassword(password: string) {
  try {
    const envPassword = process.env.ADMIN_PASSWORD;
    if (envPassword && password === envPassword) {
      return { success: true };
    }

    // Fetch setting from settings collection
    const docRef = doc(db, "settings", "admin_password");
    const docSnap = await getDoc(docRef);
    
    let value = "padowa123";
    if (docSnap.exists()) {
      value = docSnap.data().value;
    } else {
      // Create default in Firestore
      await setDoc(docRef, { value });
    }

    if (password === value) {
      return { success: true };
    }
    return { success: false, error: "Incorrect password" };
  } catch (error) {
    console.error("verifyPassword error (falling back to env/default):", error);
    const envPassword = process.env.ADMIN_PASSWORD || "padowa123";
    if (password === envPassword) {
      return { success: true };
    }
    return { success: false, error: "Incorrect password" };
  }
}

export async function updatePassword(newPassword: string) {
  try {
    await setDoc(doc(db, "settings", "admin_password"), {
      value: newPassword
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update password:", error);
    return { error: "Failed to update password" };
  }
}

// Information Actions
export async function getInformations() {
  try {
    const q = query(collection(db, "informations"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];
  } catch (error) {
    console.error("Failed to get informations:", error);
    return [];
  }
}

export async function createInformation(data: { title: string; category: string; desc: string; link?: string }) {
  try {
    await addDoc(collection(db, "informations"), {
      ...data,
      createdAt: new Date().toISOString()
    });
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create information:", error);
    return { error: "Failed to create information" };
  }
}

export async function updateInformation(id: string, data: { title: string; category: string; desc: string; link?: string }) {
  try {
    await updateDoc(doc(db, "informations", id), {
      ...data,
      updatedAt: new Date().toISOString()
    });
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update information:", error);
    return { error: "Failed to update information" };
  }
}

export async function deleteInformation(id: string) {
  try {
    await deleteDoc(doc(db, "informations", id));
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete information:", error);
    return { error: "Failed to delete information" };
  }
}

export async function getSettings(keys: string[]) {
  try {
    const results: Record<string, string> = {};
    const querySnapshot = await getDocs(collection(db, "settings"));
    const allSettings = new Map(querySnapshot.docs.map(doc => [doc.id, doc.data().value]));
    
    for (const key of keys) {
      results[key] = allSettings.get(key) || "";
    }
    return results;
  } catch (error) {
    console.error("Failed to get settings:", error);
    const fallback: Record<string, string> = {};
    for (const key of keys) {
      fallback[key] = "";
    }
    return fallback;
  }
}

export async function updateSettings(settings: Record<string, string>) {
  try {
    for (const [key, value] of Object.entries(settings)) {
      await setDoc(doc(db, "settings", key), { value });
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { error: "Failed to update settings" };
  }
}

export async function createInquiry(formData: FormData) {
  try {
    await addDoc(collection(db, "inquiries"), {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || "N/A",
      company: formData.get("company") as string || null,
      message: formData.get("message") as string,
      createdAt: new Date().toISOString()
    });
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    return { error: "Failed to create inquiry" };
  }
}

export async function deleteInquiry(id: string) {
  try {
    await deleteDoc(doc(db, "inquiries", id));
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return { error: "Failed to delete inquiry" };
  }
}

export async function getInquiries() {
  try {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];
  } catch (error) {
    console.error("Failed to get inquiries:", error);
    return [];
  }
}

// Product Actions
export async function getProducts() {
  try {
    const q = query(collection(db, "products"), orderBy("updatedAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    // Join division manually because Firestore is NoSQL
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    // Fetch divisions list to map names
    const divisions = await getDivisions();
    const divisionsMap = new Map(divisions.map(d => [d.id, d]));

    return products.map(product => ({
      ...product,
      division: divisionsMap.get(product.divisionId) || { name: "Unknown" }
    }));
  } catch (error) {
    console.error("Failed to get products:", error);
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
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
    await addDoc(collection(db, "products"), {
      ...data,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, data: { 
  name: string; 
  composition: string; 
  description: string; 
  divisionId: string;
  imageUrl?: string;
}) {
  try {
    await updateDoc(doc(db, "products", id), {
      ...data,
      updatedAt: new Date().toISOString()
    });
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, "products", id));
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { error: "Failed to delete product" };
  }
}
