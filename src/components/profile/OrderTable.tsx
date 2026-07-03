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
            <tr key={order.orderId}>
                <td className="px-3.5 py-2 text-start cursor-default">{order.orderId}</td>
                <td onClick={() => navigate(`/orders/${order.orderId}`)} className="px-3.5 py-2 text-start hover:underline cursor-pointer">{order.productName}</td>
                <td className="px-3.5 py-2 text-start cursor-default">{order.quantity}</td>
                <td className="px-3.5 py-2 text-start cursor-default">{order.price}</td>
                <td className="px-3.5 py-2 text-start cursor-default">{order.paymentMethod === "cod" ? "Cash On Delivery" : "Pre-Paid"}</td>
                <td className="px-3.5 py-2 text-start cursor-default">{order.status === "delivered" ? <Badge text="Delivered" variant="delivered"/> : <Badge text="Pending" variant="pending"/>}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  )
}

export default OrderTable