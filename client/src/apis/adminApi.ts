import instance from './instance';

export const getAllUsers = async () => {
  const res = await instance.get('/admin/users');
  return res.data;
};

export const updateUser = async (id: number, update: { introduce?: string; banUntil?: string; username?: string }) => {
  const res = await instance.patch(`/admin/users/${id}`, update);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await instance.delete(`/admin/users/${id}`);
  return res.data;
};

export const getAllProducts = async () => {
  const res = await instance.get('/admin/products');
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await instance.delete(`/admin/products/${id}`);
  return res.data;
};
