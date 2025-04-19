import Container from '../Components/Common/Container';
import styled from '@emotion/styled';
import Button from '../Components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProduct';
import { useState } from 'react';
import ReportModal from '../Components/ReportModal';
import ChatSideBox from '../Components/ChatSideBox';
import ChatRoomsList from '../Components/ChatRoomList';
import { useAuth } from '../hooks/useAuth';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const pid = Number(productId);
  const navigate = useNavigate();
  const { data: item, isLoading, isError } = useProductDetail(pid);
  const { data: me } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isUserReportOpen, setIsUserReportOpen] = useState(false);

  const [mode, setMode] = useState<'none' | 'rooms' | 'chat'>('none');
  const [selectedRoom, setSelectedRoom] = useState<{ userId: number; username: string } | null>(null);

  if (isLoading) return <h1>불러오는 중...</h1>;
  if (isError || !item) return <h1>상품을 불러올 수 없습니다.</h1>;

  const isOwner = me?.id === item.userId;
  const roomId = `product-${pid}-user-${isOwner ? selectedRoom?.userId : me?.id}`;

  const openReport = () => setIsReportOpen(true);
  const closeReport = () => setIsReportOpen(false);
  const openUserReport = () => setIsUserReportOpen(true);
  const closeUserReport = () => setIsUserReportOpen(false);
  const openRooms = () => setMode('rooms');
  const openChat = () => {
    setSelectedRoom({ userId: item.userId, username: item.username });
    setMode('chat');
  };
  const closeAll = () => {
    setMode('none');
    setSelectedRoom(null);
  };

  return (
    <CustomContainer>
      <Inner>
        <HeaderRow>
          <BackButton onClick={() => navigate(-1)}>← 홈으로</BackButton>
          <Title>{item.title}</Title>
        </HeaderRow>
        <ImageWrapper>
          {imgError ? (
            <Fallback />
          ) : (
            <Image
              src={`${import.meta.env.VITE_SERVER_URL}${item.imageUrl}`}
              alt={item.name}
              onError={() => setImgError(true)}
            />
          )}
        </ImageWrapper>
        <InfoSection>
          <InfoRow>
            <Label>작성자</Label>
            <Value>{item.username}</Value>
          </InfoRow>
          <InfoRow>
            <Label>상품명</Label>
            <Value>{item.name}</Value>
          </InfoRow>
          <InfoRow>
            <Label>상품가격</Label>
            <Value>{item.price}</Value>
          </InfoRow>
          <InfoRow>
            <Label>상품 설명</Label>
            <Value>{item.description}</Value>
          </InfoRow>
        </InfoSection>
        <ButtonBar>
          {!isOwner && (
            <>
              <Button onClick={openUserReport}>유저 신고</Button>
              <Button onClick={openReport}>불량 상품 신고</Button>
            </>
          )}
          {isOwner ? (
            <Button onClick={openRooms}>채팅 목록 보기</Button>
          ) : (
            <Button onClick={openChat}>1대1 채팅</Button>
          )}
        </ButtonBar>
        {mode === 'rooms' && (
          <ChatRoomsList
            productId={pid}
            onSelect={room => {
              setSelectedRoom(room);
              setMode('chat');
            }}
            onClose={closeAll}
          />
        )}

        {mode === 'chat' && selectedRoom && (
          <ChatSideBox
            onClose={closeAll}
            username={selectedRoom.username}
            roomId={roomId}
            receiverId={selectedRoom.userId}
            productId={pid}
          />
        )}
        {isReportOpen && <ReportModal type="product" productId={item.id} onClose={closeReport} />}
        {isUserReportOpen && (
          <ReportModal type="user" username={item.username} reportedUserId={item.userId} onClose={closeUserReport} />
        )}
      </Inner>
    </CustomContainer>
  );
}

const CustomContainer = styled(Container)``;

const Inner = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const HeaderRow = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
  padding: 10px 0;
  border-bottom: 2px solid #ddd;
`;

const BackButton = styled.p`
  position: absolute;
  left: 10px;
  top: 30%;
  transform: translateY(-50%);
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid 3cb371;
  cursor: pointer;
  text-decoration: none;
  color: #3cb371;
  &:hover {
    color: #2e8b57;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const InfoSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
`;
const Value = styled.span``;

const ButtonBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px 0;
`;

const ImageWrapper = styled.div`
  width: 50%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Fallback = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
`;
