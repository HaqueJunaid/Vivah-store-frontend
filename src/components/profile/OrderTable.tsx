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
                <td onClick={() => navigate(`/orders/${order._id}`)} className="px-3.5 py-2 text-start hover:underline cursor-pointer text-[#E41F66] font-medium">
                    {order.items?.[0]?.name || 'N/A'}
                    {order.items?.length > 1 ? ` (+${order.items.length - 1} more)` : ''}
                </td>
                <td className="px-3.5 py-2 text-start cursor-default">{order.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0}</td>
                <td className="px-3.5 py-2 text-start cursor-default font-semibold">₹{order.totalAmount?.toLocaleString()}</td>
                <td className="px-3.5 py-2 text-start cursor-default uppercase text-xs">{order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Mock Payment'}</td>
                <td className="px-3.5 py-2 text-start cursor-default">
                    <Badge 
                        text={order.status} 
                        variant={order.status?.toLowerCase() === 'delivered' ? 'delivered' : 'pending'}
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