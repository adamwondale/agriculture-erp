import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-emerald-50 to-slate-100">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Agriculture ERP System</h1>
        <p className="text-slate-600 mb-8">Digital Farm Management & End-to-End Agribusiness Platform</p>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/dashboard" className="p-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">Admin Console</Link>
          <Link href="/hr-dashboard" className="p-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">HR Workforce</Link>
          <Link href="/field-form" className="p-4 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700">Agronomist Field</Link>
          <Link href="/portal-dashboard" className="p-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">Investor / Buyer Portal</Link>
        </div>
      </div>
    </main>
  );
}
