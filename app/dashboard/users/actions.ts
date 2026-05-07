"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

type AuditLogInsert = {
  user_id?: string | null;
  action: string;
  table_name: string;
  record_id?: string | null;
  old_data?: Record<string, unknown> | null;
  new_data?: Record<string, unknown> | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function insertAuditLog(supabase: any, log: AuditLogInsert) {
  await supabase.from("audit_logs").insert(log);
}

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      error:
        "Konfigurasi server Supabase belum lengkap. Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY sudah diset.",
    };
  }

  return { client: createAdminClient(supabaseUrl, serviceRoleKey) };
}

async function requireOwner() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "owner") throw new Error("Forbidden");
  return { supabase, userId: user.id };
}

export async function createUser(formData: FormData) {
  const { supabase, userId } = await requireOwner();
  const adminResult = getAdminClient();

  if ("error" in adminResult) {
    return { error: adminResult.error };
  }

  const admin = adminResult.client;

  const email = formData.get("email") as string;
  const full_name = formData.get("full_name") as string;
  const role = formData.get("role") as string;
  const phone = (formData.get("phone") as string) || null;
  const password = formData.get("password") as string;

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Email sudah terdaftar." };
    }
    return { error: "Gagal membuat pengguna. Silakan coba lagi." };
  }

  // Upsert profile (trigger should handle it, but fallback)
  await supabase.from("profiles").upsert({
    id: data.user.id,
    full_name,
    email,
    role,
    phone,
    is_active: true,
  });

  // Audit log
  await insertAuditLog(supabase, {
    user_id: userId,
    action: "CREATE",
    table_name: "profiles",
    record_id: data.user.id,
    new_data: { email, full_name, role },
  });

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function toggleUserActive(targetId: string, isActive: boolean) {
  const { supabase, userId } = await requireOwner();

  if (targetId === userId) {
    return { error: "Tidak dapat menonaktifkan akun sendiri." };
  }

  const { data: oldData } = await supabase
    .from("profiles")
    .select("is_active, full_name")
    .eq("id", targetId)
    .single();

  const { error } = await supabase
    .from("profiles")
    .update({ is_active: isActive })
    .eq("id", targetId);

  if (error) return { error: "Gagal mengubah status pengguna." };

  await insertAuditLog(supabase, {
    user_id: userId,
    action: isActive ? "ACTIVATE" : "DEACTIVATE",
    table_name: "profiles",
    record_id: targetId,
    old_data: { is_active: oldData?.is_active },
    new_data: { is_active: isActive },
  });

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function updateUserRole(targetId: string, role: string) {
  const { supabase, userId } = await requireOwner();

  if (targetId === userId) {
    return { error: "Tidak dapat mengubah role akun sendiri." };
  }

  const { data: oldData } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", targetId)
    .single();

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", targetId);

  if (error) return { error: "Gagal mengubah role pengguna." };

  await insertAuditLog(supabase, {
    user_id: userId,
    action: "UPDATE_ROLE",
    table_name: "profiles",
    record_id: targetId,
    old_data: { role: oldData?.role },
    new_data: { role },
  });

  revalidatePath("/dashboard/users");
  return { success: true };
}
