import instance from './instance';

export interface TransferPayload {
  toUserId: number;
  amount: number;
}

export const transferApi = async (data: TransferPayload) => {
  const response = await instance.post('/wallet/transfer', data, {
    withCredentials: true,
  });
  return response.data;
};
export const fetchWalletBalanceApi = async () => {
  const response = await instance.get('/wallet', {
    withCredentials: true,
  });
  return response.data;
};
