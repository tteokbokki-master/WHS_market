import instance from './instance';

export interface CreateChatPayload {
  receiverId: number;
  productId: number;
  message: string;
}

export interface ChatRoom {
  userId: number;
  username: string;
  lastMessage: string;
}

export interface Chat {
  id: number;
  message: string;
  createdAt: string;
  sender: {
    id: number;
    username: string;
  };
  receiver: {
    id: number;
    username: string;
  };
}

export const fetchChatHistoryApi = async (withUserId: number, productId: number): Promise<Chat[]> => {
  const res = await instance.get('/chats', {
    params: {
      with: withUserId,
      product: productId,
    },
    withCredentials: true,
  });
  return res.data;
};

export const createChatApi = async (data: CreateChatPayload) => {
  const response = await instance.post('/chats', data, {
    withCredentials: true,
  });
  return response.data;
};
