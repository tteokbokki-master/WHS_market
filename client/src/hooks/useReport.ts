import { useMutation } from '@tanstack/react-query';
import {
  createProductReportApi,
  createUserReportApi,
  CreateProductReportPayload,
  CreateUserReportPayload,
} from '../apis/reportApi';

export const useProductReport = () =>
  useMutation({
    mutationFn: (data: CreateProductReportPayload) => createProductReportApi(data),
    onSuccess: () => {
      alert('상품 신고가 정상적으로 접수되었습니다.');
    },
    onError: () => {
      alert('상품 신고에 실패했습니다. 다시 시도해주세요.');
    },
  });

export const useUserReport = () =>
  useMutation({
    mutationFn: (data: CreateUserReportPayload) => createUserReportApi(data),
    onSuccess: () => {
      alert('유저 신고가 정상적으로 접수되었습니다.');
    },
    onError: () => {
      alert('유저 신고에 실패했습니다. 다시 시도해주세요.');
    },
  });
