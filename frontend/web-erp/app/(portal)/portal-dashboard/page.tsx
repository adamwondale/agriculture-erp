import { Card } from '@/components/ui/card';

export default function PortalDashboard() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Customer & Investor Transparency Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="EUDR Compliant Export Volume"><p className="text-3xl font-bold text-emerald-600">98.4%</p></Card>
        <Card title="Traceable Batches In Transit"><p className="text-3xl font-bold text-blue-600">28</p></Card>
      </div>
    </div>
  );
}
