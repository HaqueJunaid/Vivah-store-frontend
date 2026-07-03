import { useParams, useNavigate } from 'react-router-dom'
import Badge from '../common/badge'
import { MdArrowBack, MdLocationOn, MdPayment } from 'react-icons/md'
import { useEffect } from 'react'

// Mock detailed order data
const mockOrders: { [key: number]: any } = {
  1: {
    orderId: 1,
    orderDate: '2024-01-15',
    status: 'pending',
    paymentMethod: 'pre',
    paymentStatus: 'paid',
    subtotal: 1200,
    shipping: 50,
    tax: 120,
    total: 1370,
    items: [
      {
        productId: 45,
        productName: 'Leather Jacket',
        quantity: 1,
        price: 1200,
        image: 'https://picsum.photos/600/500',
        size: 'L',
        color: 'Black'
      }
    ],
    shippingAddress: {
      firstName: 'Junaid',
      lastName: 'Haque',
      company: '',
      address: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'New York',
      postalCode: '10001',
      country: 'United States',
      phone: '+1 234-567-8900'
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-20'
  },
  2: {
    orderId: 2,
    orderDate: '2024-01-10',
    status: 'delivered',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    subtotal: 2400,
    shipping: 0,
    tax: 240,
    total: 2640,
    items: [
      {
        productId: 95,
        productName: 'Nike Jordan',
        quantity: 2,
        price: 1200,
        image: 'https://picsum.photos/600/500',
        size: '10',
        color: 'White/Red'
      }
    ],
    shippingAddress: {
      firstName: 'Junaid',
      lastName: 'Haque',
      company: '',
      address: '456 Oak Avenue',
      apartment: '',
      city: 'Los Angeles',
      postalCode: '90001',
      country: 'United States',
      phone: '+1 234-567-8900'
    },
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-01-15',
    deliveredDate: '2024-01-14'
  }
}

const OrderDetail = () => {
  useEffect(() => {
    document.title = "VivahStore | My Orders"
  }, [])

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const orderId = parseInt(id || '0')
  const order = mockOrders[orderId]

  if (!order) {
    return (
      <div className='bg-stone-50 py-8 w-full min-h-screen'>
        <div className='mx-auto px-6 max-w-7xl'>
          <div className='py-20 text-center'>
            <h1 className='mb-4 font-bold text-stone-900 text-2xl'>Order Not Found</h1>
            <p className='mb-6 text-stone-600'>The order you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/profile')}
              className='bg-[#E41F66] px-6 py-3 rounded-lg text-stone-950 hover:scale-103 transition-all duration-300 ease-in-out cursor-pointer'
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-stone-50 py-8 w-full min-h-screen'>
      <div className='mx-auto px-6 max-w-7xl'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/profile')}
              className='flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors'
            >
              <MdArrowBack className='size-5' />
              <span>Back to Orders</span>
            </button>
            <div className='bg-stone-300 w-px h-6'></div>
            <h1 className='font-bold text-stone-900 text-2xl'>Order #{order.orderId}</h1>
          </div>
          <Badge
            text={order.status === 'delivered' ? 'Delivered' : 'Pending'}
            variant={order.status === 'delivered' ? 'delivered' : 'pending'}
          />
        </div>

        <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='space-y-8 lg:col-span-2'>
            {/* Order Status Card */}
            <div className='bg-white shadow-sm p-6 rounded-lg'>
              <h2 className='mb-4 font-semibold text-stone-900 text-lg'>Order Status</h2>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-3 h-3 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : 'bg-[#E41F66]'}`}></div>
                    <span className='text-stone-700'>
                      {order.status === 'delivered' ? 'Delivered' : 'Processing'}
                    </span>
                  </div>
                  <span className='text-stone-500 text-sm'>
                    {order.status === 'delivered' ? `Delivered on ${order.deliveredDate}` : `Estimated delivery: ${order.estimatedDelivery}`}
                  </span>
                </div>
                {order.trackingNumber && (
                  <div className='flex justify-between items-center pt-3 border-stone-200 border-t'>
                    <span className='text-stone-700'>Tracking Number</span>
                    <span className='font-mono text-stone-900 text-sm'>{order.trackingNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className='bg-white shadow-sm p-6 rounded-lg'>
              <h2 className='mb-4 font-semibold text-stone-900 text-lg'>Order Items</h2>
              <div className='space-y-4'>
                {order.items.map((item: any, index: number) => (
                  <div key={index} className='flex gap-4 pb-4 border-stone-200 last:border-0 border-b'>
                    <div className='flex justify-center items-center bg-stone-200 rounded-lg w-20 h-20 overflow-hidden'>
                      <img src={item.image} className='w-full h-full object-cover' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-medium text-stone-900'>{item.productName}</h3>
                      <div className='flex items-center gap-4 mt-1 text-stone-600 text-sm'>
                        <span>Qty: {item.quantity}</span>
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      <p className='mt-2 font-medium text-stone-900'>${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className='bg-white shadow-sm p-6 rounded-lg'>
              <h2 className='flex items-center gap-2 mb-4 font-semibold text-stone-900 text-lg'>
                <MdLocationOn className='size-5' />
                Shipping Address
              </h2>
              <div className='text-stone-700'>
                <p className='font-medium'>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                {order.shippingAddress.company && <p>{order.shippingAddress.company}</p>}
                <p>{order.shippingAddress.address}</p>
                {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className='mt-2'>{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Order Summary */}
            <div className='bg-white shadow-sm p-6 rounded-lg'>
              <h2 className='mb-4 font-semibold text-stone-900 text-lg'>Order Summary</h2>
              <div className='space-y-3'>
                <div className='flex justify-between text-stone-700'>
                  <span>Subtotal</span>
                  <span>${order.subtotal}</span>
                </div>
                <div className='flex justify-between text-stone-700'>
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : `$${order.shipping}`}</span>
                </div>
                <div className='flex justify-between text-stone-700'>
                  <span>Tax</span>
                  <span>${order.tax}</span>
                </div>
                <div className='pt-3 border-stone-200 border-t'>
                  <div className='flex justify-between font-semibold text-stone-900 text-lg'>
                    <span>Total</span>
                    <span>${order.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className='bg-white shadow-sm p-6 rounded-lg'>
              <h2 className='flex items-center gap-2 mb-4 font-semibold text-stone-900 text-lg'>
                <MdPayment className='size-5' />
                Payment Information
              </h2>
              <div className='space-y-3'>
                <div className='flex justify-between text-stone-700'>
                  <span>Method</span>
                  <span>{order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Pre-Paid'}</span>
                </div>
                <div className='flex justify-between text-stone-700'>
                  <span>Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className='bg-white shadow-sm p-6 rounded-lg'>
              <h2 className='mb-4 font-semibold text-stone-900 text-lg'>Actions</h2>
              <div className='space-y-3'>
                <button className='bg-[#E41F66] px-4 py-2 rounded-lg w-full text-stone-950 hover:scale-103 transition-all duration-300 ease-in-out cursor-pointer'>
                  Track Order
                </button>
                {order.status === 'delivered' && (
                  <button className='hover:bg-stone-50 px-4 py-2 border border-stone-300 rounded-lg w-full text-stone-700 transition-colors'>
                    Reorder Items
                  </button>
                )}
                <button className='w-full text-stone-600 hover:text-stone-900 text-sm transition-colors'>
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail