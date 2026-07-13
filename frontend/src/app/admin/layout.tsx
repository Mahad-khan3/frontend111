"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: "◉" },
  { href: "/admin/products", label: "Products", icon: "□" },
  { href: "/admin/orders", label: "Orders", icon: "◎" },
  { href: "/admin/customers", label: "Customers", icon: "♪" },
  { href: "/admin/pages", label: "Pages", icon: "▶" },
  { href: "/admin/reviews", label: "Reviews", icon: "★" },
  { href: "/admin/discounts", label: "Discounts", icon: "%" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") { setAuthed(true); return; }
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }
    setAuthed(true);
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (!authed) return <div className="min-h-screen bg-bg flex items-center justify-center text-text-secondary">Loading...</div>;

  return (
    <div className="min-h-screen bg-bg flex">
      <aside className="w-64 bg-surface border-r border-border p-6 fixed h-full">
        <Link href="/admin" className="text-lg font-display font-bold block mb-8">
          <span className="text-lime">Nova</span>Drive
          <span className="block text-[10px] text-text-secondary uppercase tracking-widest">Admin Panel</span>
        </Link>
        <nav className="space-y-1">
          {sidebarLinks.map((l) => (
            <Link key={l.href} href={l.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${pathname === l.href ? "bg-lime/10 text-lime" : "text-text-secondary hover:text-text hover:bg-surface-alt"}`}>
              <span>{l.icon}</span>{l.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <Link href="/" className="text-xs text-text-secondary hover:text-lime block">← Back to Site</Link>
          <button onClick={() => { localStorage.removeItem("token"); router.push("/admin/login"); }} className="text-xs text-red-400 hover:text-red-300 mt-2 block">Sign Out</button>
        </div>
      </aside>
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
