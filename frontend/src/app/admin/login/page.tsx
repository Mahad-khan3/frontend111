"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(form.email, form.password);
      router.push("/admin");
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-8 xl:px-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold"><span className="text-lime">Nova</span><span className="text-text">Drive</span></h1>
          <p className="text-sm text-text-secondary mt-2">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" required className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit" className="w-full py-3 bg-lime text-white font-bold rounded-lg text-sm hover:bg-lime/90 transition-colors">Sign In</button>
        </form>
      </div>
    </div>
  );
}
