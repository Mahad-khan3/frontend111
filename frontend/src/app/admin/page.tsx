"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/dashboard", true).then((r: any) => setData(r.data)).catch(() => {});
  }, []);

  if (!data) return <div className="text-text-secondary">Loading dashboard...</div>;

  const cards = [
    { label: "Total Products", value: data.stats.totalProducts, color: "#C6FF3A" },
    { label: "Total Orders", value: data.stats.totalOrders, color: "#6E6BFF" },
    { label: "Revenue", value: formatPrice(data.stats.totalRevenue), color: "#C6FF3A" },
    { label: "Pending Orders", value: data.stats.pendingOrders, color: "#6E6BFF" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-surface rounded-xl p-5 border border-border">
            <p className="text-sm text-text-secondary mb-1">{c.label}</p>
            <p className="text-2xl font-display font-bold" style={{ color: c.color }}>{c.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-surface rounded-xl border border-border p-6">
        <h2 className="text-lg font-display font-bold mb-4">Recent Orders</h2>
        <table className="w-full text-sm">
          <thead><tr className="text-text-secondary border-b border-border"><th className="text-left py-2">Order</th><th className="text-left py-2">Customer</th><th className="text-left py-2">Items</th><th className="text-left py-2">Status</th><th className="text-left py-2">Total</th><th className="text-left py-2">Date</th></tr></thead>
          <tbody>
            {data.recentOrders.map((order: any) => (
              <tr key={order._id} className="border-b border-border">
                <td className="py-2 font-mono text-xs">{String(order._id).slice(0, 8)}</td>
                <td className="py-2">{order.customerName}</td>
                <td className="py-2">
                  <div className="space-y-0.5">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="text-xs text-text-secondary whitespace-nowrap">{item.name} ({item.capacity}) x{item.quantity}</div>
                    ))}
                  </div>
                </td>
                <td className="py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${order.status === "delivered" ? "bg-lime/10 text-lime" : order.status === "shipped" ? "bg-indigo/10 text-indigo" : order.status === "pending" ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"}`}>{order.status}</span></td>
                <td className="py-2 whitespace-nowrap">{formatPrice(order.total)}</td>
                <td className="py-2 text-text-secondary text-xs whitespace-nowrap">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
