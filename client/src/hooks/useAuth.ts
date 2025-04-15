import { useMutation, useQuery } from '@tanstack/react-query';
import { checkUsernameApi, registerUserApi, loginUserApi } from '../apis/authApi';
import { useNavigate } from 'react-router-dom';
import instance from '../apis/instance';

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

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => loginUserApi(data),
    onSuccess: () => {
      alert('로그인 성공!');
      navigate('/');
    },
    onError: () => {
      alert('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
    },
  });
};

export const useAuth = () =>
  useQuery({
    queryKey: ['authCheck'],
    queryFn: async () => {
      const res = await instance.get('/auth/me');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
