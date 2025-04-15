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
    const socket = io('http://localhost:8080', {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on('chat init', (initial: ChatMessage[]) => {
      setMessages(initial);
    });

    socket.on('chat message', (msg: ChatMessage) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('auth_error', msg => {
      console.warn('인증 실패:', msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg: string) => {
    socketRef.current?.emit('chat message', msg);
  };

  return { messages, sendMessage };
}
