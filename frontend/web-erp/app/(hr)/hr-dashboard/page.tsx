import { Card } from '@/components/ui/card';

export default function HrDashboard() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Human Resources & Field Workforce</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Total Extension Officers & Agronomists"><p className="text-3xl font-bold text-indigo-600">340</p></Card>
        <Card title="Pending Leave Requests"><p className="text-3xl font-bold text-amber-600">12</p></Card>
      </div>
    </div>
  );
}
