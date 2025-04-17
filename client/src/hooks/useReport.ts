import { useMutation } from '@tanstack/react-query';
import { createReportApi, CreateReportPayload } from '../apis/reportApi';

export const useReport = () =>
  useMutation({
    mutationFn: (data: CreateReportPayload) => createReportApi(data),
    onSuccess: () => {
      alert('신고가 정상적으로 접수되었습니다.');
    },
    onError: () => {
      alert('신고 접수에 실패했습니다. 다시 시도해주세요.');
    },
  });
