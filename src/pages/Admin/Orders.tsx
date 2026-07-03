import { useEffect, useState } from "react";
import { Eye, SearchIcon, ShoppingCartIcon } from "lucide-react";
import type { AdminOrderItem as OrderItem, AdminOrder as Order } from "../../types/allTypes";

const mockOrders: Order[] = [
  {
    id: "ORD-1001",
    date: "2026-05-26",
    items: [
      { name: "Wireless Earbuds", price: 129, qty: 2 },
      { name: "Charging Cable", price: 9, qty: 1 },
    ],
    status: "Pending",
  },
  {
    id: "ORD-1002",
    date: "2026-05-24",
    items: [{ name: "Smart Watch", price: 199, qty: 1 }],
    status: "Processing",
  },
  {
    id: "ORD-1003",
    date: "2026-05-20",
    items: [
      { name: "Noise Cancelling Headphones", price: 249, qty: 1 },
      { name: "Ear Tips", price: 5, qty: 3 },
    ],
    status: "Shipped",
  },
];

const Orders = () => {
  useEffect(() => {
    document.title = "Admin | All Orders"
  }, [])
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isDetailOn, setIsDetailOn] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((o) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(searchLower) ||
      o.status.toLowerCase().includes(searchLower) ||
      o.date.toLowerCase().includes(searchLower) ||
      o.items.some((it) => it.name.toLowerCase().includes(searchLower))
    );
  });

  const handleDetailToggle = (orderId: string | null) => {
    setIsDetailOn((prev) => !prev);
    setFilteredProduct(orders.filter((e) => e.id === orderId)[0]);
  };

  const updateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const calcTotal = (items: OrderItem[]) => items.reduce((s, it) => s + it.price * it.qty, 0);
  const calcQty = (items: OrderItem[]) => items.reduce((s, it) => s + it.qty, 0);

  return (
    <div className="p-5 w-full min-h-screen overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center  justify-between mb-6 gap-3">
        <div className="flex items-center justify-start gap-2 text-stone-900 ">
          <ShoppingCartIcon size={28} />
          <h1 className="text-2xl font-medium text-nowrap">All Orders</h1>
        </div>
        <div className="flex items-center justify-end w-full md:w-auto gap-3">
          <input
            className="w-full md:w-[220px] rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-900 transition"
            type="text"
            placeholder="Search orders..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button className="rounded-full bg-stone-900 px-4 py-2 text-sm text-stone-50 border border-stone-900 hover:bg-stone-800 transition flex items-center justify-center gap-2 cursor-pointer" type="button">
            <SearchIcon size={18} /> Search
          </button>
        </div>
      </div>

      {/* Table for md+ screens */}
      <div className="hidden md:block w-full overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
        <table className="min-w-175 w-full table-auto border-separate border-spacing-y-0">
          <thead className="bg-stone-100">
            <tr className="text-left text-sm uppercase tracking-[0.15em] text-stone-500">
              <th className="px-5 py-4">Order ID</th>
              <th className="px-5 py-4">Order Date</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Quantity</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="rounded-3xl overflow-hidden border border-stone-100 bg-white transition">
                <td className="px-5 py-5 align-top">
                  <div className="font-semibold text-stone-900">{order.id}</div>
                </td>
                <td className="px-5 py-5 align-top text-stone-700">{order.date}</td>
                <td className="px-5 py-5 align-top">
                  <ul className="space-y-2">
                    {order.items.map((it, i) => (
                      <li key={i} className="text-sm text-stone-700">
                        <span className="font-medium text-stone-900">{it.name}</span>
                        <span className="ml-2 text-stone-400">×{it.qty}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-5 py-5 align-top text-stone-700">{calcQty(order.items)}</td>
                <td className="px-5 py-5 align-top text-stone-900 font-semibold">${calcTotal(order.items).toLocaleString()}</td>
                <td className="px-5 py-5 align-top">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                    className="rounded-full border border-stone-200 bg-stone-100 px-3 py-2 text-sm text-stone-700 focus:outline-none"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="px-5 py-5 align-top text-right">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:border-stone-300 hover:text-stone-900"
                    aria-label="Show order details"
                    onClick={() => handleDetailToggle(order.id)}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="block md:hidden space-y-5">
        {filteredOrders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900">{order.id}</span>
              <span className="text-xs text-stone-500">{order.date}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {order.items.map((it, i) => (
                <span key={i} className="inline-block bg-stone-100 rounded-full px-3 py-1 text-xs text-stone-700">
                  {it.name} <span className="text-stone-400">×{it.qty}</span>
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-stone-700">Qty: <b>{calcQty(order.items)}</b></span>
              <span className="text-base font-bold text-stone-900">${calcTotal(order.items).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs text-stone-700 focus:outline-none"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:border-stone-300 hover:text-stone-900"
                aria-label="Show order details"
                onClick={() => handleDetailToggle(order.id)}
              >
                <Eye size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDetailOn && (
        <div onClick={() => handleDetailToggle(null)} className="absolute left-0 top-0 w-full h-screen z-100 bg-stone-950/10 backdrop-blur-sm"></div>
      )}
      {isDetailOn && filteredProduct && (
        <div className="w-full h-screen fixed inset-0 z-110 flex items-center justify-center px-4 py-6">
          <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-sm" onClick={() => handleDetailToggle(null)} />
          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-6 py-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Order Details</p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900">{filteredProduct.id}</h2>
                <p className="mt-1 text-sm text-stone-600">{filteredProduct.date} • {filteredProduct.status}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDetailToggle(null)}
                className="rounded-full border border-stone-200 bg-stone-100 p-3 text-stone-600 transition hover:bg-stone-200 hover:text-stone-900"
                aria-label="Close order details"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-stone-500">Customer order summary</p>
                    <p className="mt-1 text-base text-stone-700">{filteredProduct.items.length} item(s) in cart</p>
                  </div>
                  <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
                    <ShoppingCartIcon size={18} />
                    View Cart Style
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredProduct.items.map((item, index) => (
                    <div key={index} className="grid gap-4 rounded-3xl bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto]">
                      <div>
                        <p className="font-semibold text-stone-900">{item.name}</p>
                        <p className="mt-1 text-sm text-stone-500">Qty: {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-stone-500">Unit price</p>
                        <p className="mt-1 text-lg font-semibold text-stone-900">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-stone-200 pt-5 text-sm text-stone-700 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p>Total items: <span className="font-semibold text-stone-900">{calcQty(filteredProduct.items)}</span></p>
                    <p className="mt-1">Subtotal: <span className="font-semibold text-stone-900">${calcTotal(filteredProduct.items).toLocaleString()}</span></p>
                  </div>
                  <div className="rounded-3xl bg-stone-900 px-5 py-3 text-white">
                    Total amount: ${calcTotal(filteredProduct.items).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 shadow-sm rounded-3xl border-2 border-stone-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 text-center md:text-left">Order Summary</h3>
          <p className="text-sm text-stone-500 text-center md:text-left">Total volume of all listed orders</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm uppercase tracking-widest text-stone-500">Total Revenue</p>
          <p className="text-3xl font-bold text-indigo-600">
            ${orders.reduce((acc, order) => acc + calcTotal(order.items), 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders