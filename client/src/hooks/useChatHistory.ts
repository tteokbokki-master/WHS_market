import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createChatApi, fetchChatHistoryApi, type CreateChatPayload } from '../apis/chatApi';

export const useChatHistory = (withUserId: number, productId: number) => {
  return useQuery({
    queryKey: ['chatHistory', withUserId, productId],
    queryFn: () => fetchChatHistoryApi(withUserId, productId),
    enabled: !!withUserId && !!productId,
    staleTime: 1000 * 60,
  });
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateChatPayload) => createChatApi(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chatHistory', variables.receiverId, variables.productId],
      });
    },
    onError: () => {
      alert('메시지 전송 실패');
    },
  });
};
