import api from './api';
import type { CartItemApi } from '../types/allTypes';

export const getCart = () => api.get('/cart');
export const syncCart = (items: CartItemApi[]) => api.post('/cart/sync', { items });
export const clearCart = () => api.delete('/cart');
