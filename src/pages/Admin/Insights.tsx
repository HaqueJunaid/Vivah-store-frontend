import { useEffect, useState } from "react";
import { Loader2, PieChart as PieChartIcon, BarChart2, Settings as SettingsIcon } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import api from "../../services/api";
import toast from "react-hot-toast";

interface PaymentMethodSales {
  name: string;
  value: number;
}

interface TopProduct {
  name: string;
  revenue: number;
  quantity: number;
}

interface InsightsData {
  paymentMethodSales: PaymentMethodSales[];
  topProducts: TopProduct[];
  netProfit: number;
  totalGst: number;
  profitWithGst: number;
}

interface StoreSettings {
  gstRate: number;
  shippingCost: number;
}

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#f43f5e"];

const Insights = () => {
  const [data, setData] = useState<InsightsData | null>(null);
  const [settings, setSettings] = useState<StoreSettings>({ gstRate: 18, shippingCost: 50 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    document.title = "Admin | Insights & Settings";
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [insightsRes, settingsRes] = await Promise.all([
        api.get("/admin/insights"),
        api.get("/admin/settings")
      ]);
      
      if (insightsRes.data.success) {
        setData(insightsRes.data.insights);
      }
      if (settingsRes.data.success && settingsRes.data.settings) {
        setSettings({
          gstRate: settingsRes.data.settings.gstRate,
          shippingCost: settingsRes.data.settings.shippingCost
        });
      }
    } catch (error) {
      console.error("Failed to fetch insights or settings data", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const response = await api.put("/admin/settings", settings);
      if (response.data.success) {
        toast.success("Settings updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update settings", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (value: number) => `₹${value.toFixed(2)}`;

  return (
    <div className="p-5 w-full min-h-screen">
      <div className="flex items-center justify-start gap-2 text-stone-900 mb-6">
        <PieChartIcon size={28} />
        <h1 className="text-2xl font-medium">Insights & Settings</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-stone-500" size={32} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* KPI Summary Cards */}
          {data && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-stone-500 mb-1">Net Profit</p>
                <h3 className="text-3xl font-bold text-stone-900">{formatCurrency(data.netProfit)}</h3>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-stone-500 mb-1">Profit with GST</p>
                <h3 className="text-3xl font-bold text-stone-900">{formatCurrency(data.profitWithGst)}</h3>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-stone-500 mb-1">Total GST Collected</p>
                <h3 className="text-3xl font-bold text-stone-900">{formatCurrency(data.totalGst)}</h3>
              </div>
            </div>
          )}

          {/* Settings Card */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="text-stone-600" size={20} />
              <h2 className="text-lg font-medium text-stone-900">Store Configurations</h2>
            </div>
            
            <form onSubmit={handleUpdateSettings} className="flex flex-col md:flex-row gap-6 items-end">
              <div className="w-full md:w-64">
                <label className="block text-sm font-medium text-stone-700 mb-2">GST Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={settings.gstRate}
                  onChange={(e) => setSettings({ ...settings, gstRate: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              
              <div className="w-full md:w-64">
                <label className="block text-sm font-medium text-stone-700 mb-2">Base Shipping Cost (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full rounded-xl border border-stone-300 px-4 py-2.5 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={settings.shippingCost}
                  onChange={(e) => setSettings({ ...settings, shippingCost: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSaving}
                className="w-full md:w-auto rounded-xl bg-indigo-600 px-6 py-2.5 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[120px]"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : "Save Changes"}
              </button>
            </form>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Sales by Payment Method Pie Chart */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <PieChartIcon className="text-indigo-600" size={20} />
                <h2 className="text-lg font-medium text-stone-900">Revenue by Payment Method</h2>
              </div>
              <div className="h-[300px] w-full">
                {data?.paymentMethodSales && data.paymentMethodSales.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.paymentMethodSales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      >
                        {data.paymentMethodSales.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => formatCurrency(Number(value))}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-stone-500">
                    No data available.
                  </div>
                )}
              </div>
            </div>

            {/* Top Selling Products Bar Chart */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 className="text-emerald-600" size={20} />
                <h2 className="text-lg font-medium text-stone-900">Top 5 Products by Revenue</h2>
              </div>
              <div className="h-[300px] w-full">
                {data?.topProducts && data.topProducts.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.topProducts} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        yAxisId="left"
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#374151', fontWeight: 500, marginBottom: '4px' }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="quantity" name="Quantity Sold" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-stone-500">
                    No data available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;