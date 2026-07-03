import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import type { RequireAdminProps as Props } from '../../types/allTypes';

const RequireAdmin = ({ children }: Props) => {
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => state.token);

  if (!token || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
