import instance from './instance';

export interface CreateProductReportPayload {
  productId: number;
  content: string;
}

export interface CreateUserReportPayload {
  reportedUserId: number;
  content: string;
}

export const createProductReportApi = async (data: CreateProductReportPayload) => {
  const response = await instance.post('/reports/products', data);
  return response.data;
};

export const createUserReportApi = async (data: CreateUserReportPayload) => {
  const response = await instance.post('/reports/users', data);
  return response.data;
};
