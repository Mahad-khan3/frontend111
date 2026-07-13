"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500", paid: "bg-indigo/10 text-indigo",
  shipped: "bg-blue-500/10 text-blue-500", delivered: "bg-lime/10 text-lime", refunded: "bg-red-500/10 text-red-500",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => { api.get<any>("/admin/orders", true).then((r: any) => setOrders(r.orders || [])).catch(() => {}); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put("/orders/" + id, { status }, true);
      toast.success(`Status updated to ${status}`);
      const updated: any = await api.get<any>("/admin/orders", true);
      setOrders(updated.orders || []);
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">Orders</h1>
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="text-text-secondary border-b border-border"><th className="text-left py-3 px-4">Order ID</th><th className="text-left py-3 px-4">Customer</th><th className="text-left py-3 px-4">Items</th><th className="text-left py-3 px-4">Total</th><th className="text-left py-3 px-4">Status</th><th className="text-left py-3 px-4">Date</th><th className="text-left py-3 px-4">Actions</th></tr></thead>
            <tbody>{orders.map((order: any) => (
              <tr key={order._id} className="border-b border-border hover:bg-surface-alt">
                <td className="py-3 px-4 font-mono text-xs">{String(order._id).slice(0, 8)}...</td>
                <td className="py-3 px-4"><div>{order.customerName}</div><div className="text-xs text-text-secondary">{order.customerEmail}</div></td>
                <td className="py-3 px-4">
                  <div className="space-y-0.5">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="text-xs text-text-secondary whitespace-nowrap">{item.name} ({item.capacity}) x{item.quantity}</div>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-lime font-medium whitespace-nowrap">{formatPrice(order.total)}</td>
                <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status] || "bg-text-secondary/10 text-text-secondary"}`}>{order.status}</span></td>
                <td className="py-3 px-4 text-text-secondary text-xs whitespace-nowrap">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="py-3 px-4">
                  <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="bg-surface border border-border rounded px-2 py-1 text-xs">
                    <option value="pending">Pending</option><option value="paid">Paid</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="refunded">Refunded</option>
                  </select>
                </td>
              </tr>
            ))}</tbody>
          </table>
      </div>
    </div>
  );
}
