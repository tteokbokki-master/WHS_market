import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createProductApi,
  deleteProductApi,
  fetchAllProductsApi,
  fetchMyProductsApi,
  fetchProductByIdApi,
  searchProductApi,
} from '../apis/productApi';
import { useNavigate } from 'react-router-dom';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('상품이 등록되었습니다!');
      navigate('/');
    },
    onError: () => {
      alert('상품 등록에 실패했습니다.');
    },
  });
};

export const useAllProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProductsApi,
    staleTime: 1000 * 60 * 5,
  });

export const useProductDetail = (id: number) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductByIdApi(id),
    enabled: !!id,
  });

export const useMyProducts = () => {
  return useQuery({
    queryKey: ['myProducts'],
    queryFn: fetchMyProductsApi,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProductApi(id),
    onSuccess: () => {
      alert('상품이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
    onError: () => {
      alert('상품 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export const useSearchProduct = (query: string) =>
  useQuery({
    queryKey: ['searchProduct', query],
    queryFn: () => searchProductApi(query),
    enabled: !!query,
  });
