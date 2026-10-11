import api from './api';

export interface CashfreeOrderResponse {
  success: boolean;
  message?: string;
  order: any;
  paymentSessionId?: string;
  cashfreeOrderId?: string;
  mode?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed' | 'Cancelled';
  orderStatus: string;
  order: any;
}

export const createCashfreePaymentOrder = (addressId: string) => {
  return api.post<CashfreeOrderResponse>('/payment/create-order', { addressId });
};

export const verifyPayment = (orderId: string) => {
  return api.post<VerifyPaymentResponse>('/payment/verify', { orderId });
};

export const getCashfreeConfig = () => {
  return api.get<{ success: boolean; env: string; isConfigured: boolean }>('/payment/config');
};
