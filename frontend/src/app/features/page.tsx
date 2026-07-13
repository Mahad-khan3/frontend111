"use client";

const modules = [
  { icon: "♪", title: "Music Backup Module", color: "#a3e635", desc: "Auto-sync your entire Apple Music or local library in seconds.", bullets: ["Playlist preservation", "Lossless audio support", "Background sync"] },
  { icon: "▶", title: "Video Transfer Module", color: "#6366f1", desc: "Shoot in 4K or ProRes without worrying about storage.", bullets: ["4K/8K video support", "Preserves file structure", "Batch export"] },
  { icon: "◉", title: "Photo Storage Module", color: "#a3e635", desc: "Free up your device storage by moving photos to NovaDrive.", bullets: ["Smart album organization", "Live Photo support", "Geotag preservation"] },
  { icon: "◎", title: "Contacts Sync Module", color: "#6366f1", desc: "Never lose a contact again. One-tap backup.", bullets: ["Cross-platform vCard", "Duplicate detection", "Restore from backup"] },
  { icon: "⬩", title: "Password Vault", color: "#a3e635", desc: "Military-grade AES-256 encryption for your sensitive files.", bullets: ["AES-256 encryption", "Biometric unlock", "Secure folder sharing"] },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-2">Everything <span className="text-lime">inside</span></h1>
        <p className="text-text-secondary mb-12">Five powerful software modules that turn NovaDrive into a complete mobile backup solution.</p>
        <div className="space-y-4">
          {modules.map((m) => (
            <div key={m.title} className="bg-surface rounded-xl border border-border p-6 grid md:grid-cols-2 gap-6">
              <div>
                <span className="text-lg block mb-2">{m.icon}</span>
                <h2 className="text-lg font-display font-bold mb-2">{m.title}</h2>
                <p className="text-sm text-text-secondary mb-3">{m.desc}</p>
                <ul className="space-y-1">{m.bullets.map((b) => <li key={b} className="flex items-center gap-2 text-sm text-text-secondary"><span style={{ color: m.color }}>→</span>{b}</li>)}</ul>
              </div>
              <div className="h-48 rounded-lg flex items-center justify-center" style={{ background: `radial-gradient(ellipse at center, ${m.color}08, transparent)` }}>
                <span className="text-4xl" style={{ color: m.color + "30" }}>{m.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
