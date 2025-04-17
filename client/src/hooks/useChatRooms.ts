import { useQuery } from '@tanstack/react-query';
import instance from '../apis/instance';

export interface ChatRoom {
  userId: number;
  username: string;
  lastMessage: string;
}

export const fetchChatRoomsApi = async (productId: number): Promise<ChatRoom[]> => {
  const res = await instance.get<ChatRoom[]>('/chats/rooms', {
    params: { product: productId },
    withCredentials: true,
  });
  return res.data;
};

export const useChatRooms = (productId: number) =>
  useQuery({
    queryKey: ['chatRooms', productId],
    queryFn: () => fetchChatRoomsApi(productId),
    enabled: Boolean(productId),
    staleTime: 1000 * 60 * 5,
  });
