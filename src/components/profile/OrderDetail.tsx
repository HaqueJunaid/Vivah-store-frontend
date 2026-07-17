import { useParams, useNavigate } from 'react-router-dom';
import Badge from '../common/badge';
import { MdArrowBack, MdLocationOn, MdPayment } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getOrderById } from '../../services/orderService';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "VivahStore | Order Details";
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      getOrderById(id)
        .then((res) => {
          if (res.data.success) {
            setOrder(res.data.order);
          } else {
            setError(res.data.message || "Failed to load order.");
          }
        })
        .catch((err) => {
          console.error("Error loading order:", err);
          setError(err.response?.data?.message || "Error loading order details.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className='bg-stone-50 py-8 w-full min-h-screen flex items-center justify-center'>
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-10 w-10 text-[#E41F66]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-stone-600 font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className='bg-stone-50 py-8 w-full min-h-screen'>
        <div className='mx-auto px-6 max-w-7xl'>
          <div className='py-20 text-center bg-white border border-stone-200 rounded-2xl shadow-sm'>
            <h1 className='mb-4 font-bold text-stone-900 text-2xl'>Order Not Found</h1>
            <p className='mb-6 text-stone-600'>{error || "The order you're looking for doesn't exist."}</p>
            <button
              onClick={() => navigate('/profile')}
              className='bg-[#E41F66] text-white px-6 py-3 rounded-lg hover:bg-[#c60b4d] font-semibold transition-all duration-300 cursor-pointer'
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const orderDateFormatted = order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';

  return (
    <div className='bg-stone-50 py-8 w-full min-h-screen'>
      <div className='mx-auto px-6 max-w-7xl'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/profile')}
              className='flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer'
            >
              <MdArrowBack className='size-5' />
              <span>Back to Orders</span>
            </button>
            <div className='bg-stone-300 w-px h-6 hidden sm:block'></div>
            <h1 className='font-bold text-stone-900 text-lg md:text-xl break-all'>
              Order <span className="font-mono text-stone-600 text-sm md:text-base">#{order._id}</span>
            </h1>
          </div>
          <Badge
            text={order.status}
            variant={order.status?.toLowerCase() === 'delivered' ? 'delivered' : 'pending'}
          />
        </div>

        <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='space-y-8 lg:col-span-2'>
            {/* Order Status Card */}
            <div className='bg-white shadow-xs p-6 border border-stone-200 rounded-lg'>
              <h2 className='mb-4 font-semibold text-stone-900 text-lg'>Order Status</h2>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-3 h-3 rounded-full ${order.status?.toLowerCase() === 'delivered' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                    <span className='text-stone-700 font-medium capitalize'>
                      {order.status}
                    </span>
                  </div>
                  <span className='text-stone-500 text-sm'>
                    Ordered on {orderDateFormatted}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className='bg-white shadow-xs p-6 border border-stone-200 rounded-lg'>
              <h2 className='mb-4 font-semibold text-stone-900 text-lg'>Order Items</h2>
              <div className='space-y-6'>
                {order.items?.map((item: any, index: number) => (
                  <div key={index} className='flex gap-4 pb-4 border-stone-100 last:border-0 border-b last:pb-0'>
                    <div className='flex justify-center items-center bg-stone-100 rounded-lg w-20 h-20 overflow-hidden shrink-0 border border-stone-200'>
                      <img src={item.uploadedImage || item.productImage || 'https://picsum.photos/600/500'} className='w-full h-full object-cover' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-stone-900 truncate'>{item.name}</h3>
                      <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-stone-500 text-xs'>
                        <span>Qty: {item.quantity}</span>
                        {item.selectedVariant && (
                          <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                            Variant: {typeof item.selectedVariant === 'string' ? item.selectedVariant : JSON.stringify(item.selectedVariant)}
                          </span>
                        )}
                        {item.customizations && Object.entries(item.customizations).map(([k, v]: any) => (
                          <span key={k} className="bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                      <p className='mt-2 font-semibold text-stone-900'>₹{item.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className='bg-white shadow-xs p-6 border border-stone-200 rounded-lg'>
              <h2 className='flex items-center gap-2 mb-4 font-semibold text-stone-900 text-lg'>
                <MdLocationOn className='size-5 text-[#E41F66]' />
                Shipping Address
              </h2>
              {order.shippingAddress ? (
                <div className='text-stone-700 text-sm space-y-1'>
                  <p className='font-semibold text-stone-900 text-base'>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  {order.shippingAddress.company && <p className="text-stone-500 font-medium">{order.shippingAddress.company}</p>}
                  <p>{order.shippingAddress.address}</p>
                  {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                  <p>{order.shippingAddress.city}, {order.shippingAddress.country} - {order.shippingAddress.postalCode}</p>
                  <p className='mt-2 pt-2 border-t border-stone-100 font-medium text-stone-900'>Phone: {order.shippingAddress.phone}</p>
                </div>
              ) : (
                <p className="text-stone-500">No shipping address recorded for this order.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Order Summary */}
            <div className='bg-white shadow-xs p-6 border border-stone-200 rounded-lg'>
              <h2 className='mb-4 font-semibold text-stone-900 text-lg'>Order Summary</h2>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between text-stone-700'>
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-950">₹{order.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className='flex justify-between text-stone-700'>
                  <span>Shipping</span>
                  <span className='text-green-600 font-medium'>Free</span>
                </div>
                <div className='flex justify-between text-stone-700'>
                  <span>Tax (GST)</span>
                  <span className="text-stone-400">Included</span>
                </div>
                <div className='pt-3 border-stone-200 border-t'>
                  <div className='flex justify-between font-bold text-stone-900 text-lg'>
                    <span>Total</span>
                    <span className="text-[#E41F66]">₹{order.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className='bg-white shadow-xs p-6 border border-stone-200 rounded-lg'>
              <h2 className='flex items-center gap-2 mb-4 font-semibold text-stone-900 text-lg'>
                <MdPayment className='size-5 text-[#E41F66]' />
                Payment Information
              </h2>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between text-stone-700'>
                  <span>Method</span>
                  <span className="font-medium text-stone-900 capitalize">
                    {order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Mock Payment'}
                  </span>
                </div>
                <div className='flex justify-between text-stone-700'>
                  <span>Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.paymentStatus === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;