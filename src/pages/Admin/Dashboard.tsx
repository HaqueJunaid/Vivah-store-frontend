import { Gauge, ShoppingCart, DollarSign, Box, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import SalesChart from "../../components/admin/SalesChart";

interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

interface DashboardStats {
  totalOrders: number;
  totalSales: number;
  totalProducts: number;
  salesData?: SalesData[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin | Dashboard";
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/dashboard-stats");
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="p-5 w-full min-h-screen">
      <div className="flex items-center justify-start gap-2 text-stone-900 mb-6">
        <Gauge size={28} />
        <h1 className="text-2xl font-medium">Dashboard</h1>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-stone-500" size={32} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Total Orders</p>
                  <p className="mt-3 text-3xl font-semibold text-stone-900">
                    {stats?.totalOrders.toLocaleString() || "0"}
                  </p>
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
                  <p className="mt-3 text-3xl font-semibold text-stone-900">
                    {formatCurrency(stats?.totalSales || 0)}
                  </p>
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
                  <p className="mt-3 text-3xl font-semibold text-stone-900">
                    {stats?.totalProducts.toLocaleString() || "0"}
                  </p>
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  <Box size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart Section */}
          <SalesChart data={stats?.salesData || []} />
        </>
      )}
    </div>
  );
};

export default Dashboard;