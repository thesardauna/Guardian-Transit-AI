import QRScanner from "@/components/QRScanner";

export default function ScanPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-primary">
          Vehicle Verification
        </h1>

        <p className="text-slate-600 mt-3 mb-10">
          Scan a registered transport QR code to begin
          AI-powered trip monitoring and safety verification.
        </p>

        <QRScanner />
      </div>
    </main>
  );
}
