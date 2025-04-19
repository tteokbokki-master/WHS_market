import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, updateUser, deleteUser, getAllProducts, deleteProduct } from '../apis/adminApi';

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

export const useAdminUsers = <T = User[]>() => {
  return useQuery<T>({
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

export const useAdminProducts = <T = Product[]>() => {
  return useQuery<T>({
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
