import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CreateUserForm } from "./create-user-form";
import { UsersTable } from "./users-table";
import type { Profile } from "@/lib/supabase/types";

export default async function UsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user!.id)
    .single();

  if (profile?.role !== "owner") {
    redirect("/dashboard");
  }

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Manajemen Pengguna
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola akun pengguna yang terdaftar pada sistem.
        </p>
      </div>

      <CreateUserForm />

      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-3">
          Pengguna Terdaftar ({users?.length ?? 0})
        </h2>
        <UsersTable users={(users ?? []) as Profile[]} />
      </div>
    </div>
  );
}
