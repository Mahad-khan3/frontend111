const allReviews = [
  { name: "Alex K.", rating: 5, text: "Game changer for my iPhone storage. I was constantly running out of space for 4K videos.", date: "2 weeks ago" },
  { name: "Sarah M.", rating: 5, text: "The fact that it doubles as a charging cable is genius. One less thing to carry.", date: "1 month ago" },
  { name: "James T.", rating: 5, text: "Bought the 256GB for my iPad Pro. Works flawlessly. Highly recommend.", date: "3 weeks ago" },
  { name: "Maria L.", rating: 4, text: "Perfect for backing up photos when traveling. No need for a laptop.", date: "1 week ago" },
  { name: "David R.", rating: 5, text: "Transfer speeds are incredible. Way faster than I expected from a cable drive.", date: "2 months ago" },
  { name: "Emma S.", rating: 5, text: "The companion app is really well designed. Makes backing up effortless.", date: "3 weeks ago" },
  { name: "Chris P.", rating: 4, text: "Solid build quality. Feels premium in hand. Works great with my Pixel.", date: "1 month ago" },
  { name: "Lisa W.", rating: 5, text: "Bought one for myself and one for my parents. So easy to use.", date: "2 weeks ago" },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4"><span className="text-4xl text-lime">★★★★★</span><div><span className="text-3xl font-display font-bold">4.8</span><span className="text-text-secondary ml-2">/ 5.0</span></div></div>
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-2">What our <span className="text-lime">customers say</span></h1>
        <p className="text-text-secondary mb-12">Based on 2,400+ verified reviews</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allReviews.map((r) => (
            <div key={r.name + r.date} className="bg-surface rounded-xl p-6 border border-border hover:border-border transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center text-sm text-lime font-bold">{r.name[0]}</div>
                <div><p className="text-sm font-medium">{r.name}</p><p className="text-xs text-text-secondary">{r.date}</p></div>
              </div>
              <p className="text-xs text-lime mb-2">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{r.text}</p>
              <p className="text-[10px] text-lime/50 mt-3">Verified Purchase</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
