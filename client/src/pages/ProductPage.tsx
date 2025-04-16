import Container from '../Components/Common/Container';
import styled from '@emotion/styled';
import Button from '../Components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProduct';
import { useState } from 'react';

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, isError } = useProductDetail(Number(productId));
  const [imgError, setImgError] = useState(false);

  if (isLoading) return <h1>불러오는 중...</h1>;
  if (isError || !item) return <h1>상품을 불러올 수 없습니다.</h1>;

  return (
    <Container>
      <Inner>
        <HeaderRow>
          <BackButton onClick={() => navigate(-1)}>← 뒤로</BackButton>
          <Title>{item.title}</Title>
        </HeaderRow>

        <ImageWrapper>
          {imgError ? <Fallback /> : <Image src={item.imageUrl} alt={item.name} onError={() => setImgError(true)} />}
        </ImageWrapper>

        <InfoSection>
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
          <Button>불량유저 신고</Button>
          <Button>1대1 채팅</Button>
        </ButtonBar>
      </Inner>
    </Container>
  );
}

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const HeaderRow = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
  padding: 10px 0;
  border-bottom: 2px solid #ddd;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  background: none;
  border: none;
  color: #3cb371;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  text-align: center;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
`;

// const Image = styled.img`
//   width: 50%;
//   height: 400px;
//   object-fit: cover;
//   border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   margin-top: 10px;
// `;

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
  color: #333;
`;

const Value = styled.span`
  color: #555;
`;

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
  object-fit: cover;
`;

const Fallback = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  position: relative;
`;
