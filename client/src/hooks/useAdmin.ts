import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllProducts,
  deleteProduct,
  getAllUserReports,
  getAllProductReports,
  deleteProductReport,
  deleteUserReport,
} from '../apis/adminApi';

export interface Product {
  id: number;
  title: string;
}
export interface User {
  id: number;
  username: string;
  introduce?: string;
  banUntil?: string;
}

export interface UserReport {
  id: number;
  content: string;
  createdAt: string;
  reporter: {
    id: number;
    username: string;
  };
  reported: {
    id: number;
    username: string;
  };
}

export interface ProductReport {
  id: number;
  content: string;
  createdAt: string;
  reporter: {
    id: number;
    username: string;
  };
  product: {
    id: number;
    title: string;
  };
}

export const useAdminUsers = () => {
  return useQuery<User[]>({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      update,
    }: {
      id: number;
      update: { introduce?: string; banUntil?: string; username?: string };
    }) => updateUser(id, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};

export const useAdminProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['admin-products'],
    queryFn: getAllProducts,
  });
};

export const useDeleteProductByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
};

export const useUserReports = () => {
  return useQuery<UserReport[]>({
    queryKey: ['admin-user-reports'],
    queryFn: getAllUserReports,
  });
};

export const useProductReports = () => {
  return useQuery<ProductReport[]>({
    queryKey: ['admin-product-reports'],
    queryFn: getAllProductReports,
  });
};

export const useDeleteProductReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProductReport(id),
    onSuccess: () => {
      alert('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['product-reports'] });
    },
  });
};

export const useDeleteUserReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUserReport(id),
    onSuccess: () => {
      alert('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['user-reports'] });
    },
  });
};
