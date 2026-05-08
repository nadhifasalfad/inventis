"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Calculator,
  Users,
  UserCircle,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/hooks/use-user";
import type { UserRole } from "@/lib/supabase/types";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[] | "all";
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: "all",
  },
  {
    label: "Barang",
    href: "/dashboard/products",
    icon: Package,
    roles: "all",
  },
  {
    label: "Kalkulasi TOPSIS",
    href: "/dashboard/calculations",
    icon: Calculator,
    roles: ["kepala_gudang", "kepala_toko", "owner"],
  },
  {
    label: "Laporan",
    href: "/dashboard/reports",
    icon: BarChart3,
    roles: ["owner"],
  },
  {
    label: "Pengguna",
    href: "/dashboard/users",
    icon: Users,
    roles: ["owner"],
  },
  {
    label: "Pengaturan",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["kepala_toko"],
  },
  {
    label: "Profil",
    href: "/dashboard/profile",
    icon: UserCircle,
    roles: "all",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useUser();

  const visibleItems = navItems.filter(
    (item) =>
      item.roles === "all" || (profile && item.roles.includes(profile.role)),
  );

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-bj.png"
            alt="Banten Jaya Sport Fashion"
            width={40}
            height={40}
            className="rounded-full shrink-0"
          />
          <div className="leading-tight min-w-0">
            <p className="text-sm font-bold text-primary leading-none">
              Inventis
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
              Banten Jaya Sport Fashion
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
