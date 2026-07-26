import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

interface SalesChartProps {
  data: SalesData[];
}

const SalesChart = ({ data }: SalesChartProps) => {
  return (
    <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-medium text-stone-900">Sales Overview (Last 30 Days)</h2>
      <div className="h-[300px] w-full">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
                labelStyle={{ color: '#374151', fontWeight: 500, marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#4f46e5" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-stone-500">
            No sales data available for this period.
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;
