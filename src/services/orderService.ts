import api from './api';

export const createOrder = (orderData: { addressId: string; paymentMethod: string }) => {
  return api.post('/orders', orderData);
};

export const getMyOrders = () => {
  return api.get('/orders/my-orders');
};

export const getOrderById = (id: string) => {
  return api.get(`/orders/${id}`);
};

export const getAllOrdersAdmin = (page: number, limit: number, search?: string) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  if (search) {
    params.append('search', search);
  }
  return api.get(`/orders/admin?${params.toString()}`);
};

export const updateOrderStatus = (id: string, status: string) => {
  return api.put(`/orders/${id}/status`, { status });
};
