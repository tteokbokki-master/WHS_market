import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useChatHistory, useCreateChat } from '../hooks/useChatHistory';
import { useAuth } from '../hooks/useAuth';
import Button from './Common/Button';
import { useTransfer } from '../hooks/useWallet';
import { AxiosError } from 'axios';
import { useWalletBalance } from '../hooks/useWallet';

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
  const { data: me } = useAuth();
  const { data: wallet, refetch: refetchBalance } = useWalletBalance();

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isTransferMode, setIsTransferMode] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');

  const otherUserId = history?.[0]
    ? history[0].sender.id !== me?.id
      ? history[0].sender.id
      : history[0].receiver.id
    : receiverId;

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
  const { mutate: transferMoney } = useTransfer();
  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;

    socketRef.current.emit('private_message', {
      roomId,
      message: input,
      receiverId: otherUserId,
      productId,
    });

    mutate({ receiverId: otherUserId, productId, message: input });
    setInput('');
  };

  const handleTransfer = () => {
    const amount = parseInt(transferAmount, 10);
    if (!amount || amount <= 0) {
      alert('올바른 금액을 입력하세요.');
      return;
    }

    transferMoney(
      { toUserId: Number(otherUserId), amount: Number(transferAmount) },
      {
        onSuccess: () => {
          alert(`${amount}원이 ${username}님에게 송금되었습니다.`);
          setTransferAmount('');
          setIsTransferMode(false);
          refetchBalance();
          const message = `[송금] ${amount}원을 송금했습니다.`;
          if (socketRef.current) {
            socketRef.current.emit('private_message', {
              roomId,
              message,
              receiverId,
              productId,
            });
          }
          mutate({ receiverId: otherUserId, productId, message });
        },
        onError: (error: Error) => {
          if (error instanceof AxiosError && error.response?.data?.message) {
            alert(error.response.data.message as string);
          } else {
            alert('송금에 실패했습니다.');
          }
        },
      }
    );
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

      <TopBar>
        <Balance>잔액: {(wallet?.balance ?? 0).toLocaleString()}원</Balance>
        <Button onClick={() => setIsTransferMode(prev => !prev)}>송금</Button>
      </TopBar>

      {isTransferMode ? (
        <InputArea>
          <ChatInput
            value={transferAmount}
            onChange={e => setTransferAmount(e.target.value)}
            placeholder="송금할 금액 입력"
            type="number"
          />
          <Button onClick={handleTransfer}>보내기</Button>
        </InputArea>
      ) : (
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
      )}
    </Wrapper>
  );
}

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

const Title = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
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

const TopBar = styled.div`
  padding: 8px 12px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;
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

const Message = styled.div<{ isMine: boolean }>`
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

const Balance = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #3cb371;
`;
