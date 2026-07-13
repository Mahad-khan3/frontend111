"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Message sent! We'll get back to you soon."); setForm({ name: "", email: "", subject: "", message: "" }); };

  return (
    <div className="min-h-screen pt-24 pb-24 px-8 xl:px-12">
      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Get in <span className="text-lime">touch</span></h1>
          <p className="text-text-secondary mb-8">Have a question? Need help? We&apos;re here to help.</p>
          <div className="space-y-6">
            <div><h3 className="text-sm font-bold mb-1">Email</h3><p className="text-sm text-text-secondary">support@novadrive.com</p></div>
            <div><h3 className="text-sm font-bold mb-1">Support Hours</h3><p className="text-sm text-text-secondary">Monday — Friday: 9 AM — 6 PM EST</p></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" required className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" required className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="text" placeholder="Subject" required className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <textarea placeholder="Message" required rows={5} className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button type="submit" className="px-6 py-3 bg-lime text-white font-bold rounded-lg text-sm hover:bg-lime/90 transition-colors">Send Message</button>
        </form>
      </div>
    </div>
  );
}
