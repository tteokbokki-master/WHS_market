import instance from './instance';

export interface ProductResponse {
  id: number;
  title: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: number;
  username: string;
}

export const createProductApi = async (data: FormData) => {
  const response = await instance.post('/products', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data as { message: string };
};

export const fetchAllProductsApi = async () => {
  const response = await instance.get('/products');
  return response.data as ProductResponse[];
};

export const fetchProductByIdApi = async (id: number) => {
  const response = await instance.get(`/products/${id}`);
  return response.data as ProductResponse;
};

export const fetchMyProductsApi = async () => {
  const response = await instance.get('/products/my-products', {
    withCredentials: true,
  });
  return response.data as ProductResponse[];
};

export const deleteProductApi = async (id: number) => {
  const response = await instance.delete(`/products/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
