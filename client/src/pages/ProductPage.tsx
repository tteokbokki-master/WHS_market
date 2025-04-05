import Container from '../Components/Common/Container';
import styled from '@emotion/styled';
import Button from '../Components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Item = {
  id: 1,
  title: '사과팝니다',
  name: '사과',
  price: '1000원',
  description: '달고 맛남',
  ImageUrl:
    'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
};

export default function ProductPage() {
  const { productId } = useParams();
  console.log(productId);
  const navigate = useNavigate();

  if (!Item) {
    return <h1>ㅎㅁㅁㅁㅇ</h1>;
  }

  return (
    <Container>
      <Inner>
        <HeaderRow>
          <BackButton onClick={() => navigate(-1)}>← 뒤로</BackButton>
          <Title>{Item.title}</Title>
        </HeaderRow>

        <Image src={Item.ImageUrl} />

        <InfoSection>
          <InfoRow>
            <Label>상품명</Label>
            <Value>{Item.name}</Value>
          </InfoRow>
          <InfoRow>
            <Label>상품가격</Label>
            <Value>{Item.price}</Value>
          </InfoRow>
          <InfoRow>
            <Label>상품 설명</Label>
            <Value>{Item.description}</Value>
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

const Image = styled.img`
  width: 50%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
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
