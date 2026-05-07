"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Calculator,
  Users,
  Settings,
  BarChart3,
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
    roles: ["kepala_toko", "kepala_gudang", "owner"],
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
    <aside className="w-60 shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="px-6 py-5 border-b border-slate-200">
        <span className="text-lg font-bold text-sky-700">Inventis</span>
        <p className="text-xs text-slate-500 mt-0.5">
          Banten Jaya Sport Fashion
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
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
                  ? "bg-sky-50 text-sky-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
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
