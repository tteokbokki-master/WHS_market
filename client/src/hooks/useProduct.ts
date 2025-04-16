import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProductApi, fetchAllProductsApi, fetchProductByIdApi } from '../apis/productApi';
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
