import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useChatHistory, useCreateChat } from '../hooks/useChatHistory';
import { useAuth } from '../hooks/useAuth';
import Button from './Common/Button';

interface ChatSideBoxProps {
  onClose: () => void;
  username: string;
  roomId: string;
  receiverId: number;
  productId: number;
}

export default function ChatSideBox({ onClose, username, roomId, receiverId, productId }: ChatSideBoxProps) {
  const socketRef = useSocket();
  const { data: history } = useChatHistory(receiverId, productId);
  const { mutate } = useCreateChat();

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const { data: me } = useAuth();

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.emit('join_private', { roomId });

    socketRef.current.on('private_message', msg => {
      setMessages(prev => [...prev, `${msg.username}: ${msg.message}`]);
    });

    return () => {
      socketRef.current?.off('private_message');
    };
  }, [roomId]);

  useEffect(() => {
    if (!history) return;
    const formatted = history.map(h => `${h.sender.username}: ${h.message}`);
    setMessages(formatted);
  }, [history]);

  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;

    socketRef.current.emit('private_message', {
      roomId,
      message: input,
      receiverId,
      productId,
    });

    mutate({ receiverId: Number(receiverId), productId: Number(productId), message: input });

    setInput('');
  };

  return (
    <Wrapper>
      <Header>
        <Title>'{username}'님과의 대화</Title>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Header>
      <ChatBody>
        {messages.map((m, idx) => {
          const [sender, ...rest] = m.split(': ');
          const text = rest.join(': ');
          const isMine = me?.username === sender;
          return (
            <Message key={idx} isMine={isMine}>
              {text}
            </Message>
          );
        })}
      </ChatBody>
      <InputArea>
        <ChatInput
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="메시지를 입력하세요"
        />
        <Button onClick={handleSend}>전송</Button>
      </InputArea>
    </Wrapper>
  );
}

const Message = styled.div<{ isMine: boolean }>`
  background: red;
  max-width: 80%;
  margin: 6px 0;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: ${({ isMine }) => (isMine ? '#3cb371' : '#f0f0f0')};
  color: ${({ isMine }) => (isMine ? 'white' : 'black')};
  text-align: ${({ isMine }) => (isMine ? 'end' : 'start')};
  word-break: break-word;
  align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
`;

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 16px;
  background: #3cb371;
  position: relative;
  color: white;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const InputArea = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #eee;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 5px;
`;

const Title = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
`;
