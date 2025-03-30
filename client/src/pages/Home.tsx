import styled from '@emotion/styled';
import ProductItem from '../Components/ProductItem/ProductItem';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const productList: Product[] = [
  {
    id: 1,
    name: '무선 키보드',
    price: 29000,
    imageUrl: 'a',
  },
  {
    id: 2,
    name: '게이밍 마우스',
    price: 33000,
    imageUrl: 'a',
  },
  {
    id: 3,
    name: '27인치 모니터',
    price: 189000,
    imageUrl: 'a',
  },
  {
    id: 4,
    name: 'USB 허브',
    price: 12900,
    imageUrl: 'a',
  },
  {
    id: 5,
    name: '게이밍 체어',
    price: 149000,
    imageUrl: 'ha',
  },
  {
    id: 6,
    name: '스마트 워치',
    price: 87000,
    imageUrl: 'a',
  },
  {
    id: 7,
    name: '블루투스 스피커',
    price: 45000,
    imageUrl: 'a',
  },
  {
    id: 8,
    name: '태블릿 거치대',
    price: 9800,
    imageUrl: 'a',
  },
  {
    id: 9,
    name: 'C타입 충전기',
    price: 10900,
    imageUrl: 'a',
  },
  {
    id: 10,
    name: '노트북 받침대',
    price: 23900,
    imageUrl: 'a',
  },
];

export default function Home() {
  return (
    <Container className="전체 컨테이너">
      <ProductBox className=" 상품">
        <ProductHeader className=" 상품목록멘트, 등록하기 버튼">
          <Title>상품목록</Title>
          <RegisterButton>상품 등록하기</RegisterButton>
        </ProductHeader>
        <ProductList className=" 상품 리스트">
          {productList.map(item => (
            <ProductItem key={item.id} product={item} />
          ))}
        </ProductList>
      </ProductBox>
      <ChatBox className=" 전체 채팅"></ChatBox>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  // background: red;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10px;
`;

const ProductBox = styled.div`
  flex: 7;
  // background: black;
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.div`
  flex: 3;
  // background: yellow;
  height: 100%;
  border-radius: 4px;
`;

const ProductHeader = styled.div`
  // background: blue;
  flex: 1.5;
  height: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: end;
  border-bottom: 2px solid #ddd;
`;

const ProductList = styled.div`
  flex: 8.5;
  // background: skyblue;
  height: 100%;
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 16px;
  overflow-y: auto;
  max-height: calc(155px * 4 + 16px * 3 + 32px);
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: rgb(60, 179, 113);
  margin: 10px;
`;

const RegisterButton = styled.button`
  font-size: 16px;
  padding: 12px 18px;
  background-color: #3cb371;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2e8b57;
  }
`;
