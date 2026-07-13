"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  connector: string;
  basePrice: number;
  features: Array<{ icon: string; title: string; desc: string }>;
  specs: Array<{ label: string; value: string }>;
  variants: Array<{ capacity: string; price: number; stock: number; sku: string; images: string[] }>;
  compatibility: string[];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    slug: "",
    description: "",
    connector: "lightning",
    basePrice: 14999,
    features: [],
    specs: [],
    variants: [],
    compatibility: []
  });

  useEffect(() => { api.get("/products", true).then((r: any) => setProducts(r.data || r)).catch(() => {}); }, []);

  const connectorOptions = [
    { value: "lightning", label: "Lightning", color: "#C6FF3A" },
    { value: "usb-c", label: "USB-C", color: "#6E6BFF" },
  ];

  const addFeature = () => {
    setForm(prev => ({
      ...prev,
      features: [...prev.features, { icon: "♪", title: "New Feature", desc: "Feature description" }]
    }));
  };

  const updateFeature = (index: number, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? { ...f, [field]: value } : f)
    }));
  };

  const removeFeature = (index: number) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addSpec = () => {
    setForm(prev => ({
      ...prev,
      specs: [...prev.specs, { label: "New Spec", value: "Spec value" }]
    }));
  };

  const updateSpec = (index: number, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      specs: prev.specs.map((s, i) => i === index ? { ...s, [field]: value } : s)
    }));
  };

  const removeSpec = (index: number) => {
    setForm(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { capacity: "32GB", price: 14999, stock: 100, sku: "ND-L-032", images: [] }]
    }));
  };

  const updateVariant = (index: number, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.map((v, i) => i === index ? { ...v, [field]: value } : v)
    }));
  };

  const removeVariant = (index: number) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const addCompatibility = () => {
    setForm(prev => ({
      ...prev,
      compatibility: [...prev.compatibility, "New compatibility"]
    }));
  };

  const updateCompatibility = (index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      compatibility: prev.compatibility.map((c, i) => i === index ? value : c)
    }));
  };

  const removeCompatibility = (index: number) => {
    setForm(prev => ({
      ...prev,
      compatibility: prev.compatibility.filter((_, i) => i !== index)
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/products", form, true);
      toast.success("Product created!");
      setShowForm(false);
      setForm({
        name: "",
        slug: "",
        description: "",
        connector: "lightning",
        basePrice: 14999,
        features: [],
        specs: [],
        variants: [],
        compatibility: []
      });
      const updated: any = await api.get<any>("/products", true);
      setProducts(updated.data || updated);
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold">Products</h1>
        <button className="px-6 py-3 bg-lime text-white text-base font-bold rounded-lg hover:bg-lime/90 transition-colors" onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Add Product"}</button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="bg-surface rounded-xl border border-border p-8 mb-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>
              <input type="text" placeholder="Product Name" required className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-base" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <input type="text" placeholder="Slug" required className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-base" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea placeholder="Description" required rows={3} className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-base" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Connector</label>
              <select className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-base" value={form.connector} onChange={(e) => setForm({ ...form, connector: e.target.value })}>
                {connectorOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Base Price (PKR)</label>
              <input type="number" step="1" placeholder="Base Price in PKR" required className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-base" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: parseFloat(e.target.value) })} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold">Features</h3>
              <button type="button" onClick={addFeature} className="px-3 py-1 bg-lime/10 text-lime text-sm rounded hover:bg-lime/20">Add Feature</button>
            </div>
            {form.features.map((feature, index) => (
              <div key={index} className="bg-surface-alt rounded-lg p-4 space-y-3 border border-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Feature {index + 1}</h4>
                  <button type="button" onClick={() => removeFeature(index)} className="text-red-400 hover:text-red-300">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="Icon" value={feature.icon} onChange={(e) => updateFeature(index, "icon", e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                  <input type="text" placeholder="Title" value={feature.title} onChange={(e) => updateFeature(index, "title", e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                  <input type="text" placeholder="Description" value={feature.desc} onChange={(e) => updateFeature(index, "desc", e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold">Specifications</h3>
              <button type="button" onClick={addSpec} className="px-3 py-1 bg-lime/10 text-lime text-sm rounded hover:bg-lime/20">Add Spec</button>
            </div>
            {form.specs.map((spec, index) => (
              <div key={index} className="bg-surface-alt rounded-lg p-4 space-y-3 border border-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Spec {index + 1}</h4>
                  <button type="button" onClick={() => removeSpec(index)} className="text-red-400 hover:text-red-300">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" placeholder="Label" value={spec.label} onChange={(e) => updateSpec(index, "label", e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                  <input type="text" placeholder="Value" value={spec.value} onChange={(e) => updateSpec(index, "value", e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold">Variants</h3>
              <button type="button" onClick={addVariant} className="px-3 py-1 bg-lime/10 text-lime text-sm rounded hover:bg-lime/20">Add Variant</button>
            </div>
            {form.variants.map((variant, index) => (
              <div key={index} className="bg-surface-alt rounded-lg p-4 space-y-3 border border-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Variant {index + 1}</h4>
                  <button type="button" onClick={() => removeVariant(index)} className="text-red-400 hover:text-red-300">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input type="text" placeholder="Capacity" value={variant.capacity} onChange={(e) => updateVariant(index, "capacity", e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                  <input type="number" step="1" placeholder="Price (PKR)" value={variant.price} onChange={(e) => updateVariant(index, "price", parseFloat(e.target.value))} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                  <input type="number" placeholder="Stock" value={variant.stock} onChange={(e) => updateVariant(index, "stock", parseInt(e.target.value))} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                  <input type="text" placeholder="SKU" value={variant.sku} onChange={(e) => updateVariant(index, "sku", e.target.value)} className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold">Compatibility</h3>
              <button type="button" onClick={addCompatibility} className="px-3 py-1 bg-lime/10 text-lime text-sm rounded hover:bg-lime/20">Add Compatibility</button>
            </div>
            {form.compatibility.map((compat, index) => (
              <div key={index} className="bg-surface-alt rounded-lg p-3 flex items-center gap-3 border border-border">
                <input type="text" placeholder="Compatibility" value={compat} onChange={(e) => updateCompatibility(index, e.target.value)} className="flex-1 bg-bg border border-border rounded-lg px-3 py-2 text-sm" />
                <button type="button" onClick={() => removeCompatibility(index)} className="text-red-400 hover:text-red-300 px-2">Remove</button>
              </div>
            ))}
          </div>
          <button type="submit" className="px-8 py-4 bg-lime text-white text-base font-bold rounded-lg hover:bg-lime/90 transition-colors w-full">Create Product</button>
        </form>
      )}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-surface-alt">
          <h2 className="text-lg font-display font-bold">Product List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-text-secondary border-b border-border">
              <th className="text-left py-4 px-6">Name</th>
              <th className="text-left py-4 px-6">Connector</th>
              <th className="text-left py-4 px-6">Price</th>
              <th className="text-left py-4 px-6">Status</th>
              <th className="text-left py-4 px-6">Created</th>
            </tr></thead>
            <tbody>{products.map((p: any) => (
              <tr key={p._id || p.id} className="border-b border-border hover:bg-surface-alt">
                <td className="py-4 px-6 font-medium">{p.name}</td>
                <td className="py-4 px-6 text-text-secondary capitalize">{p.connector}</td>
                <td className="py-4 px-6 text-lime">{formatPrice(p.basePrice)}</td>
                <td className="py-4 px-6"><span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "active" ? "bg-lime/10 text-lime" : "bg-text-secondary/10 text-text-secondary"}`}>{p.status}</span></td>
                <td className="py-4 px-6 text-text-secondary text-xs">{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
