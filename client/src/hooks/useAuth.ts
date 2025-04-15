import { useMutation } from '@tanstack/react-query';
import { checkUsernameApi, registerUserApi } from '../apis/authApi';
import { useNavigate } from 'react-router-dom';

export const useCheckUsername = () =>
  useMutation({
    mutationFn: (username: string) => checkUsernameApi(username),
    onSuccess: data => {
      if (data.isTaken) {
        alert('이미 사용 중인 아이디입니다.');
      } else {
        alert('사용 가능한 아이디입니다.');
      }
    },
    onError: () => {
      alert('중복 확인 중 오류가 발생했습니다.');
    },
  });

export const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { username: string; password: string }) => registerUserApi(data),
    onSuccess: () => {
      alert('회원가입 성공!');
      navigate('/login');
    },
    onError: () => {
      alert('회원가입 실패. 다시 시도해주세요.');
    },
  });
};
