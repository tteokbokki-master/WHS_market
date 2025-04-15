import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUserApi } from '../apis/authApi';

export const useLoginUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authCheck'] });
      alert('로그인 성공!');
      navigate('/');
    },
    onError: () => {
      alert('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
    },
  });
};
