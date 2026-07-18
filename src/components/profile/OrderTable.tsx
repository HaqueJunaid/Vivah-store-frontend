import Badge from "../common/badge"
import { useNavigate } from "react-router-dom"

const OrderTable = ({orders}: {orders: any[]}) => {
    const navigate = useNavigate();

  return (
    <div className="border border-stone-200 rounded-lg overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
        <tr className="bg-stone-200">
            <th className="px-3.5 py-2 text-start">Order ID</th>
            <th className="px-3.5 py-2 text-start">Product Name</th>
            <th className="px-3.5 py-2 text-start">Quantity</th>
            <th className="px-3.5 py-2 text-start">Price</th>
            <th className="px-3.5 py-2 text-start">Payment Method</th>
            <th className="px-3.5 py-2 text-start">Status</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order) => (
            <tr key={order._id}>
                <td className="px-3.5 py-2 text-start cursor-default font-mono text-xs max-w-[120px] truncate">{order._id}</td>
                <td className="px-3.5 py-2 text-start text-stone-900">
                    <span 
                        onClick={() => navigate(`/orders/${order._id}`)} 
                        className="hover:underline cursor-pointer text-[#E41F66] font-medium block"
                    >
                        {order.items?.[0]?.name || 'N/A'}
                        {order.items?.length > 1 ? ` (+${order.items.length - 1} more)` : ''}
                    </span>
                    {/* Render customizations for order items if they exist */}
                    {order.items?.map((item: any, idx: number) => {
                        const hasCustomizations = item.customizations && Object.entries(item.customizations).length > 0;
                        const hasUploadedImage = !!item.uploadedImage;
                        
                        if (!hasCustomizations && !hasUploadedImage) return null;
                        
                        return (
                            <div key={idx} className="mt-1.5 text-xs text-stone-500">
                                <span className="font-semibold text-stone-600">{item.name}:</span>
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                    {hasCustomizations && Object.entries(item.customizations).map(([k, v]: any) => (
                                        <span key={k} className="bg-[#E41F66]/5 border border-[#E41F66]/10 text-[#E41F66] px-2 py-0.5 rounded text-[10px] capitalize">
                                            {k.replace(/([A-Z])/g, ' $1')}: {v}
                                        </span>
                                    ))}
                                    {hasUploadedImage && (
                                        <span className="bg-indigo-50 border border-indigo-150 text-indigo-650 px-2 py-0.5 rounded text-[10px] font-semibold">
                                            Custom Image Uploaded
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </td>
                <td className="px-3.5 py-2 text-start cursor-default">{order.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0}</td>
                <td className="px-3.5 py-2 text-start cursor-default font-semibold">₹{order.totalAmount?.toLocaleString()}</td>
                <td className="px-3.5 py-2 text-start cursor-default uppercase text-xs">{order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Mock Payment'}</td>
                <td className="px-3.5 py-2 text-start cursor-default">
                    <Badge 
                        text={order.status} 
                        variant={order.status?.toLowerCase() as any}
                    />
                </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  )
}

export default OrderTable