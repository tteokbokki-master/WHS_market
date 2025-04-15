import { useChat } from '../../hooks/useChat';
import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Button from '../Common/Button';

export default function BroadCastBox() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const msg = input.trim();
    if (!msg) return;
    sendMessage(msg);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Wrapper>
      <Title>실시간 채팅</Title>
      <MessageArea>
        {messages.map((msg, idx) => (
          <Message key={idx}>
            <strong>{msg.username}</strong>: {msg.message}
          </Message>
        ))}
        <div ref={scrollRef} />
      </MessageArea>

      <InputArea>
        <Input
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <CustomButton onClick={handleSend}>전송</CustomButton>
      </InputArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  padding: 12px;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    border-top: 2px solid #ddd;
  }
`;

const MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Message = styled.div`
  margin-bottom: 12px;
  word-break: break-word;
  font-size: 18px;
`;

const InputArea = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CustomButton = styled(Button)`
  padding: 8px 12px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: rgb(60, 179, 113);
  margin: 10px 10px 20px 10px;
`;
