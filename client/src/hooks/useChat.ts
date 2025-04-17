import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  username: string;
  message: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current) return;
    const socket = io('http://localhost:8080/global', {
      withCredentials: true,
    });

    socketRef.current = socket;

    const handleInit = (initial: ChatMessage[]) => {
      setMessages(Array.isArray(initial) ? initial : []);
    };
    const handleMsg = (msg: ChatMessage) => {
      setMessages(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return [...safePrev, msg];
      });
    };
    const handleAuthError = (msg: string) => {
      console.warn('인증 실패:', msg);
    };

    socket.on('chat init', handleInit);
    socket.on('chat message', handleMsg);
    socket.on('auth_error', handleAuthError);

    return () => {
      socket.off('chat init', handleInit);
      socket.off('chat message', handleMsg);
      socket.off('auth_error', handleAuthError);
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg: string) => {
    socketRef.current?.emit('chat message', msg);
  };

  return { messages, sendMessage };
}
