import api from './api';
import type { OrderRecord } from '../types/allTypes';

export interface CashfreeOrderResponse {
  success: boolean;
  message?: string;
  order: OrderRecord;
  paymentSessionId?: string;
  cashfreeOrderId?: string;
  mode?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed' | 'Cancelled';
  orderStatus: string;
  order: OrderRecord;
}

export const createCashfreePaymentOrder = (addressId: string) => {
  return api.post<CashfreeOrderResponse>('/payment/create-order', { addressId });
};

export const verifyPayment = (orderId: string) => {
  return api.post<VerifyPaymentResponse>('/payment/verify', { orderId });
};

export const cancelPaymentOrder = (orderId: string) => {
  return api.post<{ success: boolean; message: string }>('/payment/cancel', { orderId });
};

export const getCashfreeConfig = () => {
  return api.get<{ success: boolean; env: string; isConfigured: boolean }>('/payment/config');
};

