export default function AgronomistFieldForm() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Agronomy Parcel Inspection</h1>
      <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Parcel ID</label>
          <input className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. PAR-2026-001" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Health Score (0-100)</label>
          <input type="number" className="w-full px-3 py-2 border rounded-lg" defaultValue="85" />
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Submit Inspection</button>
      </div>
    </div>
  );
}
