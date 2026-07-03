import { Gauge, ShoppingCart, DollarSign, Box } from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Admin | Dashboard"
  }, [])

  return (
    <div className="p-5 w-full min-h-screen">
      <div className="flex items-center justify-start gap-2 text-stone-900 mb-6">
        <Gauge size={28} />
        <h1 className="text-2xl font-medium">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Total Orders</p>
              <p className="mt-3 text-3xl font-semibold text-stone-900">1,248</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <ShoppingCart size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Total Sales</p>
              <p className="mt-3 text-3xl font-semibold text-stone-900">$42.7K</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <DollarSign size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Total Products</p>
              <p className="mt-3 text-3xl font-semibold text-stone-900">624</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <Box size={20} />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard