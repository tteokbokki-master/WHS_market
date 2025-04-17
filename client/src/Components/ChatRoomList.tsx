import styled from '@emotion/styled';
import { ChatRoom, useChatRooms } from '../hooks/useChatRooms';

interface Props {
  productId: number;
  onSelect: (room: ChatRoom) => void;
  onClose: () => void;
}

export default function ChatRoomsList({ productId, onSelect, onClose }: Props) {
  const { data: rooms, isLoading, isError } = useChatRooms(productId);

  return (
    <Wrapper>
      <Header>
        <Title>채팅방 목록</Title>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Header>

      {isLoading && <Info>로딩 중...</Info>}
      {isError && <Info>목록을 불러올 수 없습니다.</Info>}
      {rooms && rooms.length === 0 && <Info>아직 대화가 없습니다.</Info>}

      <List>
        {rooms?.map(room => (
          <Item key={room.userId} onClick={() => onSelect(room)}>
            <strong>{room.username}</strong>
            <p>{room.lastMessage}</p>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background: white;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 999;
`;
const Header = styled.div`
  padding: 16px;
  background: #3cb371;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.p`
  font-weight: bold;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;
const List = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const Item = styled.div`
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: #666;
  }
`;
const Info = styled.p`
  padding: 16px;
  color: #999;
  text-align: center;
`;
