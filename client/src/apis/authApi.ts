import instance from './instance';

export const checkUsernameApi = async (username: string) => {
  const response = await instance.get('/auth/check-username', {
    params: { username },
  });
  return response.data;
};

export const registerUserApi = async (data: { username: string; password: string }) => {
  const response = await instance.post('/auth/register', data);
  return response.data;
};

export const loginUserApi = async (data: { username: string; password: string }) => {
  const response = await instance.post('/auth/login', data);
  return response.data;
};

export const logoutUserApi = async () => {
  await instance.post('/auth/logout');
};

export const updatePasswordApi = async (newPassword: string) => {
  const response = await instance.put('/auth/password', { newPassword });
  return response.data;
};

export const updateIntroduceApi = async (introduce: string) => {
  const response = await instance.put('/auth/introduce', { introduce });
  return response.data;
};

export const searchUsersApi = async (query: string) => {
  const response = await instance.get('/auth/search', {
    params: { q: query },
  });
  return response.data;
};
