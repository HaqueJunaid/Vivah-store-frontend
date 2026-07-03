import api from './api';
import type { RegisterPayload, LoginPayload, VerifyOTPPayload, ResendOTPPayload, GoogleAuthPayload } from '../types/allTypes';

export const registerUser = (payload: RegisterPayload) => api.post('/auth/register', payload);
export const verifyOTP = (payload: VerifyOTPPayload) => api.post('/auth/verify-otp', payload);
export const loginUser = (payload: LoginPayload) => api.post('/auth/login', payload);
export const googleAuth = (payload: GoogleAuthPayload) => api.post('/auth/google', payload);
export const logoutUser = () => api.post('/auth/logout');
export const getCurrentUser = () => api.get('/auth/me');
export const resendOTP = (payload: ResendOTPPayload) => api.post('/auth/resend-otp', payload);
export const refreshTokenApi = () => api.post('/auth/refresh-token');
export const getAdminUsers = () => api.get('/auth/users');
export const updateAdminUserStatus = (id: string, status: string) => api.put(`/auth/users/${id}/status`, { status });
