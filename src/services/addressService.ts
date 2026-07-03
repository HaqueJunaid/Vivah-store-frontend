import api from './api';
import type { AddressData } from '../types/allTypes';

export const getAddresses = () => api.get<{ success: boolean; addresses: AddressData[] }>('/addresses');

export const createAddress = (data: AddressData) => api.post<{ success: boolean; message: string; address: AddressData }>('/addresses', data);

export const updateAddress = (id: string, data: AddressData) => api.put<{ success: boolean; message: string; address: AddressData }>(`/addresses/${id}`, data);

export const deleteAddress = (id: string) => api.delete<{ success: boolean; message: string; id: string }>(`/addresses/${id}`);
