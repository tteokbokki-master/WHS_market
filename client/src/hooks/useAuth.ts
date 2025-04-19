import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  checkUsernameApi,
  registerUserApi,
  loginUserApi,
  logoutUserApi,
  updatePasswordApi,
  updateIntroduceApi,
  searchUsersApi,
} from '../apis/authApi';
import { useNavigate } from 'react-router-dom';
import instance from '../apis/instance';
import { AxiosError } from 'axios';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authCheck'] });
      alert('로그인 성공!');
      navigate('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message;
      alert(errorMessage ?? '로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['authCheck'] });
      navigate('/login');
    },
    onError: () => {
      alert('로그아웃 실패. 다시 시도해 주세요.');
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

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      alert('비밀번호가 성공적으로 변경되었습니다.');
    },
    onError: () => {
      alert('비밀번호 변경에 실패했습니다.');
    },
  });

export const useUpdateIntroduce = () =>
  useMutation({
    mutationFn: updateIntroduceApi,
    onSuccess: () => {
      alert('자기소개가 성공적으로 변경되었습니다.');
    },
    onError: () => {
      alert('자기소개 변경에 실패했습니다.');
    },
  });

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ['search-users', query],
    queryFn: () => searchUsersApi(query),
    enabled: !!query,
    staleTime: 1000 * 60,
  });
};
