import { useEffect, useState, useCallback } from "react";
import toast from 'react-hot-toast';
import { Eye, SearchIcon, ShoppingCartIcon, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { getAllOrdersAdmin, updateOrderStatus, deleteOrder as deleteOrderApi } from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDetailOn, setIsDetailOn] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    document.title = "Admin | All Orders";
  }, []);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset page on new search
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllOrdersAdmin(page, limit, debouncedSearch);
      if (res.data.success) {
        setOrders(res.data.orders);
        setTotal(res.data.total || 0);
        setTotalRevenue(res.data.totalRevenue || 0);
      }
    } catch (err) {
      console.error("Error fetching admin orders:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDetailToggle = (orderId: string | null) => {
    setIsDetailOn((prev) => !prev);
    setSelectedOrder(orders.find((e) => e._id === orderId) || null);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
        }
        toast.success("Order status updated successfully!");
      }
    } catch (err: any) {
      console.error("Error updating order status:", err);
      toast.error(err.response?.data?.message || "Failed to update order status.");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to delete this order? This will permanently remove the order data and all associated customization images.")) {
      return;
    }
    try {
      const res = await deleteOrderApi(orderId);
      if (res.data.success) {
        toast.success("Order deleted successfully!");
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        setTotal((t) => Math.max(0, t - 1));
        const deletedOrder = orders.find((o) => o._id === orderId);
        if (deletedOrder) {
          setTotalRevenue((rev) => Math.max(0, rev - (deletedOrder.totalAmount || 0)));
        }
      }
    } catch (err: any) {
      console.error("Error deleting order:", err);
      toast.error(err.response?.data?.message || "Failed to delete order.");
    }
  };


  const calcQty = (items: any[]) => items?.reduce((s, it) => s + it.quantity, 0) || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const getStatusSelectClass = (status: string) => {
    switch (status) {
      case "Delivered":
        return "border-green-300 bg-green-50 text-green-700 focus:border-green-500";
      case "Cancelled":
        return "border-red-300 bg-red-50 text-red-700 focus:border-red-500";
      case "Processing":
        return "border-blue-300 bg-blue-50 text-blue-700 focus:border-blue-500";
      case "Shipped":
        return "border-indigo-300 bg-indigo-50 text-indigo-700 focus:border-indigo-500";
      case "Pending":
      default:
        return "border-yellow-350 bg-yellow-50 text-yellow-650 focus:border-yellow-500";
    }
  };

  return (
    <div className="p-5 w-full min-h-screen overflow-x-hidden bg-stone-50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
        <div className="flex items-center justify-start gap-2 text-stone-900 ">
          <ShoppingCartIcon size={28} className="text-[#E41F66]" />
          <h1 className="text-2xl font-medium text-nowrap">All Orders</h1>
        </div>
        <div className="flex items-center justify-end w-full md:w-auto gap-3">
          <div className="relative w-full md:w-[220px]">
            <input
              className="w-full rounded-full border border-stone-200 bg-white px-4 py-2 pl-9 text-sm text-stone-700 focus:outline-none focus:border-[#E41F66] transition shadow-xs"
              type="text"
              placeholder="Search orders..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <SearchIcon className="absolute left-3 top-2.5 size-4 text-stone-400" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 border border-stone-200 bg-white rounded-3xl animate-pulse flex justify-between">
              <div className="space-y-2 w-1/3">
                <div className="w-1/2 h-5 bg-stone-200 rounded" />
                <div className="w-3/4 h-4 bg-stone-200 rounded" />
              </div>
              <div className="w-24 h-8 bg-stone-200 rounded-full" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl shadow-sm p-8">
          <ShoppingCartIcon className="size-12 mx-auto text-stone-400 mb-3" />
          <h3 className="text-xl font-bold text-stone-800 mb-1">No Orders Found</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            {debouncedSearch ? `We couldn't find any orders matching "${debouncedSearch}".` : "No orders have been placed yet."}
          </p>
        </div>
      ) : (
        <>
          {/* Table for md+ screens */}
          <div className="hidden md:block w-full overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
            <table className="min-w-175 w-full table-auto border-separate border-spacing-y-0 text-stone-700">
              <thead className="bg-stone-100">
                <tr className="text-left text-xs uppercase tracking-[0.15em] text-stone-500">
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Items</th>
                  <th className="px-5 py-4">Quantity</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t border-stone-100 bg-white transition hover:bg-stone-50/50">
                    <td className="px-5 py-5 align-top">
                      <div className="font-semibold text-stone-900 font-mono text-xs truncate max-w-[120px]">{order._id}</div>
                      <div className="text-xs text-stone-400 mt-1">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-5 py-5 align-top">
                      <div className="font-medium text-stone-900">
                        {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                      </div>
                      <div className="text-xs text-stone-500 font-medium">
                        {order.shippingAddress?.phone}
                      </div>
                    </td>
                    <td className="px-5 py-5 align-top">
                      <ul className="space-y-1.5">
                        {order.items?.map((it: any, i: number) => (
                          <li key={i} className="text-sm text-stone-700 leading-tight">
                            <span className="font-semibold text-stone-900">{it.name}</span>
                            <span className="ml-1.5 text-stone-400 font-medium">×{it.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-5 align-top text-stone-700 font-medium">{calcQty(order.items)}</td>
                    <td className="px-5 py-5 align-top text-stone-900 font-bold">₹{order.totalAmount?.toLocaleString()}</td>
                    <td className="px-5 py-5 align-top">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold focus:outline-none transition cursor-pointer ${getStatusSelectClass(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-5 py-5 align-top text-right flex justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:border-[#E41F66] hover:text-[#E41F66] cursor-pointer shadow-2xs"
                        aria-label="Show order details"
                        onClick={() => handleDetailToggle(order._id)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        disabled={!['Delivered', 'Cancelled'].includes(order.status)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition shadow-2xs ${
                          ['Delivered', 'Cancelled'].includes(order.status)
                            ? "border-stone-200 bg-white text-red-500 hover:border-red-500 hover:bg-red-50 cursor-pointer"
                            : "border-stone-100 bg-stone-50 text-stone-300 cursor-not-allowed"
                        }`}
                        aria-label="Delete order"
                        onClick={() => handleDeleteOrder(order._id)}
                        title={['Delivered', 'Cancelled'].includes(order.status) ? "Delete Order" : "Only fulfilled/cancelled orders can be deleted"}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile */}
          <div className="block md:hidden space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 font-mono text-xs">{order._id}</span>
                  <span className="text-xs text-stone-400">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="text-sm font-medium text-stone-800">
                  Customer: {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {order.items?.map((it: any, i: number) => (
                    <span key={i} className="inline-block bg-stone-50 border border-stone-100 rounded-lg px-2.5 py-1 text-xs text-stone-700">
                      {it.name} <span className="text-stone-400 font-semibold">×{it.quantity}</span>
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-50">
                  <span className="text-xs text-stone-500">Total Qty: <b>{calcQty(order.items)}</b></span>
                  <span className="text-sm font-bold text-stone-900">₹{order.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold focus:outline-none transition cursor-pointer ${getStatusSelectClass(order.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:border-[#E41F66] hover:text-[#E41F66] cursor-pointer"
                      aria-label="Show order details"
                      onClick={() => handleDetailToggle(order._id)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      disabled={!['Delivered', 'Cancelled'].includes(order.status)}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
                        ['Delivered', 'Cancelled'].includes(order.status)
                          ? "border-stone-200 bg-white text-red-500 hover:border-red-500 hover:bg-red-50 cursor-pointer"
                          : "border-stone-100 bg-stone-50 text-stone-300 cursor-not-allowed"
                      }`}
                      aria-label="Delete order"
                      onClick={() => handleDeleteOrder(order._id)}
                      title={['Delivered', 'Cancelled'].includes(order.status) ? "Delete Order" : "Only fulfilled/cancelled orders can be deleted"}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-white px-4 py-3 rounded-2xl border border-stone-200 shadow-xs">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-600 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="text-xs text-stone-500 font-semibold">
                Page {page} of {totalPages} ({total} orders)
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-600 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {isDetailOn && (
        <div onClick={() => handleDetailToggle(null)} className="absolute left-0 top-0 w-full h-screen z-100 bg-stone-950/10 backdrop-blur-sm"></div>
      )}
      {isDetailOn && selectedOrder && (
        <div className="w-full h-screen fixed inset-0 z-110 flex items-center justify-center px-4 py-6">
          <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-sm" onClick={() => handleDetailToggle(null)} />
          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#E41F66] font-bold">Order Details</p>
                <h2 className="mt-2 text-lg font-semibold text-stone-900 font-mono">{selectedOrder._id}</h2>
                <p className="mt-1 text-sm text-stone-600">
                  {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString() : 'N/A'} • {selectedOrder.status}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDetailToggle(null)}
                className="rounded-full border border-stone-200 bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 font-bold text-lg cursor-pointer"
                aria-label="Close order details"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Customer Details</p>
                    <p className="mt-1 text-base font-bold text-stone-850">
                      {selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName}
                    </p>
                    <p className="text-sm text-stone-600 mt-0.5">{selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}</p>
                    <p className="text-sm text-stone-600">Phone: {selectedOrder.shippingAddress?.phone}</p>
                  </div>
                  <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#E41F66] shadow-sm border border-stone-100">
                    <ShoppingCartIcon size={14} />
                    {selectedOrder.items?.length || 0} unique item(s)
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedOrder.items?.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4 rounded-3xl bg-white p-4 shadow-2xs border border-stone-100 items-start">
                      {/* Image Thumbnail */}
                      <div className="relative shrink-0 rounded-lg w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border border-stone-150 bg-stone-50">
                        <img
                          src={item.uploadedImage || item.productImage || 'https://picsum.photos/600/500'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-stone-900 truncate">{item.name}</p>
                        <p className="mt-1 text-xs text-stone-500">Qty: {item.quantity}</p>
                        {item.selectedVariant && (() => {
                          const variant = item.selectedVariant;
                          const name = typeof variant === 'string' ? variant : (variant.name || variant.title || 'Default');
                          const imageUrl = typeof variant === 'object' && variant.images && variant.images.length > 0 ? variant.images[0] : null;
                          return (
                            <p className="text-xs mt-1">
                              <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded text-stone-600 font-medium capitalize">
                                {imageUrl && (
                                  <img src={imageUrl} className="w-3.5 h-3.5 object-cover rounded-full border border-stone-300" alt={name} />
                                )}
                                <span>Variant: {name}</span>
                              </span>
                            </p>
                          );
                        })()}
                        {item.customizations && Object.entries(item.customizations).length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {Object.entries(item.customizations).map(([k, v]: any) => (
                              <span key={k} className="inline-flex items-center bg-[#E41F66]/5 border border-[#E41F66]/10 text-[#E41F66] text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-medium capitalize">
                                <span className="opacity-70 capitalize mr-1">{k.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="font-semibold">{v}</span>
                              </span>
                            ))}
                          </div>
                        )}
                        {item.uploadedImage && (
                          <div className="mt-2">
                            <a 
                              href={item.uploadedImage} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-indigo-650 hover:text-indigo-850 hover:underline font-semibold"
                            >
                              View Custom Uploaded Image
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {/* Price Details */}
                      <div className="text-right shrink-0">
                        <p className="text-xs text-stone-400 font-semibold">Unit price</p>
                        <p className="mt-1 text-sm sm:text-base font-bold text-stone-900">₹{item.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-stone-200 pt-5 text-sm text-stone-700 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-stone-600">Total items: <span className="text-stone-950">{calcQty(selectedOrder.items)}</span></p>
                    <p className="mt-1 font-semibold text-stone-600">Payment: <span className="text-stone-950 uppercase">{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</span></p>
                  </div>
                  <div className="rounded-2xl bg-stone-900 px-5 py-3 text-white text-base font-bold shadow-md">
                    Total amount: ₹{selectedOrder.totalAmount?.toLocaleString()}
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
          <p className="text-sm uppercase tracking-widest text-stone-500 font-bold">Total Revenue</p>
          <p className="text-3xl font-extrabold text-[#E41F66] mt-1">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders;