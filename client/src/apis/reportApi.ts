import instance from './instance';

export interface CreateReportPayload {
  reportedUserId: number;
  content: string;
  productId: number;
}

export const createReportApi = async (data: CreateReportPayload) => {
  const response = await instance.post('/reports', data);
  return response.data;
};
