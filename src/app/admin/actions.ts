"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDivision(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name) {
      return { error: "Division name is required" };
    }

    await prisma.division.create({
      data: {
        name,
        description,
      },
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
    await prisma.division.update({
      where: { id },
      data: { name, description }
    });
    revalidatePath("/admin/divisions");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update division" };
  }
}

export async function deleteDivision(id: string) {
  try {
    // First check if there are products
    const productCount = await prisma.product.count({ where: { divisionId: id } });
    if (productCount > 0) {
      return { error: "Cannot delete division that has products" };
    }
    
    await prisma.division.delete({ where: { id } });
    revalidatePath("/admin/divisions");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete division" };
  }
}

export async function verifyPassword(password: string) {
  try {
    // Check environment variable first (best for Vercel)
    const envPassword = process.env.ADMIN_PASSWORD;
    if (envPassword && password === envPassword) {
      return { success: true };
    }

    // Fallback to database
    let setting = await prisma.setting.findUnique({ where: { key: "admin_password" } });
    
    if (!setting) {
      // Initial setup
      setting = await prisma.setting.create({ data: { key: "admin_password", value: "padowa123" } });
    }

    if (password === setting.value) {
      return { success: true };
    }
    return { success: false, error: "Incorrect password" };
  } catch (error) {
    console.error("verifyPassword error (falling back to env/default):", error);
    
    // In case of database error (like invalid provider in local schema vs env),
    // fallback to ADMIN_PASSWORD env variable or default "padowa123"
    const envPassword = process.env.ADMIN_PASSWORD || "padowa123";
    if (password === envPassword) {
      return { success: true };
    }
    return { success: false, error: "Incorrect password" };
  }
}

export async function updatePassword(newPassword: string) {
  try {
    await prisma.setting.upsert({
      where: { key: "admin_password" },
      update: { value: newPassword },
      create: { key: "admin_password", value: newPassword }
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to update password" };
  }
}

// Information Actions
export async function getInformations() {
  return await prisma.information.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function createInformation(data: { title: string; category: string; desc: string; link?: string }) {
  try {
    await prisma.information.create({ data });
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create information" };
  }
}

export async function updateInformation(id: string, data: { title: string; category: string; desc: string; link?: string }) {
  try {
    await prisma.information.update({ where: { id }, data });
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update information" };
  }
}

export async function deleteInformation(id: string) {
  try {
    await prisma.information.delete({ where: { id } });
    revalidatePath("/admin/information");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete information" };
  }
}

export async function getSettings(keys: string[]) {
  const settings = await prisma.setting.findMany({
    where: { key: { in: keys } }
  });
  return settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>);
}

export async function updateSettings(settings: Record<string, string>) {
  try {
    for (const [key, value] of Object.entries(settings)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update settings" };
  }
}

export async function createInquiry(formData: FormData) {
  try {
    await prisma.inquiry.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || "N/A",
        company: formData.get("company") as string || null,
        message: formData.get("message") as string,
      }
    });
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create inquiry" };
  }
}

export async function deleteInquiry(id: string) {
  try {
    await prisma.inquiry.delete({
      where: { id }
    });
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete inquiry" };
  }
}

// Product Actions
export async function getProducts() {
  return await prisma.product.findMany({
    include: { division: true },
    orderBy: { updatedAt: 'desc' }
  });
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
    await (prisma.product as any).create({ 
      data: { ...data, slug } 
    });
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
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
    await prisma.product.update({ where: { id }, data });
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/divisions");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete product" };
  }
}
