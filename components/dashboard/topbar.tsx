"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, User } from "lucide-react";
import { toast } from "sonner";

const roleLabel: Record<string, string> = {
  owner: "Owner",
  kepala_toko: "Kepala Toko",
  kepala_gudang: "Kepala Gudang",
};

export function Topbar() {
  const { profile } = useUser();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    if (isPending) return;
    setIsPending(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsPending(false);
      toast.error("Gagal logout. Silakan coba lagi.");
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  const initials =
    profile?.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "?";

  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      <div />

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 h-8 px-2 rounded-md text-sm font-medium text-slate-700 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs bg-sky-100 text-sky-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-slate-700">
              {profile?.full_name ?? "..."}
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <p className="font-medium text-sm">{profile?.full_name}</p>
                <p className="text-xs text-slate-500">{profile?.email}</p>
                {profile?.role && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {roleLabel[profile.role] ?? profile.role}
                  </Badge>
                )}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profil Saya
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              disabled={isPending}
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isPending ? "Keluar..." : "Keluar"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
