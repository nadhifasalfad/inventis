"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MovementCategory } from "@/lib/supabase/types";

export async function createProduct(_prevState: unknown, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Sesi tidak valid. Silakan login ulang." };

  const sku = (formData.get("sku") as string).trim();
  const name = (formData.get("name") as string).trim();
  const category_id = (formData.get("category_id") as string) || null;
  const buy_price = Number(formData.get("buy_price"));
  const sell_price = Number(formData.get("sell_price"));
  const stock = Number(formData.get("stock"));
  const safety_stock = Number(formData.get("safety_stock"));
  const movement_category = formData.get("movement_category") as MovementCategory;
  const description = (formData.get("description") as string).trim() || null;

  if (!sku || !name) return { error: "SKU dan nama wajib diisi." };
  if (buy_price < 0 || sell_price < 0) return { error: "Harga tidak boleh negatif." };
  if (stock < 0 || safety_stock < 0) return { error: "Stok tidak boleh negatif." };

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      sku,
      name,
      category_id,
      buy_price,
      sell_price,
      stock,
      safety_stock,
      movement_category,
      description,
      is_active: true,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") return { error: "SKU sudah digunakan. Gunakan SKU lain." };
    return { error: `[${error.code}] ${error.message}` };
  }

  if (stock > 0) {
    await supabase.from("stock_movements").insert({
      product_id: product.id,
      user_id: user.id,
      type: "in",
      quantity: stock,
      note: "Stok awal",
    });
  }

  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function updateStock(_prevState: unknown, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Sesi tidak valid. Silakan login ulang." };

  const product_id = formData.get("product_id") as string;
  const new_stock = Number(formData.get("new_stock"));
  const note = (formData.get("note") as string).trim() || null;

  if (!product_id) return { error: "ID barang tidak valid." };
  if (new_stock < 0) return { error: "Stok tidak boleh negatif." };

  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("stock")
    .eq("id", product_id)
    .single();

  if (fetchError || !product) return { error: "Barang tidak ditemukan." };

  const diff = new_stock - (product as { stock: number }).stock;

  const { error } = await supabase
    .from("products")
    .update({ stock: new_stock })
    .eq("id", product_id);

  if (error) return { error: "Gagal memperbarui stok. Coba lagi." };

  if (diff !== 0) {
    await supabase.from("stock_movements").insert({
      product_id,
      user_id: user.id,
      type: "adjustment",
      quantity: Math.abs(diff),
      note: note ?? (diff > 0 ? "Penambahan stok" : "Pengurangan stok"),
    });
  }

  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function toggleProductActive(productId: string, currentActive: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Sesi tidak valid." };

  const { error } = await supabase
    .from("products")
    .update({ is_active: !currentActive })
    .eq("id", productId);

  if (error) return { error: "Gagal mengubah status barang." };

  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");
  return data ?? [];
}
