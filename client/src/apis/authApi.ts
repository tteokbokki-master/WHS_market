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
