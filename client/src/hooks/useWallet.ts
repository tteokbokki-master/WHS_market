import { useMutation, useQuery } from '@tanstack/react-query';
import { transferApi, TransferPayload, fetchWalletBalanceApi } from '../apis/walletApi';

export const useTransfer = () =>
  useMutation({
    mutationFn: (data: TransferPayload) => transferApi(data),
    onSuccess: () => {
      alert('송금이 완료되었습니다.');
    },
    onError: () => {
      alert('송금에 실패했습니다. 잔액을 확인해주세요.');
    },
  });

export const useWalletBalance = () =>
  useQuery({
    queryKey: ['wallet'],
    queryFn: fetchWalletBalanceApi,
  });
