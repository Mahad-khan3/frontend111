export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-32 px-8 xl:px-12"><div className="w-full max-w-3xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">Privacy <span className="text-lime">Policy</span></h1>
      <div className="text-text-secondary space-y-6">
        <p>NovaDrive respects your privacy. We collect information you provide directly: name, email, shipping address, and payment details (processed securely by Stripe/PayPal).</p>
        <h3 className="text-text text-lg font-bold">How We Use Your Information</h3><p>To process orders, provide customer support, and improve our products. We never sell your data.</p>
        <h3 className="text-text text-lg font-bold">Data Security</h3><p>We implement SSL encryption, secure payment processing, and regular security audits.</p>
        <h3 className="text-text text-lg font-bold">Contact</h3><p>privacy@novadrive.com</p>
      </div>
    </div></div>
  );
}
