import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Admin & ERP Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Registered Farmers"><p className="text-3xl font-bold text-emerald-600">12,450</p></Card>
        <Card title="Active Contracts"><p className="text-3xl font-bold text-blue-600">8,920</p></Card>
        <Card title="Warehouse Batches"><p className="text-3xl font-bold text-amber-600">4,310 MT</p></Card>
      </div>
    </div>
  );
}
