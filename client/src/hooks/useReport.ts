import { useMutation } from '@tanstack/react-query';
import {
  createProductReportApi,
  createUserReportApi,
  CreateProductReportPayload,
  CreateUserReportPayload,
} from '../apis/reportApi';
import { AxiosError } from 'axios';

export const useProductReport = () =>
  useMutation({
    mutationFn: (data: CreateProductReportPayload) => createProductReportApi(data),
    onSuccess: () => {
      alert('상품 신고가 정상적으로 접수되었습니다.');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.data?.message === 'ALREADY_REPORTED') {
        alert('이미 해당 상품을 신고하였습니다.');
      } else {
        alert('상품 신고에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

export const useUserReport = () =>
  useMutation({
    mutationFn: (data: CreateUserReportPayload) => createUserReportApi(data),
    onSuccess: () => {
      alert('유저 신고가 정상적으로 접수되었습니다.');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.data?.message === 'ALREADY_REPORTED') {
        alert('이미 해당 유저를 신고하였습니다.');
      } else {
        alert('유저 신고에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });
